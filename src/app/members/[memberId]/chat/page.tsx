import CardInnerWrapper from "@/components/CardInnerWrapper"
import React from "react"
import ChatForm from "./ChatForm"
import { getMessageHistory } from "@/app/actions/messageActions"
import { getCurrentUserId } from "@/app/actions/authActions"
import ChatList from "./ChatList"
import { getChannelName } from "@/lib/util"

export default async function ChatPage({
  params,
}: {
  params: { memberId: string }
}) {
  // memberId is the recipientId
  const { memberId } = params
  const chatHistory = await getMessageHistory(memberId)
  const userId = await getCurrentUserId()

  const channelName = getChannelName(userId, memberId)

  const body = (
    <ChatList
      initialMessages={chatHistory}
      userId={userId}
      channelName={channelName}
    />
  )
  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
}
