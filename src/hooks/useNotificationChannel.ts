import { useCallback, useEffect, useRef } from "react"
import type { Channel } from "pusher-js"
import { pusherClient } from "@/lib/pusher"
import { usePathname, useSearchParams } from "next/navigation"
import { useMessagesStore } from "./useStores"
import type { MessageDTO } from "@/types"
import { toast } from "react-toastify"

/**
 * Subscribes a logged in user to his/her private notification channel. User will get notification anywhere (except on the Chat page with the message sender) in the app if he/she receives a new message
 */
export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null)
  const path = usePathname()
  const searchParams = useSearchParams()

  const { add } = useMessagesStore()

  const handleNewMessage = useCallback(
    (message: MessageDTO) => {
      // if user is on "/messages" and on inbox, we update messages redux state
      if (path === "/messages" && searchParams.get("container") !== "outbox") {
        add(message)
      }
      // if user is on anywhere but the chat with message sender, pop a toast notification
      if (path !== `/${message.senderId}/chat`) {
        toast.info(`${message.senderName} just sent you a message`)
      }
    },
    [add, path, searchParams]
  )

  useEffect(() => {
    if (!userId) return
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`)
      channelRef.current.bind("message:new", handleNewMessage)
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unbind_all()
        pusherClient.unsubscribe(`private-${userId}`)
      }
    }
  }, [handleNewMessage, userId])
}
