'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Scale, 
  Brain, 
  Sparkles, 
  Shield, 
  Clock, 
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Loader
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect authenticated users to chat
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/chat');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSignInClick = async () => {
    setIsSigningIn(true);
    try {
      // Mock authentication - automatically sign in as guest user
      await login('user@goddessgpt.com', 'GoddessGPT User');
      // Router will redirect via useEffect above
    } catch (error) {
      console.error('Sign in error:', error);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-mesh min-h-screen flex items-center">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#A875D6]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#A875D6]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A875D6]/10 border border-[#A875D6]/20">
              <Sparkles className="h-4 w-4 text-[#A875D6]" />
              <span className="text-sm font-medium text-black">Your AI Wellness Companion</span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight" style={{ animationDelay: "0.1s" }}>
              Empowering Women with{" "}
              <span className="bg-gradient-to-r from-[#A875D6] to-[#905fbf] bg-clip-text text-transparent">
                Intelligent Support
              </span>
            </h1>

            {/* Subheadline */}
            <p className="animate-fade-in-up text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto" style={{ animationDelay: "0.2s" }}>
              Your trusted AI assistant providing personalized guidance for healthcare, legal matters, and mental wellness. Because your well-being matters.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center pt-4" style={{ animationDelay: "0.3s" }}>
              <Button 
                variant="brand" 
                size="xl"
                onClick={handleSignInClick}
                disabled={isSigningIn || isLoading}
                className="w-full sm:w-auto group"
              >
                {isSigningIn ? (
                  <>
                    <Loader className="h-5 w-5 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                    Sign in with Google
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="animate-fade-in-up flex flex-wrap justify-center gap-6 pt-8 text-sm text-muted-foreground" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-[#A875D6]" />
                <span>100% Private & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#A875D6]" />
                <span>24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-[#A875D6]" />
                <span>Instant Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Comprehensive Support for Every Aspect of Your Life
            </h2>
            <p className="text-lg text-muted-foreground">
              GoddessGPT provides expert guidance across three essential domains, tailored specifically for women&apos;s unique needs.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Healthcare Card */}
            <Card className="border-[#A875D6]/20 hover:border-[#A875D6]/40 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#A875D6]/10 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-[#A875D6]" />
                </div>
                <CardTitle>Healthcare Guidance</CardTitle>
              <CardDescription>
                Get informed answers about women&apos;s health, wellness, and medical concerns with compassionate AI support.
              </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Reproductive health information</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Wellness & nutrition advice</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Symptom understanding & support</span>
                </div>
              </CardContent>
            </Card>

            {/* Legal Support Card */}
            <Card className="border-[#A875D6]/20 hover:border-[#A875D6]/40 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#A875D6]/10 flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-[#A875D6]" />
                </div>
                <CardTitle>Legal Assistance</CardTitle>
                <CardDescription>
                  Navigate legal matters with confidence. Get clear explanations and guidance on your rights and options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Family law & divorce guidance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Employment rights information</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Consumer protection advice</span>
                </div>
              </CardContent>
            </Card>

            {/* Mental Wellness Card */}
            <Card className="border-[#A875D6]/20 hover:border-[#A875D6]/40 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-[#A875D6]/10 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-[#A875D6]" />
                </div>
                <CardTitle>Mental & Emotional Wellness</CardTitle>
                <CardDescription>
                  Find support for your mental health journey with empathetic guidance and coping strategies.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Stress & anxiety management</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Self-care strategies</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#A875D6] mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">Emotional support & validation</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[#A875D6]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Simple, Private, and Powerful
            </h2>
            <p className="text-lg text-muted-foreground">
              Getting started with GoddessGPT takes just moments
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#A875D6]/10 flex items-center justify-center mx-auto border-4 border-[#A875D6]/20">
                <span className="text-2xl font-bold text-[#A875D6]">1</span>
              </div>
              <h3 className="text-lg font-semibold text-black">Sign In Securely</h3>
              <p className="text-sm text-muted-foreground">
                Use your Google account for instant, secure access. No lengthy forms required.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#A875D6]/10 flex items-center justify-center mx-auto border-4 border-[#A875D6]/20">
                <span className="text-2xl font-bold text-[#A875D6]">2</span>
              </div>
              <h3 className="text-lg font-semibold text-black">Start Chatting</h3>
              <p className="text-sm text-muted-foreground">
                Ask your questions naturally. GoddessGPT understands and responds with care.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#A875D6]/10 flex items-center justify-center mx-auto border-4 border-[#A875D6]/20">
                <span className="text-2xl font-bold text-[#A875D6]">3</span>
              </div>
              <h3 className="text-lg font-semibold text-black">Get Personalized Support</h3>
              <p className="text-sm text-muted-foreground">
                Receive thoughtful, tailored guidance that respects your unique situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#A875D6] to-[#905fbf] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Your Journey to Empowered Wellness Starts Here
            </h2>
            <p className="text-lg sm:text-xl text-white/90">
              Join thousands of women who trust GoddessGPT for confidential, compassionate support.
            </p>
            
            <Button 
              variant="default"
              size="xl"
              onClick={handleSignInClick}
              disabled={isSigningIn || isLoading}
              className="bg-white text-[#A875D6] hover:bg-white/90 w-full sm:w-auto group shadow-2xl"
            >
              {isSigningIn ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
                  Get Started with Google
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-sm text-white/80">
              Free to start • No credit card required • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-black">GoddessGPT</h3>
                <p className="text-sm text-muted-foreground">
                  Empowering women with intelligent, compassionate AI support.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-black">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Features</li>
                  <li>How it Works</li>
                  <li>Pricing</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-black">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Help Center</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-black">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>About Us</li>
                  <li>Contact</li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
              <p>© 2025 GoddessGPT. All rights reserved. Made with ❤️ for women everywhere.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

