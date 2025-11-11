'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, AlertCircle, RefreshCw } from 'lucide-react';
import { useChat, useChatMessages } from '@/contexts/ChatContext';
import { useAuth } from '@/contexts/AuthContext';
import { Message, IncomingMessage } from '@/types';
import { MessageBubble, HumanInterventionCard, UIComponentRenderer } from './message-bubble';
import { WelcomeMessage } from './welcome-message';
import { Button } from '@/components/ui/button';
import { generateMessageId, getUserTimezone } from '@/lib/utils/message-helpers';

type ChatInterfaceProps = {
  fullWidth?: boolean;
};

export default function ChatInterface({ fullWidth = false }: ChatInterfaceProps) {
  const { user } = useAuth();
  const { connectionState, sendMessage: sendChatMessage, forceReconnect } = useChat();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isUserNearBottom, setIsUserNearBottom] = useState(true);
  
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Animated placeholders
  const placeholders = [
    "Ask about reproductive health and wellness...",
    "Get information about your legal rights...",
    "Seek emotional wellness support...",
    "Learn about family law matters...",
    "Find stress management techniques...",
  ];

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  // Handle incoming WebSocket messages
  useChatMessages((incomingMessage: IncomingMessage) => {
    handleWebSocketMessage(incomingMessage);
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isUserNearBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserNearBottom]);

  // Check if user is near bottom of scroll
  const handleScroll = () => {
    if (!messagesContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    setIsUserNearBottom(distanceFromBottom < 150);
  };

  // Handle incoming WebSocket messages
  const handleWebSocketMessage = (incomingMessage: IncomingMessage) => {
    const newMessage: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      content: incomingMessage.content || incomingMessage.message || '',
      sender: 'assistant',
      timestamp: new Date(incomingMessage.timestamp * 1000),
      type: incomingMessage.type,
      componentType: incomingMessage.componentType,
      data: incomingMessage.data,
    };

    switch (incomingMessage.type) {
      case 'message':
        // Replace last thinking message or append new
        setMessages((prev) => {
          const lastThinkingIndex = prev.findLastIndex(
            (m) => m.sender === 'assistant' && m.type === 'message' && !m.type
          );
          
          if (lastThinkingIndex !== -1) {
            const updated = [...prev];
            updated[lastThinkingIndex] = newMessage;
            return updated;
          }
          return [...prev, newMessage];
        });
        break;

      case 'status':
        // Add or update status message
        setMessages((prev) => {
          const lastStatusIndex = prev.findLastIndex((m) => m.type === 'status');
          if (lastStatusIndex !== -1) {
            const updated = [...prev];
            updated[lastStatusIndex] = newMessage;
            return updated;
          }
          return [...prev, newMessage];
        });
        break;

      case 'error':
        setMessages((prev) => [...prev, newMessage]);
        setIsLoading(false);
        break;

      case 'complete':
        // Mark last assistant message as complete
        setMessages((prev) => {
          const lastAssistantIndex = prev.findLastIndex((m) => m.sender === 'assistant');
          if (lastAssistantIndex !== -1) {
            const updated = [...prev];
            updated[lastAssistantIndex] = {
              ...updated[lastAssistantIndex],
              type: 'complete',
            };
            return updated;
          }
          return prev;
        });
        // Remove status messages
        setMessages((prev) => prev.filter((m) => m.type !== 'status'));
        setIsLoading(false);
        break;

      case 'human_intervention':
        setMessages((prev) => [...prev, newMessage]);
        setIsLoading(false);
        break;

      case 'ui_component':
        setMessages((prev) => [...prev, newMessage]);
        break;

      default:
        console.warn('Unknown message type:', incomingMessage.type);
    }
  };

  // Send message
  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    
    if (!textToSend || connectionState !== 'CONNECTED') return;

    const messageId = generateMessageId();
    const timezone = getUserTimezone();

    // Add user message to UI
    const userMessage: Message = {
      id: generateMessageId(),
      content: textToSend,
      sender: 'user',
      timestamp: new Date(),
      type: 'complete',
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send via WebSocket
    sendChatMessage(
      textToSend,
      messageId,
      timezone,
      user?.name,
      user?.email
    );

    // Clear input and show loading
    setInputValue('');
    setIsLoading(true);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  // Handle textarea auto-resize
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 96) + 'px';
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white ${fullWidth ? '' : 'max-w-4xl mx-auto'}`}>

      {/* Connection status banner */}
      {connectionState !== 'CONNECTED' && (
        <div className="flex items-center justify-between p-2 sm:p-3 bg-yellow-50 border-b border-yellow-200/50">
          <div className="flex items-center">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-600 mr-2" />
            <span className="text-xs sm:text-sm text-yellow-800">
              {connectionState === 'CONNECTING' && 'Connecting...'}
              {connectionState === 'DISCONNECTED' && 'Disconnected'}
              {connectionState === 'ERROR' && 'Connection error'}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={forceReconnect}
            className="text-xs h-7 sm:h-8"
          >
            <RefreshCw className="h-3 w-3 sm:mr-1" />
            <span className="hidden sm:inline">Reconnect</span>
          </Button>
        </div>
      )}

      {/* Messages container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6"
      >
        {/* Welcome message */}
        {messages.length === 0 && !isLoading && (
          <WelcomeMessage onExampleClick={handleSendMessage} />
        )}

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {messages.map((message) => {
            // TODO: Render human intervention cards
            if (message.type === 'human_intervention') {
              return <HumanInterventionCard key={message.id} message={message} />;
            }

            // TODO: Render UI components
            if (message.type === 'ui_component') {
              return <UIComponentRenderer key={message.id} message={message} />;
            }

            // Regular message
            return <MessageBubble key={message.id} message={message} />;
          })}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mb-4 text-muted-foreground"
          >
            <Loader className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-spin" />
            <span className="text-xs sm:text-sm">GoddessGPT is thinking...</span>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-border/20 p-3 sm:p-4">
        <div className="flex w-full items-end gap-2 rounded-full bg-white backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-[#c7c7c7] transition-all duration-300 focus-within:border-[#A875D6] focus-within:shadow-xl">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={handleTextareaInput}
            onKeyDown={handleKeyDown}
            placeholder={placeholders[placeholderIndex]}
            disabled={connectionState !== 'CONNECTED' || isLoading}
            className="w-full resize-none border-0 bg-transparent px-0 py-0.5 text-xs sm:text-sm focus-visible:outline-none placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{ height: 'auto', minHeight: '20px', maxHeight: '80px' }}
          />
          <Button
            size="icon"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || connectionState !== 'CONNECTED' || isLoading}
            className="flex-shrink-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-[#A875D6] hover:bg-[#905fbf] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white" />
          </Button>
        </div>
        <p className="text-[10px] sm:text-xs text-muted-foreground text-center mt-2 px-2">
          GoddessGPT provides general guidance. Please consult professionals for specific advice.
        </p>
      </div>
    </div>
  );
}

