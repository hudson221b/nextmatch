"use client"
import { CardWrapper } from "@/components/CardWrappers"
import { FaCheckCircle } from "react-icons/fa"

export default function RegisterSuccessPage() {

  return (
    <CardWrapper
      headerIcon={FaCheckCircle}
      headerText="You have successfully registered"
      subheaderText="Please verify your email address before logging in"
    />
  )
}
