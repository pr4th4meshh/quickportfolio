import { z } from "zod"

export const SignupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
})

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// frontend validation
export const SignupSchemaFrontend = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
})

export const LoginSchemaFrontend = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})  

export type FormFields = z.infer<typeof SignupSchemaFrontend>
export type LoginFields = z.infer<typeof LoginSchemaFrontend>