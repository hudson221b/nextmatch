"use client"
import React from "react"
import { Tabs, Tab} from "@nextui-org/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import MemberCard from "../members/memberCard"
import type { Member } from "@prisma/client"

type ListTabProps = {
  members: Member[]
  likeIds: string[]
}

export const ListTabs: React.FC = ({ members, likeIds }: ListTabProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

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
    const params = new URLSearchParams()
    params.set("type", key.toString())
    router.replace(`${pathName}?${params}`)
  }

  return (
    <div>
      <Tabs
        aria-label="list member tabs"
        items={items}
        onSelectionChange={onTabSelection}
        color="secondary"
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            {members.length
              ? members.map(m => <li key={m.userId}>{m.userId}</li>)
              : "No members meet the filter"}
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
