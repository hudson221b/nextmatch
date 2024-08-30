"use client"

import { checkAndSendPasswordResetEmail } from "@/app/actions/authActions"
import { CardWrapper, ResultMessage } from "@/components/CardWrappers"
import type { ActionResult } from "@/types"
import { Button, Input } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import { GiPadlock } from "react-icons/gi"

export default function ForgotPasswordForm() {
  const [result, setResult] = useState<ActionResult<string> | null>(null)
  const {
    formState: { isValid, isSubmitting, errors },
    handleSubmit,
    register,
    reset,
  } = useForm()

  const onSubmit = useCallback(async (data: FieldValues) => {
    console.log("onSubmit fired", isValid, isSubmitting, errors)
    const result = await checkAndSendPasswordResetEmail(data.email)
    setResult(result)
    reset()
  }, [])

  const body = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        type="email"
        label="Email"
        variant="bordered"
        isRequired
        {...register("email", { required: true })}
      />
      <Button
        type="submit"
        color="secondary"
        isDisabled={!isValid}
        isLoading={isSubmitting}
      >
        Send reset email
      </Button>
    </form>
  )
  return (
    <CardWrapper
      headerIcon={GiPadlock}
      headerText="Forgot Password"
      subheaderText="Please enter your email address to reset your password"
      body={body}
      footer={result && <ResultMessage result={result} />}
    />
  )
}