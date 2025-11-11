# Quick Start Guide

## 🚀 Get Running in 3 Steps

### Step 1: Create `.env.local` file

Create a file named `.env.local` in the project root and paste this content:

```env
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_CHAT_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8000/api/chat/ws
NEXT_PUBLIC_GOOGLE_CLIENT_ID=mock_google_client_id
```

### Step 2: Install & Run

```bash
npm install
npm run dev
```

### Step 3: Open & Test

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Sign in with Google"
3. You'll be automatically signed in and taken to the chat!
4. Start chatting!

---

## 🎯 What to Try

Type these messages to see different responses:

- **Healthcare**: "I have questions about reproductive health"
- **Legal**: "What are my employment rights?"
- **Wellness**: "I need help with stress management"
- **General**: "Hello, what can you help me with?"

---

## ✅ What Works Now

- ✅ Mock authentication (no backend needed)
- ✅ Full chat interface with real-time messages
- ✅ Contextual AI responses based on your questions
- ✅ Auto-scroll and message history
- ✅ Welcome screen with example prompts
- ✅ Connection status and auto-reconnect

## 🚧 Coming Soon (Marked as TODO)

- Human intervention cards (approval workflows)
- UI component renderer (dynamic content)
- Real Google OAuth
- Actual backend integration

---

## 📖 Full Documentation

For detailed information, see:
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Complete setup guide
- [README.md](./README.md) - Full project documentation
- [architectures/references/chat/](./architectures/references/chat/) - Chat architecture details

---

**Need Help?** Check the console for errors or review the setup instructions.

**Happy Chatting! 💜**

