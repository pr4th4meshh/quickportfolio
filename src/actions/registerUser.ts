"use server"

import { signIn } from "next-auth/react"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

interface IFormData { 
  name: string
  email: string
  password: string
}

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User already exists" }
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        portfolio: {
          create: [],
        },
      },
    })

    // Sign in the user
    const response = await signIn("credentials", { email, password })
    
    if(response?.error) {
      return { error: response.error}
    }

    return { success: true}
  } catch (error) {
    console.error("Registration error:", error)
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: IFormData
) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}
