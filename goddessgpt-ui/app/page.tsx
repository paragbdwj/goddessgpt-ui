import React from "react";
import { Logo } from "@/components/Logo";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen h-screen relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50 via-pink-50 to-white z-0" />
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-pink-200/30 to-purple-300/30 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-fuchsia-200/30 to-pink-300/30 blur-3xl" />
      <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-purple-200/20 to-fuchsia-200/20 blur-2xl" />
      
      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-5xl mx-auto py-6 sm:py-12 md:py-16 relative z-10">
        <div className="space-y-4 sm:space-y-6 md:space-y-8 w-full">
          {/* Logo and Title */}
          <div className="space-y-2 sm:space-y-3 md:space-y-4 flex flex-col items-center">
            <Logo size="lg" withText={false} className="mb-4" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              GoddessGPT
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto">
              Your supportive companion for emotional, physical, social, and mental well-being
            </p>
          </div>

          {/* CTA Button - Enhanced for better conversion */}
          <div className="py-5 sm:py-6 md:py-8">
            {/* "Get Started" text above button */}
            <p className="text-sm sm:text-base font-medium text-gray-600 mb-2">Join thousands of women finding support today</p>
            
            <GoogleSignInButton />
            
            {/* Trust indicator below button */}
            <p className="text-xs text-gray-500 mt-2 sm:mt-3">Secure sign-in • 100% private • Free to start</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-left">
            <div className="p-3 sm:p-4 rounded-lg bg-white/70 shadow-sm border border-pink-100 backdrop-blur-sm">
              <div className="text-pink-500 text-lg sm:text-xl mb-1 sm:mb-2">💖</div>
              <h3 className="font-medium text-base sm:text-lg">Emotional Support</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Guidance through life's ups and downs with compassion</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white/70 shadow-sm border border-pink-100 backdrop-blur-sm">
              <div className="text-pink-500 text-lg sm:text-xl mb-1 sm:mb-2">🌸</div>
              <h3 className="font-medium text-base sm:text-lg">Physical Wellness</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Health insights tailored for women's unique needs</p>
            </div>
            <div className="p-3 sm:p-4 rounded-lg bg-white/70 shadow-sm border border-pink-100 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <div className="text-pink-500 text-lg sm:text-xl mb-1 sm:mb-2">✨</div>
              <h3 className="font-medium text-base sm:text-lg">Social & Mental Health</h3>
              <p className="text-gray-600 text-xs sm:text-sm">Support for relationships and mental wellbeing</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 sm:py-4 md:py-6 text-center text-gray-500 text-xs sm:text-sm relative z-10">
        <p>© {new Date().getFullYear()} GoddessGPT. A safe space for women.</p>
      </footer>
    </div>
  );
} 