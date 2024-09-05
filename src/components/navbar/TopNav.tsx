import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"
import Link from "next/link"

import { GiMatchTip } from "react-icons/gi"
import { NavLink } from "./NavLink"
import { auth } from "@/auth"
import UserMenu from "./UserMenu"
import { getUserById } from "@/app/actions/authActions"
import type { User } from "@prisma/client"
import { FiltersWrapper } from "./Filters"

export const TopNav = async () => {
  const session = await auth()
  const latestUser: User | undefined | null =
    session?.user && (await getUserById(session.user.id as string))

    const memberLinks = [
      { href: "/members", label: "Members" },
      { href: "/lists", label: "Lists" },
      { href: "/messages", label: "Messages" },
    ]

    const adminLinks = [
      { href: "/admin/moderation", label: "Photo Moderation" },
    ]

    const links = session?.user.role === "ADMIN" ? adminLinks : memberLinks
    return (
      <>
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
            {session &&
              links.map(item => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
          </NavbarContent>
          <NavbarContent justify="end">
            {latestUser ? (
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
        <FiltersWrapper />
      </>
    )
}

export default TopNav
