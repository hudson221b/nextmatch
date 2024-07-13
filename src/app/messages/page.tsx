import React from "react"
import MessageSidebar from "./MessageSidebar"
import { getMessagesByContainer } from "../actions/messageActions"
import MessageTable from "./MessageTable"

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string }
}) => {
  const messages = searchParams.container
    ? await getMessagesByContainer(searchParams.container)
    : "Please select Inbox or Outbox to see messages"

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        {typeof messages === "string" ? (
          <div>{messages}</div>
        ) : (
          <MessageTable
            messages={messages}
            container={searchParams.container}
          />
        )}
      </div>
    </div>
  )
}
export default MessagesPage
