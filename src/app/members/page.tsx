import React from "react"
import { getMembers } from "../actions/memberActions"
import { fetchTargetLikeIds } from "../actions/likeActions"
import MemberCard from "./memberCard"

const MembersPage: React.FC = async () => {
  const members = await getMembers()
  const likeIds = await fetchTargetLikeIds()
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {members &&
        members.map(member => {
          const isLiked = likeIds.includes(member.userId)
          return (
            <MemberCard
              member={member}
              key={`${member.id}-member-card`}
              isLiked={isLiked}
            />
          )
        })}
    </div>
  )
}
export default MembersPage
