"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Code, Github, Star, Zap, FileCode, Cpu, ChevronRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import MainLayout from "@/components/layout/main-layout"
import HeroSection from "@/components/hero-section"

export default function LandingPage() {
  const targetRef = useRef<HTMLDivElement>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div ref={targetRef} className="relative">
        <HeroSection />
      </div>

      {/* Main Content */}
      <MainLayout>
        {/* Features Section */}
        <section className="section-spacing bg-surface dark:bg-surface/30">
          <div className="layout-container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-400 text-sm font-medium">
                Why Choose DevBrand
              </div>
              <h2 className="section-title">Premium Features</h2>
              <p className="section-description">
                Everything you need to create a professional GitHub profile README that stands out
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  icon: <Star className="h-6 w-6 text-primary" />,
                  title: "Premium Templates",
                  description:
                    "Choose from a variety of professionally designed templates to showcase your skills and projects.",
                },
                {
                  icon: <Code className="h-6 w-6 text-primary" />,
                  title: "Skill Showcase",
                  description: "Display your technical skills with beautiful icons and customizable layouts.",
                },
                {
                  icon: <Github className="h-6 w-6 text-primary" />,
                  title: "GitHub Integration",
                  description: "Seamlessly connect with GitHub to display your stats, contributions, and repositories.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-primary" />,
                  title: "Instant Preview",
                  description: "See your changes in real-time with our live preview feature.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="card-feature p-8"
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                >
                  <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 shadow-elevation-1">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section-spacing bg-background relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary-50 dark:bg-primary-900/20 rounded-bl-[100px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-surface dark:bg-surface/50 rounded-tr-[80px] opacity-50"></div>

          <div className="layout-container relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-400 text-sm font-medium">
                Simple Process
              </div>
              <h2 className="section-title">How It Works</h2>
              <p className="section-description">
                Create your professional GitHub profile README in just three simple steps
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  step: "01",
                  icon: <FileCode className="h-8 w-8 text-primary" />,
                  title: "Choose Template",
                  description: "Select from our collection of professionally designed templates that match your style.",
                  link: "/editor",
                },
                {
                  step: "02",
                  icon: <Cpu className="h-8 w-8 text-primary" />,
                  title: "Add Your Skills",
                  description: "Showcase your technical skills and expertise with our comprehensive skill selector.",
                  link: "/skills",
                },
                {
                  step: "03",
                  icon: <Github className="h-8 w-8 text-primary" />,
                  title: "Export & Use",
                  description: "Download your README and add it to your GitHub profile to stand out from the crowd.",
                  link: "#",
                },
              ].map((step, index) => (
                <motion.div key={index} variants={itemVariants} className="relative group">
                  <Card className="card-interactive p-8 h-full">
                    <CardContent className="p-0">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mr-4 shadow-elevation-1">
                          {step.icon}
                        </div>
                        <span className="text-4xl font-bold text-primary/20 dark:text-primary-400/20 font-mono">
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <Link
                        href={step.link}
                        className="inline-flex items-center text-primary hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-normal group"
                      >
                        Get Started
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Connection line for desktop */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 lg:-right-8 w-12 lg:w-16 h-0.5 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-spacing bg-surface dark:bg-surface/30">
          <div className="layout-container">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { number: "10,000+", label: "Developers" },
                { number: "50+", label: "Templates" },
                { number: "100+", label: "Skills" },
                { number: "99%", label: "Satisfaction" },
              ].map((stat, index) => (
                <motion.div key={index} variants={itemVariants} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-spacing bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-primary-100 dark:from-primary-900/20 dark:via-transparent dark:to-primary-800/20"></div>
          <div className="layout-container relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-400 text-sm font-medium">
                <Sparkles className="h-4 w-4 mr-2" />
                Ready to Get Started?
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Create Your Professional GitHub Profile Today
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers who have elevated their GitHub presence with DevBrand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-lg group" asChild>
                  <Link href="/editor">
                    Start Building
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-lg" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </MainLayout>
    </div>
  )
}
