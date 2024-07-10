import { cloudinary } from "@/lib/cloudinary"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { paramsToSign } = body
    const signature = cloudinary.v2.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET as string
    )
    return Response.json({ signature })
  } catch (error) {
    return Response.json({ error: "Error signing image" }, { status: 500 })
  }
}
