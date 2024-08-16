import { PresenceAvatar } from "@/components/Presence"
import TextWithTooltip from "@/components/TextWithTooltip"
import { Button } from "@nextui-org/react"
import React from "react"
import { AiFillDelete } from "react-icons/ai"
import type { MessageDTO } from "@/types"

type Props = {
  item: MessageDTO // row data
  columnKey: keyof MessageDTO
  isInbox: boolean
  onDelete: () => Promise<void> // callback for the delete button
}

/**
 * Cell renderer for MessageTable. 
 * 
 */
export default function MesageTableCell({
  item,
  columnKey,
  isInbox,
  onDelete,
}: Props) {
  const cellValue = item[columnKey]
  const ownerId = isInbox ? item.senderId : item.recipientId
  const imgSrc = isInbox ? item.senderImage : item.recipientImage

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
        <Button isIconOnly onClick={onDelete}>
          <AiFillDelete size={24} className="text-danger" />
        </Button>
      )
  }
}
