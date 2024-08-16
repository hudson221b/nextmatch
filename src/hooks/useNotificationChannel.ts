import { useEffect, useRef } from "react"
import type { Channel } from "pusher-js"
import { pusherClient } from "@/lib/pusher"

/**
 * Subscribes a logged in user to his/her private notification channel. User will get notification anywhere in the app if he/she receives a new message
 */
export const useNotificationChannel = (userId: string | null) => {
  const channelRef = useRef<Channel | null>(null)

  useEffect(() => {
    if (!userId) return
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(`private-${userId}`)
    }
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        pusherClient.unsubscribe(`private-${userId}`)
      }
    }
  }, [userId])
}
