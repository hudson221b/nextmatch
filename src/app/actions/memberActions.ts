"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import {
  type MemberEditSchema,
  memberEditSchema,
} from "@/lib/schemas/member-edit-schema"
import type { Member, Photo } from "@prisma/client"
import { getCurrentUserId } from "./authActions"
import type { ActionResult } from "@/types"

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

export const updateMemberProfile = async (
  data: MemberEditSchema,
  updatingName: boolean
): Promise<ActionResult<Member>> => {
  try {
    const userId = await getCurrentUserId()
    const validated = memberEditSchema.safeParse(data)
    if (!validated.success) {
      return { status: "error", error: validated.error.issues }
    }

    const { name, description, city, country } = validated.data

    if (updatingName) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          name,
        },
      })
    }

    const member = await prisma.member.update({
      where: { userId },
      data: {
        name,
        description,
        city,
        country,
      },
    })
    return { status: "success", data: member }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      error: "Error updating member profile",
    }
  }
}

/**
 * Add a new photo to Member
 */
export const updateMemberPhotos = async (url: string, publicId: string) => {
  try {
    const userId = await getCurrentUserId()
    await prisma.member.update({
      where: { userId },
      data: {
        photos: {
          create: {
            url,
            publicId,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * Set image field for both User and Member
 */
export const setMainImage = async (url: string) => {
  try {
    const userId = await getCurrentUserId()
    await prisma.user.update({
      where: {id: userId},
      data:{
        image: url
      }
    })
    return prisma.member.update({
      where: {userId},
      data:{
        image: url
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}