import type { MessageDTO } from "@/types"
import { Image } from "@nextui-org/react"
import Link from "next/link"
import React from "react"
import { toast } from "react-toastify"

type Props = {
  message: MessageDTO
}
export function NewMessageToast({ message }: Props) {
  return (
    <Link
      href={`/members/${message.senderId}/chat`}
      className="flex items-center"
    >
      <div className="mr-2">
        <Image
          src={message.senderImage || "images/user.png"}
          width={50}
          height={50}
          alt="sender image"
        />
      </div>
      <div className="flex flex-grow flex-col justify-center">
        <div className="font-semibold">{`${message.senderName} sent you a message`}</div>
        <div className="text-sm">Click to view</div>
      </div>
    </Link>
  )
}

export const newMessageToast = (message: MessageDTO) => {
  toast(<NewMessageToast message={message} />)
}
