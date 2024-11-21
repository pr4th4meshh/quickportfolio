"use client"

import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  FaChevronRight,
  FaPalette,
  FaChartBar,
  FaBook,
  FaMagic
} from "react-icons/fa"
import { WavyBackground } from "@/components/ui/wavy-background"
import PrimaryButton from "@/components/ui/primary-button"
import { BiLeftArrowAlt } from "react-icons/bi"
import { useRouter } from "next/navigation"
// import { toast } from '@/components/ui/use-toast'

const formSchema = z.object({
  username: z.string().min(3).max(20),
  fullName: z.string().min(2).max(50),
  profession: z.string().min(2).max(50),
  headline: z.string().max(160),
  theme: z
    .enum(["modern", "creative", "professional", "bold"])
    .default("modern"),
  features: z.array(z.string()),
  projects: z.array(
    z.object({
      title: z.string().min(3).max(50),
      description: z.string().max(500),
      link: z.string().url().optional(),
      timeline: z.string(),
    })
  ),
  blogEnabled: z.boolean(),
  analyticsEnabled: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [aiGeneratedColors, setAiGeneratedColors] = useState({
    primary: "#3b82f6",
    secondary: "#10b981",
    background: "#ffffff",
    text: "#1f2937",
  })

  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "modern",
      blogEnabled: false,
      analyticsEnabled: false,
      features: [],
      projects: [{ title: "", description: "", link: "", timeline: "" }],
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const features = []
      features.push("Java")
      features.push("Python")
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, features }),
      })
      setIsLoading(false)
      if (!res.ok) {
        throw new Error("Failed to create portfolio")
      } else {
        router.push(`/${data.username}`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setStep((prev) => (prev -= 1))
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  })

  const generateAIColorScheme = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a color scheme for a ${watch(
            "profession"
          )} with a ${watch(
            "theme"
          )} style. Return only a JSON object with primary, secondary, background, and text colors in hex format.`,
          max_tokens: 100,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate color scheme")
      }

      const data = await response.json()
      const colors = JSON.parse(data.result)
      setAiGeneratedColors(colors)

      toast({
        title: "Color Scheme Generated",
        description: "AI has created a unique color scheme for your profile.",
      })
    } catch (error) {
      console.error("Error generating color scheme:", error)
      toast({
        title: "Error",
        description: "Failed to generate color scheme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIContent = async (
    field: "headline" | "projectDescription"
  ) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Generate a ${field} for a ${watch(
            "profession"
          )} named ${watch("name")}. Keep it concise and professional.`,
          max_tokens: 50,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to generate ${field}`)
      }

      const data = await response.json()
      setValue(field, data.result.trim())

      toast({
        title: `${field.charAt(0).toUpperCase() + field.slice(1)} Generated`,
        description: `AI has created a ${field} for your profile.`,
      })
    } catch (error) {
      console.error(`Error generating ${field}:`, error)
      toast({
        title: "Error",
        description: `Failed to generate ${field}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <WavyBackground>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full sm:w-[600px] max-w-lg dark:bg-black dark:text-white text-black bg-white shadow-sm dark:shadow-white rounded-lg p-6">
          <h1 className="text-2xl font-semibold">
            Create Your Enhanced Portfolio
          </h1>
          <p className="text-sm text-gray-500">Step {step} of 4</p>

          {step > 1 && (
            <button
              className="flex justify-center items-center underline underline-offset-2 mb-3"
              onClick={handlePrevious}
            >
              <BiLeftArrowAlt />
              Go back
            </button>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div>
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium"
                  >
                    Choose your username
                  </label>
                  <input
                    id="username"
                    placeholder="yourname"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-sm text-red-500">
                      {errors.username.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    This will be your profile URL: quickportfolio.com/
                    {watch("username") || "yourname"}
                  </p>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="space-y-2">
                  <label
                    htmlFor="profession"
                    className="block text-sm font-medium"
                  >
                    What do you do?
                  </label>
                  <input
                    id="profession"
                    placeholder="Software Engineer"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("profession")}
                  />
                  {errors.profession && (
                    <p className="text-sm text-red-500">
                      {errors.profession.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="headline"
                    className="block text-sm font-medium"
                  >
                    Your headline
                  </label>
                  <div className="flex space-x-2">
                    <textarea
                      id="headline"
                      placeholder="Building the future of web..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("headline")}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-md dark:bg-black bg-white hover:bg-gray-200 focus:outline-none"
                      onClick={() => generateAIContent("headline")}
                      disabled={isLoading}
                    >
                      <FaMagic className="w-4 h-4" />
                    </button>
                  </div>
                  {errors.headline && (
                    <p className="text-sm text-red-500">
                      {errors.headline.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="features"
                    className="block text-sm font-medium"
                  >
                    Your Features
                  </label>
                  <div className="flex space-x-2">
                    <textarea
                      id="features"
                      placeholder="Java, Python..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      {...register("features")}
                    />
                    <button
                      type="button"
                      className="px-3 py-2 border border-gray-300 rounded-md dark:bg-black bg-white hover:bg-gray-200 focus:outline-none"
                      onClick={() => generateAIContent("headline")}
                      disabled={isLoading}
                    >
                      <FaMagic className="w-4 h-4" />
                    </button>
                  </div>
                  {errors.features && (
                    <p className="text-sm text-red-500">
                      {errors.features.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="space-y-2">
                  <label htmlFor="theme" className="block text-sm font-medium">
                    Choose Your Theme
                  </label>
                  <select
                    id="theme"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("theme")}
                  >
                    <option value="modern">Modern Minimal</option>
                    <option value="creative">Creative</option>
                    <option value="professional">Professional</option>
                    <option value="bold">Bold & Dynamic</option>
                  </select>
                  <button
                    type="button"
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md dark:bg-black bg-white focus:outline-none"
                    onClick={generateAIColorScheme}
                    disabled={isLoading}
                  >
                    <FaPalette className="w-4 h-4 mr-2" />
                    {isLoading ? "Generating..." : "Generate AI Color Scheme"}
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Enable Features
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`w-full px-3 py-2 border ${
                        watch("analyticsEnabled")
                          ? "bg-blue-500 text-white"
                          : "dark:bg-black dark:text-white text-black bg-white"
                      } rounded-md`}
                      onClick={() =>
                        setValue("analyticsEnabled", !watch("analyticsEnabled"))
                      }
                    >
                      <FaChartBar className="w-4 h-4 mr-2" />
                      Analytics
                    </button>
                    <button
                      type="button"
                      className={`w-full px-3 py-2 border ${
                        watch("blogEnabled")
                          ? "bg-blue-600 text-white"
                          : "dark:bg-black dark:text-white text-black bg-white"
                      } rounded-md`}
                      onClick={() =>
                        setValue("blogEnabled", !watch("blogEnabled"))
                      }
                    >
                      <FaBook className="w-4 h-4 mr-2" />
                      Blog
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="space-y-2 p-4 border border-input rounded-md"
                  >
                    <label
                      htmlFor={`projects.${index}.title`}
                      className="block text-sm font-medium"
                    >
                      Project Title
                    </label>
                    <input
                      id={`projects.${index}.title`}
                      placeholder="Project Title"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      {...register(`projects.${index}.title` as const)}
                    />
                    {errors.projects?.[index]?.title && (
                      <p className="text-sm text-destructive">
                        {errors.projects[index].title.message}
                      </p>
                    )}

                    <label
                      htmlFor={`projects.${index}.description`}
                      className="block text-sm font-medium"
                    >
                      Project Description
                    </label>
                    <textarea
                      id={`projects.${index}.description`}
                      placeholder="Describe your project"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      {...register(`projects.${index}.description` as const)}
                    />
                    {errors.projects?.[index]?.description && (
                      <p className="text-sm text-destructive">
                        {errors.projects[index].description.message}
                      </p>
                    )}

                    <label
                      htmlFor={`projects.${index}.link`}
                      className="block text-sm font-medium"
                    >
                      Project Link
                    </label>
                    <input
                      id={`projects.${index}.link`}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      {...register(`projects.${index}.link` as const)}
                    />
                    {errors.projects?.[index]?.link && (
                      <p className="text-sm text-destructive">
                        {errors.projects[index].link.message}
                      </p>
                    )}

                    <label
                      htmlFor={`projects.${index}.timeline`}
                      className="block text-sm font-medium"
                    >
                      Project Timeline
                    </label>
                    <input
                      id={`projects.${index}.timeline`}
                      type="date"
                      className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                      {...register(`projects.${index}.timeline` as const)}
                    />
                    {errors.projects?.[index]?.timeline && (
                      <p className="text-sm text-destructive">
                        {errors.projects[index].timeline.message}
                      </p>
                    )}

                    <button
                      type="button"
                      className="text-destructive"
                      onClick={() => remove(index)}
                    >
                      Remove Project
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent focus:outline-none"
                  onClick={() =>
                    append({
                      title: "",
                      description: "",
                      link: "",
                      timeline: "",
                    })
                  }
                >
                  Add Another Project
                </button>
              </div>
            )}

            <div className="flex justify-between">
              {step < 4 ? (
                <PrimaryButton
                  title="Next Step"
                  onClick={handleNext}
                  icon={<FaChevronRight className="mr-1" />}
                />
              ) : (
                <PrimaryButton
                  title={isLoading ? "Creating Profile..." : "Create Profile"}
                  type="submit"
                  disabled={isLoading}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </WavyBackground>
  )
}
