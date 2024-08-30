"use server"
import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "./authActions"
import type { Member } from "@prisma/client"

/**
 * Toggles the like status of a target for the logged in user
 */
export const toggleLikeMember = async (
  targetUserId: string,
  isLiked: boolean
) => {
  try {
    const userId = await getCurrentUserId()

    if (isLiked) {
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      })
    } else {
      await prisma.like.create({
        data: { sourceUserId: userId, targetUserId },
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export type LikeTypes = "source" | "target" | "mutual"

/**
 * @param type whether the current user is the source, target or mutual target of likes
 * @param select whether to return the member Ids or members that meet the like type
 * @returns array of member Ids or members
 */
export const fetchLikesForCurrentUser = async (
  type: LikeTypes = "source",
  select: "id" | "member" = "id"
): Promise<string[] | Member[]> => {
  try {
    const userId = await getCurrentUserId()

    switch (type) {
      case "source":
        if (select === "id") {
          const likes = await prisma.like.findMany({
            where: {
              sourceUserId: userId,
            },
            select: {
              targetUserId: true,
            },
          })
          return likes.map(like => like.targetUserId)
        } else {
          const likes = await prisma.like.findMany({
            where: {
              sourceUserId: userId,
            },
            select: {
              targetMember: true,
            },
          })
          return likes.map(like => like.targetMember)
        }

      case "target":
        if (select === "id") {
          const likes = await prisma.like.findMany({
            where: {
              targetUserId: userId,
            },
            select: {
              sourceUserId: true,
            },
          })
          return likes.map(like => like.sourceUserId)
        } else {
          const likes = await prisma.like.findMany({
            where: {
              targetUserId: userId,
            },
            select: {
              sourceMember: true,
            },
          })
          return likes.map(like => like.sourceMember)
        }
      case "mutual":
        // fetch source like Ids first
        const sourceLikes = await prisma.like.findMany({
          where: {
            sourceUserId: userId,
          },
          select: {
            targetUserId: true,
          },
        })
        const sourceLikeIds = sourceLikes.map(like => like.targetUserId)

        if (select === "id") {
          const mutualLikes = await prisma.like.findMany({
            where: {
              AND: [
                { targetUserId: userId },
                { sourceUserId: { in: sourceLikeIds } },
              ],
            },
            select: {
              sourceUserId: true,
            },
          })
          return mutualLikes.map(like => like.sourceUserId)
        } else {
          const mutualLikes = await prisma.like.findMany({
            where: {
              AND: [
                { targetUserId: userId },
                { sourceUserId: { in: sourceLikeIds } },
              ],
            },
            select: {
              sourceMember: true,
            },
          })
          return mutualLikes.map(like => like.sourceMember)
        }

      default:
        throw new Error("fetchLikesForCurrentUser arguments not correct")
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

