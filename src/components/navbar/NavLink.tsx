import { NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import React from "react"

type Props = {
  href: string
  label: string
}

export const NavLink = ({ href, label }: Props) => {
  return (
    <NavbarItem as={Link} href={href} isActive={true}>
      {label}
    </NavbarItem>
  )
}
