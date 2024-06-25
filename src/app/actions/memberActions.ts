"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

/**
 * get all members except oneself after login
 */
export const getMembers = async () => {
  const session = await auth()
  if (!session?.user) return null

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          id: session.user.id,
        },
      },
    })
  } catch (error) {
    console.error(error)
  }
}


export const getMemberById = async (userId: string) => {
  try {
    return prisma.member.findUnique({ where: { userId } })
  } catch (error) {
    console.error("Error finding a member")
  }
}