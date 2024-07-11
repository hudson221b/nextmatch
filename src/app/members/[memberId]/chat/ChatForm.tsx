"use client"
import { messageSchema, type MessageSchema } from "@/lib/schemas/message-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input } from "@nextui-org/react"
import React from "react"
import { useForm } from "react-hook-form"
import { HiPaperAirplane } from "react-icons/hi2"

export default function ChatForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<MessageSchema>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmit = (data: MessageSchema) => {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center gap-2"
    >
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
    </form>
  )
}
