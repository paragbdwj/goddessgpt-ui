"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      // For development, we'll mock a successful sign-in after a delay
      if (process.env.NODE_ENV === "development") {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.push("/chat");
      } else {
        const result = await signIn("google", { redirect: false });
        if (result?.error) {
          toast.error("Authentication failed. Please try again.");
        } else {
          router.push("/chat");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
      {/* <div className="mb-2 w-40 h-40 flex items-center justify-center">
        <img
          src="/images/goddessgpt_logo.png"
          alt="GoddessGPT Logo"
          className="max-w-full max-h-full object-contain"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(190, 24, 93, 0.3))"
          }}
        />
      </div> */}
      
      <Button 
        size="lg"
        className={cn(
          "relative overflow-hidden bg-white text-gray-800 px-6 py-6 h-auto font-medium text-base sm:text-lg rounded-lg",
          "border border-gray-200 w-full max-w-sm transition-all duration-300",
          "shadow-[0_4px_14px_0_rgba(255,192,203,0.2)]",
          "hover:shadow-[0_6px_20px_rgba(255,105,180,0.35)]",
          "hover:scale-[1.02] hover:border-pink-200",
          "after:content-[''] after:absolute after:h-full after:w-full after:top-0 after:left-0 after:bg-gradient-to-r after:from-pink-500/10 after:to-fuchsia-500/10 after:opacity-0 after:transition-opacity after:duration-300",
          isHovered && "after:opacity-100"
        )}
        onClick={handleSignIn}
        disabled={isLoading}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 relative z-10">
            <svg className="animate-spin h-5 w-5 text-pink-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Signing in...</span>
          </div>
        ) : (
          <>
            <div className={cn(
              "flex items-center gap-3 relative z-10 transition-transform duration-300",
              isHovered && "translate-x-1"
            )}>
              <svg className={cn(
                "h-5 w-5 transition-transform duration-300",
                isHovered && "scale-110"
              )} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className={cn(
                "transition-all duration-300", 
                isHovered && "bg-gradient-to-r from-pink-600 to-fuchsia-600 bg-clip-text text-transparent font-semibold"
              )}>
                Sign in with Google
              </span>
            </div>
          </>
        )}
      </Button>
    </div>
  );
} 