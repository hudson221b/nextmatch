"use client"
import type { MessageDTO } from "@/types"
import React, { useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { pusherClient } from "@/lib/pusher"
import { formatDistance } from "date-fns"

type Props = {
  initialMessages: MessageDTO[]
  userId: string
  channelName: string
}
/**
 * Client component for chat history between the current user and a recipient. Has Pusher subscription
 */
export default function ChatMessages({
  initialMessages,
  channelName,
  userId,
}: Props) {
  const [messages, setMessages] = useState(initialMessages)

  useEffect(() => {
    const channel = pusherClient.subscribe(channelName)
    channel.bind("messages:new", (data: MessageDTO) => {
      setMessages(prevState => {
        return [...prevState, data]
      })
    })

    // add read time to messages
    channel.bind("messages:read", (data: string[]) => {
      setMessages(prevState =>
        prevState.map(message =>
          data.includes(message.id)
            ? {
                ...message,
                dateRead: formatDistance(Date.now(), message.dateRead!, {
                  addSuffix: true,
                }),
              }
            : message
        )
      )
    })

    return () => {
      // unbind events, not channels
      channel.unbind("message:new")
      channel.unbind("messages:read")
      // unsubscribe channel
      pusherClient.unsubscribe(channelName)
    }
  }, [channelName])

  return (
    <div className="grid grid-cols-1">
      {messages.map(message => (
        <MessageBox message={message} userId={userId} key={message.id} />
      ))}
    </div>
  )
}
