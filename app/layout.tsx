import type React from "react"
import "@/app/globals.css"
import { Inter, Manrope, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "DevBrand - Elevate Your Developer Profile",
    template: "%s | DevBrand",
  },
  description: "Create stunning GitHub profile READMEs to elevate your developer brand and stand out in the community",
  keywords: [
    "github",
    "readme",
    "profile",
    "generator",
    "developer",
    "branding",
    "portfolio",
    "markdown",
    "github profile",
    "developer tools",
  ],
  authors: [{ name: "DevBrand Team" }],
  creator: "DevBrand",
  publisher: "DevBrand",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://devbrand.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devbrand.vercel.app",
    title: "DevBrand - Elevate Your Developer Profile",
    description:
      "Create stunning GitHub profile READMEs to elevate your developer brand and stand out in the community",
    siteName: "DevBrand",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevBrand - Elevate Your Developer Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevBrand - Elevate Your Developer Profile",
    description:
      "Create stunning GitHub profile READMEs to elevate your developer brand and stand out in the community",
    creator: "@devbrand",
    images: ["/twitter-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
