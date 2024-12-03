"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import Loading from "@/components/Loading"
import PageHeader from "./_components/PageHeader"
import PortfolioHero from "./_components/PortfolioHero"
import PortfolioFooter from "./_components/PortfolioFooter"
import PortfolioSkills from "./_components/PortfolioSkills"
import PortfolioProjects from "./_components/PortfolioProjects"
import PortfolioSocials from "./_components/PortfolioSocials"
import Link from "next/link"
import CTAComponent from "./_components/CTAComponent"

interface ProfileData {
  username: string
  name: string
  profession: string
  headline: string
  photo: string
  theme: {
    style: string
    aiGenerated: boolean
  }
  // socialMedia: {
  //   twitter: string
  //   linkedin: string
  //   github: string
  //   website: string
  //   behance: string
  //   figma: string
  //   awwwards: string
  //   dribbble: string
  //   medium: string
  // }
  projects: {
    title: string
    description: string
    link: string
    timeline: string
  }[]
  skills: {
    name: string
    endorsements: number
  }[]
  achievements: {
    title: string
    issuer: string
    date: string
  }[]
  analytics: {
    views: number
    engagement: number
  }
  blogEnabled: boolean
  collaborators: string[]
}

export default function Portfolio() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: "johndoe",
    name: "John Doe",
    profession: "Software Engineer",
    headline: "Building the future of web development",
    photo: "",
    theme: { style: "modern", aiGenerated: true },
    socialLinks: {
      twitter: "https://twitter.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
    },
    projects: [
      {
        title: "Project Alpha",
        description: "A revolutionary web application",
        link: "https://project.com",
        timeline: "2023-01-01",
      },
    ],
    skills: [
      { name: "React", endorsements: 15 },
      { name: "TypeScript", endorsements: 12 },
      { name: "Node.js", endorsements: 8 },
    ],
    achievements: [
      {
        title: "Best Developer Award",
        issuer: "Tech Conference 2023",
        date: "2023-06-15",
      },
    ],
    analytics: { views: 1234, engagement: 567 },
    blogEnabled: true,
    collaborators: ["team@example.com"],
  })

  const params = useParams()
  const [profileData0, setProfileData0] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const session = useSession()
  console.log("SES", session)

  const handleGetPortfolioInformation = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/portfolio?portfolioUsername=${params.portfolioUsername}`
      )

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data.")
      }

      const data = await response.json()
      if (data) {
        setProfileData0(data)
      } else {
        console.error("Portfolio fetch failed:", data.message)
      }
    } catch (error) {
      console.error("Error fetching portfolio data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetPortfolioInformation()
  }, [])

  const handleEndorsement = (skillIndex: number) => {
    if (!profileData0) return

    setProfileData0((prev) => {
      if (!prev) return null

      const updatedSkills = [...prev.skills]
      updatedSkills[skillIndex].endorsements += 1

      return {
        ...prev,
        skills: updatedSkills,
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex dark:bg-dark bg-light items-center justify-center">
        <Loading />
      </div>
    )
  }

  if (!profileData0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No profile data found.
      </div>
    )
  }

  console.log(profileData0, "profileData0")
  const backgroundStyle = {
    modern: `
      bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500
      background-size: 400% 400%;
      animation: gradient 15s ease infinite;
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,
    creative: `
      bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
      from-pink-300 via-purple-300 to-indigo-400
      animate-[pulse_8s_ease-in-out_infinite]
    `,
    professional: `
      bg-gradient-to-br from-gray-100 to-gray-300
      bg-[url('data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E')]
    `,
    bold: `
      bg-gradient-to-bl from-yellow-400 via-red-500 to-pink-500
      animate-[gradient_3s_ease_infinite]
      background-size: 200% 200%;
      @keyframes gradient {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `,
  }

  return (
    // <div className={`min-h-screen ${backgroundStyle["bold"]} `}>
    <div className="min-h-screen dark:bg-black bg-light">
      {/* Call to action component on the right to create new portfolio/pressence  */}
      <CTAComponent />
      {/* Page Header / Navbar  */}
      <PageHeader />
      <div className="container mx-auto max-w-7xl">
        {/* Profile Header */}
        <PortfolioHero
          session={session}
          params={params}
          profileData={profileData}
          profileData0={profileData0}
          handleEndorsement={handleEndorsement}
        />

        {/* Skills Section */}
        <PortfolioSkills skillsAndFeatures={profileData0} />

        <PortfolioSocials socialMediaLinksViaPortfolio={profileData0} />

        {/* Projects Timeline */}
        <PortfolioProjects initialProjects={profileData0} />

        {/* Portfolio Footer */}
        <PortfolioFooter />
      </div>
    </div>
  )
}
