"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Code, PenTool, Server, Zap, Database, Globe } from "lucide-react"

const skills = [
  { name: "React", level: 90, category: "Frontend", icon: Code },
  { name: "Next.js", level: 85, category: "Frontend", icon: Zap },
  { name: "TypeScript", level: 80, category: "Frontend", icon: Code },
  { name: "Node.js", level: 75, category: "Backend", icon: Server },
  { name: "Express", level: 70, category: "Backend", icon: Server },
  { name: "MongoDB", level: 65, category: "Database", icon: Database },
  { name: "PostgreSQL", level: 60, category: "Database", icon: Database },
  { name: "GraphQL", level: 55, category: "API", icon: Globe },
  { name: "UI/UX Design", level: 70, category: "Design", icon: PenTool },
]

const categories = ["All", ...new Set(skills.map((skill) => skill.category))]

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = skills.filter((skill) => selectedCategory === "All" || skill.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary py-16">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center text-primary"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h1>

        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium mx-2 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-card text-card-foreground rounded-lg shadow-lg p-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <div className="flex items-center mb-4">
                  <skill.icon className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                        {skill.category}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-primary">{skill.level}%</span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-4 text-sm text-muted-foreground"
                    >
                      {getSkillDescription(skill.name)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function getSkillDescription(skillName: string): string {
  const descriptions: { [key: string]: string } = {
    React: "Building interactive user interfaces with reusable components.",
    "Next.js": "Creating server-side rendered and statically generated React applications.",
    TypeScript: "Adding static typing to JavaScript for improved developer experience and code quality.",
    "Node.js": "Developing scalable server-side applications with JavaScript.",
    Express: "Building web applications and APIs with Node.js.",
    MongoDB: "Working with NoSQL databases for flexible and scalable data storage.",
    PostgreSQL: "Managing relational databases for structured data.",
    GraphQL: "Implementing efficient and flexible APIs for modern applications.",
    "UI/UX Design": "Creating intuitive and visually appealing user interfaces and experiences.",
  }
  return descriptions[skillName] || "Enhancing web development capabilities."
}

