"use server"

import { messageSchema, type MessageSchema } from "@/lib/schemas/message-schema"
import { ActionResult, type MessageDTO, type MessageFetchResult } from "@/types"
import { getCurrentUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
import type { Message } from "@prisma/client"
import { format } from "date-fns"

export const createMessage = async (
  data: MessageSchema,
  recipientId: string
): Promise<ActionResult<MessageSchema>> => {
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
    })
    return { status: "success", data: message }
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
          { senderId: userId, recipientId },
          { senderId: recipientId, recipientId: userId },
        ],
      },
      select: {
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
      },
      orderBy: {
        created: "asc",
      },
    })
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

    const messages = await prisma.message.findMany({
      where: {
        [selector]: userId,
      },
      select: {
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
      },
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