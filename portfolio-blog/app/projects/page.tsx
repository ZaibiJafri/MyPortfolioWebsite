"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "To-Do List App",
    description: "A responsive To-Do list app with currency converter functionality.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    liveUrl: "https://todolistwithcc.surge.sh",
    githubUrl: "https://github.com/zaibijafri/Todolist-with-CurrencyConverter",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Car Rental Web Design",
    description: "A responsive car rental website design.",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    liveUrl: "",
    githubUrl: "https://github.com/ZaibiJafri/Car-Rental-Web-Design",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 3,
    title: "E-commerce Website",
    description: "An e-commerce website with an intuitive and visually appealing user interface.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    liveUrl: "https://ecomsite.pages.dev",
    githubUrl: "https://github.com/ZaibiJafri/Ecomsite",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Spotify Clone",
    description: "A Spotify clone website with integrated multimedia elements and interactivity.",
    image:
      "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    liveUrl: "",
    githubUrl: "https://github.com/ZaibiJafri/spotifyclone",
    tags: ["HTML", "CSS", "JavaScript"],
  },
]

const categories = ["All", "HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All")

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.tags.includes(filter))

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gradient mt-16" // Added mt-16 for top margin
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h1>

        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((tag, index) => (
            <motion.button
              key={tag}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === tag
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
              onClick={() => setFilter(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden card-hover"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-48">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400 mr-4"
                  >
                    <ExternalLink className="w-6 h-6" />
                  </Link>
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-blue-400"
                  >
                    <Github className="w-6 h-6" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

