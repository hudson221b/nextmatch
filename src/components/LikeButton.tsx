"use client"
import { toggleLikeMember } from "@/app/actions/likeActions"
import { useRouter } from "next/navigation"
import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

type LikeButtonProp = {
  isLiked: boolean
  targetUserId: string
}

function LikeButton({ isLiked, targetUserId }: LikeButtonProp) {
  const router = useRouter()
  const toggleButton = async (e: React.MouseEvent) => {
    // stops the redirecting because this button is a child of MemberCard that acts like a link
    e.preventDefault()
    e.stopPropagation()
    await toggleLikeMember(targetUserId, isLiked)
    // refreshes matches page to reflect the lates like Ids
    router.refresh()
  }
  return (
    <div
      className="relative opacity-80 hover:opacity-100"
      onClick={toggleButton}
    >
      <AiOutlineHeart size={28} className="fill-white" />
      <AiFillHeart
        size={24}
        className={`absolute top-[2px] left-[2px] ${
          isLiked ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </div>
  )
}

export default LikeButton
