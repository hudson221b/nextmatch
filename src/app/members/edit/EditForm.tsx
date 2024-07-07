"use client"
import React, { useEffect } from "react"
import { Button, Input, Textarea } from "@nextui-org/react"
import {
  type MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/member-edit-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { Member } from "@prisma/client"
import { updateMemberProfile } from "@/app/actions/memberActions"
import { toast } from "react-toastify"
import { handleFormServerErrors } from "@/lib/util"

type EditFormProp = {
  member: Member
}

export function EditForm({ member }: EditFormProp) {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty, errors, isSubmitting },
    setError,
    reset,
  } = useForm<MemberEditSchema>({
    // resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  })

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data)
    if (result.status === "success") {
      toast.success("Profile updated")
      // router.refresh()
      // reset()
    } else {
      handleFormServerErrors(result, setError)
    }
  }

  useEffect(() => {
    reset({
      name: member.name,
      description: member.description,
      city: member.city,
      country: member.country,
    })
  }, [member, reset])

  return (
    <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("name")}
        label="Name"
        variant="bordered"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        {...register("description")}
        label="Description"
        variant="bordered"
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
        minRows={6}
      />
      <div className="flex flex-row gap-3">
        <Input
          {...register("city")}
          label="City"
          variant="bordered"
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          {...register("country")}
          label="Country"
          variant="bordered"
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>
      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}
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

