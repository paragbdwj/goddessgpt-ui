import React from "react";
import ChatNavbar from "@/components/chat/ChatNavbar";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BeamsBackground intensity="subtle" className="min-h-screen h-screen">
      <div className="flex flex-col min-h-screen h-screen">
        <ChatNavbar />
        <main className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 backdrop-blur-sm bg-white/20" />
          <div className="relative z-10 h-full">
            {children}
          </div>
        </main>
      </div>
    </BeamsBackground>
  );
} 