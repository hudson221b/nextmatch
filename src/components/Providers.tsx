import { NextUIProvider } from "@nextui-org/react"
import React, { type ReactNode } from "react"

export const UIProviders = ({ children}:{children:ReactNode}) => {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}