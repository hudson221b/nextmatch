import { getMemberPhotosByUserId } from "@/app/actions/memberActions"
import CardInnerWrapper from "@/components/CardInnerWrapper"
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react"
import React from "react"

export default async function PhotosPage({
  params,
}: {
  params: { memberId: string }
}) {
  const photos = await getMemberPhotosByUserId(params.memberId)

  const body = photos
    ? photos.map(photo => (
        <Image
          key={photo.id}
          width={300}
          height={300}
          className="object-cover aspect-square"
          src={photo.url}
          alt="member photos"
        />
      ))
    : null

  return (
    <CardInnerWrapper
      header="Photos"
      body={body}
      classNames={{ body: "grid grid-cols-5 gap-3" }}
    />
  )
}
