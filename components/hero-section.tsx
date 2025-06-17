"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Github, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  return (
    <div ref={targetRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-dots-pattern bg-dots-md opacity-30" />

        {/* Animated background elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div className="layout-container z-10 py-20" style={{ opacity, y, scale }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-primary/20 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-400 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Developer Branding Platform
            </div>

            <h1 className="font-display font-bold mb-6 gradient-text">Elevate Your Developer Brand</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
              Create stunning GitHub profile READMEs that showcase your skills, projects, and personality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="rounded-lg group" asChild>
              <Link href="/editor">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-lg group" asChild>
              <Link href="/about">
                <Code className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                Learn More
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Github className="h-4 w-4" />
              <span>Used by 10,000+ developers worldwide</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground flex justify-center items-start p-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
        >
          <div className="w-1 h-2 bg-muted-foreground rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  )
}
