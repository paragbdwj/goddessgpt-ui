'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Scale, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

type WelcomeMessageProps = {
  onExampleClick: (message: string) => void;
};

export function WelcomeMessage({ onExampleClick }: WelcomeMessageProps) {
  const examples = [
    {
      icon: Heart,
      title: 'Healthcare Guidance',
      description: 'Reproductive health, wellness, and nutrition advice',
      example: "I have questions about women's reproductive health",
    },
    {
      icon: Scale,
      title: 'Legal Assistance',
      description: 'Family law, employment rights, consumer protection',
      example: 'I need information about my employment rights',
    },
    {
      icon: Brain,
      title: 'Mental & Emotional Wellness',
      description: 'Stress management, self-care, emotional support',
      example: 'I need help with stress management techniques',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-8 sm:py-12 px-4"
    >
      {/* Welcome Header */}
      <div className="text-center mb-6 sm:mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#A875D6] to-[#905fbf] mb-3 sm:mb-4"
        >
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        </motion.div>
        <h1 className="text-base sm:text-lg font-semibold text-black mb-2">
          Welcome to GoddessGPT
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-md px-4">
          Your AI assistant for healthcare guidance, legal assistance, and mental wellness support
        </p>
      </div>

      {/* Example Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full max-w-4xl mb-6 sm:mb-8">
        {examples.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <button
              onClick={() => onExampleClick(item.example)}
              className="w-full text-left p-3 sm:p-4 rounded-lg border border-border/20 hover:border-[#A875D6]/30 hover:bg-[#A875D6]/5 transition-all duration-200 group"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-[#A875D6]/10 group-hover:bg-[#A875D6]/20 transition-colors flex-shrink-0">
                  <item.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#A875D6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-semibold text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Quick Start Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center px-4"
      >
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          or type your message below to get started
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExampleClick("Tell me about women's health resources")}
              className="text-[10px] sm:text-xs h-7 sm:h-8"
            >
              Women&apos;s health resources
            </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExampleClick("What are my rights in the workplace?")}
            className="text-[10px] sm:text-xs h-7 sm:h-8"
          >
            Workplace rights
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExampleClick("Help me with stress relief")}
            className="text-[10px] sm:text-xs h-7 sm:h-8"
          >
            Stress relief
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

