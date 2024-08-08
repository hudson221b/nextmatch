/* 
Place to hold typescript types that don't need to be exported
*/

import { ZodIssue } from "zod"

// return type for any server actions
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] }

type MessageFetchResult = {
  id: string
  text: string
  created: Date
  dateRead: Date | null
  sender: {
    userId: string
    name: string
    image: string | null
  } | null
  recipient: {
    userId: string
    name: string
    image: string | null
  } | null
}

/**
 * a universal message object that can be directly used in both frontend and backend 
 */
type MessageDTO = {
  id: string
  text: string
  created: string
  dateRead: string | null
  senderId?: string
  senderName?: string
  senderImage?: string | null
  recipientId?: string
  recipientName?: string
  recipientImage?: string | null
}