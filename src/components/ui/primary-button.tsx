import { cn } from "@/lib/utils"
import React from "react"

const PrimaryButton = ({
  title,
  onClick,
  icon,
  className,
}: {
  title: string
  onClick: () => void
  className?: string
  icon?: React.ReactNode
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200 flex justify-center items-center",
        className
      )}
    >
      {icon}
      {title}
    </button>
  )
}

export default PrimaryButton
