import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// The handler for the POST request
export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body from the request
    const { fullName, profession, headline, theme, features, projects } = await req.json();

    // Check for missing required fields
    if (!fullName || !profession || !features || !projects) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Sample userId (replace with actual user logic if using NextAuth)
    const userId = "6735d02865a0df869b179679"; // For testing, replace with a real user ID from NextAuth session

    // Create a new portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        username: "frontend@gmail.com", // Placeholder, you can replace with actual logic
        fullName,
        profession,
        headline,
        theme: theme || 'modern-minimal',  // Default theme if not provided
        features, // Features as an array
        userId,  // Associate with the logged-in user
        projects: {
          create: projects.map((project) => ({
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
