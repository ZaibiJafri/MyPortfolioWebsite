"use client"

import { motion } from "framer-motion"
import { Code, Layout, Zap, Smartphone } from "lucide-react"

const services = [
  {
    title: "Static Website Development",
    description: "Custom-designed static websites using HTML, CSS, and JavaScript.",
    price: "$300 - $800",
    icon: Layout,
  },
  {
    title: "React Web Application",
    description: "Dynamic web applications built with React and modern front-end technologies.",
    price: "$800 - $2000",
    icon: Code,
  },
  {
    title: "Landing Page Design",
    description: "Eye-catching landing pages optimized for conversions.",
    price: "$200 - $500",
    icon: Zap,
  },
  {
    title: "Responsive Web Design",
    description: "Ensure your website looks great on all devices and screen sizes.",
    price: "$300 - $700",
    icon: Smartphone,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Services
        </motion.h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-card text-card-foreground rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <service.icon className="w-8 h-8 text-primary mr-3" />
                <h2 className="text-xl font-semibold">{service.title}</h2>
              </div>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <p className="text-lg font-bold text-primary">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

