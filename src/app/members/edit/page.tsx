import { CardHeader, Divider, CardBody } from "@nextui-org/react"
import React from "react"
import EditForm from "./EditForm"
import { getCurrentUserId } from "@/app/actions/authActions"
import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"

export default async function MemberEditPage() {
  const userId = await getCurrentUserId()
  const member = await getMemberById(userId)
  if (!member) return notFound()

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member}/>
      </CardBody>
    </>
  )
}
