"use client"
import React, { useTransition } from "react"
import { Tabs, Tab } from "@nextui-org/react"
import { usePathname, useRouter } from "next/navigation"
import MemberCard from "../members/memberCard"
import type { Member } from "@prisma/client"
import Loading from "@/components/Loading"

type ListTabProps = {
  members: Member[]
  likeIds: string[]
}

export function ListTabs({ members, likeIds }: ListTabProps) {
  const pathName = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  let items = [
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

  return (
    <Tabs
      aria-label="list member tabs"
      items={items}
      onSelectionChange={onTabSelection}
      color="secondary"
      defaultSelectedKey="source"
    >
      {item => (
        <Tab key={item.id} title={item.label}>
          {isPending ? (
            <Loading />
          ) : members.length ? (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
              {members.map(m => (
                <MemberCard key={m.userId} member={m} likeIds={likeIds} />
              ))}
            </div>
          ) : (
            "No members meet the filter"
          )}
        </Tab>
      )}
    </Tabs>
  )
}
