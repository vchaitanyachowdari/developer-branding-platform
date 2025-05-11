"use client"

import type React from "react"

import type { UserProfile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { generateMarkdown } from "@/lib/markdown-generator"
import { useEffect, useState } from "react"
import { themes } from "@/lib/themes"

interface ReadmePreviewProps {
  profile: UserProfile
}

export default function ReadmePreview({ profile }: ReadmePreviewProps) {
  const [markdown, setMarkdown] = useState("")
  const [html, setHtml] = useState("")
  const theme = themes.find((t) => t.id === profile.theme) || themes[0]

  useEffect(() => {
    const md = generateMarkdown(profile)
    setMarkdown(md)

    // Convert markdown to HTML for preview
    // This is a simple conversion for demonstration
    // In a real app, you'd use a proper markdown parser
    const htmlContent = md
      .replace(/# (.*)/g, "<h1>$1</h1>")
      .replace(/## (.*)/g, "<h2>$1</h2>")
      .replace(/### (.*)/g, "<h3>$1</h3>")
      .replace(/\*\*(.*)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*)\*/g, "<em>$1</em>")
      .replace(/!\[(.*)\]$$(.*)$$/g, '<img alt="$1" src="$2" />')
      .replace(/\[(.*)\]$$(.*)$$/g, '<a href="$2">$1</a>')
      .replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>")
      .replace(/- (.*)/g, "<li>$1</li>")
      .replace(/<\/li>\n<li>/g, "</li><li>")
      .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>")
      .split("\n\n")
      .map((p) => (p.startsWith("<") ? p : `<p>${p}</p>`))
      .join("")

    setHtml(htmlContent)
  }, [profile])

  // Apply theme-specific styles to the preview
  const previewStyle = {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: getFontFamily(profile.customization.fontFamily),
  }

  const cardStyle = getCardStyle(profile.customization.cardStyle, theme)

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">README Preview</h3>
        <div className="text-sm text-muted-foreground">
          {profile.github ? `github.com/${profile.github}` : "Preview"}
        </div>
      </div>

      <Card className="border border-dashed" style={cardStyle}>
        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none" style={previewStyle}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 overflow-auto max-h-[400px]">
          <pre className="text-xs">{markdown}</pre>
        </CardContent>
      </Card>
    </div>
  )
}

// Helper functions for styling
function getFontFamily(fontFamily: string): string {
  switch (fontFamily) {
    case "sans":
      return "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
    case "serif":
      return "ui-serif, Georgia, Cambria, Times New Roman, serif"
    case "monospace":
      return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    case "futuristic":
      return "'Orbitron', 'Rajdhani', sans-serif"
    default:
      return "ui-sans-serif, system-ui, sans-serif"
  }
}

function getCardStyle(cardStyle: string, theme: any): React.CSSProperties {
  switch (cardStyle) {
    case "flat":
      return {
        backgroundColor: theme.colors.background,
        border: `1px solid ${theme.colors.accent}`,
        borderRadius: "0.5rem",
      }
    case "elevated":
      return {
        backgroundColor: theme.colors.background,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
        borderRadius: "0.5rem",
      }
    case "bordered":
      return {
        backgroundColor: theme.colors.background,
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: "0.5rem",
      }
    case "terminal":
      return {
        backgroundColor: "#000000",
        border: "1px solid #333333",
        borderRadius: "0.5rem",
        boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
        padding: "1rem",
      }
    case "neon":
      return {
        backgroundColor: "#000000",
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: "0.5rem",
        boxShadow: `0 0 10px ${theme.colors.primary}, 0 0 20px ${theme.colors.secondary}`,
      }
    case "glassmorphism":
      return {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "0.5rem",
      }
    default:
      return {
        backgroundColor: theme.colors.background,
        borderRadius: "0.5rem",
      }
  }
}
