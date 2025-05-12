"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Github, Heart, Lightbulb, Zap } from "lucide-react"
import Link from "next/link"
import MainLayout from "@/components/layout/main-layout"

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">About DevBrand</h1>
              <p className="text-xl text-muted-foreground">
                Empowering developers to showcase their skills and projects with stunning GitHub profiles
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>Why we built DevBrand</CardDescription>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  DevBrand was created with a simple mission: to help developers stand out in a crowded marketplace by
                  creating professional, visually appealing GitHub profile READMEs that showcase their skills, projects,
                  and personality.
                </p>
                <p>
                  We believe that a well-crafted GitHub profile is an essential part of a developer's personal brand.
                  It's often the first impression potential employers, collaborators, or clients have of your work and
                  skills.
                </p>
                <p>
                  Our platform makes it easy for developers of all skill levels to create stunning GitHub profiles
                  without needing to write complex markdown or HTML. With our intuitive editor, you can focus on what
                  matters most - highlighting your unique skills and accomplishments.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                    <CardTitle>Why GitHub READMEs Matter</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Makes a strong first impression to potential employers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Showcases your technical skills and projects</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Demonstrates your attention to detail and professionalism</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Helps you stand out in a competitive job market</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <CardTitle>How DevBrand Helps</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional templates designed by developers</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Intuitive editor with real-time preview</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Comprehensive skill management with icons</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>One-click export to markdown for GitHub</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Create your stunning GitHub profile in minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Choose a template</h3>
                      <p className="text-muted-foreground">
                        Select from our professionally designed templates to get started quickly
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Customize your profile</h3>
                      <p className="text-muted-foreground">
                        Add your personal information, skills, projects, and social links
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Preview and export</h3>
                      <p className="text-muted-foreground">
                        See your changes in real-time and export your README with one click
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium">Add to GitHub</h3>
                      <p className="text-muted-foreground">
                        Create a special repository named after your GitHub username and add your README
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="mt-6 flex justify-center">
                  <Button asChild>
                    <Link href="/editor">
                      Get Started Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Open Source</h2>
              <p className="text-muted-foreground mb-4">
                DevBrand is proudly open source. We believe in the power of community collaboration.
              </p>
              <Button variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
