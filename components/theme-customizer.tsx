"use client"

import { useState, useEffect } from "react"
import { themes } from "@/lib/themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { UserProfile } from "@/types/profile"

interface ThemeCustomizerProps {
  profile: UserProfile
  onUpdateTheme: (themeId: string) => void
  onUpdateCustomization: (customization: Partial<UserProfile["customization"]>) => void
}

export default function ThemeCustomizer({ profile, onUpdateTheme, onUpdateCustomization }: ThemeCustomizerProps) {
  const [selectedTheme, setSelectedTheme] = useState(profile.theme)
  const [currentTheme, setCurrentTheme] = useState(themes.find((t) => t.id === profile.theme))
  const [customization, setCustomization] = useState(profile.customization)

  useEffect(() => {
    setCurrentTheme(themes.find((t) => t.id === selectedTheme))
  }, [selectedTheme])

  const handleSelectTheme = (themeId: string) => {
    setSelectedTheme(themeId)
  }

  const handleApplyTheme = () => {
    onUpdateTheme(selectedTheme)
    onUpdateCustomization(customization)
  }

  const handleCustomizationChange = (key: keyof UserProfile["customization"], value: string) => {
    setCustomization((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Customize Theme</h3>
        <Button
          onClick={handleApplyTheme}
          disabled={selectedTheme === profile.theme && customization === profile.customization}
        >
          Apply Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Theme Presets</h4>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <Card
                key={theme.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTheme === theme.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleSelectTheme(theme.id)}
              >
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-sm flex justify-between items-center">
                    {theme.name}
                    {selectedTheme === theme.id && <Check className="h-3 w-3 text-primary" />}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex gap-1 mb-2">
                    {Object.values(theme.colors).map((color, index) => (
                      <div key={index} className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                  <CardDescription className="text-xs">{theme.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium mb-3">Customization Options</h4>

          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
              value={customization.fontFamily}
              onValueChange={(value) => handleCustomizationChange("fontFamily", value)}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Select font family" />
              </SelectTrigger>
              <SelectContent>
                {currentTheme?.fontOptions.map((font) => (
                  <SelectItem key={font} value={font}>
                    {font.charAt(0).toUpperCase() + font.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardStyle">Card Style</Label>
            <Select
              value={customization.cardStyle}
              onValueChange={(value) => handleCustomizationChange("cardStyle", value)}
            >
              <SelectTrigger id="cardStyle">
                <SelectValue placeholder="Select card style" />
              </SelectTrigger>
              <SelectContent>
                {currentTheme?.cardStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconSet">Icon Set</Label>
            <Select
              value={customization.iconSet}
              onValueChange={(value) => handleCustomizationChange("iconSet", value)}
            >
              <SelectTrigger id="iconSet">
                <SelectValue placeholder="Select icon set" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple Icons</SelectItem>
                <SelectItem value="devicon">DevIcons</SelectItem>
                <SelectItem value="fontawesome">Font Awesome</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="statsTheme">GitHub Stats Theme</Label>
            <RadioGroup
              value={customization.statsTheme}
              onValueChange={(value) => handleCustomizationChange("statsTheme", value)}
              className="grid grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="radical" id="radical" />
                <Label htmlFor="radical">Radical</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tokyonight" id="tokyonight" />
                <Label htmlFor="tokyonight">Tokyo Night</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="synthwave" id="synthwave" />
                <Label htmlFor="synthwave">Synthwave</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillsLayout">Skills Layout</Label>
            <Select
              value={customization.skillsLayout}
              onValueChange={(value) => handleCustomizationChange("skillsLayout", value)}
            >
              <SelectTrigger id="skillsLayout">
                <SelectValue placeholder="Select skills layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid</SelectItem>
                <SelectItem value="inline">Inline</SelectItem>
                <SelectItem value="badges">Badges</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
