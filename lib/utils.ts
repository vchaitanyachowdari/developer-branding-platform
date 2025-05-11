import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UserProfile } from "@/types/profile"
import { generateMarkdown } from "./markdown-generator"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function downloadMarkdown(profile: UserProfile) {
  const markdown = generateMarkdown(profile)
  const blob = new Blob([markdown], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "README.md"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
