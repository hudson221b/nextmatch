import React from "react"
import MessageSidebar from "./MessageSidebar"
import { getMessagesByContainer } from "../actions/messageActions"

const MessagesPage = async ({
  searchParams,
}: {
  searchParams: { container: string }
}) => {
  console.log("#####🚀🚀🚀 ~ searchParams👉👉", searchParams)

  const messages = searchParams.container
    ? await getMessagesByContainer(searchParams.container)
    : "Please select Inbox or Outbox to see messages"
  console.log("#####🚀🚀🚀 ~ messages👉👉", messages)

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        {typeof messages === "string" ? (
          <div>{messages}</div>
        ) : (
          messages[0].text
        )}
      </div>
    </div>
  )
}
export default MessagesPage
