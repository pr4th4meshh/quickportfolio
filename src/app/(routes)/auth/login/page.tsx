"use client"
import { FormFields, LoginFields, LoginSchemaFrontend } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { handleSubmit, setError,reset, register, formState: { errors, isSubmitting } } = useForm<FormFields>({
    resolver: zodResolver(LoginSchemaFrontend)
  })

  const handleOnSubmit = async (data: LoginFields) => {
    try {
      const { email, password } = data;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        alert('Something went wrong try again')
      }

      if(response.ok) {
        reset()
        alert("User logged in successfully")
      }
    } catch (error) {
      console.error(error)
      alert(error.message || 'An error occurred')
      setError("email", { message: "Email is already taken" })
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-full max-w-sm'>
        <h1 className="text-center text-2xl font-semibold mb-6">Login</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Enter email</label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Enter password</label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md ${isSubmitting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login