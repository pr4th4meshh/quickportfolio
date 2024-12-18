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
import { storage } from "@/lib/firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

interface IProject {
  id?: string
  title: string
  description: string
  link: string
  timeline: string
  coverImage?: string
}

const PortfolioProjects = ({
  initialProjects,
}: {
  initialProjects: { projects: IProject[]; userId: string }
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [projects, setProjects] = useState<IProject[]>(initialProjects.projects)
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(
    new Array(initialProjects.projects.length).fill(null)
  );
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUploaded, setImageUploaded] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const { data: session } = useSession()
  const params = useParams()

  let progress = 0

  const handleInputChange = (
    index: number,
    field: keyof IProject,
    value: string
  ) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setProjects(updatedProjects)
  }

  const handleAddProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", link: "", timeline: "" },
    ])
    setImagePreviews([...imagePreviews, null])
  }

  const handleRemoveProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      // Preview the selected image
      const reader = new FileReader()
      reader.onloadend = () => {
        const updatedPreviews = [...imagePreviews];
        updatedPreviews[index] = reader.result as string; // Set preview for the specific project
        setImagePreviews(updatedPreviews);
        setSelectedFile(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadImage = async (index: number) => {
    if (!selectedFile) return

    setUploading(true)
    const storageRef = ref(storage, `/projects/${selectedFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setUploadProgress(progress)
      },
      (error) => {
        console.error("Upload failed:", error)
        setUploading(false)
      },
      async () => {
        // Once the image is uploaded, get the download URL
        setImageUploaded(true)
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        const updatedProjects = [...projects]
        updatedProjects[index] = {
          ...updatedProjects[index],
          coverImage: downloadURL,
        }
        setProjects(updatedProjects)
        setUploading(false)
      }
    )
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
        <h1 className="text-center pb-10 text-2xl uppercase">Projects</h1>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 space-y-4"
              >
                <div>
                  <label
                    htmlFor={`title-${index}`}
                    className="block text-sm font-medium py-1"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    value={project.title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                    className="flex-grow w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`description-${index}`}
                    className="block text-sm font-medium py-1"
                  >
                    Description
                  </label>
                  <textarea
                    id={`description-${index}`}
                    value={project.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    rows={3}
                    className="flex-grow p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`link-${index}`}
                    className="block text-sm font-medium py-1"
                  >
                    Link
                  </label>
                  <input
                    type="url"
                    id={`link-${index}`}
                    value={project.link}
                    onChange={(e) =>
                      handleInputChange(index, "link", e.target.value)
                    }
                    className="flex-grow p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor={`timeline-${index}`}
                    className="block text-sm font-medium py-1"
                  >
                    Timeline
                  </label>
                  <input
                    type="date"
                    id={`timeline-${index}`}
                    value={project.timeline}
                    onChange={(e) =>
                      handleInputChange(index, "timeline", e.target.value)
                    }
                    className="flex-grow p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>

                <div>
                  <label htmlFor={`image-${index}`} className="block text-sm font-medium py-1">
                    Project Image
                  </label>
                  <input
                    type="file"
                    id={`image-${index}`}
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="block w-full p-2 border border-gray-300 rounded-md"
                  />
                  {imagePreviews[index] && (
                    <div className="mt-4">
                      <Image
                        src={imagePreviews[index]!}
                        alt="Image Preview"
                        className="h-32 w-32 object-cover border rounded-xl dark:border-white border-black"
                        height={100}
                        width={100}
                      />
                    </div>
                  )}
                  {uploading && <p>Uploading... {uploadProgress}%</p>}
                  {imageUploaded && <p className="text-blue-400 mt-2">Image uploaded successfully! Click Save changes to apply the changes.</p>}
                  {!uploading && imagePreviews[index] && (
                    <button
                      type="button"
                      // disabled={!selectedFile || imageUploaded}
                      onClick={() => handleUploadImage(index)}
                      className="mt-2 inline-flex items-center disabled:opacity-80 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Upload Image
                    </button>
                  )}
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
            <div
              className={`${
                isAGrid ? "grid grid-cols-1 sm:grid-cols-3 gap-4" : "flex flex-col space-y-4"
              }`}
            >
              {projects.map((project: IProject, index: number) => (
                <Card key={index}>
                  <Image
                    src={project.coverImage || ProjectThumbnail}
                    alt={project.title}
                    width={200}
                    height={200}
                    className="border-2 border-background h-[250px] w-full object-cover"
                    quality={100}
                  />
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                  <CardDescription className="flex flex-row items-center">
                    <FaClock className="mr-2" />
                    {new Date(project.timeline).toDateString()}
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