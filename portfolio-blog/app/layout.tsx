import type React from "react"
import ClientLayout from "./clientLayout"
import type { Metadata } from "next"
import Footer from "@/components/footer"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zohaib Hassan - Web Developer Portfolio",
  description:
    "Explore the projects, skills, and insights of Zohaib Hassan, a passionate web developer creating stunning digital experiences.",
  keywords: "web development, portfolio, React, Next.js, Tailwind CSS, blog",
  authors: [{ name: "Zohaib Hassan" }],
  openGraph: {
    title: "Zohaib Hassan - Web Developer Portfolio",
    description:
      "Explore the projects, skills, and insights of Zohaib Hassan, a passionate web developer creating stunning digital experiences.",
    url: "https://zohaib-hassan-portfolio.com",
    siteName: "Zohaib Hassan Portfolio",
    images: [
      {
        url: "https://zohaib-hassan-portfolio.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zohaib Hassan - Web Developer Portfolio",
    description:
      "Explore the projects, skills, and insights of Zohaib Hassan, a passionate web developer creating stunning digital experiences.",
    images: ["https://zohaib-hassan-portfolio.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientLayout>
      <div className={`flex flex-col min-h-screen ${inter.className}`}>
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ClientLayout>
  )
}



import './globals.css'