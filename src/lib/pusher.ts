// client library
import PusherClient from "pusher-js"

// server library
import PusherServer from "pusher"

declare global {
  var pusherClient: PusherClient | undefined
  var pusherServer: PusherServer | undefined
}

if (!global.pusherClient) {
  global.pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      forceTLS: true,
      channelAuthorization: {
        endpoint: "/api/pusher-auth",
        transport: "ajax",
      },
    }
  )
}

if (!global.pusherServer) {
  global.pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    useTLS: true,
  })
}

export const pusherClient = global.pusherClient
export const pusherServer = global.pusherServer
