import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import React from "react"
import MemberSidebar from "../memberSidebar"

export default async function MemberDetails(params: {
  params: { memberId: string }
}) {
  const member = await getMemberById(params.params.memberId)
  if (!member) return notFound()
  return (
    <div>
      {member.name}
    </div>
  )
}
