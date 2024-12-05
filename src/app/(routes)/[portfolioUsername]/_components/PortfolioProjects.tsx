import React, { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { FaClock, FaPlus, FaTrash } from "react-icons/fa"
import {
  Card,
  CardTitle,
  CardDescription,
  CardActions,
  ProjectLink,
} from "@/components/ui/projectsCard"
import ProjectThumbnail from "../../../../../public/project_thumbnail.jpg"
import PrimaryButton from "@/components/ui/primary-button"
import EditButton from "./EditButton"

interface IProject {
  id?: string
  title: string
  description: string
  link: string
  timeline: string
}

const PortfolioProjects = ({ initialProjects }: any) => {
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState<IProject[]>(initialProjects.projects)
  const { data: session } = useSession()
  const params = useParams()

  const handleInputChange = (index: number, field: keyof IProject, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setProjects(updatedProjects)
  }

  const handleAddProject = () => {
    setProjects([...projects, { title: "", description: "", link: "", timeline: "" }])
  }

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
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
          body: JSON.stringify({ projects }),
        }
      )

      if (response.ok) {
        setIsEditing(false)
      } else {
        const data = await response.json()
        alert(data.message || "Failed to update projects")
      }
    } catch (error) {
      console.error("Error updating projects:", error)
      alert("An error occurred while updating the projects")
    }
  }

  const isAGrid = projects.length > 1

  return (
  projects.length > 0 && (
    <div className="py-32 container mx-auto px-4">
    <h1 className="text-center pb-10 text-3xl uppercase">Projects</h1>

    {isEditing ? (
      <form onSubmit={handleSubmit} className="space-y-6">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 space-y-4">
            <div>
              <label htmlFor={`title-${index}`} className="block text-sm font-medium py-1">Title</label>
              <input
                type="text"
                id={`title-${index}`}
                value={project.title}
                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            className="flex-grow w-full p-2 border border-gray-300 rounded-md"

              />
            </div>
            <div>
              <label htmlFor={`description-${index}`} className="block text-sm font-medium py-1">Description</label>
              <textarea
                id={`description-${index}`}
                value={project.description}
                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                rows={3}
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            className="flex-grow p-2 border border-gray-300 rounded-md w-full"

              />
            </div>
            <div>
              <label htmlFor={`link-${index}`} className="block text-sm font-mediumpy-1">Link</label>
              <input
                type="url"
                id={`link-${index}`}
                value={project.link}
                onChange={(e) => handleInputChange(index, "link", e.target.value)}
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            className="flex-grow p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div>
              <label htmlFor={`timeline-${index}`} className="block text-sm font-medium py-1">Timeline</label>
              <input
                type="date"
                id={`timeline-${index}`}
                value={project.timeline}
                onChange={(e) => handleInputChange(index, "timeline", e.target.value)}
                // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            className="flex-grow p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveProject(index)}
              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaTrash className="mr-2" /> Remove Project
            </button>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddProject}
            className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-green-500"
          >
            <FaPlus className="mr-2" /> Add Project
          </button>
          <div className="flex space-x-2">
            <PrimaryButton
              title="Cancel"
              onClick={() => setIsEditing(false)}
              className="bg-red-500 text-white"
            />
            <PrimaryButton title="Save Changes" type="submit" />
          </div>
        </div>
      </form>
    ) : (
      <div className="relative">
        <div className={`${isAGrid ? "grid grid-cols-1 sm:grid-cols-3 gap-4" : "flex flex-col space-y-4"}`}>
          {projects.map((project: IProject, index: number) => (
            <Card key={index}>
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
              <CardDescription className="flex flex-row items-center">
                <FaClock className="mr-2" /> {new Date(project.timeline).toDateString()}
              </CardDescription>
              <CardActions>
                <ProjectLink link={project.link} />
              </CardActions>
            </Card>
          ))}
        </div>
        {session?.user?.id === initialProjects.userId && (
          <EditButton
            className="float-right mt-5"
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
    )}
  </div>
  )
  )
}

export default PortfolioProjects