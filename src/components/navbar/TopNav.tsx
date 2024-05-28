import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import React from "react"
import { GiMatchTip } from "react-icons/gi"

export const TopNav = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <GiMatchTip size={40} />
        <div>
          <span>Next</span>
          <span>Match</span>
        </div>
      </NavbarBrand>
      <NavbarContent>Center</NavbarContent>
      <NavbarContent>Right</NavbarContent>
    </Navbar>
  )
}

export default TopNav
