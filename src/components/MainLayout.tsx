'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heart, LogOut, MessageCircle, Users } from "lucide-react"
import ChatInterface from './ChatInterface'
import CommunityPage from './CommunityPage'

interface MainLayoutProps {
  onSignOut: () => void
}

export default function MainLayout({ onSignOut }: MainLayoutProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'community'>('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GoddessGPT
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('chat')}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat</span>
              </Button>
              <Button
                variant={activeTab === 'community' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('community')}
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>Community</span>
              </Button>
            </div>

            {/* Sign Out */}
            <Button
              variant="outline"
              onClick={onSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'community' && <CommunityPage />}
      </main>
    </div>
  )
}