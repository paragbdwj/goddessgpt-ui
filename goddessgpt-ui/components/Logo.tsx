import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ className, size = "md", withText = true }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        {/* Logo SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className={cn(sizeClasses[size], "text-fuchsia-600")}
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c026d3" /> {/* fuchsia-600 */}
              <stop offset="100%" stopColor="#db2777" /> {/* pink-600 */}
            </linearGradient>
          </defs>
          
          {/* Outer circle/aura */}
          <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" opacity="0.15" />
          
          {/* Middle circle */}
          <circle cx="32" cy="32" r="24" fill="url(#logoGradient)" opacity="0.3" />
          
          {/* Inner circle/face */}
          <circle cx="32" cy="32" r="16" fill="url(#logoGradient)" />
          
          {/* Decorative elements */}
          <path 
            d="M32,4 C35,14 42,22 52,25 C42,28 35,36 32,46 C29,36 22,28 12,25 C22,22 29,14 32,4 Z" 
            fill="white" 
            opacity="0.7"
          />
          
          {/* Subtle smile */}
          <path
            d="M26,34 Q32,38 38,34"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Eyes */}
          <circle cx="26" cy="28" r="2" fill="white" />
          <circle cx="38" cy="28" r="2" fill="white" />
        </svg>
      </div>
      
      {withText && (
        <h1 className="text-xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          GoddessGPT
        </h1>
      )}
    </div>
  );
} 