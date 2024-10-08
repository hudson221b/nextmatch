"use server"

import {
  messageSchema,
  type MessageSchema,
} from "@/lib/zod-schemas/message-schema"
import { ActionResult, type MessageDTO, type MessageFetchResult } from "@/types"
import { getCurrentUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { generateChatChannelName } from "@/lib/util"
import { pusherServer } from "@/lib/pusher"

/**
 * When user sends a new message in browser, update database and publish a Pusher event.
 */
export const createMessage = async (
  data: MessageSchema,
  recipientId: string
): Promise<ActionResult<MessageDTO>> => {
  try {
    const userId = await getCurrentUserId()
    const validated = messageSchema.safeParse(data)
    if (!validated.success) {
      return { status: "error", error: validated.error.errors }
    }
    const { text } = validated.data
    const message = await prisma.message.create({
      data: {
        text,
        recipientId,
        senderId: userId,
      },
      select: messageSelect,
    })

    const messageDTO = formatMessage(message)

    //after saving message in database, publish an event to the unique channel between the current user and the recipient
    const channelName = generateChatChannelName(userId, recipientId)
    await pusherServer.trigger(channelName, "message:new", messageDTO)

    // also publish an event to the recipient's private notification channel
    await pusherServer.trigger(
      `private-${recipientId}`,
      "message:new",
      messageDTO
    )

    return { status: "success", data: messageDTO }
  } catch (error) {
    console.log(error)
    return { status: "error", error: "Something went wrong" }
  }
}

/**
 * Flattens the result from prisma messages query and format UTC date to more readable string
 */
function formatMessage(message: MessageFetchResult): MessageDTO {
  return {
    id: message.id,
    text: message.text,
    created: format(message.created, "M-d-yyyy h:mm:a"),
    dateRead: message.dateRead
      ? format(message.dateRead, "M-d-yyyy h:mm:a")
      : null,
    senderId: message.sender?.userId,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.userId,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  }
}

/**
 * Gets all messages in a chat
 * @param recipientId the memberId of the other party in the chat
 */
export const getChatMessages = async (
  recipientId: string
): Promise<MessageDTO[]> => {
  try {
    const userId = await getCurrentUserId()
    const messages: MessageFetchResult[] = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, recipientId, senderDeleted: false },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      select: messageSelect,
      orderBy: {
        created: "asc",
      },
    })
    // mark received messages as read
    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          m =>
            m.dateRead === null &&
            m.sender?.userId === recipientId &&
            m.recipient?.userId === userId
        )
        .map(m => m.id)

      await prisma.message.updateMany({
        where: {
          id: { in: readMessageIds },
        },
        data: {
          dateRead: new Date(),
        },
      })

      // publish a new event to private chat channel to flag read messages
      const channelName = generateChatChannelName(userId, recipientId)
      await pusherServer.trigger(channelName, "messages:read", readMessageIds)

      // also publish an event to notification channel to update unread count
      await pusherServer.trigger(
        `private-${userId}`,
        "messages:read",
        readMessageIds.length
      )
    }

    return messages.map(m => formatMessage(m))
  } catch (error) {
    console.log(error)
    throw error
  }
}

/**
 * @param cursor a date string that indicates the starting point(included) of messages to fetch
 * @param limit how many messages to fetch in this request
 */
export const getMessagesByContainer = async (
  container: "outbox" | "inbox",
  cursor?: string,
  limit = 2
) => {
  try {
    const userId = await getCurrentUserId()

    const conditions = {
      [container === "inbox" ? "recipientId" : "senderId"]: userId,
      ...(container === "inbox"
        ? { recipientDeleted: false }
        : { senderDeleted: false }),
    }

    const messages = await prisma.message.findMany({
      where: {
        ...conditions,
        ...(cursor ? { created: { lte: new Date(cursor) } } : {}),
      },
      select: messageSelect,
      orderBy: {
        created: "desc",
      },
      take: limit + 1,
    })

    let newCursor: string | undefined
    if (messages.length > limit) {
      const nextItem = messages.pop()
      newCursor = nextItem?.created.toISOString()
    }

    return {
      messages: messages.map(m => formatMessage(m)),
      nextCursor: newCursor,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

/** soft and hard delete a message for the current user */
export const deleteMessageById = async (
  messageId: string,
  isInbox: boolean
) => {
  try {
    const userId = await getCurrentUserId()
    const selector = isInbox ? "recipientDeleted" : "senderDeleted"

    // soft delete
    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    })

    // actually delete the message if the other party also 'deletes' the message
    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          {
            recipientId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
          {
            senderId: userId,
            senderDeleted: true,
            recipientDeleted: true,
          },
        ],
      },
    })

    if (messagesToDelete.length) {
      const ids = messagesToDelete.map(m => m.id)
      await prisma.message.deleteMany({
        where: {
          id: { in: ids },
        },
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUnreadMsgCount = async () => {
  try {
    const userId = await getCurrentUserId()

    return await prisma.message.count({
      where: { recipientId: userId, recipientDeleted: false, dateRead: null },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      name: true,
      image: true,
      userId: true,
    },
  },
  recipient: {
    select: {
      name: true,
      image: true,
      userId: true,
    },
  },
}