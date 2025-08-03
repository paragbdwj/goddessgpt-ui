'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Stethoscope, Scale, Brain, Send, User } from "lucide-react"

type Specialist = 'doctor' | 'lawyer' | 'psychiatrist'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatInterface() {
  const [activeSpecialist, setActiveSpecialist] = useState<Specialist>('doctor')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm your AI ${activeSpecialist}. How can I help you today? Please remember that I provide information and guidance, but for serious concerns, always consult with a real medical professional.`,
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const specialists = {
    doctor: {
      name: 'Dr. Wellness',
      icon: Stethoscope,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Medical guidance and health advice'
    },
    lawyer: {
      name: 'Legal Advisor',
      icon: Scale,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'Legal support and rights information'
    },
    psychiatrist: {
      name: 'Dr. Mindful',
      icon: Brain,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
      description: 'Mental wellness and emotional support'
    }
  }

  const handleSpecialistChange = (specialist: Specialist) => {
    setActiveSpecialist(specialist)
    setMessages([
      {
        id: Date.now().toString(),
        content: `Hello! I'm your AI ${specialist}. How can I help you today? Please remember that I provide information and guidance, but for serious concerns, always consult with a real professional.`,
        isUser: false,
        timestamp: new Date()
      }
    ])
  }

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Thank you for your question about "${inputMessage}". As your AI ${activeSpecialist}, I understand your concern. This is a mock response - in a real application, this would be connected to an AI service that provides specialized advice. Please remember to consult with real professionals for serious matters.`,
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)

    setInputMessage('')
  }

  const currentSpecialist = specialists[activeSpecialist]
  const SpecialistIcon = currentSpecialist.icon

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <div className="w-80 glass-premium border-r border-white/20 relative z-10 m-4 mr-0 rounded-l-3xl shadow-inner-glow">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6 gradient-text-purple">Choose Your Specialist</h2>
          <div className="space-y-4">
            {Object.entries(specialists).map(([key, specialist]) => {
              const Icon = specialist.icon
              const isActive = activeSpecialist === key
              return (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all duration-300 rounded-2xl border-white/20 hover:shadow-glow transform hover:scale-105 ${
                    isActive 
                      ? 'glass bg-gradient-to-r from-purple-500/20 to-pink-500/20 shadow-glow ring-2 ring-purple-400/50' 
                      : 'glass-hover'
                  }`}
                  onClick={() => handleSpecialistChange(key as Specialist)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-gradient-to-br ${
                        key === 'doctor' ? 'from-purple-500/20 to-purple-600/30' :
                        key === 'lawyer' ? 'from-teal-500/20 to-teal-600/30' :
                        'from-pink-500/20 to-pink-600/30'
                      } transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                        <Icon className={`h-6 w-6 ${
                          key === 'doctor' ? 'text-purple-600' :
                          key === 'lawyer' ? 'text-teal-600' :
                          'text-pink-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className={`text-sm font-semibold ${
                          isActive ? 'gradient-text-purple' : 'text-gray-700'
                        }`}>{specialist.name}</CardTitle>
                        <p className="text-xs text-gray-600 mt-1">
                          {specialist.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col glass-premium m-4 ml-0 rounded-r-3xl overflow-hidden relative z-10 shadow-premium">
        {/* Chat Header */}
        <div className="glass border-b border-white/20 p-6">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full bg-gradient-to-br animate-glow ${
              activeSpecialist === 'doctor' ? 'from-purple-500/20 to-purple-600/30' :
              activeSpecialist === 'lawyer' ? 'from-teal-500/20 to-teal-600/30' :
              'from-pink-500/20 to-pink-600/30'
            }`}>
              <SpecialistIcon className={`h-8 w-8 ${
                activeSpecialist === 'doctor' ? 'text-purple-600' :
                activeSpecialist === 'lawyer' ? 'text-teal-600' :
                'text-pink-600'
              }`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg gradient-text-purple">{currentSpecialist.name}</h3>
              <p className="text-sm text-gray-600">{currentSpecialist.description}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
            >
              <div className={`flex items-start space-x-3 max-w-[85%] ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="h-10 w-10 glass ring-2 ring-white/20">
                  <AvatarFallback className="bg-gradient-to-br from-purple-400/20 to-pink-400/20">
                    {message.isUser ? (
                      <User className="h-5 w-5 text-purple-600" />
                    ) : (
                      <SpecialistIcon className={`h-5 w-5 ${
                        activeSpecialist === 'doctor' ? 'text-purple-600' :
                        activeSpecialist === 'lawyer' ? 'text-teal-600' :
                        'text-pink-600'
                      }`} />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl p-4 shadow-soft transition-all duration-300 hover:shadow-glow ${
                    message.isUser
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'glass border border-white/20'
                  }`}
                >
                  <p className={`text-sm leading-relaxed ${
                    message.isUser ? 'text-white' : 'text-gray-700'
                  }`}>{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.isUser ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="glass border-t border-white/20 p-6">
          <div className="flex space-x-4 items-end">
            <Textarea
              placeholder={`Ask your AI ${activeSpecialist} anything...`}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="resize-none bg-white/20 backdrop-blur-md border-2 border-white/40 hover:border-purple-400/60 rounded-2xl p-4 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/80 focus:bg-white/30 transition-all duration-300 shadow-soft text-gray-700 placeholder:text-gray-500"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-none shadow-lg hover:shadow-xl rounded-full p-3 h-12 w-12 transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:transform-none overflow-hidden group"
            >
              <Send className="h-5 w-5 relative z-10" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Press Enter to send, Shift+Enter for new line. Always consult real professionals for serious concerns.
          </p>
        </div>
      </div>
    </div>
  )
}