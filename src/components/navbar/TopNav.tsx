import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import Link from "next/link"
import React from "react"
import { GiMatchTip } from "react-icons/gi"
import { NavLink } from "./NavLink"

export const TopNav = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-r from-purple-400 to-purple-700"
      classNames={{
        item: ["text-xl", "text-white", "uppercase", ""],
      }}
    >
      <NavbarBrand as={Link} href="/">
        <GiMatchTip size={40} />
        <div>
          <span>Next</span>
          <span>Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent>
        <NavLink href="/members" label="Members" />
        <NavLink href="/lists" label="Lists" />
        <NavLink href="/messages" label="Messages" />
      </NavbarContent>
      <NavbarContent>
        <Button variant="bordered" className="text-white">
          Login
        </Button>
        <Button variant="bordered" className="text-white">
          Register
        </Button>
      </NavbarContent>
    </Navbar>
  )
}

export default TopNav