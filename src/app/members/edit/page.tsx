import { CardHeader, Divider, CardBody } from "@nextui-org/react"

import { EditForm } from "./EditForm"
import { getCurrentUserId } from "@/app/actions/authActions"
import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"
import CardInnerWrapper from "@/components/CardInnerWrapper"

export default async function MemberEditPage() {
  const userId = await getCurrentUserId()
  const member = await getMemberById(userId)
  if (!member) return notFound()

  return (
    <CardInnerWrapper
      header="Edit Profile"
      body={<EditForm member={member} />}
    />
  )
}
