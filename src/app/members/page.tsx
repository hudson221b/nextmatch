import { Button } from "@nextui-org/react"
import React from "react"
import { getMembers } from "../actions/memberActions"

const MembersPage: React.FC = async () => {
  const members = await getMembers()
  return (
    <div>
      <ul>
        {members &&
          members.map(member => <li key={member.id}>{member.name}</li>)}
      </ul>
    </div>
  )
}
export default MembersPage
