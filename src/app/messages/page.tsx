import MessageSidebar from "./MessageSidebar"
import { getMessagesByContainer } from "../actions/messageActions"
import MessageTable from "./MessageTable"

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string }
}) => {
  const isOutbox = searchParams.container === "outbox"
  const { messages, nextCursor } = isOutbox
    ? await getMessagesByContainer("outbox")
    : await getMessagesByContainer("inbox")

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        <MessageTable
          initialMessages={messages}
          container={isOutbox ? "outbox" : "inbox"}
          cursor={nextCursor}
        />
      </div>
    </div>
  )
}
export default MessagesPage
