import React from "react";
import ChatNavbar from "@/components/chat/ChatNavbar";

export default function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen h-screen bg-gradient-to-b from-purple-50 via-pink-50 to-white">
      <ChatNavbar />
      <main className="flex-1 overflow-hidden relative">{children}</main>
    </div>
  );
} 