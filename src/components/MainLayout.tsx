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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/10 rounded-full mix-blend-multiply animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-400/10 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-400/10 rounded-full mix-blend-multiply animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Header */}
      <header className="glass border-b border-white/20 relative z-10 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 animate-slide-up">
              <Heart className="h-8 w-8 text-primary animate-glow" />
              <h1 className="text-2xl font-bold gradient-text-purple">
                GoddessGPT
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-2 glass-premium rounded-full p-1 shadow-inner-glow">
              <Button
                variant={activeTab === 'chat' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('chat')}
                className={`relative flex items-center space-x-2 rounded-full px-6 py-2 transition-all duration-300 overflow-hidden group ${
                  activeTab === 'chat' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-purple-500/10 hover:text-purple-700 hover:scale-105 text-gray-700'
                }`}
              >
                <MessageCircle className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Chat</span>
                {activeTab === 'chat' && <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
              </Button>
              <Button
                variant={activeTab === 'community' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('community')}
                className={`relative flex items-center space-x-2 rounded-full px-6 py-2 transition-all duration-300 overflow-hidden group ${
                  activeTab === 'community' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-purple-500/10 hover:text-purple-700 hover:scale-105 text-gray-700'
                }`}
              >
                <Users className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Community</span>
                {activeTab === 'community' && <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>}
              </Button>
            </div>

            {/* Sign Out */}
            <Button
              variant="outline"
              onClick={onSignOut}
              className="glass border-white/40 hover:border-red-400/60 hover:bg-red-500/10 text-gray-700 hover:text-red-700 flex items-center space-x-2 rounded-full px-6 transition-all duration-300 hover:scale-105"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {activeTab === 'chat' && <ChatInterface />}
        {activeTab === 'community' && <CommunityPage />}
      </main>
    </div>
  )
}