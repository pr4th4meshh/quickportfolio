import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { storage } from "@/lib/firebase" // Adjust the path based on your folder structure
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import DefaultProfileImage from "../../../../../public/qp_default_avatar.jpg"
import PrimaryButton from "@/components/ui/primary-button"
import EditButton from "./EditButton"

const PortfolioHero = ({ profileData, profileData0 }) => {
  const params = useParams()
  const { data: session, update } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState(profileData0?.fullName || "")
  const [profession, setProfession] = useState(profileData0?.profession || "")
  const [headline, setHeadline] = useState(profileData0?.headline || "")
  const [theme, setTheme] = useState(profileData0?.theme || "modern")
  const [file, setFile] = useState(null) 
  const [userData, setUserData] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const userId = session?.user.id
  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`/api/user?username=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      console.log(data, "incominguser data")
      setUserData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
    console.log("useeffect triggered")
  }, [session?.user])
  const handleUpload = async () => {
    if (!file) return

    const storageRef = ref(
      storage,
      `profile_images/${session?.user?.id}_${file.name}`
    )
    try {
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)

      const response = await fetch("/api/user/update-photo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoUrl: downloadURL }), // Send the new image URL
      })

      const data = await response.json()
      if (response.ok) {
        update({ ...session, user: { ...session.user, image: downloadURL } })
      }
      console.log(data)
      alert("Profile image updated successfully!")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedPortfolio = {
      fullName,
      profession,
      headline,
      theme
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

  console.log(session?.user.image)
  console.log("USer", userData)
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
        <div className="w-full sm:w-1/3 flex flex-col items-center space-y-6">
          <div className="relative group">
            <Image
              src={userData?.image || DefaultProfileImage}
              alt={profileData.name}
              width={400}
              height={400}
              className="rounded-full object-cover max-w-full h-[400px]"
            />
          </div>
          {isEditing && (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-4"
              />
              {/* <button
                onClick={handleUpload}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Upload
              </button> */}
             {
              file &&  <PrimaryButton 
              title="Upload profile picture"
                onClick={handleUpload}
                className="bg-orange-500 text-white mt-2 w-full max-w-full border-orange-200"
              />
             }
              <PrimaryButton
                title="Cancel Editing"
                onClick={() => setIsEditing(false)}
                className="w-full max-w-full border border-red-500 bg-transparent text-black dark:text-white transition-colors duration-300 mt-2"
              />
            </div>
          )}
        </div>

        <div className="w-full sm:w-2/3 space-y-6">
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
                {headline}
              </p>
              {session?.user?.id === profileData0?.userId && (
                <EditButton
                  className="mt-4 float-right mr-2"
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
