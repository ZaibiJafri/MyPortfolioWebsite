"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { useRef, useState } from "react"
import {
  ArrowDown,
  ArrowRight,
  ExternalLink,
  Github,
  Code,
  Layers,
  PenTool,
  Zap,
  Layout,
  Smartphone,
  Check,
  Server,
  Database,
  Globe,
} from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Spotify Clone",
    description: "A clone of the popular music streaming platform Spotify.",
    image:
      "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    liveUrl: "https://github.com/ZaibiJafri/spotifyclone",
    githubUrl: "https://github.com/ZaibiJafri/spotifyclone",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "E-commerce Site",
    description: "An online shopping platform with various product categories.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    liveUrl: "https://ecomsite.pages.dev",
    githubUrl: "https://github.com/ZaibiJafri/Ecomsite",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Car Rental Web Design",
    description: "A sleek web design for a car rental service.",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
    liveUrl: "https://github.com/ZaibiJafri/Car-Rental-Web-Design",
    githubUrl: "https://github.com/ZaibiJafri/Car-Rental-Web-Design",
    tags: ["HTML", "CSS", "Responsive Design"],
  },
  {
    id: 4,
    title: "Todo List with Currency Converter",
    description: "A task management app with an integrated currency conversion feature.",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    liveUrl: "https://github.com/ZaibiJafri/Todolist-with-CurrencyConverter",
    githubUrl: "https://github.com/ZaibiJafri/Todolist-with-CurrencyConverter",
    tags: ["JavaScript", "API Integration", "Task Management"],
  },
]

const skills = [
  { name: "React", icon: Code, color: "text-blue-500", level: 90 },
  { name: "Node.js", icon: Server, color: "text-green-500", level: 85 },
  { name: "UI/UX Design", icon: PenTool, color: "text-purple-500", level: 80 },
  { name: "MongoDB", icon: Database, color: "text-green-700", level: 75 },
  { name: "GraphQL", icon: Globe, color: "text-pink-500", level: 70 },
  { name: "Next.js", icon: Zap, color: "text-gray-700", level: 88 },
]

const services = [
  {
    title: "Custom Website Design",
    description: "Stunning, user-centric designs tailored to your brand.",
    icon: Layout,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Front-end Development",
    description: "Pixel-perfect implementation using modern technologies.",
    icon: Code,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Responsive Web Design",
    description: "Ensure your site looks great on all devices.",
    icon: Smartphone,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "E-commerce Solutions",
    description: "Build powerful online stores with secure checkouts.",
    icon: Layers,
    color: "from-red-500 to-red-600",
  },
  {
    title: "Performance Optimization",
    description: "Speed up your website for better user experience.",
    icon: Zap,
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "CMS Integration",
    description: "Easy content management with popular CMS platforms.",
    icon: Database,
    color: "from-indigo-500 to-indigo-600",
  },
]

const pricingPlans = [
  {
    name: "Basic",
    price: "$999",
    description: "Perfect for small businesses or personal sites",
    features: [
      "Custom design (up to 5 pages)",
      "Responsive layout",
      "Basic SEO optimization",
      "Contact form integration",
      "Social media integration",
    ],
    cta: "Get Started",
    popular: false,
    color: "from-blue-400 to-blue-600",
    icon: Layout,
  },
  {
    name: "Professional",
    price: "$2,499",
    description: "Ideal for growing businesses and organizations",
    features: [
      "Custom design (up to 10 pages)",
      "Responsive layout",
      "Advanced SEO package",
      "Content Management System",
      "E-commerce functionality (up to 20 products)",
      "Email newsletter integration",
    ],
    cta: "Choose Plan",
    popular: true,
    color: "from-purple-400 to-purple-600",
    icon: Zap,
  },
  {
    name: "Enterprise",
    price: "$4,999",
    description: "Comprehensive solution for large businesses",
    features: [
      "Custom design (unlimited pages)",
      "Responsive layout",
      "Full e-commerce solution",
      "Advanced security features",
      "Custom functionality development",
      "Priority support",
    ],
    cta: "Contact Us",
    popular: false,
    color: "from-indigo-400 to-indigo-600",
    icon: Globe,
  },
]

const ProjectCard = ({ project }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="bg-card text-card-foreground rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary mr-4 transform transition-transform hover:scale-110"
          >
            <ExternalLink className="w-6 h-6" />
          </Link>
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transform transition-transform hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span key={index} className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const SkillCard = ({ skill, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="bg-card text-card-foreground rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <skill.icon className={`w-12 h-12 ${skill.color} mb-4`} />
      <h3 className="text-lg font-semibold text-foreground mb-2">{skill.name}</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
        />
      </div>
      <span className="text-sm text-muted-foreground mt-2">{skill.level}%</span>
    </motion.div>
  )
}

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      className="bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
    >
      <div className={`bg-gradient-to-r ${service.color} p-6 flex justify-center`}>
        <motion.div
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <service.icon className="w-16 h-16 text-white" />
        </motion.div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-foreground">{service.title}</h3>
        <p className="text-muted-foreground">{service.description}</p>
        <motion.div
          className="mt-4 flex items-center text-primary font-medium"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>Learn more</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  )
}

const PricingCard = ({ plan, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      className={`bg-card text-card-foreground rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 ${
        plan.popular ? "border-2 border-primary" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-bold">MOST POPULAR</div>
      )}
      <div className={`bg-gradient-to-r ${plan.color} p-8 text-white relative overflow-hidden`}>
        <motion.div
          className="absolute -right-10 -top-10 opacity-20"
          animate={{ rotate: isHovered ? 45 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <plan.icon className="w-40 h-40" />
        </motion.div>
        <h3 className="text-2xl font-bold mb-2 relative z-10">{plan.name}</h3>
        <div className="text-4xl font-extrabold mb-2 relative z-10">{plan.price}</div>
        <p className="text-white/80 mb-0 relative z-10">{plan.description}</p>
      </div>
      <div className="p-6">
        <ul className="mb-6 space-y-3">
          {plan.features.map((feature, idx) => (
            <motion.li
              key={idx}
              className="flex items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
            >
              <Check className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/contact"
            className={`block w-full py-3 px-4 rounded-lg font-bold text-center transition-colors duration-300 ${
              plan.popular
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {plan.cta}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig)

  return (
    <div className="min-h-screen">
      <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0" style={{ opacity: backgroundOpacity, y: backgroundY }}>
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
        </motion.div>
        <motion.div className="relative z-10 text-center px-4" style={{ y }}>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span className="text-gradient">Zohaib Hassan</span>
          </motion.h1>
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Crafting Seamless Digital Experiences: Your Front-End Development Partner
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.6 }}>
            <Link
              href="/contact"
              className="btn-primary text-lg sm:text-xl bg-white text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Get in touch
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-white" />
        </motion.div>
      </section>

      <motion.section
        className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gradient">My Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 sm:py-20 bg-white dark:bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gradient">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/projects" className="btn-secondary text-lg sm:text-xl">
              View all projects
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 sm:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">My Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I offer a range of services to help businesses and individuals establish a strong online presence.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full opacity-10 dark:opacity-5"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-500 rounded-full opacity-10 dark:opacity-5"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 7,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 1,
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gradient">Pricing Plans</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan that suits your needs and budget.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Ready to bring your web vision to life?</h2>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/contact"
              className="btn-primary bg-white text-blue-600 hover:bg-blue-700 hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-lg sm:text-xl inline-block"
            >
              Start Your Project
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

