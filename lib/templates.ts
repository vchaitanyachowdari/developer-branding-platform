import type { Template } from "@/types/template"

export const templates: Template[] = [
  {
    id: "minimalist",
    name: "Minimalist Professional",
    description: "Clean and professional layout with focus on skills and work",
    previewImage: "/placeholder.svg?height=200&width=350",
    sections: ["header", "about", "skills", "stats", "social", "visitors"],
    style: {
      theme: "light",
      fontFamily: "serif",
      cardStyle: "flat",
      iconSet: "simple",
    },
    defaultContent: {
      bioTemplate: "A passionate {title} focused on building elegant solutions with {skills}.",
      skillsLayout: "grid",
      statsTheme: "default",
    },
  },
  {
    id: "opensource",
    name: "Open Source Warrior",
    description: "Showcase your GitHub contributions and open source work",
    previewImage: "/placeholder.svg?height=200&width=350",
    sections: ["header", "about", "stats", "streak", "topLangs", "skills", "social"],
    style: {
      theme: "dark",
      fontFamily: "monospace",
      cardStyle: "terminal",
      iconSet: "devicon",
    },
    defaultContent: {
      bioTemplate: "Open source enthusiast and {title}. Contributing to projects built with {skills}.",
      skillsLayout: "badges",
      statsTheme: "radical",
    },
  },
  {
    id: "content-creator",
    name: "Content Creator",
    description: "Highlight your blogs, videos, and speaking engagements",
    previewImage: "/placeholder.svg?height=200&width=350",
    sections: ["header", "about", "blog", "skills", "social", "stats"],
    style: {
      theme: "light",
      fontFamily: "sans",
      cardStyle: "elevated",
      iconSet: "fontawesome",
    },
    defaultContent: {
      bioTemplate: "I write and speak about {skills}. Follow me for the latest content on {title} topics.",
      skillsLayout: "inline",
      statsTheme: "tokyonight",
    },
  },
  {
    id: "cyberpunk",
    name: "Dark Cyberpunk",
    description: "Futuristic neon-themed with glowing UI and animations",
    previewImage: "/placeholder.svg?height=200&width=350",
    sections: ["header", "about", "skills", "stats", "streak", "topLangs", "social"],
    style: {
      theme: "cyberpunk",
      fontFamily: "futuristic",
      cardStyle: "neon",
      iconSet: "simple",
    },
    defaultContent: {
      bioTemplate: "Digital architect and {title} crafting the future with {skills}.",
      skillsLayout: "neon",
      statsTheme: "synthwave",
    },
  },
  {
    id: "freelancer",
    name: "Freelancer Portfolio",
    description: "Emphasis on work experience, testimonials, and CTAs",
    previewImage: "/placeholder.svg?height=200&width=350",
    sections: ["header", "about", "skills", "social", "stats", "visitors"],
    style: {
      theme: "professional",
      fontFamily: "sans",
      cardStyle: "glassmorphism",
      iconSet: "simple",
    },
    defaultContent: {
      bioTemplate: "Freelance {title} specializing in {skills}. Available for new projects.",
      skillsLayout: "rating",
      statsTheme: "buefy",
    },
  },
]
