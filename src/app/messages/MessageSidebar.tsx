"use client"

import { useMessagesStore } from "@/hooks/useStores"
import { Chip } from "@nextui-org/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { GoInbox } from "react-icons/go"
import { MdOutlineOutbox } from "react-icons/md"

export default function MessageSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const unreadCount = useMessagesStore(state => state.unreadCount)
  const [selected, setSelected] = useState<string>(
    searchParams.get("container") || "inbox"
  )
  useEffect(() => {
    setSelected(searchParams.get("container") || "inbox")
  }, [searchParams])

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
    setSelected(key)
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
          className={`flex gap-2 p-3 items-center ${
            key === selected
              ? "font-bold text-secondary bg-secondary-100"
              : "text-black"
          }`}
          onClick={() => handleClick(key)}
        >
          <Icon size={24} />
          <div className="flex justify-between flex-grow">
            <span>{label}</span>
            {chip && <Chip color="secondary">{unreadCount}</Chip>}
          </div>
        </div>
      ))}
    </div>
  )
}
