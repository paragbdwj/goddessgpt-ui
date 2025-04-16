"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

// Type for chat messages
type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  
  // Mock user data for development
  const user = session?.user || {
    name: "Alice",
    email: "alice@example.com",
    image: null,
  };

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content: `Welcome, ${user.name}! I'm GoddessGPT, your supportive companion. How can I assist you with your emotional, mental, social, or physical well-being today?`,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [user.name]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Simulate API call with mock responses
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate a mock response based on user input
      let responseContent = getMockResponse(input);
      
      const assistantMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to generate mock responses based on keywords in user input
  const getMockResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("anxiety") || input.includes("stress") || input.includes("worried")) {
      return "It's completely normal to feel anxious or stressed sometimes. Try deep breathing exercises: breathe in for 4 counts, hold for 4, and exhale for 6. This can help calm your nervous system. Would you like to talk more about what's causing your anxiety?";
    } else if (input.includes("sad") || input.includes("depression") || input.includes("lonely")) {
      return "I'm sorry to hear you're feeling this way. Your feelings are valid. Sometimes talking to someone you trust or a mental health professional can really help. Would it be possible for you to reach out to someone close to you today?";
    } else if (input.includes("relationship") || input.includes("partner") || input.includes("friend")) {
      return "Relationships can be complex! Communication is often key. Could you share a bit more about the specific situation, so I can offer more tailored support?";
    } else if (input.includes("tired") || input.includes("exhausted") || input.includes("sleep")) {
      return "Quality sleep is so important for mental and physical wellbeing. Are you having trouble falling asleep, staying asleep, or waking up refreshed? There are different strategies depending on your specific sleep challenges.";
    } else if (input.includes("pain") || input.includes("headache") || input.includes("period pain")) {
      return "I'm sorry you're experiencing pain. While I can offer some general wellness advice, it's important to consult with a healthcare provider for persistent or severe pain. Would you like some general self-care tips that might help?";
    } else if (input.includes("thank")) {
      return "You're very welcome! I'm here to support you whenever you need. Is there anything else I can help you with today?";
    } else if (input.includes("hello") || input.includes("hi") || input.includes("hey")) {
      return "Hello there! How are you feeling today? I'm here to listen and provide support for whatever you might be going through.";
    } else {
      return "Thank you for sharing that with me. I'm here to listen and support you. Could you tell me a bit more about how this is affecting you, so I can better understand how to help?";
    }
  };

  return (
    <div className="flex flex-col h-full mx-auto px-4 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-start max-w-[80%] sm:max-w-[70%] md:max-w-[65%] lg:max-w-[60%] ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              {message.role === "user" ? (
                <Avatar className="h-8 w-8 border border-pink-200 ml-2">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="bg-gradient-to-r from-pink-400 to-purple-400 text-white">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-8 w-8 flex items-center justify-center mr-2">
                  <Logo size="xs" withText={false} />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-fuchsia-500/90 to-pink-500/90 text-white backdrop-blur-sm border border-fuchsia-400/30"
                    : "bg-white/80 backdrop-blur-sm border border-pink-100 shadow-sm"
                } sm:max-w-[90%] md:max-w-[80%] lg:max-w-[70%]`}
              >
                <p className="text-sm sm:text-base">{message.content}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    message.role === "user" ? "text-pink-100" : "text-gray-400"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <div className="py-4 sm:py-5 md:py-6">
        <form
          onSubmit={handleSendMessage}
          className="flex items-center max-w-4xl mx-auto w-full relative"
        >
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full rounded-full border-0 bg-white/70 backdrop-blur-sm shadow-sm py-6 pl-5 pr-14 text-gray-700 focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-0 focus:outline-none"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white h-10 w-10 p-0 flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:opacity-90 hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
} 