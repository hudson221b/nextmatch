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
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useMemo, type Key } from "react"
import { deleteMessageById } from "../actions/messageActions"
import MesageTableCell from "./MesageTableCell"
import { useMessagesStore } from "@/hooks/useStores"

export default function MessageTable({
  container,
  initialMessages, // messages fetched from database
}: {
  container: string
  initialMessages: MessageDTO[]
}) {
  const router = useRouter()
  const isInbox = useMemo(() => container === "inbox", [container])

  const { set, messages } = useMessagesStore()

  useEffect(() => {
    set(initialMessages)

    return () => {
      set([])
    }
  }, [initialMessages, set])

  const columns = useMemo(
    () => [
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
    ],
    [isInbox]
  )

  const handleRowCLick = useCallback(
    (key: Key) => {
      // key is message.id
      const message = messages.find(m => m.id === key)
      const ownerId = isInbox ? message?.senderId : message?.recipientId
      const url = `/members/${ownerId}/chat`
      router.push(url)
    },
    [isInbox, messages, router]
  )

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
