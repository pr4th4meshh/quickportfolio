import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
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

const PortfolioSocials = ({socialMediaLinksViaPortfolio} :any ) => {
  const [isEditing, setIsEditing] = useState(false)
  const [socialMediaLinks, setSocialMediaLinks] = useState(socialMediaLinksViaPortfolio.socialMedia)
  const { data: session } = useSession()
  const params = useParams()

  const handleInputChange = (platform: string, value: string) => {
    setSocialMediaLinks((prev: object | any) => ({ ...prev, [platform]: value }))
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
    <div className="py-20 container mx-auto px-4">
      <h1 className="text-center pb-10 text-3xl uppercase">Socials</h1>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(socialMediaLinks).map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <label htmlFor={platform} className="w-24 text-right capitalize">
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
          <div className="flex justify-end space-x-2">
            <PrimaryButton
              title="Cancel"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white"
            />
            <PrimaryButton title="Save Changes" type="submit" />
          </div>
        </form>
      ) : (
        <div className="relative">
          <div className="grid sm:grid-cols-6 grid-cols-2 gap-6">
            {socialMediaArray.length === 0 ? (
              <h1 className="text-center col-span-full">
                No social media links available.
              </h1>
            ) : (
              socialMediaArray.map(([platform, url]: any, index) => (
                // <CardContainer key={index} className="inter-var cursor-pointer h-[150px] max-h-[150px] w-[150px] max-w-[150px]">
                //   <CardBody className="flex flex-col justify-center items-center bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
                //     <Link href={url} target="_blank" rel="noopener noreferrer">
                //       <CardItem translateZ="250">
                //         <span className="flex items-center justify-center">
                //           {React.createElement(socialIcons[platform] || FaExternalLinkAlt, { className: "text-5xl" })}
                //         </span>
                //       </CardItem>
                //     </Link>
                //     <CardItem translateZ="100" className="w-full mt-2">
                //       <h1 className="text-center text-sm font-medium capitalize">
                //         {platform}
                //       </h1>
                //     </CardItem>
                //   </CardBody>
                // </CardContainer>
                <div key={index}>
                  <Link href={url} target="_blank" rel="noopener noreferrer">
                  <GlareCard className=" flex  justify-center items-center">
                      <div>
                         <span className="flex items-center justify-center">
                           {React.createElement(socialIcons[platform] || FaExternalLinkAlt, { className: "text-5xl" })}
                         </span>
                      </div>
                </GlareCard>
                </Link>
                </div>
              ))
            )}
          </div>
          {session?.user?.id === socialMediaLinksViaPortfolio.userId && (
            <EditButton
              className="float-right"
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default PortfolioSocials