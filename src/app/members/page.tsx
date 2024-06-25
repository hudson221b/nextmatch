import { Button } from "@nextui-org/react"
import React from "react"
import { getMembers } from "../actions/memberActions"
import MemberCard from "./memberCard"

const MembersPage: React.FC = async () => {
  const members = await getMembers()
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {members &&
          members.map(member => (
            <MemberCard member={member} key={`${member.id}-member-card`} />
          ))}
    </div>
  )
}
export default MembersPage
