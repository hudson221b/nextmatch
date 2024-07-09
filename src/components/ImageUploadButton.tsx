"use client"
import React from "react"
import { CldUploadButton } from "next-cloudinary"
import { HiPhoto } from "react-icons/hi2"
import { updateMemberPhotos } from "@/app/actions/memberActions"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ImageUploadButton() {
  const router = useRouter()

  return (
    <CldUploadButton
      className="flex items-center gap-2 text-white bg-secondary rounded-lg py-2 px-4 hover:bg-secondary/70"
      signatureEndpoint="/api/sign-image"
      uploadPreset="project_demo"
      onSuccess={async results => {

        if (results && typeof results.info === "object") {
          await updateMemberPhotos(results.info.url, results.info.public_id)
        }
        router.refresh()
        toast.success("Image upload successful")
      }}
      options={{ maxFiles: 1 }}
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  )
}
