"use client"
import type { Photo } from "@prisma/client"
import { Image } from "@nextui-org/react"
import { CldImage } from "next-cloudinary"

/**
 * Component for member photos on members/edit/photos page
 */

import React from "react"

type Props = {
  photo: Photo | null
}

export default function MemberPhoto({ photo }: Props) {
  return photo?.publicId ? (
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
  )

}
