import { Tooltip } from "@nextui-org/react"


type Props = {
  text: string
  limit: number
  showTooltip?: boolean
}
/**
 * @params limit the number of charaters to keep
 */
export default function TextWithTooltip({ text, limit, showTooltip }: Props) {
  if (limit >= text.length) return <span>{text}</span>

  return showTooltip ? (
    <Tooltip
      content={
        <div
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            wordWrap: "break-word",
            overflow: "scroll",
            paddingTop: "5px",
          }}
        >
          {text}
        </div>
      }
    >
      <span>{text.slice(0, limit) + "..."}</span>
    </Tooltip>
  ) : (
    <span>{text.slice(0, limit) + "..."}</span>
  )
}
