"use client"

import { Input } from "@nextui-org/react"
import { useFormContext } from "react-hook-form"

export default function UserDetailsForm() {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext()
  return (
    <>
      <Input
        {...register("name")}
        label="Name"
        variant="bordered"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message as string}
        defaultValue={getValues("name")}
      />
      <Input
        {...register("email")}
        label="Email"
        variant="bordered"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message as string}
        defaultValue={getValues("email")}
      />
      <Input
        {...register("password")}
        type={"password"}
        label="Password"
        variant="bordered"
        isInvalid={!!errors.password}
        defaultValue={getValues("password")}
      />
    </>
  )
}
