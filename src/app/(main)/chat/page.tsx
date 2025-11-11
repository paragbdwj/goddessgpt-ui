'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Sidebar } from '@/components/layout/sidebar';
import ChatInterface from '@/components/chat/chat-interface';

export default function ChatPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { isCollapsed } = useSidebar();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-[#A875D6]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className={`flex-1 pt-16 lg:pt-0 transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <ChatInterface fullWidth={true} />
      </div>
    </div>
  );
}

