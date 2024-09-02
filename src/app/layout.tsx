import type { Metadata } from "next"
import "./globals.css"
import { Providers } from "@/components/Providers"
import TopNav from "@/components/navbar/TopNav"
import { auth } from "@/auth"

export const metadata: Metadata = {
  title: "NextMatch",
  description: "The old fashioned dating app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  const userId = session?.user?.id || null
  const profileCompleted = session?.user.profileCompleted || null
  const isAdmin = session?.user.role === "ADMIN"
  return (
    <html lang="en">
      <body>
        <Providers
          userId={userId}
          profileCompleted={profileCompleted}
          isAdmin={isAdmin}
        >
          <TopNav />
          <main className="container mx-auto">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
