"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import {
  type MemberEditSchema,
  memberEditSchema,
} from "@/lib/zod-schemas/member-edit-schema"
import type { Member, Photo } from "@prisma/client"
import { getCurrentUserId } from "./authActions"
import type {
  ActionResult,
  GetMembersParams,
  PaginationResponse,
} from "@/types"
import { cloudinary } from "@/lib/cloudinary"
import { addYears } from "date-fns"

/**
 * get all members except oneself after login
 */
export const getMembers = async ({
  ageRange = "18-100",
  orderBy = "updated",
  gender = "female&male",
  pageNumber = "1",
  pageSize = "12",
  hasPhotos = "false",
}: GetMembersParams): Promise<PaginationResponse<Member>> => {
  const userId = await getCurrentUserId()

  // filter on age
  const [minAge, maxAge] = ageRange.split("-")
  const currentDate = new Date()
  // the upper bound of DoB, no later than this date
  const maxDoB = addYears(currentDate, -minAge)
  // the lower bound of DoB, no earlier than this date
  const minDoB = addYears(currentDate, -maxAge - 1)

  // filter on gender
  const genderArray = gender.split("&")

  // filter on photos
  const hasImage = hasPhotos === "true" ? { image: { not: null } } : {}

  const skip = (parseInt(pageNumber) - 1) * parseInt(pageSize)

  try {
    const totalCount = await prisma.member.count({
      where: {
        NOT: {
          userId: userId,
        },
        AND: [
          {
            dateOfBirth: {
              gte: minDoB,
            },
          },
          {
            dateOfBirth: {
              lte: maxDoB,
            },
          },
          {
            gender: { in: genderArray },
          },
          hasImage,
        ],
      },
    })
    const members = await prisma.member.findMany({
      where: {
        NOT: {
          userId,
        },
        AND: [
          {
            dateOfBirth: {
              gte: minDoB,
            },
          },
          {
            dateOfBirth: {
              lte: maxDoB,
            },
          },
          {
            gender: { in: genderArray },
          },
          hasImage,
        ],
      },
      skip,
      take: parseInt(pageSize),
      orderBy: { [orderBy]: "desc" },
    })

    return { items: members, totalCount }
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
      where: { id: userId },
      data: {
        image: url,
      },
    })
    return prisma.member.update({
      where: { userId },
      data: {
        image: url,
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const deleteImage = async (photo: Photo) => {
  const userId = await getCurrentUserId()
  try {
    // delete from cloudinary
    if (photo.publicId) {
      await cloudinary.v2.uploader.destroy(photo.publicId)
    }
    return prisma.member.update({
      where: { userId },
      data: {
        photos: {
          delete: {
            id: photo.id,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const updateLastActive = async () => {
  const userId = await getCurrentUserId()
  try {
    await prisma.member.update({
      where: { userId },
      data: { updated: new Date() },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}