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
  CardFooter,
  Button,
  CardBody,
} from "@nextui-org/react"
import { useRouter } from "next/navigation"
import React, { useCallback, useEffect, useMemo, useRef, type Key } from "react"
import MesageTableCell from "./MesageTableCell"
import { useMessagesStore } from "@/hooks/useStores"
import { getMessagesByContainer } from "../actions/messageActions"
import styles from "../NextUIOverride.module.css"

export default function MessageTable({
  container,
  initialMessages, // messages fetched from database
  cursor,
}: {
  container: "inbox" | "outbox"
  initialMessages: MessageDTO[]
  cursor: string | undefined
}) {
  const cursorRef = useRef(cursor)
  const router = useRouter()
  const isInbox = useMemo(() => container === "inbox", [container])

  const { set, messages, resetMessages } = useMessagesStore()

  useEffect(() => {
    set(initialMessages)
    cursorRef.current = cursor

    return () => {
      resetMessages()
    }
  }, [initialMessages, resetMessages, set, cursor])

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

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      const { messages, nextCursor } = await getMessagesByContainer(
        container,
        cursorRef.current
      )
      cursorRef.current = nextCursor

      set(messages)
    }
  }, [container, set])

  return (
    <Card
      className="h-[80vh]"
      classNames={{
        footer: styles.footer,
      }}
    >
      <CardBody className="overflow-auto">
        <Table
          aria-label="messages table"
          selectionMode="single"
          onRowAction={handleRowCLick}
          shadow="none"
        >
          <TableHeader columns={columns}>
            {column => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={messages}>
            {item => (
              <TableRow key={item.id}>
                {columnKey => (
                  <TableCell
                    className={`${
                      !item.dateRead && isInbox && "font-semibold"
                    }`}
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
      </CardBody>
      <CardFooter className="justify-end">
        <Button
          color="secondary"
          isDisabled={!cursorRef.current}
          onClick={loadMore}
          className="mr-8"
        >
          {cursorRef.current ? "Load more" : "No more messages"}
        </Button>
      </CardFooter>
    </Card>
  )
}
