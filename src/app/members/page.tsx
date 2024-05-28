import { Button } from "@nextui-org/react"
import Link from "next/link"
import React from "react"

export const MembersPage = () => {
  return (
    <div>
      <div>This will be the MembersPage</div>
      <Button as={Link} href="/">
        Go back home
      </Button>
    </div>
  )
}
export default MembersPage
