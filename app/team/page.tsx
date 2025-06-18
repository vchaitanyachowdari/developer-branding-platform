"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Globe, Mail } from "lucide-react"
import Image from "next/image"
import MainLayout from "@/components/layout/main-layout"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  links: {
    website?: string
    github?: string
    twitter?: string
    linkedin?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "V Chaitanya Chowdari",
    role: "Founder & Lead Developer",
    bio: "Full-stack developer with a passion for creating tools that help developers showcase their work. Alex founded DevBrand to solve the problem of creating professional GitHub profiles.",
    image: "/placeholder.svg?height=400&width=400",
    links: {
      website: "https://chowdari.in",
      github: "https://github.com/vchaitanyachowdari",
      twitter: "https://x.com/vchaitanyachai?s=11",
      linkedin: "https://www.linkedin.com/in/v-chaitanya-chowdari-bb3733202",
      email: "vchaitanya@chowdari.in",
    },
  },
]

export default function TeamPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Meet Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind DevBrand who are dedicated to helping developers showcase their skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden group">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-center space-x-2 border-t p-4">
                    {member.links.website && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.links.website} target="_blank" rel="noopener noreferrer" aria-label="Website">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.links.github && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`https://github.com/${member.links.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.links.twitter && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`https://twitter.com/${member.links.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.links.linkedin && (
                      <Button variant="ghost" size="icon" asChild>
                        <a
                          href={`https://linkedin.com/in/${member.links.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.links.email && (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={`mailto:${member.links.email}`} aria-label="Email">
                          <Mail className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented individuals who are passionate about developer tools and experiences. If
              you're interested in contributing to DevBrand, check out our open positions or contribute to our open
              source project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Contribute on GitHub
                </a>
              </Button>
              <Button asChild>
                <a href="mailto:careers@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
