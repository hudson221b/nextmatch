"use client"

import "react-toastify/ReactToastify.css"
import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode, useRef, useEffect } from "react"
import { usePresenceChannel } from "@/hooks/usePresenceChannel"
import { ToastContainer } from "react-toastify"
import { useNotificationChannel } from "@/hooks/useNotificationChannel"
import { useMessagesStore } from "@/hooks/useStores"
import { getUnreadMsgCount } from "@/app/actions/messageActions"

export const UIProviders = ({
  children,
  userId,
}: {
  children: ReactNode
  userId: string | null
}) => {
  usePresenceChannel(userId)
  useNotificationChannel(userId)

  // set unread messages count on login
  const updateUnreadCount = useMessagesStore(state => state.updateUnreadCount)

  const isUnreadCountSet = useRef<boolean>(false)

  useEffect(() => {
    if (!userId) return

    if (isUnreadCountSet.current) return

    getUnreadMsgCount().then(count => updateUnreadCount(count))
    isUnreadCountSet.current = true
  }, [userId])

  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" />
      {children}
    </NextUIProvider>
  )
}


