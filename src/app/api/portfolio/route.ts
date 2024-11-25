import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface IProject {
  title: string
  description: string
  link: string
  timeline: string
}

interface ISocialLink {
  twitter: string
  linkedin: string
  github: string
  instagram: string
  youtube: string
  medium: string
  website: string
  behance: string
  figma: string
  awwwards: string
  dribbble: string
}

// export async function POST(req: Request) {
//   try {
//     const {
//       fullName,
//       profession,
//       headline,
//       theme,
//       features,
//       projects,
//       username,
//       github,
//       instagram,
//       youtube,
//       medium,
//       website,
//       behance,
//       figma,
//       awwwards,
//       dribbble,
//     } = await req.json()

//     // Sample userId
//     const userId = "6735d02865a0df869b179680"

//     // const existingPortfolioByUsername = await prisma.portfolio.findFirst({
//     //   where: {
//     //     userId
//     //   }
//     // })

//     // if(existingPortfolioByUsername) {
//     //   return NextResponse.json({ message: "User already has a portfolio" }, { status: 400 });
//     // }

//     // checking for missing required fields
//     if (!fullName || !profession || !features || !projects) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       )
//     }

//     // create a new portfolio
//     const portfolio = await prisma.portfolio.create({
//       data: {
//         username,
//         fullName,
//         profession,
//         headline,
//         theme: theme || "modern",
//         features,
//         userId,
//         socialLinks: {
          
//         },
//         projects: {
//           create: projects.map((project: IProject) => ({
//             title: project.title,
//             description: project.description,
//             link: project.link || "",
//             timeline: project.timeline || "",
//           })),
//         },
//       },
//     })

//     // Return the created portfolio in the response
//     return NextResponse.json({ portfolio }, { status: 201 })
//   } catch (error) {
//     console.error("Error creating portfolio:", error)
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     )
//   }
// }

export async function POST(req: Request) {
  try {
    const {
      fullName,
      profession,
      headline,
      theme,
      features,
      projects,
      username,
      socialLinks,
    } = await req.json()

    // Sample userId
    const userId = "674075b9c0aa30dc22aee4d6"

    // Checking for missing required fields
    if (!fullName || !profession || !features || !projects ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create a new portfolio with the socialLinks
    const portfolio = await prisma.portfolio.create({
      data: {
        username,
        fullName,
        profession,
        headline,
        theme: theme || "modern",
        features,
        userId,
        // socialLinks: socialLinks ? [socialLinks] : [],
        socialMedia: {
          create: socialLinks,
        },
        projects: {
          create: projects.map((project: IProject) => ({
            title: project.title,
            description: project.description,
            link: project.link || "",
            timeline: project.timeline || "",
          })),
        },
      },
      include: {
        socialMedia: true,
        projects: true,
      }
    })

    // Return the created portfolio in the response
    return NextResponse.json({ portfolio }, { status: 201 })
  } catch (error) {
    console.error("Error creating portfolio:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const portfolioUsername = url.searchParams.get("portfolioId")

    if (!portfolioUsername) {
      return NextResponse.json(
        { message: "Missing userId" },
        { status: 400 }
      )
    }

    // const findUser = await prisma.user.findFirst({
    //   where: {
    //     name: portfolioUsername,
    //   },
    // })

    // console.log("userId", findUser);

    // if (!findUser) {
    //   return NextResponse.json(
    //     { message: "User Id not found" },
    //     { status: 404 }
    //   )
    // }

    const portfolio = await prisma.portfolio.findFirst({
      where: {
        id: portfolioUsername,
      },
      include: {
        projects: true,
        socialMedia: true,
      },
    })

    if (!portfolio) {
      return NextResponse.json(
        { message: "Portfolio not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(portfolio, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
