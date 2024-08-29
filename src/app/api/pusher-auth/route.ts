import { auth } from "@/auth"
import { pusherServer } from "@/lib/pusher"

export async function POST(req: Request) {
  try {
    // check if a user has logged in
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return Response.json({ message: "Not authorized", status: 403 })
    }

    // parse request body
    let body
    const contentType = req.headers.get("content-type")
    if (contentType?.includes("application/json")) {
      body = await req.json()
    } else if (contentType?.includes("application/x-www-form-urlencoded")) {
      const text = await req.text()
      body = Object.fromEntries(new URLSearchParams(text))
    } else {
      body = await req.text() 
    }

    // auth and send response
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

    return Response.json(authResponse, { status: 200 })
  } catch (error) {
    console.log("Presence channel authorization error:", error)
    return Response.json({
      message: "Error during authorizing Pusher request",
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    })
  }
}
