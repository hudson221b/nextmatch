import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"
import React from "react"
import { GiMatchTip } from "react-icons/gi"
import { NavLink } from "./NavLink"
import { auth } from "@/auth"
import UserMenu from "./UserMenu"
import { getUserById } from "@/app/actions/authActions"

export const TopNav = async () => {
  const session = await auth()
  const latestUser = {
    name: "",
    email: "",
    image: "",
    id: "",
  }
  if (session?.user) {
    const user = await getUserById(session.user.id as string)
    if (user) {
      latestUser.name = user.name as string
      latestUser.email = user.email as string
      latestUser.image = user.image as string
      latestUser.id = user.id as string
    }
  }

  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: [
          "text-xl",
          "text-white",
          "uppercase",
          "data-[active=true]:text-yellow-200",
        ],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} className="text-gray-200" />
        <div className="font-bold text-3xl">
          <span className="text-gray-900">Next</span>
          <span className="text-gray-200">Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent>
        <NavLink href="/members" label="Members" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent justify="end">
        {session?.user ? (
          <UserMenu user={latestUser} />
        ) : (
          <>
            <Button
              variant="bordered"
              className="text-white"
              as={Link}
              href="/login"
            >
              Login
            </Button>
            <Button
              variant="bordered"
              className="text-white"
              as={Link}
              href="/register"
            >
              Register
            </Button>
          </>
        )}
      </NavbarContent>
    </Navbar>
  )
}

export default TopNav
