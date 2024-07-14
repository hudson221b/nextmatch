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
  Avatar,
  Button,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useCallback, type Key } from "react"
import { AiFillDelete } from "react-icons/ai"
import { deleteMessageById } from "../actions/messageActions"
import TextWithTooltip from "@/components/TextWithTooltip"
import textWithTooltip from "@/components/TextWithTooltip"

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

  // customize cells
  const renderCell = useCallback(
    (item: MessageDTO, columnKey: keyof MessageDTO) => {
      const cellValue = item[columnKey]

      switch (columnKey) {
        case "senderName":
        case "recipientName":
          return (
            <div className="flex items-center gap-2">
              <Avatar
                src={
                  (isInbox ? item.senderImage : item.recipientImage) ||
                  "/images/user.png"
                }
                alt="user image in messages table"
              />
              <span>{cellValue}</span>
            </div>
          )

        case "text":
          return (
            <TextWithTooltip text={cellValue!} limit={15} showTooltip={true} />
          )

        case "created":
          return cellValue

        default:
          return (
            <Button
              isIconOnly
              onClick={async () => {
                await deleteMessageById(item.id, isInbox)
                router.refresh()
              }}
            >
              <AiFillDelete size={24} className="text-danger" />
            </Button>
          )
      }
    },

    [isInbox]
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
                  {renderCell(item, columnKey as keyof MessageDTO)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
