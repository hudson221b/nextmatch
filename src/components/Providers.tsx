import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode } from "react"
import TopNav from "./navbar/TopNav"

export const UIProviders = ({ children }: { children: ReactNode }) => {
  return (
    <NextUIProvider>
      <TopNav />
      {children}
    </NextUIProvider>
  )
}