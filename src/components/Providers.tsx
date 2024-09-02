"use client"

import "react-toastify/ReactToastify.css"
import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode, useRef, useEffect } from "react"
import { usePresenceChannel } from "@/hooks/usePresenceChannel"
import { ToastContainer } from "react-toastify"
import { useNotificationChannel } from "@/hooks/useNotificationChannel"
import { useMessagesStore } from "@/hooks/useStores"
import { getUnreadMsgCount } from "@/app/actions/messageActions"
import { SessionProvider } from "next-auth/react"

export const Providers = ({
  children,
  userId,
  profileCompleted,
  isAdmin,
}: {
  children: ReactNode
  userId: string | null
  profileCompleted: boolean | null
  isAdmin: boolean
}) => {
  usePresenceChannel(userId, profileCompleted, isAdmin)
  useNotificationChannel(userId, profileCompleted)

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
    <SessionProvider>
      <NextUIProvider>
        <ToastContainer position="bottom-right" />
        {children}
      </NextUIProvider>
    </SessionProvider>
  )
}


