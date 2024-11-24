"use client"
import React from "react"
import DarkModeToggle from "./DarkModeToggle"
import PrimaryButton from "./ui/primary-button"
import Image from "next/image"
import TempProfilePicture from "../../public/vercel.svg"
import ThemeSwitch from "./ui/ThemeSwitch"
import { signIn, signOut, useSession } from "next-auth/react"
import SigninWGoogle from "./SigninWGoogle"
import { useRouter } from "next/navigation"

interface User {
  id: string
  username: string
}

const Navbar = () => {
  const router = useRouter()
  const session = useSession()
  const handleLogout = () => {
    signOut({callbackUrl: '/'})
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent py-4 px-6 shadow-md">
      <div className="flex items-center justify-between mx-auto w-min sm:w-[50vw] border-[#404040] border-2 py-4 sm:py-4 px-6 sm:px-8 rounded-full space-x-6">
        <div>
          <h1 className="text-black dark:text-white text-xl font-semibold">
            qPortfolio
          </h1>
        </div>
        <div className="flex flex-row">
          <ThemeSwitch />
          {session?.data?.user ? (
            <div className="flex items-center space-x-3 ml-3">
              <div className="hidden sm:flex items-center space-x-1">
                <Image
                  src={
                    session.data?.user.image
                      ? session.data?.user.image
                      : TempProfilePicture
                  }
                  alt="avatar"
                  className="w-[30px] h-[30px] rounded-full bg-red-500 object-contain"
                  height={50}
                  width={50}
                />
                <span className="text-lg font-medium flex whitespace-nowrap text-black dark:text-white">
                  Hey, {session.data?.user.name}
                </span>
              </div>
              <PrimaryButton
                className="font-medium"
                title="Logout"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <>
            <PrimaryButton 
              title="Sign in"
              onClick={() => router.push("/auth/signup")}
              className="mr-2"
            />
            <SigninWGoogle />            
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
