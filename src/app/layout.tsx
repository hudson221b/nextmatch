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
        <UIProviders>
          <main className="p-10 container mx-auto">{children}</main>
        </UIProviders>
      </body>
    </html>
  )
}
