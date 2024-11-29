import {
  Card,
  CardSkeletonContainer,
  CardTitle,
  CardDescription,
  CardActions,
  ProjectLink,
} from "@/components/ui/projectsCard"
import Image from "next/image"
import React from "react"
import ProjectThumbnail from "../../../../../public/project_thumbnail.jpg"
import { FaClock, FaTimes } from "react-icons/fa"

interface IProject {
  title: string
  description: string
  link: string
  timeline: string
}

const PortfolioProjects = ({ projects }: any) => {
  const isAGrid = projects.length > 1
  const formattedDate = new Date(projects[0]?.timeline).toLocaleDateString()
  return (
    <div
      className={`py-[100px] ${isAGrid ? "grid grid-cols-2 gap-4" : "flex"}`}
    >
      {projects.map((project: IProject) => (
        <Card>
          <Image
            src={ProjectThumbnail}
            alt={project.title}
            width={200}
            height={200}
            className="border-2 border-background h-[250px] w-full object-cover"
            quality={100}
          />
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
          <CardDescription className="flex flex-row items-center"> <FaClock className="mr-2" /> {formattedDate}</CardDescription>
          <CardActions>
            <ProjectLink link={project.link} />
          </CardActions>
        </Card>
      ))}
    </div>
  )
}

export default PortfolioProjects
