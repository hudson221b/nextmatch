import type { Metadata } from "next"
import "./globals.css"
import { UIProviders } from "@/components/Providers"
import TopNav from "@/components/navbar/TopNav"

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
          <TopNav />
          <main className="container mx-auto">{children}</main>
        </UIProviders>
      </body>
    </html>
  )
}
