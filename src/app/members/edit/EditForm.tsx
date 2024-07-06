"use client"
import {
  type MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/member-edit-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"

export default function EditForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isDirty },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
  })

  return <div></div>
}
