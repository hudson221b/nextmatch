"use client"

import { Chip } from "@nextui-org/react"
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
    { key: "outbox", label: "Outbox", icon: MdOutlineOutbox, chip: false },
  ]

  const handleClick = (key: string) => {
    const params = new URLSearchParams()
    params.set("container", key)
    router.replace(`${pathname}?${params}`)
    router.refresh()
  }

  return (
    <div className="flex flex-col shadow-md rounded-lg">
      {items.map(({ key, label, icon: Icon, chip }) => (
        <div
          key={key}
          className={`flex gap-2 p-3 items-center font-semibold ${
            key === selected
              ? "text-secondary"
              : "text-black hover:text-secondary/70"
          }`}
          onClick={() => handleClick(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip>5</Chip>}
          </div>
        </div>
      ))}
    </div>
  )
}
