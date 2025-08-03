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
      <div className="w-80 border-r bg-sidebar">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Choose Your Specialist</h2>
          <div className="space-y-3">
            {Object.entries(specialists).map(([key, specialist]) => {
              const Icon = specialist.icon
              const isActive = activeSpecialist === key
              return (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isActive ? 'ring-2 ring-primary border-primary/20' : ''
                  }`}
                  onClick={() => handleSpecialistChange(key as Specialist)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${specialist.bgColor}`}>
                        <Icon className={`h-5 w-5 ${specialist.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{specialist.name}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
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
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b bg-card p-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${currentSpecialist.bgColor}`}>
              <SpecialistIcon className={`h-6 w-6 ${currentSpecialist.color}`} />
            </div>
            <div>
              <h3 className="font-semibold">{currentSpecialist.name}</h3>
              <p className="text-sm text-muted-foreground">{currentSpecialist.description}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${
                message.isUser ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <SpecialistIcon className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t bg-card p-4">
          <div className="flex space-x-2">
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
              className="resize-none"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line. Always consult real professionals for serious concerns.
          </p>
        </div>
      </div>
    </div>
  )
}