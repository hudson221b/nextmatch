import { z } from "zod"

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

export type RegisterSchema = z.infer<typeof registerSchema>
