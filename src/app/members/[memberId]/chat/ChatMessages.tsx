"use client"
import type { MessageDTO } from "@/types"
import React, { useCallback, useEffect, useState } from "react"
import MessageBox from "./MessageBox"
import { pusherClient } from "@/lib/pusher"
import { format } from "date-fns"

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

  const handleNewMessage = useCallback(
    (message: MessageDTO) => {
      setMessages(prevState => {
        return [...prevState, message]
      })
    },
    [setMessages]
  )

  const handleReadMessages = useCallback(
    (messageIds: string[]) => {
      setMessages(prevState =>
        prevState.map(message =>
          messageIds.includes(message.id)
            ? {
                ...message,
                dateRead: format(new Date(), "M-d-yy h:m:a"),
              }
            : message
        )
      )
    },
    [setMessages]
  )

  useEffect(() => {
    const channel = pusherClient.subscribe(channelName)
    channel.bind("message:new", handleNewMessage)
    channel.bind("messages:read", handleReadMessages)

    return () => {
      // unbind events, not channels
      channel.unbind("message:new")
      channel.unbind("messages:read")
      // unsubscribe channel
      pusherClient.unsubscribe(channelName)
    }
  }, [channelName, handleNewMessage, handleReadMessages])

  return (
    <div className="grid grid-cols-1">
      {messages.map(message => (
        <MessageBox message={message} userId={userId} key={message.id} />
      ))}
    </div>
  )
}
