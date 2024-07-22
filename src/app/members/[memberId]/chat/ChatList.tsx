"use client"
import type { MessageDTO } from "@/types"
import React, { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { pusherClient } from "@/lib/pusher"

type Props = {
  initialMessages: MessageDTO[]
  userId: string
  channelName: string
}
/**
 * Client component for chat history between the current user and a recipient
 */
export default function ChatList({
  initialMessages,
  channelName,
  userId,
}: Props) {
  const [messages, setMessages] = useState(initialMessages)

  useEffect(() => {
    const channel = pusherClient.subscribe(channelName)
    channel.bind("message:new", (data: MessageDTO) => {
      console.log("#####🚀🚀🚀 ~ channel.bind ~ data👉👉", data)

      setMessages(prevState => {
        return [...prevState, data]
      })
    })

    return () => {
      channel.unsubscribe()
      channel.unbind(channelName)
    }
  }, [channelName, messages])

  return (
    <div className="grid grid-cols-1">
      {messages.map(message => (
        <MessageBox message={message} userId={userId} key={message.id} />
      ))}{" "}
    </div>
  )
}
