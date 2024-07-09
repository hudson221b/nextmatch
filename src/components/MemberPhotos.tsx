"use client"
import type { Photo } from "@prisma/client"
import { Image } from "@nextui-org/react"
import { CldImage } from "next-cloudinary"

/**
 * Component for a single photo on members/edit/photos page
 */

import React, { useState } from "react"
import { DeleteButton } from "./DeleteButton"
import { StarButton } from "./StarButton"
import { useRouter } from "next/navigation"
import { setMainImage } from "@/app/actions/memberActions"

type Props = {
  photos: Photo[]
  mainImageUrl: string | null | undefined
}

export default function MemberPhotos({ photos, mainImageUrl }: Props) {
  const [isStarButtonLoading, setIsStarButtonLoading] = useState(false)
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false)
  const router = useRouter()

  const handleStarButtonClick = async (url: string) => {
    // set isLoading to true
    setIsStarButtonLoading(true)
    // set this photo as main image (use server action)
    await setMainImage(url)
    // set isLoading to false
    setIsStarButtonLoading(false)
    router.refresh()
  }

  return photos.map(photo => (
    <div key={photo.id} className="relative">
      {/* <MemberPhoto photo={p} /> */}
      {photo?.publicId ? (
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
      <div
        className="absolute top-3 left-3 z-20"
        onClick={async () => await handleStarButtonClick(photo.url)}
      >
        <StarButton
          isSelected={mainImageUrl === photo.url}
          isLoading={isStarButtonLoading}
        />
      </div>
      <div className="absolute top-3 right-3 z-20">
        <DeleteButton isLoading={isDeleteButtonLoading} />
      </div>
    </div>
  ))
  return
}
