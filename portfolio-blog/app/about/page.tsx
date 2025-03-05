"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView, useAnimation } from "framer-motion"
import {
  Code,
  Server,
  PenTool,
  Globe,
  ChevronDown,
  ExternalLink,
  GitlabIcon as GitHub,
  Linkedin,
  Twitter,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  MapPin,
  Download,
} from "lucide-react"

const skills = [
  { name: "HTML", icon: Code, color: "text-orange-500", level: 90 },
  { name: "CSS", icon: PenTool, color: "text-blue-500", level: 85 },
  { name: "JavaScript", icon: Code, color: "text-yellow-500", level: 80 },
  { name: "Cisco Networking", icon: Server, color: "text-purple-500", level: 75 },
  { name: "Windows Server", icon: Server, color: "text-green-500", level: 70 },
  { name: "WordPress", icon: Globe, color: "text-red-500", level: 65 },
]

const experiences = [
  {
    title: "Customer Sales Representative",
    company: "Ibex Global Islamabad",
    period: "12/2023 - 06/2024",
    location: "Islamabad, Pakistan",
    description:
      "Worked as a Customer Sales Representative, gaining valuable experience in customer service and sales.",
    achievements: [
      "Handled customer inquiries and provided product information",
      "Assisted in sales processes and customer retention",
      "Developed strong communication and problem-solving skills",
    ],
  },
]

const education = [
  {
    degree: "BS. Information Technology",
    institution: "University of Education Lahore, Jauharabad Campus",
    period: "2019 - 2023",
    location: "Jauharabad, Pakistan",
  },
  {
    degree: "FSc (Pre Eng.)",
    institution: "Superior Group of Colleges, Jauharabad",
    period: "2017 - 2019",
    location: "Jauharabad, Pakistan",
  },
  {
    degree: "Matriculation",
    institution: "Govt High School",
    period: "2015 - 2017",
    location: "Khushab, Pakistan",
  },
]

const AnimatedSkill = ({ skill, index }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform transition-all duration-300 hover:shadow-xl hover:scale-105"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${skill.color} bg-opacity-20 dark:bg-opacity-10`}
        whileHover={{ rotate: 10, scale: 1.1 }}
      >
        <skill.icon className={`w-8 h-8 ${skill.color}`} />
      </motion.div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{skill.name}</h3>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
        <motion.div
          className={`h-2 rounded-full ${skill.color.replace("text", "bg")}`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
        />
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-300 mt-2">{skill.level}%</span>
    </motion.div>
  )
}

const ExperienceCard = ({ experience, index, isExpanded, toggleExpand }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6 cursor-pointer" onClick={toggleExpand}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center mb-2">
              <Briefcase className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{experience.title}</h3>
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">{experience.company}</p>
            <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
              <div className="flex items-center mr-4">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{experience.period}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{experience.description}</p>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Key Achievements:</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement, i) => (
              <motion.li
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

const EducationCard = ({ education, index }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mr-4">
          <BookOpen className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{education.degree}</h3>
          <p className="text-gray-600 dark:text-gray-300">{education.institution}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-2 ml-16">
        <div className="flex items-center mr-4">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{education.period}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{education.location}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function About() {
  const [expandedExperience, setExpandedExperience] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h1>

        <div className="grid gap-12 md:grid-cols-2 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <motion.div
              className="relative w-80 h-96 mx-auto mb-8"
              initial={{ rotate: -3 }}
              whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-2xl"
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="absolute inset-1 bg-white dark:bg-gray-900 rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src="https://media-hosting.imagekit.io//2c34259bf3ec4dc3/zohaib%20hussain%20pic.png?Expires=1835431412&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jZ7R2r2hRqmqYf0mla5h1RUQRl~5IP5r4Jo0kJ-24bYD~cK8~sBffgVkO0bgk9NqTkmGQs7H2PpabEqadDiO3SdwFBA3KSxQMYmxJwHLqjL7YOieR7ZPqr1MCgAQYBLp0d2a1CSwRLrzkqWPhWGX0zJBaiRBC9s-AdykmiM1yOyVuWA2ZdlrnrTNO8HZpBUS9T9jlV8TVN749DiMqeU8vBXf15cvlNjWtIdKZJRFCqmEMDfl7uCK34mnp-3~f8at1VVGC~fUoSZ2~FLat3W7G90GXfQtG21BlalyL5vUpt8ITCh3U-3qedNKFr7BQPE3G2db8bF--ynpuixGSrENbA__"
                  alt="Zohaib Hassan"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-lg"
                initial={{ rotate: 12 }}
                animate={{ rotate: [12, 24, 12] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center space-x-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: GitHub, href: "https://github.com/zaibijafri" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/zohaibhassan3514" },
                { icon: Twitter, href: "https://twitter.com/johndoe" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 text-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors duration-300"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center md:text-left"
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Hi, I'm Zohaib Hassan</h2>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              I'm a passionate web developer with over 2 years of experience in creating beautiful and functional
              websites. I specialize in React, Next.js, and Node.js, and I'm always excited to learn new technologies.
            </p>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              My journey in web development started when I built my first HTML website at the age of 15. Since then,
              I've worked on numerous projects, from small business websites to large-scale e-commerce platforms.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              When I'm not coding, you can find me exploring new coffee shops, reading tech blogs, or hiking in the
              great outdoors. I believe in continuous learning and sharing knowledge with the developer community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="https://zohaibhassanresume.tiiny.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Resume <ExternalLink className="ml-2 w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://zohaibhassanresume.tiiny.site"
                download="Zohaib_Hassan_Resume.pdf"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV <Download className="ml-2 w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            My Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skill, index) => (
              <AnimatedSkill key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          className="mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isExpanded={expandedExperience === index}
                toggleExpand={() => setExpandedExperience(expandedExperience === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <EducationCard key={index} education={edu} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Final Year Project
          </h2>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 relative overflow-hidden"
            whileHover={{ y: -5 }}
          >
            <motion.div
              className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full opacity-5"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-500 bg-opacity-10 flex items-center justify-center mr-6">
                <Award className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                Computer Networking and System Administration
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              Designed and Configured 5 Sites Network and also completed Windows Server 2016 Administration.
            </p>
            <ul className="space-y-2">
              {[
                "Implemented secure network architecture across multiple sites",
                "Configured Windows Server 2016 with Active Directory services",
                "Established secure communication protocols between network sites",
              ].map((achievement, i) => (
                <motion.li
                  key={i}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                  viewport={{ once: true }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

