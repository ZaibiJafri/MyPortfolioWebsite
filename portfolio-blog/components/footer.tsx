import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-secondary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-muted-foreground">&copy; 2023 Zohaib Hassan. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="https://github.com/ZaibiJafri"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/zohaibhassan3514/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

