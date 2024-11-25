"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { FormFields, LoginFields, LoginSchemaFrontend } from "@/lib/zod"
import { zodResolver } from "@hookform/resolvers/zod"
import email from "next-auth/providers/email"
import { useForm } from "react-hook-form"
import Link from "next/link"

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("")
  const {
    handleSubmit,
    setError,
    reset,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchemaFrontend),
  })
  const router = useRouter()

  const handleOnSubmit = async (data: LoginFields) => {
    const { email, password } = data

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setErrorMessage(result?.error)
      console.log(result?.error)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-10 border border-gray-500 shadow-sm shadow-white rounded-lg">
        <h1 className="text-center text-2xl font-semibold mb-6">
          Login to QPortfolio
        </h1>

        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Enter email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email.."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${
              isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
        </form>
        <h1 className="text-center pt-2 text-md text-red-500">
          {errorMessage}
        </h1>
        <h1 className="text-center mt-5">
          Already have an account?{" "}
          <Link href="/auth/signup" className="text-blue-400 underline">
            Sign Up
          </Link>
        </h1>
      </div>
    </div>
  )
}
