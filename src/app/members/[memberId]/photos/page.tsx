import { getMemberPhotosByUserId } from "@/app/actions/memberActions"
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react"
import React from "react"

export default async function PhotosPage({
  params,
}: {
  params: { memberId: string }
}) {
  const photos = await getMemberPhotosByUserId(params.memberId)
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Photos
      </CardHeader>
      <Divider />
      <CardBody className="grid grid-cols-5 gap-3">
        {photos &&
          photos.map(photo => (
            <Image
              key={photo.id}
              width={300}
              height={300}
              className="object-cover aspect-square"
              src={photo.url}
              alt="member photos"
            />
          ))}
      </CardBody>
    </>
  )
}
