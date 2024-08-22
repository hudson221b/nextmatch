import { usePresenceStore } from "@/hooks/useStores"
import { Avatar, Badge } from "@nextui-org/react"
import type { Member } from "@prisma/client"

import { GoDot, GoDotFill } from "react-icons/go"

type Props = {
  member: Member
}

export function PresenceDot({ member }: Props) {
  const onlineMembers = usePresenceStore(state => state.members)
  const isOnline = onlineMembers.indexOf(member.userId) !== -1

  if (!isOnline) return null

  return (
    <div className="relative">
      <GoDot size={36} className="fill-white" />
      <GoDotFill
        size={32}
        className="absolute top-[2px] left-[2px] fill-green-500 animate-pulse"
      />
    </div>
  )
}

type PresenceAvatarProps = {
  userId: string
  src?: string | null
}

export function PresenceAvatar({ userId, src }: PresenceAvatarProps) {
  const onlineMembers = usePresenceStore(state => state.members)
  const isOnline = onlineMembers.indexOf(userId) !== -1

  return (
    <Badge isInvisible={!isOnline} color="success" content="">
      <Avatar
        src={src || "/images/user.png"}
        alt="user image in messages table"
      />
    </Badge>
  )
}
