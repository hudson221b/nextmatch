import { getCurrentUserId } from "@/app/actions/authActions"
import { getMemberPhotosByUserId } from "@/app/actions/memberActions"
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react"
import React from "react"

export default async function EditPhotsPage() {
  const userId = await getCurrentUserId()
  const photos = await getMemberPhotosByUserId(userId)
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map(p => (
              <Image key={p.id} src={p.url} alt="member image" width={220} height={220}/>
            ))}
        </div>
      </CardBody>
    </>
  )
}
