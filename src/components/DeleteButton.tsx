"use client"
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai"
import { PiSpinner } from "react-icons/pi"

type Props = {
  isLoading: boolean
}

export function DeleteButton({ isLoading }: Props) {
  return (
    <div className="relative opacity-55 hover:opacity-80">
      {!isLoading ? (
        <>
          <AiFillDelete size={28} className="fill-red-600" />
          <AiOutlineDelete
            size={32}
            className="fill-white absolute -top-[2px] -right-[2px]"
          />
        </>
      ) : (
        <PiSpinner size={32} className="fill-white animate-spin" />
      )}
    </div>
  )
}
