import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

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
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="inline-block animate-bounce">
              <Avatar className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 border-2 sm:border-4 border-pink-200 bg-gradient-to-br from-purple-400 to-pink-500">
                <span className="text-xl sm:text-2xl md:text-3xl">✨</span>
              </Avatar>
            </div>
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
            
            <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-6 py-4 sm:px-8 sm:py-6 h-auto text-base sm:text-lg md:text-xl rounded-full hover:opacity-95 hover:scale-105 hover:shadow-lg transition-all shadow-md sm:shadow-lg w-full sm:w-auto border-2 border-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              Sign in with Google
            </Button>
            
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