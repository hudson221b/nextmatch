"use client"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react"
import type { Member } from "@prisma/client"
import { differenceInYears } from "date-fns"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type memberSidebarProps = {
  member: Member
  navLinks: { name: string; href: string }[]
}

/**
 * Shared left sidebar for individual member page
 */
export default function MemberSidebar({
  member,
  navLinks,
}: memberSidebarProps) {
  const pathName = usePathname()

  return (
    <Card className="h-[80vh] w-full items-center">
      <Image
        src={member.image || "/images/user.png"}
        alt="member-image-sidebar"
        width={200}
        height={200}
        className="rounded-full mt-6 object-cover aspect-square"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {`${member.name}, ${differenceInYears(
              new Date(),
              member.dateOfBirth
            )}`}
          </div>
          <div className="text-sm text-neutral-500">
            {`${member.city}, ${member.country}`}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map(link => (
            <Link
              href={link.href}
              key={link.name}
              className={`block rounded ${
                pathName === link.href
                  ? "text-secondary"
                  : "hover:text-secondary/50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>

      <CardFooter>
        <Button
          as={Link}
          href="/members"
          variant="bordered"
          color="secondary"
          fullWidth
        >
          Go back to Members
        </Button>
      </CardFooter>
    </Card>
  )
}
