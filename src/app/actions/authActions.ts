"use server"

import { prisma } from "@/lib/prisma"
import {
  registerSchema,
  type LoginSchema,
  type RegisterSchema,
} from "@/lib/zod-schemas/auth-schema"
import type { ActionResult } from "../../types"
import type { Token, User } from "@prisma/client"
import bcrypt from "bcryptjs"
import { auth, signIn } from "@/auth"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/token"
import { sendVerficationEmail } from "@/lib/email"

export async function registerUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    // validate data on the server side
    const validated = registerSchema.safeParse(data) // do not throw when validation fails
    if (!validated.success) {
      return { status: "error", error: validated.error.issues }
    }

    const {
      name,
      email,
      password,
      gender,
      description,
      city,
      country,
      dateOfBirth,
    } = validated.data

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
        profileCompleted: true,
        member: {
          create: {
            name,
            description: description || "",
            dateOfBirth: new Date(dateOfBirth),
            city,
            country,
            gender,
          },
        },
      },
    })

    const token = await generateVerificationToken(email)

    // send them an email
    await sendVerficationEmail(name, token.email, token.token)

    return { status: "success", data: user }
  } catch (error: any) {
    console.log("#####🚀🚀🚀 ~ registerUser server error👉👉", error)
    return { status: "error", error: error.message || "Interval server error" }
  }
}

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email)
    if (existingUser && !existingUser.emailVerified) {
      const token: Token = await generateVerificationToken(data.email)
      // send user an email with token
      await sendVerficationEmail(existingUser.name!, token.email, token.token)
      throw new Error("Please verify your email before logging in")
    }
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })
    return { status: "success", data: "Logged in" }
  } catch (error: any) {
    console.log("#####🚀🚀🚀 ~ signInUser server error👉👉", error)
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin")
        return { status: "error", error: "Invalid credentials" }
      else return { status: "error", error: "Some Auth error" }
    }
    return { status: "error", error: error.message || "Sign in internal error" }
  }
}

/**
 * Needs to verify the following:
 * 1) token exists
 * 2) token has not expired
 * 3) a user can be found by token.email
 * Then marks this user's emailVerified field with a date
 */
export async function verifyEmail(
  token: string
): Promise<ActionResult<string>> {
  try {
    const tokenObj = await prisma.token.findFirst({
      where: { token },
    })

    if (!tokenObj) {
      return { status: "error", error: "Token is invalid" }
    }

    if (new Date() > tokenObj.expires) {
      return { status: "error", error: "Token has expired" }
    }

    const user = await getUserByEmail(tokenObj.email)
    if (!user) {
      return { status: "error", error: "User not found" }
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailVerified: new Date(),
      },
    })

    await prisma.token.delete({where:{id: tokenObj.id}})

    return { status: "success", data: "Email successfully verified!" }
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } })
}

export const getCurrentUserId = async (): Promise<string> => {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error("Not authorized")
  return userId
}