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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/20 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-400/20 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Header */}
      <header className="glass border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 animate-slide-up">
              <Heart className="h-8 w-8 text-primary animate-glow" />
              <h1 className="text-2xl font-bold gradient-text-purple">
                GoddessGPT
              </h1>
            </div>
            <Button 
              onClick={handleGoogleSignIn}
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-none shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden group"
            >
              <span className="relative z-10">Sign in with Google</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="glass-premium p-8 rounded-3xl shadow-premium animate-slide-up">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl leading-tight">
                Your{" "}
                <span className="gradient-text-purple animate-glow">
                  AI Companion
                </span>{" "}
                for Health & Legal Support
              </h2>
              <p className="text-lg text-gray-600 sm:text-xl max-w-2xl mx-auto leading-relaxed">
                Get personalized assistance from AI specialists in healthcare, legal matters, and mental wellness. 
                Empowering women with trusted guidance when you need it most.
              </p>
            </div>
            
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-6 sm:space-y-0 mt-8">
              <Button 
                size="lg" 
                onClick={handleGoogleSignIn}
                className="relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-none shadow-lg hover:shadow-xl px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10">Get Started with Google</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto glass border-white/40 hover:border-purple-400/60 hover:bg-purple-500/10 text-gray-700 hover:text-purple-700 font-medium px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h3 className="text-3xl font-bold gradient-text">Specialized AI Assistance</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with AI specialists trained to understand your unique needs
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="glass-card relative overflow-hidden rounded-2xl shadow-glass hover:shadow-glow transition-all duration-500 transform hover:scale-105 group">
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-purple-600/30 group-hover:from-purple-500/30 group-hover:to-purple-600/40 transition-all duration-300">
                  <Stethoscope className="h-10 w-10 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl mb-4 gradient-text-purple">Medical Guidance</CardTitle>
                <CardDescription className="text-gray-600">
                  Get informed health advice and understand your symptoms with our AI doctor
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span><span>Symptom assessment</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span><span>Health recommendations</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span><span>Medication information</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-purple-500 rounded-full"></span><span>Wellness planning</span></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card relative overflow-hidden rounded-2xl shadow-glass hover:shadow-glow transition-all duration-500 transform hover:scale-105 group">
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/30 group-hover:from-teal-500/30 group-hover:to-teal-600/40 transition-all duration-300">
                  <Scale className="h-10 w-10 text-teal-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl mb-4 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Legal Support</CardTitle>
                <CardDescription className="text-gray-600">
                  Navigate legal questions with confidence using our AI legal advisor
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span><span>Legal document review</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span><span>Rights information</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span><span>Family law guidance</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-teal-500 rounded-full"></span><span>Workplace issues</span></li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card relative overflow-hidden rounded-2xl shadow-glass hover:shadow-glow transition-all duration-500 transform hover:scale-105 group">
              <CardHeader className="text-center p-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/30 group-hover:from-pink-500/30 group-hover:to-pink-600/40 transition-all duration-300">
                  <Brain className="h-10 w-10 text-pink-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl mb-4 bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">Mental Wellness</CardTitle>
                <CardDescription className="text-gray-600">
                  Support your mental health journey with our compassionate AI therapist
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-pink-500 rounded-full"></span><span>Emotional support</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-pink-500 rounded-full"></span><span>Stress management</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-pink-500 rounded-full"></span><span>Coping strategies</span></li>
                  <li className="flex items-center space-x-2"><span className="w-2 h-2 bg-pink-500 rounded-full"></span><span>Self-care guidance</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="glass-premium p-8 rounded-3xl shadow-premium">
              <div className="text-center space-y-8">
                <div className="space-y-6">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 animate-glow">
                    <Shield className="h-10 w-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text">Your Privacy & Safety Matter</h3>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    We prioritize your confidentiality and provide a safe space for all your questions. 
                    Our AI is designed with empathy and understanding at its core.
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-3">
                  <div className="glass p-6 rounded-2xl space-y-4 transition-all duration-300 hover:shadow-glow">
                    <h4 className="font-semibold text-lg gradient-text-purple">End-to-End Encryption</h4>
                    <p className="text-sm text-gray-600">
                      All conversations are encrypted and secure
                    </p>
                  </div>
                  <div className="glass p-6 rounded-2xl space-y-4 transition-all duration-300 hover:shadow-glow">
                    <h4 className="font-semibold text-lg gradient-text-purple">No Judgment Zone</h4>
                    <p className="text-sm text-gray-600">
                      Ask anything in a supportive environment
                    </p>
                  </div>
                  <div className="glass p-6 rounded-2xl space-y-4 transition-all duration-300 hover:shadow-glow">
                    <h4 className="font-semibold text-lg gradient-text-purple">Professional Standards</h4>
                    <p className="text-sm text-gray-600">
                      AI trained on verified medical and legal knowledge
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="glass-premium p-8 rounded-3xl shadow-premium">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold gradient-text-purple">Ready to Get Started?</h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of women who trust GoddessGPT for reliable, compassionate AI assistance.
                </p>
              </div>
              
              <Button 
                size="lg" 
                onClick={handleGoogleSignIn}
                className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-none shadow-lg hover:shadow-xl px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 overflow-hidden group"
              >
                <span className="relative z-10">Sign Up with Google - It's Free</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/20 py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-primary animate-glow" />
              <span className="font-semibold gradient-text-purple">GoddessGPT</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 GoddessGPT. Empowering women through AI assistance.
            </p>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600">Community-Driven</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}