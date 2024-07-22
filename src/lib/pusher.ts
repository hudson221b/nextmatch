import Pusher from "pusher"

declare global {
  pusherClient: PusherClient | undefined
  pusherServer: PusherServer | undefined
}

if (!pusherClient) {
  global.pusherClient = new Pusher()
}
