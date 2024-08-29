import exp from "constants"
import { z } from "zod"
import { calculateAge } from "../util"

//#region Zod schemas
export const loginSchema = z.object({
  email: z.string().email({ message: "Must be valid email format" }),
  password: z.string().min(6, { message: "Password is at least 6 characters" }),
})

export const userSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Must be valid email format" }),
  password: z.string().min(6, { message: "Password is at least 6 characters" }),
})

export const memberSchema = z.object({
  gender: z.string().min(1, { message: "Gender is required" }),
  description: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  dateOfBirth: z
    .string()
    .min(1, { message: "Date of birth is required" })
    .refine(
      dateString => {
        const age = calculateAge(new Date(dateString))
        return age >= 18
      },
      { message: "You must be at least 18 to use this app" }
    ),
})

export const registerSchema = userSchema.and(memberSchema)
//#endregion

//#region TS types
export type LoginSchema = z.infer<typeof loginSchema>

export type UserSchema = z.infer<typeof userSchema>
export type MemberSchema = z.infer<typeof memberSchema>

export type RegisterSchema = z.infer<typeof registerSchema>




