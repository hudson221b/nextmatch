"use client"
import React from "react"
import { Button, Input, Textarea } from "@nextui-org/react"
import {
  type MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/member-edit-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { Member } from "@prisma/client"

type EditFormProp = {
  member: Member
}

export function EditForm({ member }: EditFormProp) {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors, isSubmitting },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: MemberEditSchema) => {
    // const result = await editUser(data)

    // if (result.status === "success") {
    //   // router.push("./members")
    // } else {
    //   console.log(result.error)
    //   toast.error(result.error as string,{hideProgressBar: true});

    // }
    console.log("submitting")
  }

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        label="Name"
        variant="bordered"
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        {...register("description")}
        label="Description"
        variant="bordered"
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          {...register("city")}
          label="City"
          variant="bordered"
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          {...register("country")}
          label="Country"
          variant="bordered"
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      <Button
        color="secondary"
        type="submit"
        isDisabled={!isValid || !isDirty}
        isLoading={isSubmitting}
        className="flex self-end"
      >
        Update Profile
      </Button>
    </form>
  )
}

