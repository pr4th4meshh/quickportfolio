import { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { NextAuthSessionProvider, Providers } from "./providers"

// testing commits because changed the repo name
const poppins = localFont({
  src: [
    {
      path: "./fonts/Poppins-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Presssence",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <NextAuthSessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <Providers>
            {/* <ServerNavbar /> */}
            {children}
          </Providers>
        </body>
      </html>
    </NextAuthSessionProvider>
  )
}
