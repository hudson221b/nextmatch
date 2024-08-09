import { auth } from "@/auth"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request) {
  try {
    const session = await auth()
    const userId = session?.user?.id
    
    if (!userId) {
      return Response.json({ message: "Not authorized", status: 403 })
    }
    const body = await req.json()
    const socketId = body.socket_id
    const channel = body.channel_name
    const presenceData = {
      user_id: userId,
    }
    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      presenceData
    )

    return Response.json(authResponse)
  } catch (error) {}
}
