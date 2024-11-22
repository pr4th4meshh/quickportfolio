"use client"
import { WavyBackground } from "./ui/wavy-background"
import { FlipWords } from "./ui/flip-words"
import BorderStyleButton from "./ui/border-button"
import { IoLogoGithub, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io"
import { FloatingDock } from "./ui/floating-dock"
import { IoLogoInstagram } from "react-icons/io5"
import { FaUpwork } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Navbar from "./Navbar"

interface User {
  id: string
  username: string
  email: string
}

export default function Hero() {
  const router = useRouter()
  const words = ["easy", "quick", "beautiful", "modern"]
  const links = [
    {
      title: "GitHub",
      icon: (
        <IoLogoGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/pr4th4meshh/quickportfolio",
    },
    {
      title: "X (former Twitter)",
      icon: (
        <IoLogoTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://x.com/pr4th4meshh",
    },
    {
      title: "LinkedIn",
      icon: (
        <IoLogoLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.linkedin.com/in/prathamesh-asolkar",
    },
    {
      title: "Upwork",
      icon: (
        <FaUpwork className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://www.upwork.com/freelancers/~01d3757453c315801b?mp_source=share",
    },
    {
      title: "Instagram",
      icon: (
        <IoLogoInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ]

  const user = useSession()
  console.log(user, "user via nextauth")
  return (
    <WavyBackground>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col justify-center text-center px-4">
          <h1 className="text-5xl sm:text-7xl text-center font-bold text-gray-900 dark:text-white my-10">
            No Portfolio? No Problem!
          </h1>
          <div className="text-4xl sm:text-6xl font-normal text-center sm:text-start text-white dark:text-neutral-400">
            Build
            <FlipWords className="text-white" words={words} /> <br />
            portfolio site with just a few clicks
          </div>

          <BorderStyleButton
            title="Create your qPortfolio"
            onClick={() => router.push("/onboarding")}
            className="mt-20 w-[300px] flex self-center text-2xl items-center"
          />
        </div>
        <FloatingDock
          desktopClassName="fixed bottom-10 right-10"
          mobileClassName="fixed bottom-10 right-10"
          items={links}
        />
      </div>
    </WavyBackground>
  )
}
