"use client"
import React from "react"
import PrimaryButton from "./ui/primary-button"
import { signIn } from "next-auth/react"

const SigninWGoogle = () => {
  const handleSignIn = () => {
    signIn("google")
    console.log("clicked")
  }
  return <PrimaryButton title="Sign in with Google" onClick={handleSignIn} />
}

export default SigninWGoogle
