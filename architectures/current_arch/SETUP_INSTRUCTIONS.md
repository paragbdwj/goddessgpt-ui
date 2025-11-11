# GoddessGPT Setup Instructions

## Quick Start Guide

### 1. Environment Configuration

Create a `.env.local` file in the project root with the following content:

```env
# Environment Mode
NEXT_PUBLIC_DEV_MODE=true

# API Base URLs - Development (Mocked)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_CHAT_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8000/api/chat/ws

# Google OAuth (Mock for now)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=mock_google_client_id
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features Implemented

### ✅ Completed
- **Mock Authentication**: Simple email/name login (no real OAuth yet)
- **Chat Interface**: Full-featured chat window with WebSocket support
- **Message Types**: User, assistant, status, and error messages
- **Mock WebSocket**: Development mode with simulated backend responses
- **Responsive Design**: Mobile-friendly UI following design principles
- **Auto-scroll**: Smart scrolling that respects user position
- **Animated Placeholders**: Rotating example prompts
- **Welcome Screen**: Interactive example cards for first-time users
- **Connection Management**: Auto-reconnect with exponential backoff
- **Loading States**: Visual feedback for all async operations

### 🚧 TODO (Marked for Future Implementation)
- **Human Intervention Cards**: Interactive approval/modification UI
  - Meeting update interventions
  - Email interventions
  - Directory update interventions
  - Meeting request interventions
  - User preferences interventions

- **UI Component Renderer**: Dynamic UI components
  - Meeting list displays
  - Time slot pickers
  - Calendar views
  - Data visualizations

- **Google OAuth**: Real authentication implementation
- **Production APIs**: Actual backend integration

---

## Application Flow

### 1. Landing Page (`/`)
- Displays marketing content with three core domains
- Redirects authenticated users to `/chat`
- "Sign in with Google" button performs instant mock authentication
- Automatically creates mock user and redirects to chat

### 2. Chat Page (`/chat`)
- Protected route (requires authentication)
- Full chat interface with WebSocket connection
- Real-time message exchange (mocked in dev mode)
- Welcome message with example prompts
- Smart auto-scroll and message rendering

---

## Development Mode vs Production

### Development Mode (`NEXT_PUBLIC_DEV_MODE=true`)
- **Mock Authentication**: No real OAuth, just email/name input
- **Mock WebSocket**: Simulated responses with realistic delays
- **Contextual Responses**: AI responses based on message content
- **No Backend Required**: Everything works locally

### Production Mode (`NEXT_PUBLIC_DEV_MODE=false`)
- **Real Google OAuth**: Actual authentication flow
- **Real WebSocket**: Connects to backend servers
- **Backend APIs**: Calls actual REST endpoints
- **JWT Tokens**: Real token management

---

## Mock WebSocket Behavior

The mock WebSocket simulates realistic chat flow:

1. **User sends message** → Added to UI immediately
2. **Thinking message** (300ms delay) → "I'm processing your request..."
3. **Status update** (800ms delay) → "Analyzing your message..."
4. **Final response** (1500ms delay) → Contextual reply
5. **Completion** (2000ms delay) → Message marked as complete

### Mock Response Logic

The system provides contextual responses based on keywords:

- **Healthcare**: "health", "reproductive" → Healthcare guidance response
- **Legal**: "legal", "law", "rights" → Legal assistance response
- **Wellness**: "mental", "stress", "emotional" → Wellness support response
- **Default**: General introduction message

---

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx              # Mock login page
│   ├── (main)/
│   │   └── chat/
│   │       └── page.tsx              # Protected chat page
│   ├── layout.tsx                    # Root layout with providers
│   ├── page.tsx                      # Landing page
│   └── globals.css                   # Global styles
│
├── components/
│   ├── chat/
│   │   ├── chat-interface.tsx        # Main chat component
│   │   ├── message-bubble.tsx        # Message rendering
│   │   └── welcome-message.tsx       # Welcome screen
│   └── ui/                           # shadcn/ui components
│
├── contexts/
│   ├── AuthContext.tsx               # Authentication state
│   └── ChatContext.tsx               # WebSocket state
│
├── lib/
│   ├── config.ts                     # Environment config
│   ├── websocket-client.ts           # WebSocket wrapper
│   └── utils/
│       └── message-helpers.ts        # Utility functions
│
└── types/
    └── index.ts                      # TypeScript definitions
```

