'use client'
import { PresenceAvatar } from "@/components/Presence"
import TextWithTooltip from "@/components/TextWithTooltip"
import { Button } from "@nextui-org/react"
import React, { useCallback, useState } from "react"
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
export default function MesageTableCell({
  item,
  columnKey,
  isInbox,
}: Props) {
  const cellValue = item[columnKey]
  const ownerId = isInbox ? item.senderId : item.recipientId
  const imgSrc = isInbox ? item.senderImage : item.recipientImage
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const updateUnreadCount= useMessagesStore(state => state.updateUnreadCount)

  const handleDelete = useCallback(
    async () => {
      setIsDeleting(true)
      await deleteMessageById(item.id, isInbox)
      if (!item.dateRead && isInbox) {
        updateUnreadCount(-1)
      }
    },
    [item, updateUnreadCount, isInbox]
  )

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
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      )
  }
}
