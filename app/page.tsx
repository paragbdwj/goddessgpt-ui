"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Brain, LineChart, Shield, Users } from "lucide-react"

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="h-5 w-5"
      aria-hidden
    >
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.62 32.213 29.272 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.87 6.053 29.706 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
      <path fill="#FF3D00" d="M6.306 14.691l6.571 4.817C14.387 16.127 18.808 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.87 6.053 29.706 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.192 0 9.86-1.987 13.409-5.221l-6.197-5.238C29.094 35.091 26.671 36 24 36c-5.248 0-9.58-3.76-10.958-8.814l-6.58 5.061C9.788 39.583 16.351 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.086 3.213-3.324 5.861-6.09 7.541l.005-.003 6.197 5.238C34.882 41.46 40 38 43.611 32.083 44.5 30.5 44.5 24 44.5 24s0-3.5-.889-3.917z"/>
    </svg>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default function LandingPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />
        <div className="container py-24 md:py-32">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-3 py-1">Privacy & Safety First</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                Stop Juggling. Start Integrating.
              </h1>
              <p className="text-lg text-muted-foreground">
                Finally, your period tracker, mental health journal, and a supportive community all live in one safe, empathetic space.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button size="lg" className="gap-2">
                  <GoogleIcon />
                  Sign in with Google
                </Button>
                <Button variant="outline" size="lg">Learn more</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your data is encrypted and yours alone. We provide a non-judgmental, zero-tolerance space for genuine support.
              </p>
            </div>
            <div className="relative">
              {/* Placeholder hero graphic */}
              <Card className="aspect-[4/3] w-full overflow-hidden">
                <CardContent className="h-full w-full bg-gradient-to-br from-accent/60 via-background to-background p-6">
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed">
                    <span className="text-sm text-muted-foreground">Hero graphic placeholder</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container py-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The Problem</h2>
          <p className="text-muted-foreground">
            You have one app for your cycle, another for meditation, and a dozen browser tabs for your health questions. The support is scattered, the forums are judgmental, and nothing is connected.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-muted/20 py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The Solution</h2>
            <p className="text-muted-foreground">
              Welcome to GoddessGPT. We built the all-in-one companion we've always wanted.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard icon={<Brain className="h-5 w-5" />} title="An Empathetic AI Companion" description="Ask anything. Get non-judgmental, specialized answers on everything from PCOS and perimenopause to anxiety, burnout, and setting boundaries." />
            <FeatureCard icon={<Users className="h-5 w-5" />} title="A Private Community (\"The Circle\")" description="Connect anonymously and safely in moderated, topic-based forums. Share your story, find women who get it, and give support, all without fear of judgment." />
            <FeatureCard icon={<LineChart className="h-5 w-5" />} title="Holistic Trackers (\"My Journey\")" description="Log your mood, cycle, and symptoms. Our platform helps you see the connections—like how your sleep affects your anxiety, or how your cycle impacts your energy." />
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Shield className="h-4 w-4 text-primary" />
            <p className="text-sm text-muted-foreground">
              Privacy & Safety First: Your data is encrypted and yours alone. We provide a non-judgmental, zero-tolerance space for genuine support.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="mx-auto max-w-2xl text-center">
          <CardHeader>
            <CardTitle className="text-2xl">It's time for a single, powerful tool built for the interconnected needs of women.</CardTitle>
            <CardDescription>Join a safe, empathetic space that supports every part of your journey.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                <GoogleIcon />
                Sign in with Google
              </Button>
              <Separator className="max-w-[200px]" />
              <p className="text-xs text-muted-foreground">Mock CTA — no account will be created.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
