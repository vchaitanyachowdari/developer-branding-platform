"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Github, Sparkles, Star, Zap } from "lucide-react"
import MainLayout from "@/components/layout/main-layout"

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const features = [
    {
      title: "Stunning Templates",
      description: "Choose from a variety of professionally designed templates to showcase your skills and projects.",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Skill Showcase",
      description: "Display your technical skills with beautiful icons and customizable layouts.",
      icon: <Code className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "GitHub Integration",
      description: "Seamlessly connect with GitHub to display your stats, contributions, and repositories.",
      icon: <Github className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Instant Preview",
      description: "See your changes in real-time with our live preview feature.",
      icon: <Zap className="h-5 w-5 text-orange-500" />,
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <div ref={targetRef} className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-pattern" />
        </div>

        <motion.div className="container mx-auto px-4 z-10" style={{ opacity, y, scale }}>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Elevate Your Developer Brand
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
                Create stunning GitHub profile READMEs that showcase your skills, projects, and personality.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" asChild>
                <Link href="/editor">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center items-start p-1">
            <div className="w-1 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create a professional GitHub profile README that stands out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See Your Profile Come to Life</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Our intuitive editor and real-time preview make it easy to create a professional GitHub profile README.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Choose from professionally designed templates",
                  "Customize colors, fonts, and layouts",
                  "Add your skills, projects, and social links",
                  "See changes instantly with live preview",
                  "Export your README with one click",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <Sparkles className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/editor">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl border">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-pattern" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        DB
                      </div>
                      <h3 className="font-bold">README Preview</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="h-8 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/6"></div>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-8 w-8 bg-primary/20 rounded-full"></div>
                        ))}
                      </div>
                      <div className="h-24 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Developer Brand?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers who have improved their GitHub profiles with our platform.
              </p>
              <Button size="lg" asChild>
                <Link href="/editor">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
