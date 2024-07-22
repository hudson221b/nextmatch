"use server"

import {
  messageSchema,
  type MessageSchema,
} from "@/lib/zod-schemas/message-schema"
import { ActionResult, type MessageDTO, type MessageFetchResult } from "@/types"
import { getCurrentUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { getChannelName } from "@/lib/util"
import { pusherServer } from "@/lib/pusher"

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
    //after saving message in database, publish an event to the unique channel between the current logged-in user and recipient
    const messageDTO = formatMessage(message)
    const channelName = getChannelName(userId, recipientId)
    await pusherServer.trigger(channelName, "message:new", messageDTO)

    return { status: "success", data: messageDTO }
  } catch (error) {
    console.error(error)
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
 * Gets all messages between the current user and certain recipient
 */
export const getMessageHistory = async (
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
      await prisma.message.updateMany({
        where: {
          recipientId: userId,
          senderId: recipientId,
          dateRead: null,
        },
        data: {
          dateRead: new Date(),
        },
      })
    }
    return messages.map(m => formatMessage(m))
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getMessagesByContainer = async (container: string) => {
  try {
    const userId = await getCurrentUserId()

    // if container is inbox, selects all messages the current user has received
    const selector = container === "inbox" ? "recipientId" : "senderId"

    const conditions = {
      [container === "inbox" ? "recipientId" : "senderId"]: userId,
      ...(container === "inbox"
        ? { recipientDeleted: false }
        : { senderDeleted: false }),
    }

    const messages = await prisma.message.findMany({
      where: conditions,
      select: messageSelect,
      orderBy: {
        created: "desc",
      },
    })

    return messages.map(m => formatMessage(m))
  } catch (error) {
    console.error(error)
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

    // actually delete the message if the other party also 'delete' the message
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
    console.error(error)
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