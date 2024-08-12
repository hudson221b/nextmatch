"use client"

import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode } from "react"
import { usePresenceChannel } from "@/hooks/usePresenceChannel"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"

export const UIProviders = ({ children }: { children: ReactNode }) => {
  usePresenceChannel()
  return (
    <NextUIProvider>
      <ToastContainer position="bottom-right" />
      {children}
    </NextUIProvider>
  )
}
