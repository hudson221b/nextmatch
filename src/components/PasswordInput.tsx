import { Input } from "@nextui-org/react"
import { useState } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

type Props = {
  isInvalid: boolean
  errorMessage: string
  registerReturn: UseFormRegisterReturn<"password">
}

export default function PasswordInput({
  isInvalid,
  errorMessage,
  registerReturn,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      {...registerReturn}
      label="Password"
      variant="bordered"
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      endContent={
        <button
          className="focus:outline-none self-center"
          type="button"
          onClick={toggleVisibility}
          aria-label="toggle password visibility"
        >
          {isVisible ? (
            <AiFillEye size={24} className="text-default-700" />
          ) : (
            <AiFillEyeInvisible size={24} className="text-default-400" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  )
}
