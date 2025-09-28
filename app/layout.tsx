import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
              Loading...
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="sr-only" aria-live="polite">
                Loading…
              </div>
            }
          >
            {children}
          </Suspense>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
