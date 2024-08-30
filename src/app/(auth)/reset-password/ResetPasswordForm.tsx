"use client"

import { resetPassword } from "@/app/actions/authActions"
import { CardWrapper, ResultMessage } from "@/components/CardWrappers"
import { resetPasswordSchema } from "@/lib/zod-schemas/auth-schema"
import type { ActionResult } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const [result, setResult] = useState<ActionResult<string> | null>(null)
  const {
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    register,
    reset,
  } = useForm<resetPasswordSchema>({
    mode: "onTouched",
    resolver: zodResolver(resetPasswordSchema),
  })

  const tokenString = searchParams.get("token")

  const onSubmit = useCallback(async (data: FieldValues) => {
    const result = await resetPassword(tokenString, data.password)
    setResult(result)
    reset()
  }, [])

  const body = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        type="password"
        label="New password"
        variant="bordered"
        isRequired
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
        {...register("password")}
      />
      <Input
        type="password"
        label="Confirm password"
        variant="bordered"
        isRequired
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button
        type="submit"
        color="secondary"
        isDisabled={!isValid}
        isLoading={isSubmitting}
      >
        Reset Password
      </Button>
    </form>
  )
  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Reset Password"
      subheaderText="Please enter your password below"
      body={body}
      footer={result && <ResultMessage result={result} />}
    />
  )
}
