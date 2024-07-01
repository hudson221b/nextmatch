import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { getCurrentUserId } from "./authActions"

/**
 * Toggles the like status of a target for the logged in user
 */
export const toggleLike = async (targetUserId: string, isLiked: boolean) => {
  try {
    const userId = await getCurrentUserId()

    if (isLiked) {
      prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId,
          },
        },
      })
    } else {
      prisma.like.create({
        data: { sourceUserId: userId, targetUserId },
      })
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

/**
 * @returns all target likes for the current user, ie, who has the current user liked
 */
export const fetchCurrentUserLikeIds = async () => {
  try {
    const userId = await getCurrentUserId()
    const likes = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      },
    })
    console.log(
      "#####🚀🚀🚀 ~ file: likeActions.ts:46 ~ fetchCurrentUserLikeIds ~ likes➡️➡️➡️",
      likes
    )
    return likes.map(like => like.targetUserId)
  } catch (error) {
    console.error(error)
    throw error
  }
}
