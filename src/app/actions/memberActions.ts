"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import type { Photo } from "@prisma/client"

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
    throw error
  }
}

export const getMemberById = async (userId: string) => {
  try {
    return prisma.member.findUnique({ where: { userId } })
  } catch (error) {
    console.error("Error finding a member")
  }
}

export const getMemberPhotosByUserId = async (userId: string) => {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    })

    if (!member) return null
    return member.photos as Photo[]
  } catch (error) {
    console.error("Error finding a member")
  }
}