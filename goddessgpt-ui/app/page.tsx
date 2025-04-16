"use client";

import React from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { BeamsBackground } from "@/components/ui/beams-background";
import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <BeamsBackground className="overflow-x-hidden min-h-screen">
        <LandingNavbar />
        
        {/* Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto py-12 sm:py-16 md:py-20 relative z-10">
          <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full">
            {/* Title */}
            <div className="space-y-3 sm:space-y-4 md:space-y-5 flex flex-col items-center">
              <motion.div
                className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/images/goddessgpt_logo.png"
                  alt="GoddessGPT Logo"
                  className="w-full h-full object-contain"
                  style={{
                    filter: "drop-shadow(0 8px 16px rgba(190, 24, 93, 0.3))"
                  }}
                />
              </motion.div>
              <motion.h1 
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                GoddessGPT
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Helping you feel better — emotionally, physically, socially, and mentally
              </motion.p>
            </div>

            {/* CTA Button - Enhanced for better conversion */}
            <motion.div 
              className="py-5 sm:py-6 md:py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* "Get Started" text above button */}
              <p className="text-sm sm:text-base font-medium text-gray-300 mb-3 tracking-wide">Join thousands of women finding support today</p>
              
              <div className="flex justify-center">
                <GoogleSignInButton />
              </div>
              
              {/* Trust indicator below button */}
              <p className="text-xs text-gray-400 mt-3 sm:mt-4 tracking-wide">Secure sign-in • 100% private • Free to start</p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 text-left"
              id="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-3">Empowering Features for Women</h2>
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">Discover how GoddessGPT supports you through every aspect of life</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 backdrop-blur-sm border-pink-500/30 overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-pink-500 text-2xl mb-2 bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">💖</div>
                    <CardTitle className="text-white text-xl font-serif group-hover:text-pink-300 transition-colors">Emotional Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm leading-relaxed">
                      Guidance through life's emotional challenges with compassion and understanding. Get personalized support for anxiety, stress, and relationship concerns.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 backdrop-blur-sm border-pink-500/30 overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-pink-500 text-2xl mb-2 bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">🌸</div>
                    <CardTitle className="text-white text-xl font-serif group-hover:text-pink-300 transition-colors">Physical Wellness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm leading-relaxed">
                      Health insights tailored for women's unique needs. Access information about hormonal health, fitness guidance, nutrition advice, and more.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 backdrop-blur-sm border-pink-500/30 overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-pink-500 text-2xl mb-2 bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">✨</div>
                    <CardTitle className="text-white text-xl font-serif group-hover:text-pink-300 transition-colors">Social & Mental Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm leading-relaxed">
                      Support for relationships and mental wellbeing. Navigate social situations, improve communication skills, and develop healthy boundaries with confidence.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-fuchsia-900/20 to-pink-900/20 backdrop-blur-sm border-pink-500/30 overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="text-pink-500 text-2xl mb-2 bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">👭</div>
                    <CardTitle className="text-white text-xl font-serif group-hover:text-pink-300 transition-colors">Global Community</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm leading-relaxed">
                      Connect with women worldwide discussing shared experiences and challenges. Learn from diverse perspectives and contribute to meaningful conversations in a safe space.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-pink-900/30 to-fuchsia-900/30 backdrop-blur-sm border-pink-500/30 mt-6 overflow-hidden hover:border-pink-500/50 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="text-pink-500 text-2xl mr-3 bg-pink-500/10 w-12 h-12 rounded-full flex items-center justify-center">🤖</div>
                    <div>
                      <CardTitle className="text-white text-xl font-serif">Meet your complete AI companion</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 space-y-4">
                    <p className="text-base text-gray-200 leading-relaxed">GoddessGPT is your all-in-one support system — here to guide, support, and grow with you:</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">⚖️</div>
                        <span className="text-gray-300 text-sm">Your lawyer - Helping you understand your rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">👩‍⚕️</div>
                        <span className="text-gray-300 text-sm">Your doctor - Making health feel less scary</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">🧠</div>
                        <span className="text-gray-300 text-sm">Your psychologist - Listening to your thoughts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">🧘‍♀️</div>
                        <span className="text-gray-300 text-sm">Your therapist - Guiding your healing journey</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">👩‍🏫</div>
                        <span className="text-gray-300 text-sm">Your teacher - Fueling your curiosity</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-500 mt-0.5">👯‍♀️</div>
                        <span className="text-gray-300 text-sm">Your trusted friend - Always by your side</span>
                      </li>
                    </ul>
                  </CardDescription>
                </CardContent>
                <CardFooter className="bg-gradient-to-r from-pink-500/5 to-fuchsia-500/5 border-t border-pink-500/10 flex justify-center items-center">
                  <p className="text-pink-300 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Complete anonymity guaranteed
                  </p>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 sm:py-8 text-center text-gray-400 text-sm relative z-10 border-t border-pink-900/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mb-8">
              <div>
                <h3 className="font-serif text-white mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-pink-400">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-pink-400">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-pink-400">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-white mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/resources/blog" className="hover:text-pink-400">Blog</Link></li>
                  <li><Link href="/resources/guides" className="hover:text-pink-400">Wellness Guides</Link></li>
                  <li><Link href="/resources/faqs" className="hover:text-pink-400">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-pink-400">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-pink-400">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="hover:text-pink-400">Cookie Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-white mb-3">Connect</h3>
                <ul className="space-y-2">
                  <li><Link href="https://twitter.com" className="hover:text-pink-400">Twitter</Link></li>
                  <li><Link href="https://instagram.com" className="hover:text-pink-400">Instagram</Link></li>
                  <li><Link href="https://linkedin.com" className="hover:text-pink-400">LinkedIn</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-pink-900/20 pt-6">
              <p>© {new Date().getFullYear()} GoddessGPT. A safe space for women.</p>
            </div>
          </div>
        </footer>
      </BeamsBackground>
    </div>
  );
} 