"use client"

import { Input } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"

export default function UserDetailsForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  return (
    <>
      <Input
        {...register("name")}
        label="Name"
        variant="bordered"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
      />
      <Input
        {...register("email")}
        label="Email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
      />
      <Input
        {...register("password")}
        type={"password"}
        label="Password"
        variant="bordered"
        isInvalid={!!errors.password}
      />
    </>
  )
}
