import CardInnerWrapper from "@/components/CardInnerWrapper"
import React from "react"
import ChatForm from "./ChatForm"
import { getMessageHistory } from "@/app/actions/messageActions"

export default async function ChatPage({
  params,
}: {
  params: { memberId: string }
}) {
  const { memberId } = params
  const chatHistory = await getMessageHistory(memberId)
  return (
    <CardInnerWrapper
      header="Chat"
      body={<div>{chatHistory[0].text}</div>}
      footer={<ChatForm />}
    />
  )
}
