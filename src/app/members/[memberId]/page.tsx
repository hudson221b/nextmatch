import { getMemberById } from "@/app/actions/memberActions"
import { notFound } from "next/navigation"

import { CardInnerWrapper } from "@/components/CardWrappers"

export default async function MemberDetails(params: {
  params: { memberId: string }
}) {
  const member = await getMemberById(params.params.memberId)
  if (!member) return notFound()
  return <CardInnerWrapper header="Profile" body={member.description} />
}
