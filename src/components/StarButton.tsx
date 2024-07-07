"use client"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { PiSpinner } from "react-icons/pi"

type Props = {
  isSelected: boolean
  isLoading: boolean
}

export function StarButton({ isSelected, isLoading }: Props) {
  return (
    <div className="relative hover:opacity-80">
      {!isLoading ? (
        <>
          <AiFillStar
            size={28}
            className={isSelected ? "fill-yellow-200" : "fill-neutral-500/70"}
          />
          <AiOutlineStar
            size={32}
            className="fill-white absolute -top-[2px] -left-[2px]"
          />
        </>
      ) : (
        <PiSpinner size={32} className="fill-white animate-spin" />
      )}
    </div>
  )
}
