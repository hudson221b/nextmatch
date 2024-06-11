"use server"

import { prisma } from "@/lib/prisma"
import { registerSchema, type RegisterSchema } from "@/lib/schemas/auth-schema"

export async function registerUser(data: RegisterSchema) {
  // validate data again on server side
  const validated = registerSchema.safeParse(data) // do not throw when validation fails
  if (!validated.success) {
    return {
      error: validated.error.toString(),
    }
  }

  const { name, email, password } = validated.data

  // check if the user email already exists. We'll query database user table
  const isExistingUser = await prisma.user.findUnique({ where: { email } })
  if (isExistingUser) {
    return {
      error: "User already exists",
    }
  }

  return prisma.user.create({
    data: {
      name,
      email,
    },
  })
}
