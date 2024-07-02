"use client"
import React from "react"
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function ListTabs() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  console.log("#####🚀🚀🚀 ~ file: ListTabs.tsx:10 ~ ListTabs ~ searchParams➡️➡️➡️", searchParams)

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

  const onTabSelection = (key: React.Key) => {
    const params = new URLSearchParams()
      params.set("type", key.toString())
      router.replace(`${pathname}?${params}`)
  }
  return (
    <div>
      <Tabs
        aria-label="list member tabs"
        items={items}
        // selectedKey={pathname}
        // defaultSelectedKey="source"
        onSelectionChange={onTabSelection}
      >
        {item => (
          <Tab key={item.id} title={item.label}>
            {/* member cards based on filter dummy content */}
            <div>dummy content</div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
