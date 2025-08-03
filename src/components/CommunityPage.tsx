'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, MessageSquare, Users, TrendingUp, Clock, Star } from "lucide-react"

interface Post {
  id: string
  author: string
  title: string
  content: string
  category: 'health' | 'legal' | 'wellness'
  likes: number
  replies: number
  timestamp: string
  isLiked: boolean
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Sarah M.',
    title: 'Managing Work-Life Balance as a New Mom',
    content: 'I recently returned to work after maternity leave and I\'m struggling to find the right balance. Any tips from other working moms?',
    category: 'wellness',
    likes: 24,
    replies: 12,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: '2',
    author: 'Lisa K.',
    title: 'Understanding Your Rights in Workplace Harassment',
    content: 'I want to share some resources about workplace harassment laws that helped me. Knowledge is power!',
    category: 'legal',
    likes: 45,
    replies: 8,
    timestamp: '5 hours ago',
    isLiked: true
  },
  {
    id: '3',
    author: 'Dr. Emma R.',
    title: 'Importance of Regular Health Screenings',
    content: 'As women, we often put everyone else first. Here\'s a reminder about essential health screenings we shouldn\'t skip.',
    category: 'health',
    likes: 67,
    replies: 23,
    timestamp: '1 day ago',
    isLiked: false
  }
]

const categoryColors = {
  health: 'bg-primary/10 text-primary',
  legal: 'bg-accent/10 text-accent',
  wellness: 'bg-chart-3/10 text-chart-3'
}

export default function CommunityPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Community</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Connect with other women, share experiences, and support each other in a safe, empowering space.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Active Members</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-accent/10 rounded-full">
              <MessageSquare className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">1,256</p>
              <p className="text-sm text-muted-foreground">Discussions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-chart-3/10 rounded-full">
              <Heart className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-2xl font-bold">8,492</p>
              <p className="text-sm text-muted-foreground">Support Given</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* New Post Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Share with the Community</CardTitle>
              <CardDescription>
                Ask questions, share experiences, or offer support to fellow members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="What's on your mind?" />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Health</Button>
                  <Button variant="outline" size="sm">Legal</Button>
                  <Button variant="outline" size="sm">Wellness</Button>
                </div>
                <Button>Post</Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{post.author}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${categoryColors[post.category]}`}>
                          {post.category}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.timestamp}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                        <p className="text-muted-foreground">{post.content}</p>
                      </div>
                      
                      <div className="flex items-center space-x-4 pt-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center space-x-1 ${post.isLiked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Trending Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">#WorkLifeBalance</span>
                <span className="text-xs text-muted-foreground">234 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#WomenRights</span>
                <span className="text-xs text-muted-foreground">189 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#HealthScreenings</span>
                <span className="text-xs text-muted-foreground">156 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#MentalWellness</span>
                <span className="text-xs text-muted-foreground">142 posts</span>
              </div>
            </CardContent>
          </Card>

          {/* Featured Members */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>Community Champions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Dr. Rachel S.</p>
                  <p className="text-xs text-muted-foreground">Health Advocate</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Maria J.</p>
                  <p className="text-xs text-muted-foreground">Legal Expert</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">Anna S.</p>
                  <p className="text-xs text-muted-foreground">Wellness Coach</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Be respectful and supportive</p>
              <p>• Share authentic experiences</p>
              <p>• Protect privacy and confidentiality</p>
              <p>• No spam or promotional content</p>
              <p>• Seek professional help for emergencies</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}