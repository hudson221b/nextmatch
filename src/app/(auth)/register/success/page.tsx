"use client"
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { FaCheckCircle } from "react-icons/fa"

export default function RegisterSuccessPage() {
  const router = useRouter()
  return (
    <Card className="w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center gap-3">
        <div className="text-secondary flex items-center gap-2">
          <FaCheckCircle size={30} />
          <h1 className="text-3xl font-semibold">
            You have successfully registered
          </h1>
        </div>
        <p className="text-neutral-500 self-center">
          You can now login to the app
        </p>
      </CardHeader>
      <CardFooter>
        <Button
          variant="bordered"
          color="secondary"
          className="w-full text-secondary text-medium"
          onClick={() => router.push("/login")}
        >
          Go to Login
        </Button>
      </CardFooter>
    </Card>
  )
}
