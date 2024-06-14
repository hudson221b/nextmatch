"use server"

import { prisma } from "@/lib/prisma"
import {
  registerSchema,
  type LoginSchema,
  type RegisterSchema,
} from "@/lib/schemas/auth-schema"
import type { ActionResult } from "../../types"
import type { User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    // validate data on the server side
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

    const passwordHash = bcrypt.hashSync(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })

    return { status: "success", data: user }
  } catch (error) {
    return { status: "error", error: "Interval server error" }
  }
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    console.log(result)
    return { status: "success", data: "Logged in" }
  } catch (error) {
    console.log(error)
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin")
        return { status: "error", error: "Invalid credentials" }
      else return { status: "error", error: "Some Auth error" }
    }
    return { status: "error", error: "Sign in internal error" }
  }
}