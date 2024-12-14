import Link from "next/link"
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import {
  FaTwitter,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaMedium,
  FaGlobe,
  FaLinkedin,
  FaBehance,
  FaFigma,
} from "react-icons/fa6"
import { FaExternalLinkAlt, FaProjectDiagram } from "react-icons/fa"
import PrimaryButton from "@/components/ui/primary-button"
import EditButton from "./EditButton"
import { GlareCard } from "@/components/ui/glare-card"

const PortfolioSocials = ({ socialMediaLinksViaPortfolio }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [socialMediaLinks, setSocialMediaLinks] = useState(
    socialMediaLinksViaPortfolio.socialMedia
  )
  const { data: session } = useSession()
  const params = useParams()

  const handleInputChange = (platform: string, value: string) => {
    setSocialMediaLinks((prev: object | any) => ({
      ...prev,
      [platform]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `/api/portfolio?portfolioUsername=${params.portfolioUsername}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ socialLinks: socialMediaLinks }),
        }
      )

      if (response.ok) {
        setIsEditing(false)
      } else {
        const data = await response.json()
        alert(data.message || "Failed to update social media links")
      }
    } catch (error) {
      console.error("Error updating social media links:", error)
      alert("An error occurred while updating the social media links")
    }
  }

  const socialMediaArray = Object.entries(socialMediaLinks).filter(
    ([platform, url]) => url !== null && url !== undefined && url !== ""
  )

  const socialIcons = {
    twitter: FaTwitter,
    dribbble: FaDribbble,
    github: FaGithub,
    instagram: FaInstagram,
    youtube: FaYoutube,
    medium: FaMedium,
    website: FaGlobe,
    linkedin: FaLinkedin,
    behance: FaBehance,
    figma: FaFigma,
    awwwards: FaProjectDiagram,
  }

  return (
    socialMediaArray.length > 0 && (
      <div className="py-20 container mx-auto px-4">
        <h1 className="text-center pb-10 text-3xl uppercase">Socials</h1>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {Object.keys(socialMediaLinks).map((platform) => (
              <div key={platform} className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
                <label
                  htmlFor={platform}
                  className="w-24 text-right capitalize"
                >
                  {platform}:
                </label>
                <input
                  type="url"
                  id={platform}
                  value={socialMediaLinks[platform] || ""}
                  onChange={(e) => handleInputChange(platform, e.target.value)}
                  placeholder={`Enter ${platform} URL`}
                  className="flex-grow p-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-4 mt-4">
              <PrimaryButton
                title="Cancel"
                onClick={() => setIsEditing(false)}
                className="bg-red-500 text-white"
              />
              <PrimaryButton title="Save Changes" type="submit" />
            </div>
          </form>
        ) : (
          <div>
            <div className="grid sm:grid-cols-5 grid-cols-3 gap-6 sm:gap-4">
              {socialMediaArray.length > 0 &&
                socialMediaArray.map(([platform, url]: any, index) => (
                  <div key={index} className="flex justify-center">
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <GlareCard className="flex flex-col justify-center items-center dark:bg-black-900 bg-black-500">
                        <span className="flex items-center justify-center dark:text-white text-black">
                          {React.createElement(
                            socialIcons[platform] || FaExternalLinkAlt,
                            { className: "text-3xl sm:text-5xl" }
                          )}
                        </span>
                      </GlareCard>
                    </Link>
                  </div>
                ))}
            </div>
            {session?.user?.id === socialMediaLinksViaPortfolio.userId && (
              <EditButton
                className="float-right mt-4 sm:mt-0"
                onClick={() => setIsEditing(true)}
              />
            )}
          </div>
        )}
      </div>
    )
  )
}

export default PortfolioSocials