# GoddessGPT - AI Assistant for Women

A modern, responsive web application built with Next.js and TypeScript, designed as an AI chatbot assistant for women seeking solutions in healthcare, legal, mental and emotional wellness domains.

## Features

### ✅ Implemented
- 🎨 **Modern, Immersive Design** - Beautiful gradient backgrounds with smooth animations
- 💜 **Brand Identity** - Consistent use of supportive lavender (#A875D6) throughout
- 📱 **Fully Responsive** - Optimized for all device sizes
- ♿ **Accessible** - Built with semantic HTML and ARIA best practices
- ⚡ **Performance Optimized** - Server-side rendering with Next.js App Router
- 🔐 **Mock Authentication** - Instant one-click login for development (Google OAuth ready)
- 💬 **Full Chat Interface** - Real-time messaging with WebSocket support
- 🤖 **AI Responses** - Contextual mock responses in development mode
- 🔄 **Auto-Reconnect** - Automatic WebSocket reconnection with exponential backoff
- 📊 **Message Types** - User, assistant, status, and error messages
- 🎯 **Smart Auto-Scroll** - Respects user scroll position
- ✨ **Animated Placeholders** - Rotating example prompts
- 🎭 **Welcome Screen** - Interactive example cards for first-time users

### 🚧 TODO (Marked for Future)
- 🛠️ **Human Intervention Cards** - Interactive approval/modification UI
- 🎨 **UI Component Renderer** - Dynamic meeting lists, time pickers, calendars
- 🔒 **Real Google OAuth** - Production authentication
- 🌐 **Backend Integration** - Connect to actual APIs

## Three Core Domains

1. **Healthcare Guidance** - Reproductive health, wellness, nutrition advice
2. **Legal Assistance** - Family law, employment rights, consumer protection
3. **Mental & Emotional Wellness** - Stress management, self-care, emotional support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Create environment file**:
   
   Create a `.env.local` file in the project root:

```bash
# Environment Mode
NEXT_PUBLIC_DEV_MODE=true

# API Base URLs - Development (Mocked)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_CHAT_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8000/api/chat/ws

# Google OAuth (Mock for now)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=mock_google_client_id
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Access the application**:

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

5. **Sign in and start chatting**:

   - Click "Sign in with Google" (instant mock authentication)
   - You'll be automatically signed in and redirected to chat
   - Start chatting with GoddessGPT!

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui primitives (Button, Card)
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Landing page
├── components/
│   └── ui/                   # shadcn/ui components
│       ├── button.tsx
│       └── card.tsx
└── lib/
    └── utils.ts              # Utility functions (cn)
```

## Design System

- **Brand Color**: #A875D6 (Supportive Lavender)
- **Typography**: Inter font family
- **Border Radius**: 0.5rem (customizable via CSS variables)
- **Color Tokens**: Defined in `globals.css` for light/dark themes

## Development Mode

The application currently runs in **development mode** with mocked backend:

- **Mock Authentication**: One-click instant login (no real OAuth)
- **Mock WebSocket**: Simulated AI responses with realistic delays
- **Contextual Responses**: AI responds based on message content (healthcare, legal, wellness)
- **No Backend Required**: Everything works locally

Set `NEXT_PUBLIC_DEV_MODE=false` in `.env.local` for production mode.

## Architecture

The chat implementation follows the architecture documented in `architectures/references/chat/`:
- **WebSocket Communication**: Real-time bidirectional messaging
- **State Management**: React Context for auth and chat state
- **Message Types**: Support for messages, status, errors, interventions, and UI components
- **Auto-Reconnection**: Exponential backoff with up to 5 retry attempts

## Next Steps for Production

- [ ] Implement real Google OAuth authentication
- [ ] Connect to actual backend WebSocket server
- [ ] Implement human intervention card UI
- [ ] Build UI component renderer for dynamic content
- [ ] Add message history persistence
- [ ] Implement conversation threading
- [ ] Add user preferences and settings
- [ ] Set up monitoring and analytics

## Documentation

- **Setup Guide**: See [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
- **Chat Architecture**: See [architectures/references/chat/](./architectures/references/chat/)
- **Design Principles**: See [.cursor/rules/ui-design-pinciples.mdc](./.cursor/rules/ui-design-pinciples.mdc)
- **Coding Standards**: See [.cursor/rules/coding-principles.md](./.cursor/rules/coding-principles.md)

## Notes

- All design tokens are centralized in CSS variables for easy customization
- Components follow shadcn/ui patterns for consistency and maintainability
- Human intervention and UI component rendering logic marked as TODO
- Mock mode provides realistic chat experience for development and testing

## License

Private - All rights reserved.
