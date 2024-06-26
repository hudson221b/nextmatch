"use client"
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
} from "@nextui-org/react"
import { BiSolidError } from "react-icons/bi"

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Card className="w-2/5 mx-auto flex items-center justify-center">
      <CardHeader className="flex flex-row text-secondary justify-center gap-2">
        <BiSolidError size={30} />
        <h1 className="text-3xl font-semibold">Error</h1>
      </CardHeader>
      <CardBody className="flex flex-row justify-center">
        <h4 className="text-danger-300">{error.message}</h4>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Button variant="bordered" onClick={() => reset()} color="secondary">
          Try again
        </Button>
      </CardFooter>
    </Card>
  )
}
