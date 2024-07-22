"use client"

import type { FieldValues, Path, UseFormSetError } from "react-hook-form"
import type { ZodIssue } from "zod"

/**
 * Display errors after submitting the form to server
 */
export function handleFormServerErrors<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    // set validation error to each form field
    errorResponse.error.forEach(zodIssue => {
      const fieldName = zodIssue.path.join(".") as Path<TFieldValues>

      setError(fieldName, { message: zodIssue.message })
    })
  } else {
    // set server error
    setError("root.serverError", { message: errorResponse.error })
  }
}

/**
 * Creates a unique channel name between the current user and the recipient. It's alphabetically sorted so to ensure only one channel name between two users.
 */
export const getChannelName = (userId: string, recipientId: string) => {
  return userId > recipientId ? recipientId + userId : userId + recipientId
}

