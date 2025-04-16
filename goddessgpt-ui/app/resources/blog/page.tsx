"use client";

import React from "react";
import { BeamsBackground } from "@/components/ui/beams-background";
import LandingNavbar from "@/components/LandingNavbar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock blog data
const blogPosts = [
  {
    id: "1",
    title: "Understanding Hormonal Changes Throughout Your Cycle",
    excerpt: "Learn how hormonal fluctuations impact your mood, energy, and physical wellbeing during different phases of your menstrual cycle.",
    date: "May 15, 2023",
    category: "Physical Wellness",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Mindfulness Practices for Emotional Balance",
    excerpt: "Discover simple mindfulness techniques you can incorporate into your daily routine to improve emotional regulation and reduce stress.",
    date: "June 2, 2023",
    category: "Mental Health",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2622&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Building Meaningful Connections in a Digital Age",
    excerpt: "Tips for nurturing authentic relationships and maintaining social connections in today's technology-driven world.",
    date: "June 18, 2023",
    category: "Social Wellbeing",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1536009190979-329b87a3c21d?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Nutrition Essentials for Women's Health",
    excerpt: "Key nutrients that support women's health at different life stages and how to incorporate them into your diet.",
    date: "July 5, 2023",
    category: "Physical Wellness",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Setting Boundaries: A Guide to Healthier Relationships",
    excerpt: "Learn how to establish and maintain healthy boundaries in personal and professional relationships for better emotional health.",
    date: "July 22, 2023",
    category: "Relationships",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?q=80&w=2940&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Sleep Optimization for Better Health",
    excerpt: "Practical strategies to improve your sleep quality and duration, and why it's especially important for women's health.",
    date: "August 10, 2023",
    category: "Physical Wellness",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1631157826293-fa456d70943b?q=80&w=2940&auto=format&fit=crop"
  },
];

// Categories for filtering
const categories = [
  "All",
  "Physical Wellness",
  "Mental Health",
  "Social Wellbeing",
  "Relationships",
  "Self-Care",
];

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <BeamsBackground className="overflow-x-hidden min-h-screen" intensity="subtle">
        <LandingNavbar />
        
        <main className="flex-1 py-16 md:py-20 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Wellness Resources & Blog
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Insights, tips, and research to support your wellbeing journey
              </p>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm ${
                    category === "All"
                      ? "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  } transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Featured Post */}
            <div className="mb-12">
              <Card className="overflow-hidden border-pink-900/20 bg-white/10 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-64 md:h-auto relative overflow-hidden">
                    <img 
                      src={blogPosts[0].imageUrl}
                      alt={blogPosts[0].title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <div className="text-xs font-medium text-pink-500 mb-2">{blogPosts[0].category} • {blogPosts[0].date}</div>
                    <CardTitle className="text-white text-2xl mb-4">{blogPosts[0].title}</CardTitle>
                    <p className="text-gray-300 mb-6">{blogPosts[0].excerpt}</p>
                    <div>
                      <Button asChild className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white">
                        <Link href={`/resources/blog/${blogPosts[0].id}`}>Read Article</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.slice(1).map((post) => (
                <Card key={post.id} className="overflow-hidden border-pink-900/20 bg-white/10 backdrop-blur-sm">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-xs font-medium text-pink-500 mb-1">{post.category} • {post.date}</div>
                    <CardTitle className="text-white text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-xs text-gray-400">{post.readTime}</div>
                    <Button asChild variant="outline" className="text-white border-pink-500/30 hover:bg-white/20">
                      <Link href={`/resources/blog/${post.id}`}>Read More</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Newsletter Sign Up */}
            <div className="mt-16 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border border-pink-500/30 rounded-lg p-8 backdrop-blur-sm">
              <div className="md:flex items-center justify-between gap-8">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-white mb-2">Subscribe to our Newsletter</h3>
                  <p className="text-gray-300">
                    Get the latest articles, wellness tips, and exclusive content delivered directly to your inbox.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="Your email address" 
                      className="px-4 py-2 rounded-md border border-pink-500/30 bg-white/10 text-white placeholder:text-gray-400 flex-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <Button className="bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white">
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="py-6 sm:py-8 text-center text-gray-400 text-sm relative z-10 border-t border-pink-900/20">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} GoddessGPT. A safe space for women.</p>
          </div>
        </footer>
      </BeamsBackground>
    </div>
  );
} 