---

## Design Compliance

### Brand Colors
- **Primary**: `#A875D6` (Supportive Lavender)
- **Hover**: `#905fbf`
- **Backgrounds**: `bg-[#A875D6]/10`, `bg-[#A875D6]/5`

### Typography Standards
- **Page Headers**: `text-lg font-semibold text-black`
- **Content Text**: `text-sm font-semibold text-black`
- **Body Text**: `text-sm`
- **Metadata**: `text-xs text-muted-foreground`

### Message Bubbles
- **User**: Gray background (`#f5f5f1`), right-aligned
- **Assistant**: White with lavender left border, left-aligned
- **Status**: Blue background with info icon
- **Error**: Red background with alert icon

---

## Testing the Application

### 1. Test Authentication
1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Sign in with Google"
3. You'll be instantly authenticated and redirected to chat
4. Mock user created: "GoddessGPT User" (user@goddessgpt.com)

### 2. Test Chat Interface
1. See welcome message with three domain cards
2. Click example card or type a message
3. Watch for:
   - Message appears immediately
   - Loading indicator shows
   - Thinking message appears (flickering)
   - Status update shows (blue bubble)
   - Final response appears
   - Completion checkmark shows

### 3. Test Different Message Types
- **Healthcare**: Type "I have questions about reproductive health"
- **Legal**: Type "What are my employment rights?"
- **Wellness**: Type "I need help with stress management"
- **General**: Type "Hello" or any other message

### 4. Test Connection Status
1. Header shows "Connected" when WebSocket is active
2. Mock mode automatically connects within 500ms
3. Connection state updates in real-time

---

## Next Steps for Production

### Backend Integration
1. Replace mock WebSocket with real endpoint
2. Implement actual Google OAuth flow
3. Add JWT token refresh mechanism
4. Connect REST APIs for message history

### Human Intervention Implementation
1. Build intervention card UI components
2. Add form validation for editable fields
3. Implement action handlers (Cancel, Continue, Save)
4. Send intervention responses through WebSocket

### UI Component Renderer
1. Create component registry
2. Build meeting list component
3. Implement time slot picker
4. Add calendar view component

### Additional Features
1. Message history persistence
2. Conversation threads
3. User preferences
4. Avatar customization
5. Notification system

---

## Troubleshooting

### "Module not found" errors
```bash
npm install
```

### WebSocket not connecting
- Check `NEXT_PUBLIC_DEV_MODE=true` in `.env.local`
- In dev mode, connection is automatic and mocked

### Authentication not working
- Clear localStorage: `localStorage.clear()` in browser console
- Check `.env.local` file exists

### Styles not applying
- Restart dev server: `npm run dev`
- Clear browser cache

---

## Environment Variables Reference

| Variable | Dev Value | Production Value |
|----------|-----------|------------------|
| `NEXT_PUBLIC_DEV_MODE` | `true` | `false` |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:8080/api/v1` | `https://api.goddessgpt.ai/api/v1` |
| `NEXT_PUBLIC_CHAT_BACKEND_URL` | `http://localhost:8000` | `https://chat.goddessgpt.ai` |
| `NEXT_PUBLIC_CHAT_WS_URL` | `ws://localhost:8000/api/chat/ws` | `wss://chat.goddessgpt.ai/api/chat/ws` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | `mock_google_client_id` | `your_real_client_id` |

---

## Support

For issues or questions:
1. Check console for error messages
2. Review this documentation
3. Check `architectures/references/chat/` for detailed specs
4. Refer to `.cursor/rules/` for coding standards

---

**Happy Coding! 🚀**

