"use client"
import type { MessageDTO } from "@/types"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Button,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useCallback, type Key } from "react"
import { AiFillDelete } from "react-icons/ai"
import { deleteMessageById } from "../actions/messageActions"
import TextWithTooltip from "@/components/TextWithTooltip"
import { PresenceAvatar } from "@/components/Presence"
import MesageTableCell from "./MesageTableCell"

export default function MessageTable({
  container,
  messages,
}: {
  container: string
  messages: MessageDTO[]
}) {
  const isInbox = container === "inbox"
  const columns = [
    {
      key: isInbox ? "senderName" : "recipientName",
      label: isInbox ? "Sender" : "Recipient",
    },
    { key: "text", label: "Content" },
    {
      key: "created",
      label: isInbox ? "Date sent" : "Date received",
    },
    { key: "action", label: "Delete" },
  ]
  const router = useRouter()

  const handleRowCLick = (key: Key) => {
    // key is message.id
    const message = messages.find(m => m.id === key)
    const ownerId = isInbox ? message?.senderId : message?.recipientId
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
                <TableCell
                  className={`${!item.dateRead && isInbox && "font-semibold"}`}
                >
                  <MesageTableCell
                    item={item}
                    columnKey={columnKey as keyof MessageDTO}
                    isInbox={isInbox}
                    onDelete={async () => {
                      await deleteMessageById(item.id, isInbox)
                      router.refresh()
                    }}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
