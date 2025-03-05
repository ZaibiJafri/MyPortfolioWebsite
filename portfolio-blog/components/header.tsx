"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"

const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === "/"

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString())
    document.documentElement.classList.toggle("dark", darkMode)
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const menuItems = ["Home", "Blog", "About", "Contact"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage && !isScrolled ? "bg-transparent" : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            onClick={handleHomeClick}
            className={`text-2xl font-bold ${isHomePage && !isScrolled ? "text-white" : "text-foreground"}`}
          >
            Zohaib Hassan
          </Link>
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden text-foreground dark:text-white focus:outline-none mr-4"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                isHomePage && !isScrolled ? "bg-white text-gray-900" : "bg-secondary text-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 bg-background dark:bg-gray-900 shadow-lg md:hidden"
                >
                  <div className="py-4 px-4 space-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item}
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-foreground hover:text-primary transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="hidden md:flex space-x-6 items-center ml-6">
              {menuItems.map((item) => (
                <motion.div key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    onClick={(e) => {
                      if (item === "Home") handleHomeClick(e)
                    }}
                    className={`${
                      isHomePage && !isScrolled
                        ? "text-white hover:text-primary-foreground"
                        : "text-muted-foreground hover:text-primary"
                    } transition-colors`}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

