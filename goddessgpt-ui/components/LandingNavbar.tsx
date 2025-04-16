"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Create custom navigation components with shifted viewport
const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <div className="absolute left-0 top-full flex justify-center">
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border border-pink-800/30 bg-black/90 text-gray-200 shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)] -translate-x-19"
        )}
      />
    </div>
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-pink-900/20 hover:text-pink-300 focus:bg-pink-900/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-pink-900/20 data-[state=open]:bg-pink-900/20", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

// Style for navigation links
const navLinkStyles = "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-pink-900/20 hover:text-pink-300 focus:bg-pink-900/20 focus:text-pink-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-pink-900/20 data-[state=open]:bg-pink-900/20";

export default function LandingNavbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-pink-800/20 bg-black/75 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8">
              <img
                src="/images/goddessgpt_logo.png"
                alt="GoddessGPT Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif text-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent hidden sm:inline">
              GoddessGPT
            </span>
          </Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link 
                href="/#signin" 
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-pink-800 transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                Sign In
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/#features" className={navLinkStyles}>
                Features
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <Link href="/pricing" className={navLinkStyles}>
                Pricing
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[200px] gap-3 p-4 md:w-[400px] lg:w-[500px] bg-black/90 border border-pink-800/30">
                  <div className="grid gap-6 p-2 md:grid-cols-2">
                    <Link
                      href="/resources/wellness-guide"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400 font-serif">Wellness Guide</div>
                      <div className="text-xs leading-relaxed text-gray-400">
                        Comprehensive guide to physical and mental wellness
                      </div>
                    </Link>
                    <Link
                      href="/resources/blog"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400 font-serif">Blog</div>
                      <div className="text-xs leading-relaxed text-gray-400">
                        Latest articles on women's wellness
                      </div>
                    </Link>
                    <Link
                      href="/resources/faqs"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400 font-serif">FAQs</div>
                      <div className="text-xs leading-relaxed text-gray-400">
                        Answers to common questions
                      </div>
                    </Link>
                    <Link
                      href="/resources/community"
                      className="group block select-none space-y-1 rounded-md p-3 hover:bg-pink-900/20"
                    >
                      <div className="text-sm font-medium leading-none text-pink-400 font-serif">Community</div>
                      <div className="text-xs leading-relaxed text-gray-400">
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