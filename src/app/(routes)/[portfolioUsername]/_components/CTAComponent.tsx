import Link from "next/link"
import React from "react"

const CTAComponent = () => {
  return (
    <div className="absolute sm:fixed transform rotate-90 text-white origin-top-right top-[350px] z-50 right-0 py-1 px-2 sm:px-4 rounded-b-lg sm:py-1 text-xs sm:text-lg tracking-wide bg-gradient-to-r from-blue-500 via-purple-600 to-pink-700">
      <Link href="/">Create your Presssence</Link>
    </div>
  )
}

export default CTAComponent
