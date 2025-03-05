"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {}
    if (!formData.name.trim()) tempErrors.name = "Name is required"
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid"
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
        const data = await response.json()
        if (response.ok) {
          setSubmitMessage("Message sent successfully!")
          setFormData({ name: "", email: "", message: "" })
        } else {
          setSubmitMessage("Failed to send message. Please try again.")
        }
      } catch (error) {
        setSubmitMessage("An error occurred. Please try again later.")
      }
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-12 text-center text-gradient"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Get in Touch
        </motion.h1>
        <div className="grid gap-12 md:grid-cols-2 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Contact Information</h2>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="w-6 h-6 mr-4 text-blue-600" />
                zohaibhassanjafri5@gmail.com
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="w-6 h-6 mr-4 text-blue-600" />
                +92-311-4414388
              </p>
              <p className="flex items-center text-gray-600 dark:text-gray-300">
                <MapPin className="w-6 h-6 mr-4 text-blue-600" />
                Street No.07 Near BlueSwiss Hotel Pindi Stop, Kotlakhpat, Lahore
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-gray-800 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && <p className="mt-1 text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-gray-800 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-gray-800 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                ></textarea>
                {errors.message && <p className="mt-1 text-red-500 text-sm">{errors.message}</p>}
              </div>
              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-5 h-5" />
              </motion.button>
              {submitMessage && (
                <p
                  className={`mt-4 text-center ${submitMessage.includes("success") ? "text-green-500" : "text-red-500"}`}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

