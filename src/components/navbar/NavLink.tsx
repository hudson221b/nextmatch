"use client"
import { NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type Props = {
  href: string
  label: string
}

export const NavLink = ({ href, label }: Props) => {
  const pathName = usePathname()
  return (
    <NavbarItem as={Link} href={href} isActive={pathName === href}>
      {label}
    </NavbarItem>
  )
}
