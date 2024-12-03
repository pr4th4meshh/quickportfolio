import { cn } from "@/lib/utils"
import React from "react"
import { RiEditBoxLine } from "react-icons/ri";

interface IEditButton {
  onClick: () => void
  className: string
}

const EditButton = ({ onClick, className }: IEditButton) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-12 w-12 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 justify-center items-center",
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        <RiEditBoxLine className="text-xl" />
      </span>
    </button>
  )
}

export default EditButton
