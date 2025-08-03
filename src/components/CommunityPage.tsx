'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { Heart, MessageSquare, Users, TrendingUp, Clock, Star, ImageIcon, X, CheckCircle } from "lucide-react"

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
  images?: string[]
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
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTitle, setNewPostTitle] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'health' | 'legal' | 'wellness' | null>(null)
  const [postImages, setPostImages] = useState<File[]>([])
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !newPostTitle.trim() || !selectedCategory) return
    
    // Create new post object
    const newPost: Post = {
      id: `user-${Date.now()}`,
      author: 'You',
      title: newPostTitle,
      content: newPostContent,
      category: selectedCategory,
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
      isLiked: false,
      images: postImages.length > 0 ? postImages.map(file => URL.createObjectURL(file)) : undefined
    }
    
    // Add new post to the beginning of the list
    setPosts(prevPosts => [newPost, ...prevPosts])
    
    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    
    // Reset form
    setNewPostContent('')
    setNewPostTitle('')
    setSelectedCategory(null)
    setPostImages([])
    setShowImageUpload(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 relative z-10">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <div className="glass-premium p-8 rounded-3xl shadow-premium">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full animate-glow">
              <Users className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text-purple">Community</h1>
              <p className="text-gray-600 text-lg mt-2">
                Connect with other women, share experiences, and support each other in a safe, empowering space.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-premium rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 transform hover:scale-105">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-600/30 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-purple">2,847</p>
              <p className="text-sm text-gray-600">Active Members</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-premium rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 transform hover:scale-105">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-4 bg-gradient-to-br from-teal-500/20 to-teal-600/30 rounded-full">
              <MessageSquare className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">1,256</p>
              <p className="text-sm text-gray-600">Discussions</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-premium rounded-2xl shadow-premium hover:shadow-glow transition-all duration-300 transform hover:scale-105">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-4 bg-gradient-to-br from-pink-500/20 to-pink-600/30 rounded-full">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">8,492</p>
              <p className="text-sm text-gray-600">Support Given</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="glass-premium p-4 rounded-2xl border border-green-400/50 bg-green-500/10 animate-slide-up">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-700">
                  Your post has been shared with the community! 🎉
                </p>
              </div>
            </div>
          )}

          {/* New Post Card */}
          <Card className="glass-premium rounded-3xl shadow-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl gradient-text-purple">Share with the Community</CardTitle>
              <CardDescription className="text-gray-600">
                Ask questions, share experiences, or offer support to fellow members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input 
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft"
              />
              <Textarea
                placeholder="What's on your mind? Share your thoughts, experiences, or questions..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl min-h-[100px] text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft"
                rows={4}
              />
              
              {/* Category Selection */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700">Choose a category:</p>
                <div className="flex flex-wrap gap-3">
                  {['health', 'legal', 'wellness'].map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(category as 'health' | 'legal' | 'wellness')}
                      className={`glass border-white/30 rounded-full px-4 py-2 transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 ring-2 ring-purple-400/50 text-purple-700'
                          : 'hover:bg-white/20 text-gray-600'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Image Upload Toggle */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageUpload(!showImageUpload)}
                  className={`glass border-white/30 rounded-full px-4 py-2 transition-all duration-300 ${
                    showImageUpload ? 'bg-purple-500/20 text-purple-700' : 'hover:bg-white/20 text-gray-600'
                  }`}
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  {showImageUpload ? 'Hide Images' : 'Add Images'}
                </Button>
                {postImages.length > 0 && (
                  <span className="text-sm text-gray-600">
                    {postImages.length} image{postImages.length !== 1 ? 's' : ''} selected
                  </span>
                )}
              </div>

              {/* Image Upload Component */}
              {showImageUpload && (
                <ImageUpload
                  onImagesChange={setPostImages}
                  maxImages={4}
                  className="animate-slide-up"
                />
              )}

              {/* Post Actions */}
              <div className="flex justify-between items-center pt-4">
                <div className="text-sm text-gray-500">
                  {!selectedCategory && "Please select a category"}
                  {selectedCategory && !newPostTitle.trim() && "Add a title for your post"}
                  {selectedCategory && newPostTitle.trim() && !newPostContent.trim() && "Share your thoughts..."}
                </div>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || !newPostTitle.trim() || !selectedCategory}
                  className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold border-none shadow-lg hover:shadow-xl rounded-full px-8 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none overflow-hidden group"
                >
                  <span className="relative z-10">Post</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="glass-premium rounded-3xl shadow-premium animate-slide-up">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 glass ring-2 ring-white/20">
                      <AvatarFallback className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 text-purple-600 font-semibold">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center flex-wrap gap-3">
                        <span className="font-semibold text-gray-800">{post.author}</span>
                        <span className={`px-3 py-1 text-xs rounded-full glass border transition-all duration-300 ${
                          post.category === 'health' ? 'border-purple-400/50 bg-purple-500/10 text-purple-700' :
                          post.category === 'legal' ? 'border-teal-400/50 bg-teal-500/10 text-teal-700' :
                          'border-pink-400/50 bg-pink-500/10 text-pink-700'
                        }`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.timestamp}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-semibold text-xl text-gray-800 leading-tight">{post.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{post.content}</p>
                        
                        {/* Image Gallery for posts with images */}
                        {post.images && post.images.length > 0 && (
                          <div className={`grid gap-3 mt-4 ${
                            post.images.length === 1 ? 'grid-cols-1' :
                            post.images.length === 2 ? 'grid-cols-2' :
                            'grid-cols-2 md:grid-cols-3'
                          }`}>
                            {post.images.map((image, index) => (
                              <div key={index} className="glass-card rounded-2xl overflow-hidden aspect-square">
                                <img
                                  src={image}
                                  alt={`Post image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-6 pt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center space-x-2 glass rounded-full px-4 py-2 transition-colors duration-200 ${
                            post.isLiked 
                              ? 'text-red-500 bg-red-500/10 ring-1 ring-red-400/30' 
                              : 'text-gray-600 hover:bg-white/20'
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center space-x-2 glass rounded-full px-4 py-2 text-gray-600 hover:bg-white/20 transition-colors duration-200"
                        >
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
          <Card className="glass-premium rounded-3xl shadow-premium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 gradient-text-purple">
                <TrendingUp className="h-6 w-6" />
                <span>Trending Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { tag: '#WorkLifeBalance', posts: 234 },
                { tag: '#WomenRights', posts: 189 },
                { tag: '#HealthScreenings', posts: 156 },
                { tag: '#MentalWellness', posts: 142 }
              ].map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 glass rounded-2xl hover:bg-white/20 transition-colors duration-200 cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">{topic.tag}</span>
                  <span className="text-xs text-gray-500 bg-gray-100/50 px-2 py-1 rounded-full">{topic.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Featured Members */}
          <Card className="glass-premium rounded-3xl shadow-premium">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 gradient-text-purple">
                <Star className="h-6 w-6" />
                <span>Community Champions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Dr. Rachel S.', role: 'Health Advocate', initials: 'DR' },
                { name: 'Maria J.', role: 'Legal Expert', initials: 'MJ' },
                { name: 'Anna S.', role: 'Wellness Coach', initials: 'AS' }
              ].map((member, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 glass rounded-2xl hover:bg-white/20 transition-colors duration-200 cursor-pointer">
                  <Avatar className="h-10 w-10 glass ring-2 ring-white/20">
                    <AvatarFallback className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 text-purple-600 font-semibold">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{member.name}</p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="glass-premium rounded-3xl shadow-premium">
            <CardHeader className="pb-4">
              <CardTitle className="gradient-text-purple">Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'Be respectful and supportive',
                'Share authentic experiences',
                'Protect privacy and confidentiality',
                'No spam or promotional content',
                'Seek professional help for emergencies'
              ].map((guideline, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span>{guideline}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}