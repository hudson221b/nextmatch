"use client"
import React from "react"
import { CldUploadButton } from "next-cloudinary"
import { HiPhoto } from "react-icons/hi2"

export default function ImageUploadButton() {
  return (
    <CldUploadButton
      className="flex items-center gap-2 text-white bg-secondary rounded-lg py-2 px-4 hover:bg-secondary/70"
      signatureEndpoint="/api/sign-image"
      uploadPreset="project_demo"
      onSuccess={results =>
        console.log("image upload successful, results: ", results)
      }
      options={{ maxFiles: 1 }}
    >
      <HiPhoto size={28} />
      Upload new image
    </CldUploadButton>
  )
}
