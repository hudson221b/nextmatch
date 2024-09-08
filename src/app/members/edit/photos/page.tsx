import { getCurrentUserId } from "@/app/actions/authActions"
import {
  getMemberById,
  getMemberPhotosByUserId,
} from "@/app/actions/memberActions"

import ImageUploadButton from "@/components/ImageUploadButton"
import EditPhotoCard from "@/components/EditPhotoCard"
import { CardInnerWrapper } from "@/components/CardWrappers"

export default async function EditPhotsPage() {
  const userId = await getCurrentUserId()
  const photos = await getMemberPhotosByUserId(userId)
  const member = await getMemberById(userId)
  const mainImageUrl = member?.image

  const body = (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos?.length &&
        photos.map(photo => (
          <EditPhotoCard
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
        <div className="w-full flex justify-between items-center">
          <div className="text-2xl font-semibold text-secondary">
            Edit Photos
          </div>
          <ImageUploadButton />
        </div>
      }
      body={body}
      classNames={{ header: "pl-8" }}
    />
  )
}
