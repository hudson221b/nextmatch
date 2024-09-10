"use client"
import type { Photo } from "@prisma/client"
import { Button, Card, CardBody, CardFooter, } from "@nextui-org/react"
import React, { useMemo, useState } from "react"
import { DeleteButton } from "./DeleteButton"
import { useRouter } from "next/navigation"
import { deleteImage, setMainImage } from "@/app/actions/memberActions"
import { toast } from "react-toastify"
import MemberPhoto from "./MemberPhoto"

type Props = {
  photo: Photo
  mainImageUrl: string | null | undefined
}

/**
 * Component for a single photo on members/edit/photos page
 */
export default function EditPhotoCard({ photo, mainImageUrl }: Props) {
  const [isStarButtonLoading, setIsStarButtonLoading] = useState(false)
  const router = useRouter()

  const isMainImage = useMemo(
    () => mainImageUrl === photo.url,
    [photo, mainImageUrl]
  )

  const setMain = async () => {
    setIsStarButtonLoading(true)
    await setMainImage(photo.url)
    setIsStarButtonLoading(false)
    router.refresh()
  }

  const handleDeleteButton = async () => {
    if (isMainImage) {
      toast.info("Cannot delete the main image")
    } else {
      await deleteImage(photo)
      router.refresh()
    }
  }

  return (
    <Card key={photo.id}>
      <CardBody>
        <MemberPhoto photo={photo} />
      </CardBody>
      <CardFooter className="flex justify-between">
        <Button
          onClick={setMain}
          className="font-semibold w-[85px]"
          variant={`${isMainImage ? "flat" : "bordered"}`}
          size="sm"
          isLoading={isStarButtonLoading}
          color={`${isMainImage ? "secondary" : "default"}`}
        >
          <span className="text-xs">
            {isMainImage ? "Main Image" : "Set main"}
          </span>
        </Button>

        {!isMainImage && (
          <DeleteButton
            showModal={true}
            modalText="Are you sure you want to delete this photo?"
            size={24}
            onDelete={handleDeleteButton}
          />
        )}
      </CardFooter>
    </Card>
  )
}
