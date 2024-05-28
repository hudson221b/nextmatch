import type { Metadata } from "next"
import "./globals.css"
import { UIProviders } from "@/components/Providers"

export const metadata: Metadata = {
  title: "NextMatch",
  description: "The old fashioned dating app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <h1>This is root layout.tsx</h1>
        <UIProviders>{children}</UIProviders>
      </body>
    </html>
  )
}
