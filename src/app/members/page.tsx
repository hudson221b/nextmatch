import React from "react"
import { getMembers } from "../actions/memberActions"
import {
  fetchLikesForCurrentUser,
} from "../actions/likeActions"
import MemberCard from "./memberCard"
import PaginationComponent from "@/components/PaginationComponent"

const MembersPage: React.FC = async () => {
  const members = await getMembers()

  // members that the current user has liked
  const likeIds = (await fetchLikesForCurrentUser("source", "id")) as string[]
  return (
    <>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map(member => {
            return (
              <MemberCard
                member={member}
                key={`${member.id}-member-card`}
                likeIds={likeIds}
              />
            )
          })}
      </div>
      <PaginationComponent />
    </>
  )
}
export default MembersPage
