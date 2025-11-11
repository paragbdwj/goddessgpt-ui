'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { WebSocketClient } from '@/lib/websocket-client';
import { ConnectionState, IncomingMessage } from '@/types';
import { useAuth } from './AuthContext';

type MessageHandler = (message: IncomingMessage) => void;

type ChatContextType = {
  connectionState: ConnectionState;
  isConnecting: boolean;
  sendMessage: (
    message: string,
    messageId: string,
    timezone?: string,
    userName?: string,
    userEmail?: string,
    location?: string
  ) => void;
  forceReconnect: () => void;
  clientId: string | null;
  threadId: string | null;
  userLocation: string | null;
  locationLoading: boolean;
  lastError: string | null;
  clearError: () => void;
  registerMessageHandler: (handler: MessageHandler) => () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { jwtToken, isAuthenticated } = useAuth();
  const [connectionState, setConnectionState] = useState<ConnectionState>('DISCONNECTED');
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const wsClientRef = useRef<WebSocketClient | null>(null);
  const messageHandlersRef = useRef<Set<MessageHandler>>(new Set());

  // Initialize WebSocket client when authenticated
  useEffect(() => {
    if (!isAuthenticated || !jwtToken) {
      wsClientRef.current?.disconnect();
      wsClientRef.current = null;
      setConnectionState('DISCONNECTED');
      return;
    }

    // Create WebSocket client
    const wsClient = new WebSocketClient(jwtToken);
    wsClientRef.current = wsClient;

    // Register message handler to broadcast to all registered handlers
    wsClient.registerMessageHandler((message) => {
      messageHandlersRef.current.forEach(handler => handler(message));
    });

    // Connect
    wsClient.connect();

    // Update connection state periodically
    const intervalId = setInterval(() => {
      setConnectionState(wsClient.getConnectionState());
    }, 1000);

    return () => {
      clearInterval(intervalId);
      wsClient.disconnect();
    };
  }, [isAuthenticated, jwtToken]);

  // Get user location
  useEffect(() => {
    if (!isAuthenticated) return;

    const getUserLocation = async () => {
      setLocationLoading(true);
      try {
        // Try to get geolocation
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // In production, you would reverse geocode this
              // For now, we'll just use a placeholder
              setUserLocation('Current Location');
              setLocationLoading(false);
            },
            (error) => {
              console.log('Geolocation not available:', error);
              setUserLocation(null);
              setLocationLoading(false);
            }
          );
        } else {
          setUserLocation(null);
          setLocationLoading(false);
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setUserLocation(null);
        setLocationLoading(false);
      }
    };

    getUserLocation();
  }, [isAuthenticated]);

  const sendMessage = useCallback(
    (
      message: string,
      messageId: string,
      timezone?: string,
      userName?: string,
      userEmail?: string,
      location?: string
    ) => {
      if (!wsClientRef.current) {
        setLastError('WebSocket client not initialized');
        return;
      }

      try {
        wsClientRef.current.sendMessage(
          message,
          messageId,
          timezone,
          userName,
          userEmail,
          location || userLocation || undefined
        );
      } catch (error) {
        console.error('Error sending message:', error);
        setLastError('Failed to send message');
      }
    },
    [userLocation]
  );

  const forceReconnect = useCallback(() => {
    wsClientRef.current?.forceReconnect();
  }, []);

  const clearError = useCallback(() => {
    setLastError(null);
  }, []);

  const registerMessageHandler = useCallback((handler: MessageHandler) => {
    messageHandlersRef.current.add(handler);
    return () => {
      messageHandlersRef.current.delete(handler);
    };
  }, []);

  const value: ChatContextType = {
    connectionState,
    isConnecting: connectionState === 'CONNECTING',
    sendMessage,
    forceReconnect,
    clientId: wsClientRef.current?.getClientId() || null,
    threadId: wsClientRef.current?.getThreadId() || null,
    userLocation,
    locationLoading,
    lastError,
    clearError,
    registerMessageHandler,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

/**
 * Hook to register a message handler
 * Automatically unregisters on unmount
 */
export function useChatMessages(handler: MessageHandler) {
  const { registerMessageHandler } = useChat();

  useEffect(() => {
    const unregister = registerMessageHandler(handler);
    return unregister;
  }, [handler, registerMessageHandler]);
}

