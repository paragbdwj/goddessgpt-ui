/**
 * Global Type Definitions
 */

// User Types
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};

// Authentication Types
export type AuthState = {
  user: User | null;
  jwtToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

// Message Types
export type MessageSender = 'user' | 'assistant';

export type MessageType =
  | 'message'
  | 'status'
  | 'error'
  | 'complete'
  | 'human_intervention'
  | 'ui_component';

export type Message = {
  id: string;
  content: string | object;
  sender: MessageSender;
  timestamp: Date;
  type?: MessageType;
  componentType?: string;
  data?: any;
  operation?: string;
  action_taken?: string;
  messageEnum?: 'FIRST_CHAT_MESSAGE' | null;
};

// WebSocket Types
export type ConnectionState = 'CONNECTING' | 'CONNECTED' | 'DISCONNECTED' | 'ERROR';

export type OutgoingMessage = {
  message: string;
  thread_id: string;
  message_id: string;
  timezone?: string;
  user_name?: string;
  user_email?: string;
  user_location?: string;
};

export type IncomingMessage = {
  type: MessageType;
  content?: string;
  message?: string;
  sender?: string;
  timestamp: number;
  componentType?: string;
  data?: any;
};

// API Response Types
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: string;
  };
};

