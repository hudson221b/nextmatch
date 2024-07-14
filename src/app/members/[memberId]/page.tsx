import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import React from "react"
import { CardHeader, CardBody, Divider } from "@nextui-org/react"
import CardInnerWrapper from "@/components/CardInnerWrapper"

export default async function MemberDetails(params: {
  params: { memberId: string }
}) {
  const member = await getMemberById(params.params.memberId)
  if (!member) return notFound()
  return <CardInnerWrapper header="Profile" body={member.description} />
}
