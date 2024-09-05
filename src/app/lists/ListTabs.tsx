"use client"
import React, { useMemo, useTransition } from "react"
import { Tabs, Tab, Spinner } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import MemberCard from "../members/memberCard"
import type { Member } from "@prisma/client"

type ListTabProps = {
  members: Member[]
  likeIds: string[]
}

export function ListTabs({ members, likeIds }: ListTabProps) {
  const pathName = usePathname()
  const router = useRouter()
  const [isTransitioning, startTransition] = useTransition()

  const items = [
    {
      id: "source",
      label: "Members I Like",
    },
    {
      id: "target",
      label: "Members that like me",
    },
    {
      id: "mutual",
      label: "Mutual likes",
    },
  ]

  const onTabSelection = async (key: React.Key) => {
    startTransition(() => {
      const params = new URLSearchParams()
      params.set("type", key.toString())
      router.replace(`${pathName}?${params}`)
    })
  }

  const tabContent = useMemo(() => {
    return (
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {members.length
          ? members.map(m => (
              <MemberCard key={m.userId} member={m} likeIds={likeIds} />
            ))
          : "No members meet the filter"}
      </div>
    )
  }, [members, likeIds])

  return (
    <>
      <div className="flex gap-3">
        <Tabs
          aria-label="list member tabs"
          onSelectionChange={onTabSelection}
          color="secondary"
          defaultSelectedKey="source"
        >
          {items.map(item => (
            <Tab key={item.id} title={item.label} />
          ))}
        </Tabs>
        {isTransitioning && (
          <Spinner color="secondary" className="self-center" />
        )}
      </div>
      {tabContent}
    </>
  )
}
