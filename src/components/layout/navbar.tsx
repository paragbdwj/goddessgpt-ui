'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, User, ChevronDown, Sparkles, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-border/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#A875D6] to-[#905fbf]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-black hidden sm:block">GoddessGPT</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => router.push('/chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/chat')
                  ? 'bg-[#A875D6]/10 text-[#A875D6]'
                  : 'text-black hover:bg-[#A875D6]/5'
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat AI</span>
            </button>

            <button
              onClick={() => router.push('/profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-[#A875D6]/10 text-[#A875D6]'
                  : 'text-black hover:bg-[#A875D6]/5'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg hover:bg-[#A875D6]/5 transition-all duration-200"
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-black" />
              ) : (
                <Menu className="h-5 w-5 text-black" />
              )}
            </button>

            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-[#A875D6]/5 transition-all duration-200"
              >
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=A875D6&color=fff`}
                  alt={user?.name || 'User'}
                  className="h-8 w-8 rounded-full border-2 border-[#A875D6]/20"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-black">{user?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">{user?.email || ''}</p>
                </div>
                <ChevronDown
                  className={`hidden lg:block h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    showProfileMenu ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Profile Dropdown Menu */}
              <AnimatePresence>
                {showProfileMenu && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />

                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-64 sm:w-72 bg-white rounded-lg shadow-xl border border-border/20 py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-border/20">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=A875D6&color=fff`}
                            alt={user?.name || 'User'}
                            className="h-12 w-12 rounded-full border-2 border-[#A875D6]/20"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-black truncate">
                              {user?.name || 'User'}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {user?.email || ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={() => {
                            router.push('/profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-[#A875D6]/5 transition-colors"
                        >
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>View Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            router.push('/chat');
                            setShowProfileMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-[#A875D6]/5 transition-colors"
                        >
                          <MessageCircle className="h-4 w-4 text-muted-foreground" />
                          <span>Go to Chat</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border/20"
            >
              <div className="py-2 space-y-1">
                <button
                  onClick={() => {
                    router.push('/chat');
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive('/chat')
                      ? 'bg-[#A875D6]/10 text-[#A875D6]'
                      : 'text-black hover:bg-[#A875D6]/5'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat AI</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/profile');
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive('/profile')
                      ? 'bg-[#A875D6]/10 text-[#A875D6]'
                      : 'text-black hover:bg-[#A875D6]/5'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

