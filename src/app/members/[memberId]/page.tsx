import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import React from "react"
import { CardHeader, CardBody, Divider } from "@nextui-org/react"

export default async function MemberDetails(params: {
  params: { memberId: string }
}) {
  const member = await getMemberById(params.params.memberId)
  if (!member) return notFound()
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  )
}
