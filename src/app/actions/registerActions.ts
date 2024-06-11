"use server"

import { prisma } from "@/lib/prisma"
import { registerSchema, type RegisterSchema } from "@/lib/schemas/auth-schema"
import type { ActionResult } from "../types"
import type { User } from "@prisma/client"

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    // validate data again on server side
    const validated = registerSchema.safeParse(data) // do not throw when validation fails
    if (!validated.success) {
      return { status: "error", error: validated.error.issues }
    }

    const { name, email, password } = validated.data

    // check if the user email already exists. We'll query database user table
    const isExistingUser = await prisma.user.findUnique({ where: { email } })
    if (isExistingUser) {
      return { status: "error", error: "User already exists" }
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })

    return { status: "success", data: user }
  } catch (error) {
    return { status: "error", error: "Interval server error" }
  }
}
