import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react"
import type { Member } from "@prisma/client"
import { differenceInYears } from "date-fns"
import Link from "next/link"
import React from "react"

type memberSidebarProps = {
  member: Member
}

export default function MemberSidebar({ member }: memberSidebarProps) {
  return (
    <Card className="h-[80vh]">
      <CardBody>
        <Image src={`${member.image}`} alt="member-image" width={200} />
        <div>{`${member.name}, ${differenceInYears(
          new Date(),
          member.dateOfBirth
        )}`}</div>
        <div>{`${member.city}, ${member.country}`}</div>
        <Divider />
        some links
      </CardBody>
      <CardFooter>
        <Button as={Link} href="/members" variant="bordered" color="secondary">
          {" "}
          Go back to Members
        </Button>
      </CardFooter>
    </Card>
  )
}
