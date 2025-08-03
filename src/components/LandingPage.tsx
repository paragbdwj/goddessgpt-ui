'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Users, Stethoscope, Scale, Brain } from "lucide-react"

interface LandingPageProps {
  onSignIn: () => void
}

export default function LandingPage({ onSignIn }: LandingPageProps) {
  const handleGoogleSignIn = () => {
    // Mock Google Sign In for now
    console.log('Google Sign In clicked')
    // In a real app, this would redirect to Google OAuth
    onSignIn()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GoddessGPT
              </h1>
            </div>
            <Button 
              onClick={handleGoogleSignIn}
              className="bg-primary hover:bg-primary/90"
            >
              Sign in with Google
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI Companion
              </span>{" "}
              for Health & Legal Support
            </h2>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Get personalized assistance from AI specialists in healthcare, legal matters, and mental wellness. 
              Empowering women with trusted guidance when you need it most.
            </p>
          </div>
          
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
            <Button 
              size="lg" 
              onClick={handleGoogleSignIn}
              className="w-full bg-primary hover:bg-primary/90 sm:w-auto"
            >
              Get Started with Google
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-bold">Specialized AI Assistance</h3>
            <p className="text-lg text-muted-foreground">
              Connect with AI specialists trained to understand your unique needs
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="relative overflow-hidden border-2 hover:border-primary/20 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Medical Guidance</CardTitle>
                <CardDescription>
                  Get informed health advice and understand your symptoms with our AI doctor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Symptom assessment</li>
                  <li>• Health recommendations</li>
                  <li>• Medication information</li>
                  <li>• Wellness planning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-accent/20 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <Scale className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">Legal Support</CardTitle>
                <CardDescription>
                  Navigate legal questions with confidence using our AI legal advisor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Legal document review</li>
                  <li>• Rights information</li>
                  <li>• Family law guidance</li>
                  <li>• Workplace issues</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2 hover:border-chart-3/20 transition-colors">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chart-3/10">
                  <Brain className="h-8 w-8 text-chart-3" />
                </div>
                <CardTitle className="text-xl">Mental Wellness</CardTitle>
                <CardDescription>
                  Support your mental health journey with our compassionate AI therapist
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Emotional support</li>
                  <li>• Stress management</li>
                  <li>• Coping strategies</li>
                  <li>• Self-care guidance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-secondary/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold">Your Privacy & Safety Matter</h3>
              <p className="text-lg text-muted-foreground">
                We prioritize your confidentiality and provide a safe space for all your questions. 
                Our AI is designed with empathy and understanding at its core.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-semibold">End-to-End Encryption</h4>
                <p className="text-sm text-muted-foreground">
                  All conversations are encrypted and secure
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">No Judgment Zone</h4>
                <p className="text-sm text-muted-foreground">
                  Ask anything in a supportive environment
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Professional Standards</h4>
                <p className="text-sm text-muted-foreground">
                  AI trained on verified medical and legal knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
            <p className="text-lg text-muted-foreground">
              Join thousands of women who trust GoddessGPT for reliable, compassionate AI assistance.
            </p>
          </div>
          
          <Button 
            size="lg" 
            onClick={handleGoogleSignIn}
            className="bg-primary hover:bg-primary/90 px-8"
          >
            Sign Up with Google - It's Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/20 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold">GoddessGPT</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 GoddessGPT. Empowering women through AI assistance.
            </p>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Community-Driven</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}