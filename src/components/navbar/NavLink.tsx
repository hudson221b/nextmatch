"use client"
import { useMessagesStore } from "@/hooks/useStores"
import { NavbarItem } from "@nextui-org/react"
import Link from "next/link"
import { usePathname } from "next/navigation"


type Props = {
  href: string
  label: string
}

export const NavLink = ({ href, label }: Props) => {
  const pathName = usePathname()
  const unreadCount = useMessagesStore(state => state.unreadCount)
  return (
    <NavbarItem as={Link} href={href} isActive={pathName === href}>
      <span>{label}</span>
      {href === "/messages" && unreadCount > 0 && <span className="ml-1">({unreadCount})</span>}
    </NavbarItem>
  )
}
