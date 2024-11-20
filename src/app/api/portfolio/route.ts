import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IProject {
  title: string;
  description: string;
  link: string;
  timeline: string;
}

// The handler for the POST request
export async function POST(req: Request) {
  try {

    const { fullName, profession, headline, theme, features, projects, username } = await req.json();

        // Sample userId
    const userId = "6735d02865a0df869b179679";

    const existingPortfolioByUsername = await prisma.portfolio.findFirst({
      where: {
        userId
      }
    })
    
    if(existingPortfolioByUsername) {
      return NextResponse.json({ message: "User already has a portfolio" }, { status: 400 });
    }

    // checking for missing required fields
    if (!fullName || !profession || !features || !projects) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // create a new portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        username,
        fullName,
        profession,
        headline,
        theme: theme || 'modern-minimal',  // Default theme if not provided
        features, // Features as an array
        userId,  // Associate with the logged-in user
        projects: {
          create: projects.map((project: IProject) => ({
            title: project.title,
            description: project.description,
            link: project.link || '',
            timeline: project.timeline || '',
          })),
        },
      },
    });

    // Return the created portfolio in the response
    return NextResponse.json({ portfolio }, { status: 201 });

  } catch (error) {
    console.error('Error creating portfolio:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const portfolioId = url.searchParams.get("portfolioId");

    if (!portfolioId) {
      return NextResponse.json({ message: "Missing portfolioId" }, { status: 400 });
    }

    const portfolio = await prisma.portfolio.findUnique({
      where: {
        id: portfolioId,
      },
    });

    if (!portfolio) {
      return NextResponse.json({ message: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json({ portfolio }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}