import "./globals.css"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "GoddessGPT — Stop Juggling. Start Integrating.",
  description:
    "Finally, your period tracker, mental health journal, and a supportive community all live in one safe, empathetic space.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background text-foreground antialiased")}>{children}</body>
    </html>
  )
}
