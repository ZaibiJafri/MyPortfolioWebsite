"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, Clock } from "lucide-react"

// This would typically come from a CMS or API
const allPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "2023-07-01",
    readTime: "5 min read",
    excerpt: "Exploring upcoming trends and technologies that will shape the future of web development.",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  },
  {
    id: 2,
    title: "Mastering Next.js: Tips and Tricks",
    date: "2023-06-15",
    readTime: "7 min read",
    excerpt: "Learn how to leverage Next.js features for optimal performance and developer experience.",
    category: "Tutorial",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "The Power of Tailwind CSS",
    date: "2023-06-01",
    readTime: "6 min read",
    excerpt: "How Tailwind CSS can streamline your styling workflow and boost productivity.",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    date: "2023-05-15",
    readTime: "8 min read",
    excerpt: "Best practices and techniques for creating inclusive and accessible web experiences.",
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 5,
    title: "Optimizing React Performance",
    date: "2023-05-01",
    readTime: "10 min read",
    excerpt: "Strategies and techniques to boost the performance of your React applications.",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

const categories = ["All", ...new Set(allPosts.map((post) => post.category))]

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPosts, setFilteredPosts] = useState(allPosts)

  useEffect(() => {
    const filtered = allPosts.filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setFilteredPosts(filtered)
  }, [selectedCategory, searchTerm])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pt-24">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-8 text-center text-gradient"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Blog
        </motion.h1>

        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex flex-wrap justify-center gap-2 mb-4 sm:mb-0">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
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
            </div>
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-full bg-secondary text-secondary-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link href={`/blog/${post.id}`}>
                    <div className="relative h-48">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
                      <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-2xl font-bold mb-2 text-foreground hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="mr-4">{post.date}</span>
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{post.readTime}</span>
                      </div>
                      <p className="text-muted-foreground">{post.excerpt}</p>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.p
              className="text-center text-muted-foreground text-lg mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              No posts found. Try adjusting your search or category filter.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

