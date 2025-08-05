'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ui/image-upload"
import { Heart, MessageSquare, Users, TrendingUp, Clock, Star, ImageIcon, X, CheckCircle, Reply, ThumbsUp, Share2 } from "lucide-react"

interface Reply {
  id: string
  author: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

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
  replyList?: Reply[]
  isConnectedTo?: string[]
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
    isLiked: false,
    isConnectedTo: ['3'],
    replyList: [
      {
        id: '1-1',
        author: 'Maria K.',
        content: 'I found that setting clear boundaries helped me a lot. Also, don\'t be afraid to ask for help!',
        timestamp: '1 hour ago',
        likes: 8,
    isLiked: false
      },
      {
        id: '1-2',
        author: 'Dr. Emma R.',
        content: 'Remember that self-care isn\'t selfish. Taking breaks actually makes you more productive.',
        timestamp: '45 minutes ago',
        likes: 12,
        isLiked: true
      }
    ]
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
    isLiked: true,
    replyList: [
      {
        id: '2-1',
        author: 'Jennifer T.',
        content: 'Thank you for sharing this! This information is so valuable.',
        timestamp: '3 hours ago',
        likes: 5,
        isLiked: false
      }
    ]
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
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set())
  const [replyToPost, setReplyToPost] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')

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

  const toggleReplies = (postId: string) => {
    const newExpanded = new Set(expandedReplies)
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId)
    } else {
      newExpanded.add(postId)
    }
    setExpandedReplies(newExpanded)
  }

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return
    
    const newReply: Reply = {
      id: `${postId}-${Date.now()}`,
      author: 'You',
      content: replyContent,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false
    }
    
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              replyList: [...(post.replyList || []), newReply],
              replies: post.replies + 1
            }
          : post
      )
    )
    
    setReplyContent('')
    setReplyToPost(null)
    if (!expandedReplies.has(postId)) {
      toggleReplies(postId)
    }
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar - Posting & Stats */}
        <div className="space-y-6">
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

          {/* New Post Card - Compact */}
          <Card className="glass-premium rounded-3xl shadow-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg gradient-text-purple">Create Post</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Share with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input 
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft"
              />
              <Textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl min-h-[80px] text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft"
                rows={3}
              />
              
              {/* Compact Category Selection */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-700">Category:</p>
                <div className="flex gap-2">
                  {['health', 'legal', 'wellness'].map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(category as 'health' | 'legal' | 'wellness')}
                      className={`glass border-white/30 rounded-full px-3 py-1 text-xs transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 ring-1 ring-purple-400/50 text-purple-700'
                          : 'hover:bg-white/20 text-gray-600'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Compact Image Upload */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageUpload(!showImageUpload)}
                  className={`glass border-white/30 rounded-full px-3 py-1 text-xs transition-all duration-300 ${
                    showImageUpload ? 'bg-purple-500/20 text-purple-700' : 'hover:bg-white/20 text-gray-600'
                  }`}
                >
                  <ImageIcon className="h-3 w-3 mr-1" />
                  Images
                </Button>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || !newPostTitle.trim() || !selectedCategory}
                  className="relative bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white font-medium border-none shadow-lg rounded-full px-6 py-2 text-sm transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none overflow-hidden group"
                >
                  <span className="relative z-10">Post</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>

              {/* Image Upload Component */}
              {showImageUpload && (
                <ImageUpload
                  onImagesChange={setPostImages}
                  maxImages={2}
                  className="mt-3"
                />
              )}
            </CardContent>
          </Card>

          {/* Stats Cards - Compact */}
          <Card className="glass-premium rounded-2xl shadow-premium">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg gradient-text-purple">Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm text-gray-600">Active Members</span>
                </div>
                <span className="text-lg font-bold gradient-text-purple">1,256</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-teal-600" />
                  <span className="text-sm text-gray-600">Discussions</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">8,492</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-pink-600" />
                  <span className="text-sm text-gray-600">Support Given</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">8,492</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Main Community Posts Feed */}
        <div className="lg:col-span-3 space-y-6">
          {/* Header for Connected Posts */}
          <div className="glass-premium p-6 rounded-3xl shadow-premium mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-glow">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text-purple">Connected Community Discussions</h2>
                <p className="text-gray-600">Follow the conversation threads and discover related topics</p>
              </div>
            </div>
          </div>

          {/* Connected Posts Network */}
          <div className="space-y-8 relative">
            {/* Background Connection Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-400/20 to-transparent"></div>
            </div>
            {posts.map((post, index) => (
              <Card key={post.id} className={`glass-premium rounded-3xl shadow-premium animate-slide-up relative ${
                post.isConnectedTo && post.isConnectedTo.length > 0 ? 'ring-1 ring-purple-400/30' : ''
              }`}>
                {/* Enhanced Connection Line to Previous Post */}
                {index > 0 && post.isConnectedTo && post.isConnectedTo.includes(posts[index - 1].id) && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="flex flex-col items-center animate-pulse">
                      <div className="w-px h-8 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 shadow-lg"></div>
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full -mt-1 shadow-lg ring-2 ring-white/30 animate-glow"></div>
                      <div className="text-xs text-purple-600 font-medium mt-1 px-2 py-1 bg-white/80 rounded-full shadow-sm">
                        Connected
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Side Connection Indicators */}
                {post.isConnectedTo && post.isConnectedTo.length > 0 && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4">
                    <div className="flex flex-col space-y-1">
                      {post.isConnectedTo.map((_, idx) => (
                        <div key={idx} className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse opacity-60"></div>
                      ))}
                    </div>
                  </div>
                )}
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
                      
                      {/* Enhanced Connected Posts Indicator */}
                      {post.isConnectedTo && post.isConnectedTo.length > 0 && (
                        <div className="p-4 glass-card rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-purple-500/10 border border-purple-400/30 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 animate-pulse"></div>
                          <div className="relative flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                              <Share2 className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-purple-700">Part of Connected Discussion</p>
                              <p className="text-xs text-purple-600">
                                {post.isConnectedTo.length} related conversation{post.isConnectedTo.length !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className="ml-auto flex space-x-1">
                              {post.isConnectedTo.slice(0, 3).map((_, idx) => (
                                <div key={idx} className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce" style={{animationDelay: `${idx * 0.2}s`}}></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-6 pt-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={`flex items-center space-x-2 glass rounded-full px-4 py-2 transition-all duration-200 hover:scale-105 ${
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
                          onClick={() => toggleReplies(post.id)}
                          className="flex items-center space-x-2 glass rounded-full px-4 py-2 text-gray-600 hover:bg-white/20 transition-all duration-200 hover:scale-105"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.replies}</span>
                        </Button>

                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setReplyToPost(post.id)}
                          className="flex items-center space-x-2 glass rounded-full px-4 py-2 text-gray-600 hover:bg-purple-500/20 hover:text-purple-700 transition-all duration-200 hover:scale-105"
                        >
                          <Reply className="h-4 w-4" />
                          <span>Reply</span>
                        </Button>
                      </div>

                      {/* Replies Section */}
                      {expandedReplies.has(post.id) && post.replyList && post.replyList.length > 0 && (
                        <div className="mt-6 space-y-4 border-l-2 border-purple-400/30 pl-6">
                          {post.replyList.map((reply) => (
                            <div key={reply.id} className="glass-card p-4 rounded-2xl">
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-8 w-8 glass ring-1 ring-white/20">
                                  <AvatarFallback className="bg-gradient-to-br from-purple-400/20 to-pink-400/20 text-purple-600 font-semibold text-xs">
                                    {reply.author.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <span className="font-medium text-sm text-gray-800">{reply.author}</span>
                                    <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                  </div>
                                  <p className="text-sm text-gray-600 leading-relaxed">{reply.content}</p>
                                  <div className="flex items-center space-x-3 mt-3">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className={`flex items-center space-x-1 text-xs glass rounded-full px-3 py-1 transition-all duration-200 ${
                                        reply.isLiked 
                                          ? 'text-red-500 bg-red-500/10' 
                                          : 'text-gray-500 hover:bg-white/20'
                                      }`}
                                    >
                                      <ThumbsUp className={`h-3 w-3 ${reply.isLiked ? 'fill-current' : ''}`} />
                                      <span>{reply.likes}</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      {replyToPost === post.id && (
                        <div className="mt-6 space-y-3 p-4 glass-card rounded-2xl border border-purple-400/30">
                          <Textarea
                            placeholder="Write your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl min-h-[80px] text-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft"
                            rows={3}
                          />
                          <div className="flex items-center space-x-3">
                            <Button
                              onClick={() => handleReply(post.id)}
                              disabled={!replyContent.trim()}
                              className="relative bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-800 hover:to-pink-800 text-white font-medium border-none shadow-lg hover:shadow-xl rounded-full px-6 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none overflow-hidden group"
                            >
                              <span className="relative z-10">Post Reply</span>
                              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setReplyToPost(null)}
                              className="glass border-white/30 text-gray-600 hover:bg-white/20 rounded-full px-6"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

