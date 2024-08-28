import exp from "constants"
import { z } from "zod"
import { calculateAge } from "../util"

export const loginSchema = z.object({
  email: z.string().email({ message: "Must be valid email format" }),
  password: z.string().min(6, { message: "Password is at least 6 characters" }),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Must be valid email format" }),
  password: z.string().min(6, { message: "Password is at least 6 characters" }),
})

export type RegisterSchema = z.infer<
  typeof registerSchema & typeof profileSchema
>

export const profileSchema = z.object({
  gender: z.string().min(1),
  description: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  dateOfBirth: z
    .string()
    .min(1)
    .refine(
      dateString => {
        const age = calculateAge(new Date(dateString))
        return age >= 18
      },
      { message: "You must be at least 18 to use this app" }
    ),
})
