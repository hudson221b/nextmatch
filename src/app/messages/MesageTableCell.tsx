'use client'
import { PresenceAvatar } from "@/components/Presence"
import TextWithTooltip from "@/components/TextWithTooltip"
import { Button, Spinner } from "@nextui-org/react"
import React, { useCallback, useMemo, useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import type { MessageDTO } from "@/types"
import { useMessagesStore } from "@/hooks/useStores"
import { deleteMessageById } from "../actions/messageActions"

type Props = {
  item: MessageDTO // row data
  columnKey: keyof MessageDTO
  isInbox: boolean
}

/**
 * Cell renderer for MessageTable.
 *
 */
export default function MesageTableCell({ item, columnKey, isInbox }: Props) {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const cellValue = useMemo(() => item[columnKey], [item, columnKey])

  const ownerId = useMemo(
    () => (isInbox ? item.senderId : item.recipientId),
    [isInbox]
  )

  const imgSrc = useMemo(
    () => (isInbox ? item.senderImage : item.recipientImage),
    [isInbox]
  )

  const { updateUnreadCount, removeMessage } = useMessagesStore(state => ({
    updateUnreadCount: state.updateUnreadCount,
    removeMessage: state.remove,
  }))

  const handleDelete = useCallback(async () => {
    setIsDeleting(true)
    await deleteMessageById(item.id, isInbox)
    setTimeout(() => {
      removeMessage(item.id)
      setIsDeleting(false)
    }, 1000)

    if (!item.dateRead && isInbox) {
      updateUnreadCount(-1)
    }
  }, [item, updateUnreadCount, isInbox])

  switch (columnKey) {
    case "senderName":
    case "recipientName":
      return (
        <div className="flex items-center gap-2">
          <PresenceAvatar userId={ownerId!} src={imgSrc} />
          <span>{cellValue}</span>
        </div>
      )

    case "text":
      return <TextWithTooltip text={cellValue!} limit={15} showTooltip={true} />

    case "created":
      return cellValue

    default:
      return (
        <Button isIconOnly onClick={handleDelete}>
          {isDeleting ? (
            <Spinner />
          ) : (
            <AiFillDelete size={24} className="text-danger" />
          )}
        </Button>
      )
  }
}
