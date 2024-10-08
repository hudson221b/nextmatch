"use client"

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react"
import type { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Link from "next/link"


type UserMenuProps = {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user?.name || "user avatar"}
          size="sm"
          src={user?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="user actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-grow">
            Now logged in as {user?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          Edit Profile
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={async () => signOut({ redirect: true, callbackUrl: "/" })}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
