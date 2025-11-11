'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/types';
import { formatMessageTime } from '@/lib/utils/message-helpers';
import { AlertCircle, Info, CheckCircle } from 'lucide-react';

type MessageBubbleProps = {
  message: Message;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const { sender, content, type, timestamp } = message;

  // User message
  if (sender === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex justify-end mb-3 sm:mb-4"
      >
        <div className="max-w-[85%] sm:max-w-[80%]">
          <div className="bg-[#f5f5f1] text-black rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
            <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{String(content)}</p>
          </div>
          <div className="flex justify-end mt-1 px-2">
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              {formatMessageTime(timestamp)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Status message
  if (type === 'status') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="flex justify-center mb-3 sm:mb-4"
      >
        <div className="bg-blue-50 border border-blue-200/50 rounded-lg px-3 py-2 sm:px-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-900">
              {content || message.data?.message || 'Processing...'}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  // Error message
  if (type === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="flex justify-center mb-3 sm:mb-4 px-2"
      >
        <div className="bg-red-50 border border-red-200/50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 shadow-md max-w-[90%] sm:max-w-[80%]">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs sm:text-sm text-red-900 font-medium">Error</p>
              <p className="text-xs sm:text-sm text-red-800 mt-1 break-words">
                {content || message.data?.message || 'An error occurred'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Assistant message
  const isThinking = type === 'message' && !type;
  const isComplete = type === 'complete';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start mb-3 sm:mb-4"
    >
      <div className="max-w-[85%] sm:max-w-[80%]">
        <div className="border-l-2 border-[#A875D6] pl-3 sm:pl-4 py-2">
          {isThinking ? (
            <FlickeringMessage content={content} />
          ) : (
            <div className="text-xs sm:text-sm text-black whitespace-pre-wrap break-words">
              {String(content)}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 px-2">
          <span className="text-[10px] sm:text-xs text-muted-foreground">
            {formatMessageTime(timestamp)}
          </span>
          {isComplete && (
            <CheckCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-green-600" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Flickering animation for thinking messages
 */
function FlickeringMessage({ content }: { content: string | object }) {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 1.0],
      }}
      transition={{
        duration: 1.2,
        ease: 'easeInOut',
        times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1],
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-xs sm:text-sm text-black break-words"
    >
      {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
    </motion.div>
  );
}

/**
 * TODO: Implement Human Intervention Card
 * 
 * This component should handle:
 * - Meeting update interventions
 * - Email interventions
 * - Directory update interventions
 * - Meeting request interventions
 * - User preferences interventions
 * 
 * Features needed:
 * - Editable fields
 * - Three action buttons (Cancel, Continue as-is, Save & Continue)
 * - Proper state management for edited data
 * - Send intervention response back through WebSocket
 */
export function HumanInterventionCard({ message }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center mb-4"
    >
      <div className="bg-gradient-to-br from-[#A875D6]/10 to-[#A875D6]/5 border border-[#A875D6]/30 rounded-lg p-6 shadow-lg max-w-[90%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🚧 Human Intervention Card
          </p>
          <p className="text-xs text-muted-foreground">
            Coming soon - Intervention handling logic will be implemented here
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * TODO: Implement UI Component Renderer
 * 
 * This component should handle dynamic UI components based on componentType:
 * - meeting_list: Display list of meetings
 * - time_slot_picker: Show available time slots
 * - calendar_view: Display calendar
 * - Custom data visualizations
 * 
 * Features needed:
 * - Component type detection
 * - Dynamic rendering based on data
 * - Interactive elements
 */
export function UIComponentRenderer({ message }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex justify-center mb-4"
    >
      <div className="bg-gradient-to-br from-[#A875D6]/10 to-[#A875D6]/5 border border-[#A875D6]/30 rounded-lg p-6 shadow-lg max-w-[90%]">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🚧 UI Component Renderer
          </p>
          <p className="text-xs text-muted-foreground">
            Coming soon - Dynamic UI components will be rendered here
          </p>
        </div>
      </div>
    </motion.div>
  );
}

