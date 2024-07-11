import { getCurrentUserId } from "@/app/actions/authActions"
import {
  getMemberById,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions"
import { CardHeader, Divider, CardBody } from "@nextui-org/react"
import React from "react"
import ImageUploadButton from "@/components/ImageUploadButton"
import MemberPhoto from "@/components/MemberPhotos"
import CardInnerWrapper from "@/components/CardInnerWrapper"

export default async function EditPhotsPage() {
  const userId = await getCurrentUserId()
  const photos = await getMemberPhotosByUserId(userId)
  const member = await getMemberById(userId)
  const mainImageUrl = member?.image

  const body = (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos?.length &&
        photos.map(photo => (
          <MemberPhoto
            photo={photo}
            mainImageUrl={mainImageUrl}
            key={photo.id}
          />
        ))}
    </div>
  )
  return (
    <CardInnerWrapper
      header={
        <>
          <div className="text-2xl font-semibold text-secondary">
            Edit Photos
          </div>
          <ImageUploadButton />
        </>
      }
      body={body}
      classNames={{ header: "flex justify-between items-center" }}
    />
  )
}
