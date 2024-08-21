import CardInnerWrapper from "@/components/CardInnerWrapper"
import React from "react"
import ChatForm from "./ChatForm"
import { getChatMessages } from "@/app/actions/messageActions"
import { getCurrentUserId } from "@/app/actions/authActions"
import { generateChatChannelName } from "@/lib/util"
import ChatMessages from "./ChatMessages"

export default async function ChatPage({
  params,
}: {
  params: { memberId: string }
}) {
  // memberId is the recipientId
  const { memberId } = params
  const initialMessages = await getChatMessages(memberId)
  const userId = await getCurrentUserId()

  const channelName = generateChatChannelName(userId, memberId)

  const body = (
    <div className="overflow-y-auto w-full h-full overflow-x-hidden">
      <ChatMessages
        initialMessages={initialMessages}
        userId={userId}
        channelName={channelName}
      />
    </div>
  )

  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
}
