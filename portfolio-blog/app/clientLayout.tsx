"use client"

import type React from "react"

import { Inter } from "next/font/google"
import Header from "@/components/header"
import BackToTop from "@/components/back-to-top"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Implement smooth scrolling
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <Header />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
        <BackToTop />
      </body>
    </html>
  )
}

