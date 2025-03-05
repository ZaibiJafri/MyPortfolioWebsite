"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// This would typically come from a CMS or API
const allPosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    date: "2023-07-01",
    readTime: "5 min read",
    content:
      "Web development is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we look to the future, several trends are poised to shape the landscape of web development:\n\n1. Progressive Web Apps (PWAs): These web applications offer a native app-like experience, combining the best of web and mobile apps.\n\n2. Artificial Intelligence and Machine Learning: AI-powered chatbots, personalized user experiences, and intelligent analytics are becoming increasingly prevalent.\n\n3. WebAssembly: This technology allows high-performance applications to run in web browsers, opening up new possibilities for web-based software.\n\n4. Serverless Architecture: This approach simplifies deployment and scaling while reducing infrastructure management overhead.\n\n5. JAMstack: JavaScript, APIs, and Markup (JAM) continue to gain popularity for creating fast, secure, and scalable web applications.\n\nAs web developers, it's crucial to stay updated with these trends and continuously expand our skill sets to create cutting-edge web experiences.",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  },
  {
    id: 2,
    title: "Mastering Next.js: Tips and Tricks",
    date: "2023-06-15",
    readTime: "7 min read",
    content:
      "Next.js has become one of the most popular React frameworks for building modern web applications. Here are some tips and tricks to help you master Next.js:\n\n1. Use Static Site Generation (SSG) for better performance: Next.js allows you to pre-render pages at build time, resulting in faster load times and improved SEO.\n\n2. Leverage Server-Side Rendering (SSR) when needed: For dynamic content that requires real-time data, use SSR to ensure up-to-date information is displayed to users.\n\n3. Optimize images with next/image: The Image component in Next.js automatically optimizes and lazy-loads images, improving page load times and Core Web Vitals scores.\n\n4. Implement API routes for backend functionality: Next.js allows you to create API routes, enabling you to build full-stack applications without the need for a separate backend server.\n\n5. Use dynamic imports for code splitting: Improve your application's performance by only loading the code that's necessary for each page.\n\nBy mastering these techniques, you'll be able to create high-performance, scalable web applications with Next.js.",
    category: "Tutorial",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 3,
    title: "The Power of Tailwind CSS",
    date: "2023-06-01",
    readTime: "6 min read",
    content:
      "Tailwind CSS has revolutionized the way we approach web styling. Here's why it's so powerful:\n\n1. Utility-first approach: Tailwind provides a set of utility classes that you can use to build custom designs without writing CSS from scratch.\n\n2. Highly customizable: You can easily customize Tailwind's default theme to match your project's design requirements.\n\n3. Responsive design made easy: Tailwind's responsive utility classes make it simple to create layouts that look great on all screen sizes.\n\n4. Reduced CSS bundle size: With Tailwind, you only include the styles you use, resulting in smaller CSS files.\n\n5. Improved developer experience: Tailwind's intuitive class names make it easier to understand and maintain your styles.\n\nBy leveraging Tailwind CSS, you can significantly speed up your development process and create consistent, maintainable designs.",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2055&q=80",
  },
  {
    id: 4,
    title: "Building Accessible Web Applications",
    date: "2023-05-15",
    readTime: "8 min read",
    content:
      "Creating accessible web applications is crucial for ensuring that all users, regardless of their abilities, can use your website. Here are some key principles to follow:\n\n1. Use semantic HTML: Properly structured HTML helps assistive technologies understand your content.\n\n2. Implement keyboard navigation: Ensure all interactive elements can be accessed and used with a keyboard.\n\n3. Provide alternative text for images: Alt text helps users who rely on screen readers understand the content of images.\n\n4. Use sufficient color contrast: Ensure text is easily readable against its background for users with visual impairments.\n\n5. Create descriptive links: Use clear and concise link text that makes sense out of context.\n\n6. Use ARIA attributes when necessary: ARIA can provide additional context for complex UI components.\n\nBy following these principles, you can create web applications that are inclusive and usable for all.",
    category: "Accessibility",
    image:
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 5,
    title: "Optimizing React Performance",
    date: "2023-05-01",
    readTime: "10 min read",
    content:
      "Optimizing the performance of your React applications is crucial for providing a smooth user experience. Here are some strategies to boost your React app's performance:\n\n1. Use React.memo for component memoization: Prevent unnecessary re-renders of functional components.\n\n2. Implement lazy loading: Load components only when they're needed to reduce initial bundle size.\n\n3. Optimize state management: Use appropriate state management tools and avoid unnecessary state updates.\n\n4. Virtualize long lists: Render only the visible items in long lists to improve scrolling performance.\n\n5. Use the production build: Ensure you're using the production build of React for optimized performance.\n\n6. Implement code splitting: Split your code into smaller chunks to improve load times.\n\n7. Optimize images: Use appropriate image formats and sizes to reduce load times.\n\nBy implementing these strategies, you can significantly improve the performance of your React applications.",
    category: "Performance",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
]

// Simulated API call
const fetchPost = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = allPosts.find((p) => p.id === id)
      resolve(post)
    }, 300) // Simulate network delay
  })
}

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const postId = Number(params.id)
    fetchPost(postId).then((fetchedPost) => {
      setPost(fetchedPost)
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>
  }

  if (!post) {
    return <div className="container mx-auto px-4 py-16 text-center">Post not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/blog" className="inline-flex items-center text-primary hover:text-primary/80 mb-8">
            <ArrowLeft className="mr-2" />
            Back to all posts
          </Link>
          <article>
            <motion.div
              className="relative h-[40vh] mb-8 rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Image src={post.image || "/placeholder.svg"} alt={post.title} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 bg-black/50 flex items-end">
                <div className="p-8">
                  <motion.h1
                    className="text-4xl md:text-5xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {post.title}
                  </motion.h1>
                  <motion.div
                    className="flex items-center text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="mr-4">{post.readTime}</span>
                    <Tag className="w-5 h-5 mr-2" />
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="prose dark:prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </motion.div>
          </article>
        </motion.div>
      </div>
    </div>
  )
}

