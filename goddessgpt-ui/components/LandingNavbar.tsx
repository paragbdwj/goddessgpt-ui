"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-800/20 bg-black/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Logo size="sm" withText />
          </Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link href="#features" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-pink-900/20 hover:text-pink-300 focus:bg-pink-900/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-pink-900/20 data-[state=open]:bg-pink-900/20">
                  Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/pricing" legacyBehavior passHref>
                <NavigationMenuLink className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-pink-900/20 hover:text-pink-300 focus:bg-pink-900/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-pink-900/20 data-[state=open]:bg-pink-900/20">
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-pink-900/20 hover:text-pink-300 focus:bg-pink-900/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-pink-900/20 data-[state=open]:bg-pink-900/20">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] gap-3 p-4 md:w-[400px] lg:w-[500px] bg-black/90 border border-pink-800/30">
                  <div className="grid gap-6 p-2 md:grid-cols-2">
                    <Link
                      href="/resources/wellness-guide"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400">Wellness Guide</div>
                      <div className="text-xs leading-snug text-gray-400">
                        Comprehensive guide to physical and mental wellness
                      </div>
                    </Link>
                    <Link
                      href="/resources/blog"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400">Blog</div>
                      <div className="text-xs leading-snug text-gray-400">
                        Latest articles on women's wellness
                      </div>
                    </Link>
                    <Link
                      href="/resources/faqs"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400">FAQs</div>
                      <div className="text-xs leading-snug text-gray-400">
                        Answers to common questions
                      </div>
                    </Link>
                    <Link
                      href="/resources/community"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400">Community</div>
                      <div className="text-xs leading-snug text-gray-400">
                        Join our supportive community
                      </div>
                    </Link>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden text-gray-200 hover:bg-pink-900/20 hover:text-pink-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <line x1="4" x2="20" y1="12" y2="12"/>
            <line x1="4" x2="20" y1="6" y2="6"/>
            <line x1="4" x2="20" y1="18" y2="18"/>
          </svg>
        </Button>
      </div>
    </header>
  );
} 