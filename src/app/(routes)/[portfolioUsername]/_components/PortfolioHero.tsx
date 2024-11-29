import Link from "next/link"
import React from "react"
import { FaTwitter, FaLinkedin, FaGithub, FaQuoteRight } from "react-icons/fa6"
import { FiEdit, FiThumbsUp } from "react-icons/fi"
import Image from "next/image"
import { useSession } from "next-auth/react"
import DefaultProfileImage from "../../../../../public/qp_default_avatar.jpg"
import { FaQuoteLeft } from "react-icons/fa"
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri"

const PortfolioHero = ({
  session,
  params,
  profileData,
  profileData0,
  handleEndorsement,
}: any) => {
  return (
    <div className="flex flex-col sm:flex-row justify-evenly min-h-[600px] items-center">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <Image
            src={
              session.data?.user.image
                ? session.data?.user.image
                : DefaultProfileImage
            }
            alt={profileData.name}
            quality={100}
            unoptimized={true}
            objectFit="cover"
            width={200}
            height={200}
            className="rounded-full h-[250px] w-[250px] border-4 border-background object-cover"
          />
         <div className="flex justify-center">
          <button className="pt-3 flex items-center border-b">Edit Avatar</button>
         </div>
        </div>
      </div>

<div>
        <div>
          <h1 className="text-4xl sm:text-6xl font-bold">{profileData0?.fullName}</h1>
          <p className="sm:text-start text-center text-2xl sm:text-4xl mt-2">{profileData0?.profession}</p>
        </div>
        <br />
        <p className="text-2xl italic mx-auto flex">
          <RiDoubleQuotesL className="mr-2" /> {profileData0?.headline}{" "}
          <RiDoubleQuotesR className="ml-2" />
        </p>
    </div>
    </div>
  )
}

export default PortfolioHero
