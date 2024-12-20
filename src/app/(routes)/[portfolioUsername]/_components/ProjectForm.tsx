import Image from "next/image"
import React from "react"
import { FaTrash } from "react-icons/fa6"

interface IProject {
  title: string
  description: string
  link: string
  timeline: string
}

const ProjectForm = ({
  project,
  index,
  handleInputChange,
  handleImageChange,
  handleUploadImage,
  handleRemoveProject,
  imagePreviews,
  uploading,
  uploadProgress,
  imageUploaded,
}: {
  project: IProject
  index: number
  handleInputChange: (
    index: number,
    field: keyof IProject,
    value: string
  ) => void
  handleImageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void
  handleUploadImage: (index: number) => void
  handleRemoveProject: (index: number) => void
  imagePreviews: (string | null)[]
  uploading: boolean
  uploadProgress: number
  imageUploaded: boolean
}) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 space-y-4">
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
          onChange={(e) => handleInputChange(index, "title", e.target.value)}
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
          onChange={(e) => handleInputChange(index, "link", e.target.value)}
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
          onChange={(e) => handleInputChange(index, "timeline", e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div>
        <label
          htmlFor={`image-${index}`}
          className="block text-sm font-medium py-1"
        >
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
        {imageUploaded && (
          <p className="text-blue-400 mt-2">Image uploaded successfully!</p>
        )}
        {!uploading && imagePreviews[index] && (
          <button
            type="button"
            onClick={() => handleUploadImage(index)}
            className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
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
  )
}

export default ProjectForm
