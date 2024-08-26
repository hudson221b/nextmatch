import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import React, { type ReactNode } from "react"
import MemberSidebar from "../memberSidebar"
import { Card } from "@nextui-org/react"
import styles from "../../NextUIOverride.module.css"

/**
 * This layout component receives a prop object containing two properties: 1. children: which are React elements returned from page.tsx under route /members/memberId.
 * 2. params: another object with key being the memberId, value is the memberId value
 */
export default async function MemberPageLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { memberId: string }
}) {
  const member = await getMemberById(params.memberId)
  if (!member) return notFound()

  const baseUrl = `/members/${params.memberId}`

  const navLinks = [
    { name: "Profile", href: baseUrl },
    { name: "Photos", href: `${baseUrl}/photos` },
    { name: "Chat", href: `${baseUrl}/chat` },
  ]

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card
          className="w-full h-[80vh]"
          classNames={{
            footer: styles.footer,
          }}
        >
          {children}
        </Card>
      </div>
    </div>
  )
}
