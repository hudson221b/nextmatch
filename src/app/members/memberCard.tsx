"use client"

import { differenceInYears } from "date-fns"
import Link from "next/link"
import { Card, CardFooter, Image } from "@nextui-org/react"
import LikeButton from "@/components/LikeButton"
import type { Member } from "@prisma/client"
import { PresenceDot } from "../../components/Presence"

type memberCardProps = {
  member: Member
  likeIds: string[]
}

/**
 * Used on /members page to display all members
 */
export default function MemberCard({ member, likeIds }: memberCardProps) {
  const age = differenceInYears(new Date(), member.dateOfBirth)
  const isLiked = likeIds.includes(member.userId)
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        isZoomed
        alt={`${member.name} image`}
        src={member.image || "/images/user.png"}
        width={300}
        className="aspect-square object-cover"
      />
      <div className="absolute top-2 left-2 z-10">
        <PresenceDot member={member} />
      </div>
      <div className="absolute top-3 right-3 z-10">
        <LikeButton isLiked={isLiked} targetUserId={member.userId} />
      </div>
      <CardFooter className="absolute bottom-0 bg-black z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {age}
          </span>
          <span className="text-sm"> {member.city}</span>
        </div>
      </CardFooter>
    </Card>
  )
}
