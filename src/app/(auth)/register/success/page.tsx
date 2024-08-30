"use client"
import { CardWrapper } from "@/components/CardWrappers"
import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"

export default function RegisterSuccessPage() {
  const router = useRouter()

  return (
    <CardWrapper
      headerIcon={FaCheckCircle}
      headerText="You have successfully registered"
      subheaderText="You can now login to the app"
      footer={
        <Button
          variant="bordered"
          color="secondary"
          className="w-full text-secondary text-medium"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      }
    />
  )
}
