// client library
import PusherClient from "pusher-js"

// server library
import PusherServer from "pusher"

declare global {
  var pusherClient: PusherClient | undefined
  var pusherServer: PusherServer | undefined
}

if (!global.pusherClient) {
  global.pusherClient = new PusherClient(process.env.PUSHER_APP_KEY!, {
    cluster: process.env.PUSHER_CLUSTER!,
    forceTLS: true,
  })
}

if (!global.pusherServer) {
  global.pusherServer = new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
  })
}

export const pusherClient = global.pusherClient
export const pusherServer = global.pusherServer
