"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  Github,
  Menu,
  X,
  Home,
  Users,
  Cpu,
  FileCode,
  Download,
  ChevronRight,
  BookOpen,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
  fullWidth?: boolean
  hideNav?: boolean
}

export default function MainLayout({ children, fullWidth = false, hideNav = false }: MainLayoutProps) {
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
    { name: "About", href: "/about", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Team", href: "/team", icon: <Users className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && (
        <header
          className={cn(
            "fixed top-0 w-full z-50 transition-all duration-normal",
            isScrolled ? "glass-effect border-b shadow-elevation-1" : "bg-transparent",
          )}
        >
          <div className="layout-container py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div
                className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg relative z-10">DB</span>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-normal" />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl hidden sm:inline-block">DevBrand</span>
                <span className="text-xs text-muted-foreground hidden sm:inline-block">Developer Profiles</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-normal relative group",
                    pathname === item.href
                      ? "text-primary dark:text-primary-400"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary",
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    {item.name}
                  </span>
                  {pathname === item.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-400 mx-4"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <ModeToggle />
              <Button variant="outline" size="icon" asChild className="rounded-lg border-border/60">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="default" size="sm" className="hidden md:flex rounded-lg">
                <Download className="h-4 w-4 mr-2" />
                Export README
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-lg"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 glass-effect z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="h-full bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b">
                  <Link href="/" className="flex items-center space-x-3">
                    <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                      <span className="text-lg">DB</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display font-bold text-xl">DevBrand</span>
                      <span className="text-xs text-muted-foreground">Developer Profiles</span>
                    </div>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg">
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 overflow-auto p-4">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <motion.li key={item.name} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-normal",
                            pathname === item.href
                              ? "bg-primary/10 text-primary dark:bg-primary-900/30 dark:text-primary-400"
                              : "hover:bg-secondary",
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t">
                  <Button className="w-full rounded-lg">
                    <Download className="h-4 w-4 mr-2" />
                    Export README
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={fullWidth ? "flex-1" : "flex-1 pt-20"}>{children}</main>

      <footer className="bg-surface dark:bg-surface/30 py-16 border-t">
        <div className="layout-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-xs">
                  <span>DB</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl">DevBrand</span>
                  <span className="text-xs text-muted-foreground">Developer Profiles</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                Create stunning GitHub profile READMEs to elevate your developer brand and stand out in the community.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link-footer">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/editor" className="link-footer">
                    README Editor
                  </Link>
                </li>
                <li>
                  <Link href="/skills" className="link-footer">
                    Skill Manager
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link-footer">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link-footer">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="link-footer">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="link-footer">
                    Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link-footer">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="link-footer">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DevBrand. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <p className="text-sm text-muted-foreground mr-4">Crafted with precision for developers worldwide</p>
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-normal"
              >
                Powered by Vercel
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
