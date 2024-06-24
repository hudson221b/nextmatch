"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

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
