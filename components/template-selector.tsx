"use client"

import { useState } from "react"
import { templates } from "@/lib/templates"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"
import type { UserProfile } from "@/types/profile"

interface TemplateSelectorProps {
  profile: UserProfile
  onSelectTemplate: (templateId: string) => void
}

export default function TemplateSelector({ profile, onSelectTemplate }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(profile.template)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
  }

  const handleApplyTemplate = () => {
    onSelectTemplate(selectedTemplate)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Choose a Template</h3>
        <Button onClick={handleApplyTemplate} disabled={selectedTemplate === profile.template}>
          Apply Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex justify-between items-center">
                {template.name}
                {selectedTemplate === template.id && <Check className="h-4 w-4 text-primary" />}
              </CardTitle>
              <CardDescription className="text-xs">{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="relative h-[120px] w-full overflow-hidden rounded-md">
                <Image
                  src={template.previewImage || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
              <div className="flex flex-wrap gap-1">
                {template.sections.slice(0, 4).map((section) => (
                  <span key={section} className="bg-muted px-1.5 py-0.5 rounded-sm">
                    {section}
                  </span>
                ))}
                {template.sections.length > 4 && (
                  <span className="bg-muted px-1.5 py-0.5 rounded-sm">+{template.sections.length - 4} more</span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
