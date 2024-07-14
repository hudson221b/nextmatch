"use client"
import type { MessageDTO } from "@/types"
import { Avatar } from "@nextui-org/react"
import React, { useEffect, useRef, type ReactNode } from "react"

type Props = {
  message: MessageDTO
  userId: string
}

export default function MessageBox({ message, userId }: Props) {
  const isSender = message.senderId === userId

  // outmost wrapper div, including message bubble and avatar
  const BoxWrapper = ({
    children,
    isCurrentUserSender,
  }: {
    children: ReactNode
    isCurrentUserSender: boolean
  }) => {
    const wrapperClassnames = "w-full flex gap-2 mb-3 justify-start items-end"
    const senderClassames = wrapperClassnames + " flex-row-reverse"

    return isCurrentUserSender ? (
      <div className={senderClassames}>{children}</div>
    ) : (
      <div className={wrapperClassnames}>{children}</div>
    )
  }

  const Bubble = ({
    children,
    isCurrentUserSender,
  }: {
    children: ReactNode
    isCurrentUserSender: boolean
  }) => {
    const classnames = "w-fit max-w-[50%] px-2 py-1 flex flex-col"
    const senderClassnames =
      classnames + " rounded-l-xl rounded-tr-xl bg-blue-200 items-end"
    const receiverClassnames =
      classnames + " rounded-r-xl rounded-tl-xl bg-green-200"

    return isCurrentUserSender ? (
      <div className={senderClassnames}>{children}</div>
    ) : (
      <div className={receiverClassnames}>{children}</div>
    )
  }

  const Header = ({ message }: { message: MessageDTO }) => {
    return (
      <div className="text-gray-500">
        <span className="text-sm font-semibold mr-2">{message.senderName}</span>
        <span className="text-xs">{message.created}</span>
      </div>
    )
  }

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [message])

  return (
    <BoxWrapper isCurrentUserSender={isSender}>
      <Avatar src={message.senderImage || "/images/user"} />
      <Bubble isCurrentUserSender={isSender}>
        <Header message={message} />
        <div className="text-gray-900 w-full">{message.text}</div>
      </Bubble>
      <div ref={messagesEndRef}></div>
    </BoxWrapper>
  )
}
