import { getCurrentUserId } from "@/app/actions/authActions"
import {
  getMemberById,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions"
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react"
import React from "react"
import { StarButton } from "@/components/StarButton"
import { DeleteButton } from "@/components/DeleteButton"
import ImageUploadButton from "@/components/ImageUploadButton"
import MemberPhotos from "@/components/MemberPhotos"

export default async function EditPhotsPage() {
  const userId = await getCurrentUserId()
  const photos = await getMemberPhotosByUserId(userId)
  const member = await getMemberById(userId)
  const mainImageUrl = member?.image
  return (
    <>
      <CardHeader className="text-2xl font-semibold text-secondary">
        Edit Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="pt-5 pl-5">
          <ImageUploadButton />
        </div>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos?.length && (
            <MemberPhotos photos={photos} mainImageUrl={mainImageUrl} />
          )}
        </div>
      </CardBody>
    </>
  )
}
