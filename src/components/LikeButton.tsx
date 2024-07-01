"use client"
import { toggleLike } from "@/app/actions/likeActions"
import React from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

type LikeButtonProp = {
  isLiked: boolean
  targetUserId: string
}

function LikeButton({ isLiked, targetUserId }: LikeButtonProp) {
  const toggleButton = async () => {
    await toggleLike(targetUserId, isLiked)
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
