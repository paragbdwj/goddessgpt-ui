"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";

export default function ChatNavbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Mock user data for development
  const user = session?.user || {
    name: "Alice",
    email: "alice@example.com",
    image: null,
  };
  
  const navItems = [
    { name: "Personal Chat", path: "/chat" },
    { name: "Community", path: "/community" },
  ];
  
  const handleSignOut = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        window.location.href = "/";
      } else {
        await signOut({ redirect: false });
        window.location.href = "/";
      }
    } catch (error) {
      toast.error("Error signing out. Please try again.");
    }
  };
  
  return (
    <header className="border-b border-pink-100 bg-white/70 backdrop-blur-sm z-10">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Logo size="sm" withText />
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">
              {user.name}
            </p>
            <Avatar className="h-8 w-8 border border-pink-200">
              <AvatarImage
                src={user.image || ""}
                alt={user.name || "User"}
              />
              <AvatarFallback className="bg-gradient-to-r from-pink-400 to-purple-400 text-white">
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-pink-600"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden border-t border-pink-100 bg-white/80">
        <div className="grid grid-cols-2 divide-x divide-pink-100">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`py-2 text-center text-sm font-medium transition-colors ${
                pathname === item.path
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
} 