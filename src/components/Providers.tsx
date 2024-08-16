"use client"

import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode } from "react"
import { usePresenceChannel } from "@/hooks/usePresenceChannel"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { useNotificationChannel } from "@/hooks/useNotificationChannel"

export const UIProviders = ({
  children,
  userId,
}: {
  children: ReactNode
  userId: string | null
}) => {
  usePresenceChannel()
  useNotificationChannel(userId)

  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" />
      {children}
    </NextUIProvider>
  )
}
