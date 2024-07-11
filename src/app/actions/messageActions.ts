"use server"

import { messageSchema, type MessageSchema } from "@/lib/schemas/message-schema"
import { ActionResult } from "@/types"
import { getCurrentUserId } from "./authActions"
import { prisma } from "@/lib/prisma"
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
    const {text} = validated.data
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
