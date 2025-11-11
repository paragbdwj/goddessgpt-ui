/**
 * Application Configuration
 * Manages environment-specific settings
 */

export const config = {
  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isDevMode: process.env.NEXT_PUBLIC_DEV_MODE === 'true',

  // API URLs
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1',
  chatBackendUrl: process.env.NEXT_PUBLIC_CHAT_BACKEND_URL || 'http://localhost:8000',
  chatWsUrl: process.env.NEXT_PUBLIC_CHAT_WS_URL || 'ws://localhost:8000/api/chat/ws',

  // Google OAuth
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
} as const;

export type Config = typeof config;

