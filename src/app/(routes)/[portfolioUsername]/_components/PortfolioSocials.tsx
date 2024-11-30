import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"
import Link from "next/link"
import React from "react"
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
import { FaProjectDiagram } from "react-icons/fa"

const PortfolioSocials = ({ socialMediaLinks }: any) => {
  const socialMediaArray = Object.entries(socialMediaLinks).filter(
    ([platform, url]) => url !== null && url !== undefined
  )

  return (
    <div className="grid sm:grid-cols-6 grid-cols-2 gap-6 py-20">
      {socialMediaArray.length === 0 ? (
        <h1 className="text-center col-span-full">
          No social media links available.
        </h1>
      ) : (
        socialMediaArray.map(([platform, url]: any, index) => (
          <Link
            href={{
              pathname: url,
            }}
            target="_blank"
          >
            <CardContainer
              key={index}
              className="inter-var w-[150px] max-w-[150px] cursor-pointer"
            >
              <CardBody className="flex flex-col justify-center items-center relative group/card bg-gray-50 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
                <CardItem translateZ="250">
                  <span className="flex items-center justify-center">
                    {platform === "twitter" ? (
                      <FaTwitter className="text-5xl" />
                    ) : platform === "dribbble" ? (
                      <FaDribbble className="text-5xl" />
                    ) : platform === "github" ? (
                      <FaGithub className="text-5xl" />
                    ) : platform === "instagram" ? (
                      <FaInstagram className="text-5xl" />
                    ) : platform === "youtube" ? (
                      <FaYoutube className="text-5xl" />
                    ) : platform === "medium" ? (
                      <FaMedium className="text-5xl" />
                    ) : platform === "website" ? (
                      <FaGlobe className="text-5xl" />
                    ) : platform === "linkedin" ? (
                      <FaLinkedin className="text-5xl" />
                    ) : platform === "behance" ? (
                      <FaBehance className="text-5xl" />
                    ) : platform === "figma" ? (
                      <FaFigma className="text-5xl" />
                    ) : platform === "awwwards" ? (
                      <FaProjectDiagram className="text-5xl" />
                    ) : null}
                  </span>
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-2">
                  <h1 className="text-center text-sm font-medium">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </h1>
                </CardItem>
              </CardBody>
            </CardContainer>
          </Link>
        ))
      )}
    </div>
  )
}

export default PortfolioSocials
