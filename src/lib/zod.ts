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

export const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  profession: z.string().min(3, { message: "Profession is required" }),
  headline: z.string().optional(),
  photo: z.string().url().optional(),
  theme: z.object({
    style: z.enum(["modern", "creative", "professional", "bold"]),
    aiGenerated: z.boolean()
  }),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
  }),
  projects: z.array(
    z.object({
      title: z.string().min(1, { message: "Title is required" }),
      description: z.string().min(1, { message: "Description is required" }),
      link: z.string().url().optional(),
      timeline: z.string().optional(),
    })
  ),
  skills: z.array(z.string()).optional(),
  achievements: z.array(
    z.object({
      title: z.string().optional(),
      issuer: z.string().optional(),
      date: z.string().optional(),
    })
  ),
  blogEnabled: z.boolean(),
  analyticsEnabled: z.boolean(),
  collaborators: z.array(z.string()).optional(),
})

export type FormData = z.infer<typeof formSchema>