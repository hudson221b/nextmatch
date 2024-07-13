"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { GoInbox } from "react-icons/go"
import { MdOutlineOutbox } from "react-icons/md"

export default function MessageSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const selected = searchParams.get("container")
  const items = [
    {
      key: "inbox",
      label: "Inbox",
      icon: GoInbox,
      chip: true,
    },
    { key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: true },
  ]

  const handleClick = (key: string) => {
    const params = new URLSearchParams()
    params.set("container", key)
    router.replace(`${pathname}?${params}`)
  }
  return (
    <div>
      {items.map(item => (
        <div
          key={item.key}
          className={`flex items-center ${
            item.key === selected
              ? "text-secondary"
              : "text-black hover:text-secondary/70"
          }`}
          onClick={() => handleClick(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
