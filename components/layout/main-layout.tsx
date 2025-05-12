"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Github, Menu, X, Home, Users, Code, Cpu, FileCode, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
    { name: "Editor", href: "/editor", icon: <FileCode className="h-4 w-4" /> },
    { name: "Skills", href: "/skills", icon: <Cpu className="h-4 w-4" /> },
    { name: "About", href: "/about", icon: <Code className="h-4 w-4" /> },
    { name: "Team", href: "/team", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              DB
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">DevBrand</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                )}
              >
                <span className="flex items-center gap-1.5">
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="outline" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="default" size="sm" className="hidden md:flex">
              <Download className="h-4 w-4 mr-2" />
              Export README
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-50 md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="relative w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
                    DB
                  </div>
                  <span className="font-bold text-xl">DevBrand</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                          pathname === item.href ? "bg-primary/10 text-primary" : "hover:bg-muted",
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t">
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export README
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-16">{children}</main>

      <footer className="bg-muted/30 py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="relative w-6 h-6 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-xs">
                  DB
                </div>
                <span className="font-bold">DevBrand</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Create stunning GitHub profile READMEs in minutes</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} DevBrand. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
