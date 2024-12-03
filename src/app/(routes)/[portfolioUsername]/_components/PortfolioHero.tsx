import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri"
import Image from "next/image"
import DefaultProfileImage from "../../../../../public/qp_default_avatar.jpg"
import PrimaryButton from "@/components/ui/primary-button"
import EditButton from "./EditButton"
import { useParams } from "next/navigation"

const PortfolioHero = ({ profileData, profileData0 }: any) => {
  const params = useParams()
  const { data: session } = useSession()

  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profileData0?.fullName || "")
  const [profession, setProfession] = useState(profileData0?.profession || "")
  const [headline, setHeadline] = useState(profileData0?.headline || "")
  const [theme, setTheme] = useState(profileData0?.theme || "modern")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updatedPortfolio = {
      fullName,
      profession,
      headline,
      theme,
    }

    try {
      const response = await fetch(
        `/api/portfolio?portfolioUsername=${params.portfolioUsername}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPortfolio),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setIsEditing(false)
      } else {
        alert(data.message || "Failed to update portfolio")
      }
    } catch (error) {
      console.error("Error updating portfolio:", error)
      alert("An error occurred while updating the portfolio")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
        <div className="w-full md:w-1/3 flex flex-col items-center space-y-6">
          <div className="relative group">
            <Image
              src={DefaultProfileImage}
              alt={profileData.name}
              width={250}
              height={250}
              className="rounded-full object-cover transition-all duration-300 group-hover:border-secondary"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-medium">
                Edit Avatar
              </span>
            </div>
          </div>
          {isEditing && (
            <PrimaryButton
              title="Cancel Editing"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-300"
            />
          )}
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Profession
                </label>
                <input
                  type="text"
                  id="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="headline"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Headline
                </label>
                <textarea
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Theme
                </label>
                <select
                  id="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary"
                >
                  <option value="modern">Modern</option>
                  <option value="creative">Creative</option>
                  <option value="professional">Professional</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              <PrimaryButton
                title="Save Changes"
                type="submit"
                className="w-full"
              />
            </form>
          ) : (
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100">
                {fullName}
              </h1>
              <p className="text-2xl md:text-4xl text-black dark:text-white">
                {profession}
              </p>
                <p className="text-xl md:text-2xl flex italic dark:text-white text-black dpy-4">
                  <RiDoubleQuotesL className="text-2xl mr-2" />
                  {headline}
                  <RiDoubleQuotesR className="text-2xl ml-2" />
                </p>
              {session?.user?.id === profileData0?.userId && (
                <EditButton
                  className="mt-4 float-right"
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioHero
