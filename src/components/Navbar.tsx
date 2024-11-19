import React from "react"
import DarkModeToggle from "./DarkModeToggle"
import PrimaryButton from "./ui/primary-button"
import Image from "next/image"
import TempProfilePicture from "../../public/vercel.svg"
import ThemeSwitch from "./ui/ThemeSwitch"

interface User {
  id: string
  username: string
}

const Navbar = ({ user }: { user: User }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent py-4 px-6 shadow-md">
      <div className="flex items-center justify-between mx-auto w-min sm:w-[30vw] border-gray-400 border-2 py-4 sm:py-4 px-6 sm:px-8 rounded-full space-x-6">
        <div>
        <h1 className="text-black dark:text-white text-xl font-semibold">qPortfolio</h1>

        </div>
       <div className="flex flex-row">
       {/* <DarkModeToggle /> */}
       <ThemeSwitch />
        {user ? (
          <div className="flex items-center space-x-3 ml-3">
            <div className="hidden sm:flex items-center space-x-2">
              <Image
                src={TempProfilePicture}
                alt="avatar"
                className="w-[30px] h-[30px] rounded-full bg-red-500 object-contain"
                height={50}
                width={50}
              />
              <span className="text-lg flex font-medium whitespace-nowrap text-white">
                Hey, {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </span>
            </div>
            <PrimaryButton className="font-medium" title="Logout" onClick={() => alert("Logged out")} />
            
          </div>
        ) : (
          <PrimaryButton className="dark:bg-white bg-black dark:text-black text-white dark:disabled:bg-gray-400 disabled:bg-gray-200" title="Login" onClick={() => alert("Login")} />
        )}
       </div>
      </div>
    </nav>
  )
}

export default Navbar
