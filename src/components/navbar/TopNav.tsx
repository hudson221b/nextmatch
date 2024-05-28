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

export const TopNav = () => {
  return (
    <Navbar
      maxWidth="xl"
      className="bg-gradient-to-t from-purple-400 to-purple-700"
      classNames={{
        item: ["text-xl", "text-white", "upper"],
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
        <NavbarItem as={Link} href="/members">
          Matches
        </NavbarItem>
        <NavbarItem as={Link} href="/lists">
          Lists
        </NavbarItem>
        <NavbarItem as={Link} href="/messages">
          Messages
        </NavbarItem>
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
