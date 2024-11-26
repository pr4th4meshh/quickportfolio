"use client"
import { registerUser } from "@/actions/registerUser"
import BorderStyleButton from "@/components/ui/border-button"
import { FormFields, SignupSchemaFrontend } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { useForm } from "react-hook-form"

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const {
    handleSubmit,
    setError,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(SignupSchemaFrontend),
  })

  const router = useRouter()

  const handleOnSubmit = async (data: FormFields) => {
    setErrorMessage("")
    try {
      const { name, email, password } = data

      const response = await registerUser(name, email, password)

      if (response?.error) {
        setErrorMessage(response.error)
      } else {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen dark:bg-dark bg-light">
      <div className="w-full max-w-sm p-10 border border-gray-500 shadow-sm shadow-white rounded-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Sign Up to QPortfolio
        </h1>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              Enter name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              placeholder="Enter your name.."
              className="w-full px-3 py-2 border dark:border-gray-300 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Enter email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email.."
              className="w-full px-3 py-2 border dark:border-gray-300 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Enter password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password.."
              className="w-full px-3 py-2 border dark:border-gray-300 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <BorderStyleButton
            title={isSubmitting ? "Submitting..." : "Sign Up"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
        <h1 className="text-center pt-2 text-md text-red-500">
          {errorMessage}
        </h1>
        <h1 className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-400 underline">
            Login
          </Link>
        </h1>
      </div>
    </div>
  )
}

export default SignUp
