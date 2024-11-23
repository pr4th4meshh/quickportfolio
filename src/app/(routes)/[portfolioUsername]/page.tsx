"use client"

import { useState, useEffect, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import {
  FiEdit,
  FiThumbsUp,
  FiEye,
  FiClock,
  FiBarChart,
  FiExternalLink,
} from "react-icons/fi"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"

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
  socialLinks: {
    twitter: string
    linkedin: string
    github: string
  }
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

interface ProfileDataFromDB {
  portfolio: {
    _id: string
    username: string
    fullName: string
    profession: string
    headline: string
    theme: string
    features: string[]
    userId: string
  }
}

export default function Portfolio() {
  const params = useParams()
  console.log(params.portfolioUsername, "PARAMS 1")
  const [profileData0, setProfileData0] = useState<ProfileData | null>(null)
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

  const session = useSession()
  console.log(session, "session 01010100101010")

  const handleGetPortfolioInformation = async () => {
    try {
      // Ensure session data is available
      if (!session.data?.user.id) {
        console.error("User session not found.")
        return
      }

      // const response = await fetch(`/api/portfolio?portfolioId=${session.data?.user.id}`);
      const response = await fetch(
        `/api/portfolio?portfolioId=674075b9c0aa30dc22aee4d6`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch portfolio data")
      }

      const data = await response.json()

      if (data) {
        setProfileData0(data) // Assuming the shape matches ProfileDataFromDB
      }
    } catch (error) {
      console.error("Error fetching portfolio data:", error)
    }
  }


  console.log(profileData0)
  useEffect(() => {
    console.log("useEffect triggered");
    handleGetPortfolioInformation()
  }, [])

  const [showAnalytics, setShowAnalytics] = useState(false)

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

  // useEffect(() => {
  //   // Simulated view count increment
  //   const newViews = profileData.analytics.views + 1
  //   setProfileData((prev) => ({
  //     ...prev,
  //     analytics: { ...prev.analytics, views: newViews },
  //   }))
  // }, [])

  const handleEndorsement = (skillIndex: number) => {
    setProfileData((prev) => {
      const newSkills = [...prev.skills]
      newSkills[skillIndex] = {
        ...newSkills[skillIndex],
        endorsements: newSkills[skillIndex].endorsements + 1,
      }
      return { ...prev, skills: newSkills }
    })
  }

  return (
    // <div className={`min-h-screen ${backgroundStyle["bold"]} `}>
    <div className="min-h-screen bg-black">
      <div className="container max-w-4xl mx-auto p-4">
        <div className="space-y-8">
          {/* Analytics Banner */}
          <section className="bg-primary text-primary-foreground p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <FiEye className="w-5 h-5" />
                <span>{profileData.analytics.views} profile views</span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowAnalytics(!showAnalytics)}
              >
                <FiBarChart className="w-4 h-4 mr-2" />
                View Analytics
              </button>
            </div>
          </section>

          {/* Profile Header */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Image
                src={session.data?.user.image ? session.data?.user.image : ""}
                alt={profileData.name}
                width={200}
                height={200}
                className="rounded-full border-4 border-background"
              />
              <button
                className="absolute bottom-0 right-0 rounded-full p-2 bg-transparent border-2 border-primary"
                aria-label="Edit Profile"
              >
                <FiEdit className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold">
                {params.portfolioUsername}
              </h1>
              <p className="text-xl text-muted-foreground">
                {profileData0?.profession}
              </p>
            </div>
            <p className="text-lg max-w-2xl mx-auto">{profileData0?.headline}</p>
            <div className="flex justify-center gap-4">
              {profileData.socialLinks.twitter && (
                <Link href={profileData.socialLinks.twitter} target="_blank">
                  {/* <a className="btn btn-ghost p-2 rounded-full"> */}
                  <FaTwitter className="w-5 h-5" />
                  {/* </a> */}
                </Link>
              )}
              {profileData.socialLinks.linkedin && (
                <Link href={profileData.socialLinks.linkedin} target="_blank">
                  {/* <a className="btn btn-ghost p-2 rounded-full"> */}
                  <FaLinkedin className="w-5 h-5" />
                  {/* </a> */}
                </Link>
              )}
              {profileData.socialLinks.github && (
                <Link href={profileData.socialLinks.github} target="_blank">
                  {/* <a className="btn btn-ghost p-2 rounded-full"> */}
                  <FaGithub className="w-5 h-5" />
                  {/* </a> */}
                </Link>
              )}
            </div>
          </div>

          {/* Skills Section */}
          <section>
            <header>
              <h2 className="text-xl font-semibold">Skills & Endorsements</h2>
            </header>
            <div className="flex flex-wrap gap-4">
              {profileData.skills.map((skill, index) => (
                <button
                  key={index}
                  className="btn btn-outline flex items-center gap-2"
                  onClick={() => handleEndorsement(index)}
                >
                  {skill.name}
                  <span className="bg-muted px-2 py-0.5 rounded-full text-sm">
                    {skill.endorsements}
                  </span>
                  <FiThumbsUp className="w-4 h-4" />
                </button>
              ))}
            </div>
          </section>

          {/* Projects Timeline */}
          <section>
            <header>
              <h2 className="text-xl font-semibold">Project Timeline</h2>
            </header>
            <div className="space-y-8">
              {profileData.projects.map((project, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-muted last:pb-0"
                >
                  <div className="absolute left-0 transform -translate-x-1/2 mt-2">
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <Link href={project.link} target="_blank">
                        {/* <a className="btn btn-ghost p-2 rounded-full"> */}
                        <FiExternalLink className="w-4 h-4" />
                        {/* </a> */}
                      </Link>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FiClock className="w-4 h-4 mr-2" />
                      {new Date(project.timeline).toLocaleDateString()}
                    </div>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section>
            <header>
              <h2 className="text-xl font-semibold">Achievements</h2>
            </header>
            <div className="grid gap-4">
              {profileData.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                >
                  <FiBarChart className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {achievement.issuer} •{" "}
                      {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Team Collaboration */}
          {profileData.collaborators.length > 0 && (
            <section>
              <header>
                <h2 className="text-xl font-semibold">Team Members</h2>
              </header>
              <div className="flex flex-wrap gap-2">
                {profileData.collaborators.map((email, index) => (
                  <div
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    {email}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
