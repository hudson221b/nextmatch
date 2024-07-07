"use client"

import type { FieldValues, Path, UseFormSetError } from "react-hook-form"
import type { ZodIssue } from "zod"

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
