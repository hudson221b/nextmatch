"use client"
import { CardWrapper } from "@/components/CardWrappers"
import { useRouter } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"

export default function RegisterSuccessPage() {
  const router = useRouter()

  return (
    <CardWrapper
      headerIcon={FaCheckCircle}
      headerText="You have successfully registered"
      subheaderText="Please verify your email address before logging in"
    />
  )
}
