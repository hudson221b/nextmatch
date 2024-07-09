import { getCurrentUserId } from "@/app/actions/authActions"
import { getMemberPhotosByUserId } from "@/app/actions/memberActions"
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react"
import React from "react"
import { StarButton } from "@/components/StarButton"
import { DeleteButton } from "@/components/DeleteButton"
import ImageUploadButton from "@/components/ImageUploadButton"
import MemberPhoto from "@/components/MemberPhoto"

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
        <div className="pt-5 pl-5">
          <ImageUploadButton />
        </div>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map(p => (
              <div key={p.id} className="relative">
                <MemberPhoto photo={p} />
                <div className="absolute top-3 left-3 z-20">
                  <StarButton isSelected={true} isLoading={false} />
                </div>
                <div className="absolute top-3 right-3 z-20">
                  <DeleteButton isLoading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  )
}
