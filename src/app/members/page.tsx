import { Button } from "@nextui-org/react"
import Link from "next/link"
import React from "react"

const MembersPage: React.FC = () => {
  return (
    <div>
      <div>This will be the Members Page</div>
      <Button as={Link} href="/">
        Go back home
      </Button>
    </div>
  )
}
export default MembersPage
