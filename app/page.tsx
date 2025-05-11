"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import ProfileForm from "@/components/profile-form"
import ReadmePreview from "@/components/readme-preview"
import TemplateSelector from "@/components/template-selector"
import ThemeCustomizer from "@/components/theme-customizer"
import AdditionalInfoForm from "@/components/additional-info-form"
import WorkEducationForm from "@/components/work-education-form"
import SocialLinksForm from "@/components/social-links-form"
import GitHubFeaturesForm from "@/components/github-features-form"
import type { UserProfile } from "@/types/profile"
import { defaultProfile } from "@/lib/default-data"
import { templates } from "@/lib/templates"
import { Download, Github, Palette, User, Code, Briefcase, Share2, GitBranch, Plus } from "lucide-react"
import { downloadMarkdown } from "@/lib/utils"

export default function Home() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [activeTab, setActiveTab] = useState("edit")

  const handleProfileUpdate = (updatedProfile: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updatedProfile }))
  }

  const handleComponentToggle = (component: string) => {
    setProfile((prev) => ({
      ...prev,
      enabledComponents: {
        ...prev.enabledComponents,
        [component]: !prev.enabledComponents[component],
      },
    }))
  }

  const handleSelectTemplate = (templateId: string) => {
    const selectedTemplate = templates.find((t) => t.id === templateId)
    if (selectedTemplate) {
      setProfile((prev) => ({
        ...prev,
        template: templateId,
        theme: selectedTemplate.style.theme,
        customization: {
          ...prev.customization,
          fontFamily: selectedTemplate.style.fontFamily,
          cardStyle: selectedTemplate.style.cardStyle,
          iconSet: selectedTemplate.style.iconSet,
          statsTheme: selectedTemplate.defaultContent.statsTheme,
          skillsLayout: selectedTemplate.defaultContent.skillsLayout,
        },
        // Enable only the sections that are in the template
        enabledComponents: {
          ...Object.keys(prev.enabledComponents).reduce(
            (acc, key) => {
              acc[key as keyof typeof prev.enabledComponents] = selectedTemplate.sections.includes(key)
              return acc
            },
            {} as typeof prev.enabledComponents,
          ),
        },
      }))
    }
  }

  const handleUpdateTheme = (themeId: string) => {
    setProfile((prev) => ({
      ...prev,
      theme: themeId,
    }))
  }

  const handleUpdateCustomization = (customization: Partial<UserProfile["customization"]>) => {
    setProfile((prev) => ({
      ...prev,
      customization: {
        ...prev.customization,
        ...customization,
      },
    }))
  }

  const handleExport = () => {
    downloadMarkdown(profile)
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Developer Branding Platform</h1>
          <p className="text-muted-foreground">Create a stunning GitHub profile README in minutes</p>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList className="flex-wrap">
                <TabsTrigger value="templates" className="flex items-center gap-1">
                  <Code className="h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="additional" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Additional
                </TabsTrigger>
                <TabsTrigger value="work" className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Work/Edu
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="github" className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </TabsTrigger>
                <TabsTrigger value="customize" className="flex items-center gap-1">
                  <Palette className="h-4 w-4" />
                  Theme
                </TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <Button onClick={handleExport} className="gap-2">
                <Download className="h-4 w-4" />
                Export README
              </Button>
            </div>
            <TabsContent value="templates" className="mt-0">
              <TemplateSelector profile={profile} onSelectTemplate={handleSelectTemplate} />
            </TabsContent>
            <TabsContent value="edit" className="mt-0">
              <ProfileForm profile={profile} onUpdate={handleProfileUpdate} onToggleComponent={handleComponentToggle} />
            </TabsContent>
            <TabsContent value="additional" className="mt-0">
              <AdditionalInfoForm profile={profile} onUpdate={handleProfileUpdate} />
            </TabsContent>
            <TabsContent value="work" className="mt-0">
              <WorkEducationForm profile={profile} onUpdate={handleProfileUpdate} />
            </TabsContent>
            <TabsContent value="social" className="mt-0">
              <SocialLinksForm profile={profile} onUpdate={handleProfileUpdate} />
            </TabsContent>
            <TabsContent value="github" className="mt-0">
              <GitHubFeaturesForm
                profile={profile}
                onUpdate={handleProfileUpdate}
                onToggleComponent={handleComponentToggle}
              />
            </TabsContent>
            <TabsContent value="customize" className="mt-0">
              <ThemeCustomizer
                profile={profile}
                onUpdateTheme={handleUpdateTheme}
                onUpdateCustomization={handleUpdateCustomization}
              />
            </TabsContent>
            <TabsContent value="preview" className="mt-0">
              <ReadmePreview profile={profile} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Developer Branding Platform - Enhance your GitHub presence with a customized README</p>
        <p className="mt-1">
          ©2025{" "}
          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline hover:text-blue-700"
          >
            V Chaitanya Chowdari
          </a>
        </p>
      </div>
    </main>
  )
}
