"use client"
import type { Photo } from "@prisma/client"
import { Image } from "@nextui-org/react"
import { CldImage } from "next-cloudinary"

/**
 * Component for a single photo on members/edit/photos page
 */

import React, { useMemo, useState } from "react"
import { DeleteButton } from "./DeleteButton"
import { StarButton } from "./StarButton"
import { useRouter } from "next/navigation"
import { deleteImage, setMainImage } from "@/app/actions/memberActions"
import { toast } from "react-toastify"

type Props = {
  photo: Photo
  mainImageUrl: string | null | undefined
}

export default function MemberPhoto({ photo, mainImageUrl }: Props) {
  const [isStarButtonLoading, setIsStarButtonLoading] = useState(false)
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false)
  const router = useRouter()

  const isMainImage = useMemo(
    () => mainImageUrl === photo.url,
    [photo, mainImageUrl]
  )

  const handleStarButton = async () => {
    setIsStarButtonLoading(true)
    await setMainImage(photo.url)
    setIsStarButtonLoading(false)
    router.refresh()
  }

  const handleDeleteButton = async () => {
    if (isMainImage) {
      toast.info("Cannot delete main image")
    } else {
      setIsDeleteButtonLoading(true)
      await deleteImage(photo)
      router.refresh()
    }
  }

  return (
    <div key={photo.id} className="relative">
      {photo.publicId ? (
        <CldImage
          alt="member photo"
          src={photo.publicId}
          crop="fill"
          gravity="faces"
          width={220}
          height={220}
          className="rounded-2xl"
        />
      ) : (
        <Image
          src={photo?.url || "/images/user.png"}
          alt="member photo"
          width={300}
          height={300}
          className="object-cover aspect-square"
        />
      )}
      <div className="absolute top-3 left-3 z-20" onClick={handleStarButton}>
        <StarButton
          isSelected={mainImageUrl === photo.url}
          isLoading={isStarButtonLoading}
        />
      </div>
      <div className="absolute top-3 right-3 z-20" onClick={handleDeleteButton}>
        <DeleteButton isLoading={isDeleteButtonLoading} />
      </div>
    </div>
  )
}
