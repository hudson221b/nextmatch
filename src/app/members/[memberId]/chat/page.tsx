import CardInnerWrapper from "@/components/CardInnerWrapper"
import React from "react"
import ChatForm from "./ChatForm"
import { getMessageHistory } from "@/app/actions/messageActions"
import MessageBox from "./MessageBox"
import { getCurrentUserId } from "@/app/actions/authActions"

export default async function ChatPage({
  params,
}: {
  params: { memberId: string }
}) {
  // memberId is the recipientId
  const { memberId } = params
  const chatHistory = await getMessageHistory(memberId)
  const userId = await getCurrentUserId()

  const body = (
    <div className="grid grid-cols-1">
      {chatHistory.map(message => (
        <MessageBox message={message} userId={userId} key={message.id} />
      ))}{" "}
    </div>
  )
  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
}
