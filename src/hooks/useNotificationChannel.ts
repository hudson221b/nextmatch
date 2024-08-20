import { useCallback, useEffect, useRef } from "react"
import type { Channel } from "pusher-js"
import { pusherClient } from "@/lib/pusher"
import { usePathname, useSearchParams } from "next/navigation"
import { useMessagesStore } from "./useStores"
import type { MessageDTO } from "@/types"
import { newMessageToast } from "@/components/NewMessageToast"

/**
 * Subscribes a logged in user to his/her private notification channel. User will get notification anywhere (except on the Chat page with the message sender) in the app if he/she receives a new message
 */
export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null)
  const path = usePathname()
  const searchParams = useSearchParams()

  const handleNewMessage = useCallback(
    (message: MessageDTO) => {
      // if user is on "/messages" and in inbox, we update messages state so message table is updated
      if (path === "/messages" && searchParams.get("container") !== "outbox") {
        useMessagesStore.setState(state => {
          const updatedMessages = [message, ...state.messages]
          const updatedCount = state.unreadCount + 1
          return { messages: updatedMessages, unreadCount: updatedCount }
        })
        return
      }
      // if user is on anywhere but the chat with message sender, pop a toast notification
      if (path !== `/${message.senderId}/chat`) {
        useMessagesStore.setState(state => {
          const updatedMessages = [message, ...state.messages]
          const updatedCount = state.unreadCount + 1
          return { messages: updatedMessages, unreadCount: updatedCount }
        })
        newMessageToast(message)
      }
    },
    [path, searchParams]
  )

  useEffect(() => {
    // when a not signed-in user opens app, no subscription
    if (!userId && !channelRef.current?.subscribed) {
      return
    }

    // when a signed-in signs out, unsubscribe
    if (!userId && channelRef.current?.subscribed) {
      channelRef.current.unbind_all()
      pusherClient.unsubscribe(`private-${userId}`)
      return
    }

    // when a user signs in
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`)
      channelRef.current.bind("message:new", handleNewMessage)
    }
  }, [userId])

  // unsubscribe when a signed-in user closes the app
  useEffect(() => {
    return () => {
      if (channelRef.current?.subscribed) {
        channelRef.current.unbind_all()
        pusherClient.unsubscribe(`private-${userId}`)
      }
    }
  }, [])
}
