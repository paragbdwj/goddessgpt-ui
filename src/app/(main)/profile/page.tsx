'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Loader, Edit, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { Sidebar } from '@/components/layout/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user, logout } = useAuth();
  const { isCollapsed } = useSidebar();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    router.push('/');
  };

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
    <div className="flex min-h-screen bg-gradient-to-b from-white to-[#A875D6]/5">
      <Sidebar />
      
      <div className={`flex-1 pt-16 lg:pt-0 transition-all duration-300 ${
        isCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-[#A875D6]/20 shadow-lg">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=A875D6&color=fff&size=128`}
                    alt={user?.name || 'User'}
                    className="h-24 w-24 rounded-full border-4 border-[#A875D6]/20 shadow-lg"
                  />
                  <div className="absolute bottom-0 right-0 h-8 w-8 bg-[#A875D6] rounded-full flex items-center justify-center border-4 border-white shadow-md cursor-pointer hover:bg-[#905fbf] transition-colors">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg font-semibold text-black">
                {user?.name || 'User'}
              </CardTitle>
              <CardDescription className="text-sm">
                Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </CardDescription>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 space-y-6"
        >
          {/* Personal Information */}
          <Card className="border-[#A875D6]/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                Personal Information
              </CardTitle>
              <CardDescription className="text-sm">
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#A875D6]/5">
                <User className="h-5 w-5 text-[#A875D6] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Full Name</p>
                  <p className="text-sm text-muted-foreground">{user?.name || 'Not set'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#A875D6]/5">
                <Mail className="h-5 w-5 text-[#A875D6] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Email Address</p>
                  <p className="text-sm text-muted-foreground">{user?.email || 'Not set'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-[#A875D6]/5">
                <Calendar className="h-5 w-5 text-[#A875D6] mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-black">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="border-[#A875D6]/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                Preferences
              </CardTitle>
              <CardDescription className="text-sm">
                Customize your GoddessGPT experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#A875D6]/5">
                  <div>
                    <p className="text-sm font-medium text-black">AI Response Style</p>
                    <p className="text-xs text-muted-foreground">Compassionate and supportive</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#A875D6]/5">
                  <div>
                    <p className="text-sm font-medium text-black">Notifications</p>
                    <p className="text-xs text-muted-foreground">Enabled for important updates</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-[#A875D6]/5">
                  <div>
                    <p className="text-sm font-medium text-black">Privacy Settings</p>
                    <p className="text-xs text-muted-foreground">All conversations are private</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card className="border-[#A875D6]/20">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                Activity Summary
              </CardTitle>
              <CardDescription className="text-sm">
                Your engagement with GoddessGPT
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-[#A875D6]/5">
                  <p className="text-2xl font-bold text-[#A875D6]">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Conversations</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-[#A875D6]/5">
                  <p className="text-2xl font-bold text-[#A875D6]">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Messages</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-[#A875D6]/5">
                  <p className="text-2xl font-bold text-[#A875D6]">0</p>
                  <p className="text-xs text-muted-foreground mt-1">Days Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logout Section */}
          <Card className="border-red-200/50 bg-red-50/30">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-black">
                Account Actions
              </CardTitle>
              <CardDescription className="text-sm">
                Sign out of your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleLogout}
                disabled={isLoggingOut}
                variant="destructive"
                className="w-full sm:w-auto"
              >
                {isLoggingOut ? (
                  <>
                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                    Signing out...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

