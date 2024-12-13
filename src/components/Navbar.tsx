"use client"
import React, { useEffect, useState } from "react"
import PrimaryButton from "./ui/primary-button"
import Image from "next/image"
import Default_Avatar from "../../public/qp_default_avatar.jpg"
import ThemeSwitch from "./ui/ThemeSwitch"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface IUser {
  image: string
  name: string
  email: string
}

const Navbar = () => {
  const [userData, setUserData] = useState<IUser | null>(null)
  const router = useRouter()
  const session = useSession()
  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  console.log(session)
  const userId = session?.data?.user?.id

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/user?username=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      console.log(data, "incominguser data")
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
    console.log("useeffect triggered")
  }, [session?.data])

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-transparent py-4 px-6">
      <div className="flex items-center justify-between mx-auto w-min sm:w-[50vw] border-[#404040] border-2 py-4 sm:py-4 px-6 sm:px-8 rounded-full space-x-6">
        <div>
          <h1 className="text-black dark:text-white text-xl font-bold">
            Presssence
          </h1>
        </div>
        <div className="flex flex-row">
          <ThemeSwitch />
          {session?.data?.user ? (
            <div className="flex items-center space-x-3 ml-3">
              <div className="hidden sm:flex items-center space-x-1">
                <Image
                  src={
                    userData?.image ||
                       Default_Avatar
                  }
                  alt="avatar"
                  className="w-[40px] h-[40px] mr-1 rounded-full object-contain"
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
          ) : session.status === "loading" ? (
            <span className="text-lg p-2 font-medium dark:text-white text-black">
              Loading..
            </span>
          ) : (
            <PrimaryButton
              title="Sign In"
              onClick={() => router.push("/auth/signup")}
              className="mr-2 min-w-fit"
            />
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
