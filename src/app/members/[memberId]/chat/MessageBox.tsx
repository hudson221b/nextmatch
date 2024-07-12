import type { MessageDTO } from "@/types"
import { Avatar } from "@nextui-org/react"
import React from "react"

type Props = {
  message: MessageDTO
  userId: string
}

export default function MessageBox({ message, userId }: Props) {
  const isSender = message.senderId === userId
  const sentClassames = "w-full flex justify-end"
  const receivedClassames = "w-full flex justify-start"
  return isSender ? (
    <div className={sentClassames}>
      <div>{message.text}</div>
      <Avatar src={message.senderImage || "/images/user"} />
    </div>
  ) : (
    <div className={receivedClassames}>
      <Avatar src={message.senderImage || "/images/user"} /> {message.text}
    </div>
  )
}
