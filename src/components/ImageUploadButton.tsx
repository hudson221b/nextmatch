"use client"
import { CldUploadButton } from "next-cloudinary"
import { HiPhoto } from "react-icons/hi2"
import React from "react"

export default function ImageUploadButton() {
  return (
    <CldUploadButton
      className="flex items-center gap-2 text-white bg-secondary rounded-lg py-2 px-4 hover:bg-secondary/70"
      signatureEndpoint="/api/sign-image-upload"
      uploadPreset="project_demo"
      onSuccess={() => console.log("image upload successful")}
      options={{ maxFiles: 1 }}
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  )
}
