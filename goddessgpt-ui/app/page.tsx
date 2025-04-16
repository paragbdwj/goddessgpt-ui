"use client";

import React from "react";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { BeamsBackground } from "@/components/ui/beams-background";
import { motion } from "framer-motion";
import LandingNavbar from "@/components/LandingNavbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                GoddessGPT
              </motion.h1>
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                Your supportive companion for emotional, physical, social, and mental well-being
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
              <p className="text-sm sm:text-base font-medium text-gray-300 mb-3">Join thousands of women finding support today</p>
              
              <div className="flex justify-center">
                <GoogleSignInButton />
              </div>
              
              {/* Trust indicator below button */}
              <p className="text-xs text-gray-400 mt-3 sm:mt-4">Secure sign-in • 100% private • Free to start</p>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 text-left"
              id="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-pink-900/20">
                <CardHeader>
                  <div className="text-pink-500 text-xl sm:text-2xl mb-2">💖</div>
                  <CardTitle className="text-white">Emotional Support</CardTitle>
                  <CardDescription className="text-gray-300">Guidance through life's ups and downs with compassion</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-pink-900/20">
                <CardHeader>
                  <div className="text-pink-500 text-xl sm:text-2xl mb-2">🌸</div>
                  <CardTitle className="text-white">Physical Wellness</CardTitle>
                  <CardDescription className="text-gray-300">Health insights tailored for women's unique needs</CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border-pink-900/20 sm:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="text-pink-500 text-xl sm:text-2xl mb-2">✨</div>
                  <CardTitle className="text-white">Social & Mental Health</CardTitle>
                  <CardDescription className="text-gray-300">Support for relationships and mental wellbeing</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 sm:py-8 text-center text-gray-400 text-sm relative z-10 border-t border-pink-900/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left mb-8">
              <div>
                <h3 className="font-semibold text-white mb-3">Company</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="hover:text-pink-400">About Us</Link></li>
                  <li><Link href="/careers" className="hover:text-pink-400">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-pink-400">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Resources</h3>
                <ul className="space-y-2">
                  <li><Link href="/resources/blog" className="hover:text-pink-400">Blog</Link></li>
                  <li><Link href="/resources/guides" className="hover:text-pink-400">Wellness Guides</Link></li>
                  <li><Link href="/resources/faqs" className="hover:text-pink-400">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/privacy" className="hover:text-pink-400">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-pink-400">Terms of Service</Link></li>
                  <li><Link href="/cookies" className="hover:text-pink-400">Cookie Policy</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3">Connect</h3>
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