/**
 * WebSocket Client for Chat Communication
 * Supports both real WebSocket and mock mode for development
 */

import { config } from './config';
import { IncomingMessage, ConnectionState, OutgoingMessage } from '@/types';

type MessageHandler = (message: IncomingMessage) => void;

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private clientId: string;
  private threadId: string;
  private jwtToken: string;
  private messageHandlers: Set<MessageHandler> = new Set();
  private connectionState: ConnectionState = 'DISCONNECTED';
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private mockMode: boolean;

  constructor(jwtToken: string) {
    this.jwtToken = jwtToken;
    this.clientId = this.generateClientId();
    this.threadId = this.generateThreadId();
    this.mockMode = config.isDevMode;
  }

  /**
   * Connect to WebSocket server or initialize mock connection
   */
  public connect(): void {
    if (this.mockMode) {
      this.connectMock();
    } else {
      this.connectReal();
    }
  }

  /**
   * Real WebSocket connection
   */
  private connectReal(): void {
    try {
      this.connectionState = 'CONNECTING';
      const wsUrl = `${config.chatWsUrl}/${this.clientId}?token=${this.jwtToken}`;
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.connectionState = 'CONNECTED';
        this.reconnectAttempts = 0;
        this.notifyConnectionChange();
      };

      this.ws.onmessage = (event) => {
        try {
          const message: IncomingMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.connectionState = 'ERROR';
        this.notifyConnectionChange();
      };

      this.ws.onclose = () => {
        console.log('WebSocket closed');
        this.connectionState = 'DISCONNECTED';
        this.notifyConnectionChange();
        this.attemptReconnect();
      };
    } catch (error) {
      console.error('Error connecting WebSocket:', error);
      this.connectionState = 'ERROR';
      this.notifyConnectionChange();
    }
  }

  /**
   * Mock WebSocket connection for development
   */
  private connectMock(): void {
    console.log('🔧 Mock WebSocket mode enabled');
    this.connectionState = 'CONNECTING';
    this.notifyConnectionChange();

    // Simulate connection delay
    setTimeout(() => {
      this.connectionState = 'CONNECTED';
      this.notifyConnectionChange();
      console.log('✅ Mock WebSocket connected');
    }, 500);
  }

  /**
   * Send message through WebSocket or mock
   */
  public sendMessage(
    message: string,
    messageId: string,
    timezone?: string,
    userName?: string,
    userEmail?: string,
    userLocation?: string
  ): void {
    const outgoingMessage: OutgoingMessage = {
      message,
      thread_id: this.threadId,
      message_id: messageId,
      timezone,
      user_name: userName,
      user_email: userEmail,
      user_location: userLocation,
    };

    if (this.mockMode) {
      this.sendMessageMock(outgoingMessage);
    } else {
      this.sendMessageReal(outgoingMessage);
    }
  }

  /**
   * Send real WebSocket message
   */
  private sendMessageReal(message: OutgoingMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket not connected');
    }
  }

  /**
   * Send mock message and generate mock response
   */
  private sendMessageMock(message: OutgoingMessage): void {
    console.log('📤 Mock message sent:', message);

    // Simulate thinking message
    setTimeout(() => {
      const thinkingMessage: IncomingMessage = {
        type: 'message',
        content: "I'm processing your request...",
        sender: 'assistant',
        timestamp: Date.now() / 1000,
      };
      this.handleMessage(thinkingMessage);
    }, 300);

    // Simulate status update
    setTimeout(() => {
      const statusMessage: IncomingMessage = {
        type: 'status',
        message: 'Analyzing your message...',
        timestamp: Date.now() / 1000,
      };
      this.handleMessage(statusMessage);
    }, 800);

    // Simulate final response
    setTimeout(() => {
      const responseMessage: IncomingMessage = {
        type: 'message',
        content: this.generateMockResponse(message.message),
        sender: 'assistant',
        timestamp: Date.now() / 1000,
      };
      this.handleMessage(responseMessage);
    }, 1500);

    // Simulate completion
    setTimeout(() => {
      const completeMessage: IncomingMessage = {
        type: 'complete',
        message: 'Task completed',
        timestamp: Date.now() / 1000,
      };
      this.handleMessage(completeMessage);
    }, 2000);
  }

  /**
   * Generate contextual mock responses
   */
  private generateMockResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('health') || lowerMessage.includes('reproductive')) {
      return "I can help you with healthcare guidance. For reproductive health concerns, I recommend consulting with a healthcare provider. In the meantime, I can provide general information about women's health, wellness, and nutrition. What specific aspect would you like to know more about?";
    }

    if (lowerMessage.includes('legal') || lowerMessage.includes('law') || lowerMessage.includes('rights')) {
      return "I can assist with legal information. Please note that this is general guidance and not legal advice. For specific legal concerns, consulting with a qualified attorney is recommended. I can help you understand family law, employment rights, or consumer protection matters. What would you like to explore?";
    }

    if (lowerMessage.includes('mental') || lowerMessage.includes('stress') || lowerMessage.includes('emotional') || lowerMessage.includes('wellness')) {
      return "Mental and emotional wellness is so important. I'm here to support you with stress management techniques, self-care practices, and emotional wellness strategies. Remember, if you're experiencing severe distress, please reach out to a mental health professional. How can I support you today?";
    }

    return "Thank you for your message! I'm GoddessGPT, your AI assistant for women's healthcare, legal assistance, and mental wellness. I'm currently in development mode, so I'm providing simulated responses. How can I assist you with healthcare guidance, legal information, or emotional support?";
  }

  /**
   * Handle incoming message
   */
  private handleMessage(message: IncomingMessage): void {
    this.messageHandlers.forEach(handler => handler(message));
  }

  /**
   * Register message handler
   */
  public registerMessageHandler(handler: MessageHandler): () => void {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  /**
   * Notify connection state change
   */
  private notifyConnectionChange(): void {
    // Notify through a custom connection status message
    const statusMessage: IncomingMessage = {
      type: 'status',
      message: `Connection ${this.connectionState.toLowerCase()}`,
      timestamp: Date.now() / 1000,
    };
    // Don't broadcast connection changes as messages
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

    console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      this.connect();
    }, delay);
  }

  /**
   * Force reconnect
   */
  public forceReconnect(): void {
    this.disconnect();
    this.reconnectAttempts = 0;
    this.connect();
  }

  /**
   * Disconnect WebSocket
   */
  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connectionState = 'DISCONNECTED';
  }

  /**
   * Get connection state
   */
  public getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * Get client ID
   */
  public getClientId(): string {
    return this.clientId;
  }

  /**
   * Get thread ID
   */
  public getThreadId(): string {
    return this.threadId;
  }

  /**
   * Generate unique client ID
   */
  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }

  /**
   * Generate unique thread ID
   */
  private generateThreadId(): string {
    return `thread_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  }
}

