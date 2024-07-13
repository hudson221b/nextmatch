"use client"
import type { MessageDTO } from "@/types"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Card,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { type Key } from "react"

export default function MessageTable({
  container,
  messages,
}: {
  container: string
  messages: MessageDTO[]
}) {
  const columns = [
    {
      key: container === "inbox" ? "senderName" : "recipientName",
      label: container === "inbox" ? "Sender" : "Recipient",
    },
    { key: "text", label: "Content" },
    {
      key: "created",
      label: container === "inbox" ? "Date sent" : "Date received",
    },
  ]
  const router = useRouter()
  const handleRowCLick = (key: Key) => {
    // key is message.id
    const message = messages.find(m => m.id === key)
    const ownerId =
      container === "inbox" ? message?.senderId : message?.recipientId
    const url = `/members/${ownerId}/chat`
    router.push(url)
  }

  return (
    <Card className="h-[80vh] overflow-auto">
      <Table
        aria-label="messages table"
        selectionMode="single"
        onRowAction={handleRowCLick}
        shadow="none"
      >
        <TableHeader columns={columns}>
          {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={messages}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>
                  <div
                    className={`${
                      !item.dateRead && container === "inbox"
                        ? "font-semibold"
                        : ""
                    }`}
                  >
                    {getKeyValue(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
