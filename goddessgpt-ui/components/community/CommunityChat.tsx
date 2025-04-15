"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Type for community posts
type CommunityPost = {
  id: string;
  author: {
    name: string;
    image?: string | null;
  };
  content: string;
  timestamp: Date;
  likes: number;
  replies: number;
};

export default function CommunityChat() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const postsEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  
  // Mock user data for development
  const user = session?.user || {
    name: "Alice",
    email: "alice@example.com",
    image: null,
  };

  // Fetch community posts (mock)
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Mock community posts
        const mockPosts: CommunityPost[] = [
          {
            id: nanoid(),
            author: { name: "Sophia", image: null },
            content: "I've been dealing with anxiety about my upcoming job interview. Any tips from the community on managing pre-interview stress?",
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            likes: 15,
            replies: 4,
          },
          {
            id: nanoid(),
            author: { name: "Emma", image: null },
            content: "Deep breathing helps me a lot with interview anxiety! I practice 4-7-8 breathing (inhale for 4, hold for 7, exhale for 8) right before going in. Also, remember that interviews are a two-way street - you're also deciding if the company is right for you!",
            timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
            likes: 8,
            replies: 1,
          },
          {
            id: nanoid(),
            author: { name: "Olivia", image: null },
            content: "Just wanted to share a win - after months of therapy and self-work, I finally had a healthy conversation with my mother about boundaries! It wasn't perfect, but it was progress. ❤️",
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            likes: 23,
            replies: 7,
          },
          {
            id: nanoid(),
            author: { name: "Ava", image: null },
            content: "Has anyone tried meditation apps specifically designed for women? Looking for recommendations!",
            timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
            likes: 4,
            replies: 2,
          },
          {
            id: nanoid(),
            author: { name: "Isabella", image: null },
            content: "I've been using Calm and Headspace, but recently discovered Balance which I'm enjoying. There's also one called Expectful that's great for women's specific issues including pregnancy and motherhood if that's relevant to you!",
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            likes: 7,
            replies: 0,
          },
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        toast.error("Failed to load community posts.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  // Auto-scroll to bottom when new post is added
  useEffect(() => {
    if (!isLoading && posts.length > 0 && postsEndRef.current) {
      postsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, posts.length]);

  const handlePostMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    setIsPosting(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Add new post
      const newPost: CommunityPost = {
        id: nanoid(),
        author: {
          name: user.name || "Anonymous",
          image: user.image,
        },
        content: input,
        timestamp: new Date(),
        likes: 0,
        replies: 0,
      };
      
      setPosts((prev) => [...prev, newPost]);
      setInput("");
      toast.success("Your post has been shared with the community!");
    } catch (error) {
      toast.error("Failed to publish your post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Skeleton loading component for posts
  const PostSkeleton = () => (
    <div className="bg-white/70 rounded-lg p-4 border border-pink-100 space-y-3">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );

  return (
    <div className="flex flex-col h-full mx-auto px-4 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl">
      <div className="py-4">
        <h1 className="text-xl font-semibold text-pink-800">
          Community Discussion
        </h1>
        <p className="text-sm text-gray-600">
          Share experiences, ask questions, and support each other in a safe space.
        </p>
      </div>
      
      {/* Community posts container */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {isLoading ? (
          // Loading skeletons
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : (
          // Actual posts
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white/70 backdrop-blur-sm rounded-lg p-4 sm:p-5 border border-pink-100"
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border border-pink-200">
                  <AvatarImage 
                    src={post.author.image || ""} 
                    alt={post.author.name} 
                  />
                  <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1 sm:mb-2">
                    <div>
                      <p className="font-medium text-sm sm:text-base text-gray-800">
                        {post.author.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        {post.timestamp.toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-700 mt-2">{post.content}</p>
                  
                  <div className="flex items-center space-x-4 mt-3">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-pink-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                      <span>{post.likes} likes</span>
                    </button>
                    
                    <span className="flex items-center space-x-1 text-xs text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-4 h-4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                      <span>{post.replies} replies</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={postsEndRef} />
      </div>

      {/* Post input form */}
      <div className="border-t border-pink-100 py-4 sm:py-5 md:py-6">
        <form onSubmit={handlePostMessage} className="space-y-3 max-w-4xl mx-auto w-full">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Share your thoughts, questions, or experiences with the community..."
            className="resize-none border-pink-200 focus-visible:ring-pink-400 min-h-24 text-sm sm:text-base"
            disabled={isPosting}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:opacity-90 py-2 sm:py-3 px-4 sm:px-6"
              disabled={isPosting}
            >
              {isPosting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Posting...
                </span>
              ) : (
                "Post to Community"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 