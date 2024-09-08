"use client"
import type { Photo } from "@prisma/client"
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react"
import { CldImage } from "next-cloudinary"
import React, { useMemo, useState } from "react"
import { DeleteButton } from "./DeleteButton"
import { useRouter } from "next/navigation"
import { deleteImage, setMainImage } from "@/app/actions/memberActions"
import { toast } from "react-toastify"

type Props = {
  photo: Photo
  mainImageUrl: string | null | undefined
}

/**
 * Component for a single photo on members/edit/photos page
 */
export default function MemberPhoto({ photo, mainImageUrl }: Props) {
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
        {photo.publicId ? (
          <CldImage
            alt="member photo"
            src={photo.publicId}
            crop="fill"
            gravity="faces"
            width={220}
            height={220}
            className="rounded-[14px]"
          />
        ) : (
          <Image
            src={photo?.url || "/images/user.png"}
            alt="member photo"
            width={220} // must be the same as CldImage width!
            className="object-cover aspect-square"
          />
        )}
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
