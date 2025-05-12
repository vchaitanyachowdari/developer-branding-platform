"use client"

import { useState } from "react"
import { skillCategories, skillIcons, type SkillCategory } from "@/lib/skills-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import type { UserProfile } from "@/types/profile"

interface SkillSelectorProps {
  profile: UserProfile
  onUpdateSelectedSkills: (skillName: string, isSelected: boolean) => void
}

export default function SkillSelector({ profile, onUpdateSelectedSkills }: SkillSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("programming_languages")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSkillToggle = (skillName: string) => {
    onUpdateSelectedSkills(skillName, !profile.selectedSkills[skillName])
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Skills</CardTitle>
        <CardDescription>Choose the technologies you're proficient in</CardDescription>
        <div className="mt-2">
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />
        </div>
      </CardHeader>
      <CardContent>
        {!searchTerm && (
          <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as SkillCategory)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
              {Object.entries(skillCategories).map(([category, { title }]) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}

        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSkills.map(({ name, category }) => (
              <div key={name} className="flex items-center space-x-2 p-2 border rounded-md hover:bg-muted/50">
                <Checkbox
                  id={`skill-${name}`}
                  checked={!!profile.selectedSkills[name]}
                  onCheckedChange={() => handleSkillToggle(name)}
                />
                <div className="flex items-center space-x-2">
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
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-4 p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium mb-2">Selected Skills</h4>
          <div className="flex flex-wrap gap-2">
            {Object.keys(profile.selectedSkills)
              .filter((skill) => profile.selectedSkills[skill])
              .map((skill) => (
                <div
                  key={skill}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
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
                    className="text-primary hover:text-primary/80 ml-1"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </div>
              ))}
            {Object.keys(profile.selectedSkills).filter((skill) => profile.selectedSkills[skill]).length === 0 && (
              <p className="text-xs text-muted-foreground">No skills selected yet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
