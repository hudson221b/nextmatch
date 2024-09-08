import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import React, { type ReactNode } from "react"
import MemberSidebar from "../memberSidebar"
import { getCurrentUserId } from "@/app/actions/authActions"

/**
 * This layout component receives a prop object containing two properties: 1. children: which are React elements returned from page.tsx under route /members/memberId.
 * 2. params: another object with key being the memberId, value is the memberId value
 */
export default async function MemberEditLayout({
  children,
}: {
  children: ReactNode
}) {
  const userId = await getCurrentUserId()
  const member = await getMemberById(userId)
  if (!member) return notFound()

    const baseUrl = "/members/edit"

    const navLinks = [
      { name: "Edit Profile", href: baseUrl },
      { name: "Edit Photos", href: `${baseUrl}/photos` },
    ]

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">{children}</div>
    </div>
  )
}
