import { CardHeader, Divider, CardBody } from "@nextui-org/react"
import React from "react"
import EditForm from "./EditForm"

export default function MemberEditPage() {
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm />
      </CardBody>
    </>
  )
}
