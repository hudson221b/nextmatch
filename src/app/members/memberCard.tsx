import { Card, CardFooter, Image } from "@nextui-org/react"
import type { Member } from "@prisma/client"
import React from "react"

type memberCardProps = {
  member: Member
}

export default function MemberCard({ member }: memberCardProps) {
  return (
    <Card fullWidth>
      <Image
        isZoomed
        alt={`${member.name} image`}
        src={member.image || "/images/user.png"}
        width={300}
        className="aspect-square object-cover"
      />
      <CardFooter>
        <div className="flex flex-col text-white">
          <span className="font-semibold">{member.name}</span>
          <span className="text-sm"> {member.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
