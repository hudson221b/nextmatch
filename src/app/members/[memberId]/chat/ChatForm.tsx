"use client"
import { createMessage } from "@/app/actions/messageActions"
import {
  messageSchema,
  type MessageSchema,
} from "@/lib/zod-schemas/message-schema"
import { handleFormServerErrors } from "@/components/helpers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { HiPaperAirplane } from "react-icons/hi2"

/**
 * Component to type and send a new message in Chat page
 */
export default function ChatForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setFocus,
    formState: { isValid, isSubmitting, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  })

  const router = useRouter()
  const { memberId } = useParams<{ memberId: string }>()

  useEffect(() => {
    setFocus("text")
  }, [setFocus])

  const onSubmit = async (data: MessageSchema) => {
    const result = await createMessage(data, memberId)
    if (result.status === "error") {
      handleFormServerErrors(result, setError)
    } else {
      reset()
      router.refresh()
      setTimeout(() => {
        setFocus("text")
      }, 100)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full flex items-center gap-2">
        <Input
          fullWidth
          variant="faded"
          color="secondary"
          placeholder="Type a message here"
          isInvalid={!!errors.text}
          errorMessage={errors.text?.message}
          {...register("text")}
        />
        <Button
          type="submit"
          isIconOnly
          radius="full"
          isDisabled={!isValid}
          isLoading={isSubmitting}
          color="secondary"
        >
          <HiPaperAirplane size={28} />
        </Button>
      </div>
      {errors.root ? <div> {errors.root.serverError.message} </div> : null}
    </form>
  )
}
