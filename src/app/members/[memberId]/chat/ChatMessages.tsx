"use client"
import type { MessageDTO } from "@/types"
import React, { useCallback, useEffect, useRef, useState } from "react"
import MessageBox from "./MessageBox"
import { pusherClient } from "@/lib/pusher"
import { format } from "date-fns"
import type { Channel } from "pusher-js"

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

  const channelRef = useRef<Channel | null>(null)

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
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(channelName)
      channelRef.current.bind("message:new", handleNewMessage)
      channelRef.current.bind("messages:read", handleReadMessages)
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        // unbind events, not channels
        channelRef.current.unbind("message:new")
        channelRef.current.unbind("messages:read")
        channelRef.current.unsubscribe()
      }
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
