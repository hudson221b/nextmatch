import LikeButton from "@/components/LikeButton"
import { Card, CardFooter, Image } from "@nextui-org/react"
import type { Member } from "@prisma/client"
import { differenceInYears } from "date-fns"
import Link from "next/link"
import React from "react"
import { toggleLike } from "../actions/likeActions"

type memberCardProps = {
  member: Member
}

/**
 * Used on /members page to display all members
 */
export default function MemberCard({ member }: memberCardProps) {
  const age = differenceInYears(new Date(), member.dateOfBirth)
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`}>
      <Image
        isZoomed
        alt={`${member.name} image`}
        src={member.image || "/images/user.png"}
        width={300}
        className="aspect-square object-cover"
      />
      <div className="absolute top-[10px] right-[10px] z-10">
        <LikeButton isLiked={false} targetUserId={member.userId} />
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
