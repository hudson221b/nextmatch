import { usePresenceStore } from "@/hooks/useStores"
import type { Member } from "@prisma/client"
import React from "react"
import { GoDot, GoDotFill } from "react-icons/go"

type Props = {
  member: Member
}

export default function PresenceDot({ member }: Props) {
  const onlineMembers = usePresenceStore(state => state.members)
  const isOnline = onlineMembers.indexOf(member.userId) !== -1
  return (
    <div className="relative">
      <GoDot size={36} className="fill-white" />
      {isOnline && (
        <GoDotFill
          size={32}
          className="absolute top-[2px] left-[2px] fill-green-500"
        />
      )}
    </div>
  )
}
