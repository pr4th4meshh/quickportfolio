import Link from "next/link"
import React from "react"

const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear()
  return (
    <>
    <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-500 to-transparent " />
    <div className="flex flex-row py-10 justify-center items-center">
      <h1>
        Created with &copy;{" "}
        <Link
          href="https://github.com/pr4th4meshh/quickportfolio"
          className="text-blue-400"
        >
          QPortfolio
        </Link>{" "}
        {currentYear}
      </h1>
    </div>
    </>
  )
}

export default PortfolioFooter
