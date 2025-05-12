"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Download, Search, Filter, Check, X } from "lucide-react"
import Image from "next/image"
import { skillCategories, skillIcons, type SkillCategory } from "@/lib/skills-data"
import type { UserProfile } from "@/types/profile"
import { defaultProfile } from "@/lib/default-data"
import { downloadMarkdown } from "@/lib/utils"
import MainLayout from "@/components/layout/main-layout"

export default function SkillsPage() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("programming_languages")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<Record<string, boolean>>({})
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Load from localStorage if available
    const savedProfile = localStorage.getItem("devbrand_profile")
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile)
        setProfile(parsedProfile)
        setSelectedSkills(parsedProfile.selectedSkills || {})
      } catch (e) {
        console.error("Failed to parse saved profile", e)
      }
    }
  }, [])

  const saveProfile = (updatedProfile: UserProfile) => {
    localStorage.setItem("devbrand_profile", JSON.stringify(updatedProfile))
    setProfile(updatedProfile)
  }

  const handleSkillToggle = (skillName: string) => {
    const isSelected = !selectedSkills[skillName]

    const updatedSelectedSkills = {
      ...selectedSkills,
      [skillName]: isSelected,
    }

    setSelectedSkills(updatedSelectedSkills)

    const updatedProfile = {
      ...profile,
      selectedSkills: updatedSelectedSkills,
    }

    saveProfile(updatedProfile)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
  }

  const handleClearAllSkills = () => {
    setSelectedSkills({})

    const updatedProfile = {
      ...profile,
      selectedSkills: {},
    }

    saveProfile(updatedProfile)
  }

  const filteredSkills = searchTerm
    ? Object.entries(skillCategories).flatMap(([category, { skills }]) =>
        skills
          .filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((skill) => ({
            name: skill,
            category: category as SkillCategory,
          })),
      )
    : skillCategories[activeCategory].skills.map((skill) => ({
        name: skill,
        category: activeCategory,
      }))

  const selectedSkillsCount = Object.values(selectedSkills).filter(Boolean).length

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Skill Manager</h1>
              <p className="text-muted-foreground">Select and showcase your technical skills</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleClearAllSkills} disabled={selectedSkillsCount === 0}>
                Clear All
              </Button>
              <Button onClick={() => downloadMarkdown(profile)} className="gap-2">
                <Download className="h-4 w-4" />
                Export README
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle>Select Your Skills</CardTitle>
                      <CardDescription>Choose the technologies you're proficient in</CardDescription>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search skills..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 pr-9"
                        />
                        {searchTerm && (
                          <button
                            onClick={handleClearSearch}
                            className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setShowFilters(!showFilters)}
                        className={showFilters ? "bg-muted" : ""}
                      >
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {showFilters && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h3 className="font-medium mb-2">Filter by Category</h3>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(skillCategories).map(([category, { title }]) => (
                              <Badge
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => {
                                  setActiveCategory(category as SkillCategory)
                                  setSearchTerm("")
                                }}
                              >
                                {title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!searchTerm && !showFilters && (
                    <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as SkillCategory)}>
                      <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
                        {Object.entries(skillCategories)
                          .slice(0, 4)
                          .map(([category, { title }]) => (
                            <TabsTrigger key={category} value={category} className="text-xs">
                              {title}
                            </TabsTrigger>
                          ))}
                      </TabsList>
                    </Tabs>
                  )}

                  <ScrollArea className="h-[500px] pr-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {filteredSkills.map(({ name, category }) => (
                        <motion.div
                          key={name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center space-x-2 p-3 border rounded-md hover:bg-muted/50 transition-colors ${
                            selectedSkills[name] ? "border-primary/50 bg-primary/5" : ""
                          }`}
                        >
                          <Checkbox
                            id={`skill-${name}`}
                            checked={!!selectedSkills[name]}
                            onCheckedChange={() => handleSkillToggle(name)}
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            {skillIcons[name] && (
                              <div className="w-6 h-6 relative flex-shrink-0">
                                <Image
                                  src={skillIcons[name] || "/placeholder.svg"}
                                  alt={name}
                                  width={24}
                                  height={24}
                                  className="object-contain"
                                />
                              </div>
                            )}
                            <Label
                              htmlFor={`skill-${name}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ")}
                            </Label>
                          </div>
                          {selectedSkills[name] && (
                            <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                              <Check className="h-3 w-3 text-primary" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Selected Skills</CardTitle>
                  <CardDescription>
                    {selectedSkillsCount} skill{selectedSkillsCount !== 1 ? "s" : ""} selected
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedSkillsCount > 0 ? (
                    <div className="space-y-4">
                      <ScrollArea className="h-[300px]">
                        <div className="space-y-2">
                          {Object.entries(skillCategories).map(([category, { title, skills }]) => {
                            const categorySkills = skills.filter((skill) => selectedSkills[skill])
                            if (categorySkills.length === 0) return null

                            return (
                              <div key={category} className="mb-4">
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
                                <div className="flex flex-wrap gap-2">
                                  {categorySkills.map((skill) => (
                                    <div
                                      key={skill}
                                      className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs group"
                                    >
                                      {skillIcons[skill] && (
                                        <div className="w-4 h-4 relative">
                                          <Image
                                            src={skillIcons[skill] || "/placeholder.svg"}
                                            alt={skill}
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                          />
                                        </div>
                                      )}
                                      <span>{skill}</span>
                                      <button
                                        onClick={() => handleSkillToggle(skill)}
                                        className="text-primary hover:text-primary/80 ml-1 opacity-50 group-hover:opacity-100"
                                        aria-label={`Remove ${skill}`}
                                      >
                                        <X className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </ScrollArea>

                      <div className="pt-4 border-t">
                        <h3 className="text-sm font-medium mb-2">Preview</h3>
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex flex-wrap gap-2">
                            {Object.keys(selectedSkills)
                              .filter((skill) => selectedSkills[skill] && skillIcons[skill])
                              .slice(0, 8)
                              .map((skill) => (
                                <div key={skill} className="w-8 h-8 relative">
                                  <Image
                                    src={skillIcons[skill] || "/placeholder.svg"}
                                    alt={skill}
                                    width={32}
                                    height={32}
                                    className="object-contain"
                                  />
                                </div>
                              ))}
                            {selectedSkillsCount > 8 && (
                              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium">
                                +{selectedSkillsCount - 8}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Filter className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-1">No skills selected</h3>
                      <p className="text-muted-foreground mb-4">
                        Select skills from the list to showcase your expertise
                      </p>
                      <Button variant="outline" onClick={() => setShowFilters(true)}>
                        Browse Categories
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>README Preview</CardTitle>
                  <CardDescription>How your skills will appear</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Skills & Technologies</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.keys(selectedSkills)
                        .filter((skill) => selectedSkills[skill] && skillIcons[skill])
                        .slice(0, 12)
                        .map((skill) => (
                          <div key={skill} className="w-8 h-8 relative">
                            <Image
                              src={skillIcons[skill] || "/placeholder.svg"}
                              alt={skill}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>
                        ))}
                    </div>
                    <Button size="sm" onClick={() => downloadMarkdown(profile)} className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Export README
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  )
}
