# Environment Setup

## ⚠️ IMPORTANT: Create `.env.local` File

The `.env.local` file is required but not included in the repository (it's in `.gitignore`).

### Create the file manually:

1. **Create a new file** named `.env.local` in the project root directory
2. **Copy and paste** this exact content:

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

3. **Save the file**

### Verification

After creating the file, your project structure should include:

```
goddessgpt-ui/
├── .env.local          ← This file (you just created)
├── .gitignore
├── package.json
├── README.md
└── src/
    └── ...
```

### For Production

Create `.env.production` with production values:

```env
# Environment Mode
NEXT_PUBLIC_DEV_MODE=false

# API Base URLs - Production
NEXT_PUBLIC_API_BASE_URL=https://api.goddessgpt.ai/api/v1
NEXT_PUBLIC_CHAT_BACKEND_URL=https://chat.goddessgpt.ai
NEXT_PUBLIC_CHAT_WS_URL=wss://chat.goddessgpt.ai/api/chat/ws

# Google OAuth - Production
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_google_client_id
```

---

## Quick Start After Creating `.env.local`

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start chatting!

