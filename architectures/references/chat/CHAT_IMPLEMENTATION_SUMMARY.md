# Chat Window Implementation - Quick Summary

## 🎯 Core Components

### 1. Main Chat Interface
**File**: `src/siyaa/components/chat-interface.tsx`
- 5000+ lines of React/TypeScript
- Uses Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion
- Manages messages, interventions, WebSocket communication

### 2. WebSocket Client
**File**: `src/lib/websocket-client.ts`
- Handles real-time communication
- Auto-reconnection with exponential backoff
- Message queuing and error handling

### 3. Chat Context
**File**: `src/contexts/ChatContext.tsx`
- Global WebSocket state management
- Connection lifecycle
- Message handler registration

---

## 🔌 Backend APIs

### REST APIs (Base: `http://localhost:8080/api`)
```
POST   /auth/login/v1                    - Google OAuth login
GET    /users/data/v1                    - Get user profile
POST   /chat/messages/list/v1            - Fetch message history
POST   /tools/create-meeting/v1          - Create meeting
POST   /tools/update-meeting/v1          - Update meeting
POST   /tools/search-calendar-events/v1  - Search events
POST   /tools/search-people/v1           - Search contacts
POST   /tools/update-user-preferences/v1 - Update preferences
```

### WebSocket (URL: `ws://localhost:8000/api/chat/ws/{client_id}?token={jwt}`)

**Outgoing Message:**
```json
{
  "message": "User message or JSON payload",
  "thread_id": "thread_abc123",
  "message_id": "msg_32char_unique_id",
  "timezone": "America/Los_Angeles",
  "user_name": "Jane Doe",
  "user_email": "jane@example.com",
  "user_location": "San Francisco, CA"
}
```

**Incoming Message Types:**
- `message` - Assistant response
- `status` - Status update
- `error` - Error message
- `complete` - Task completion
- `human_intervention` - Requires user action
- `ui_component` - Dynamic UI component

---

## 📋 Message Types

### Regular Messages
- **User**: Gray bubble on right
- **Assistant**: White with pink left border
- **Status**: Blue background
- **Error**: Red background

### Human Interventions (Require User Approval)
1. **Meeting Update** - `update_meeting`
2. **Send Email** - `send_email`
3. **Directory Update** - `update_directory`
4. **Meeting Request** - `create_meeting_request`
5. **User Preferences** - `update_user_preferences`

**User Actions:**
- **Continue** → `action_taken: "NOT_TOUCHED"`
- **Save & Continue** → `action_taken: "UPDATED"`
- **Cancel** → `action_taken: "CANCEL"`

---

## 🎨 Design Specs

### Colors
- Primary Brand: `#E55381`
- User Message: `#f5f5f1`
- Assistant Message: White with `border-[#E55381]`

### Typography
- Headers: `text-lg font-semibold text-black`
- Content: `text-sm font-semibold text-black`
- Body: `text-sm`
- Metadata: `text-xs text-muted-foreground`

### Layout
```
┌────────────────────────┐
│  Message History       │
│  (Scrollable)          │
│                        │
│  [Loading...]          │
├────────────────────────┤
│  📝 Input Area         │
│  [Send Button]         │
└────────────────────────┘
```

---

## 🔑 Key Implementation Patterns

### Send Message
```typescript
const handleSendMessage = () => {
  const messageId = generateMessageId(); // 32-char ID
  const timezone = getUserTimezone(); // IANA timezone
  
  // Add to UI
  setMessages(prev => [...prev, userMessage]);
  
  // Send via WebSocket
  sendChatMessage(messageContent, messageId, timezone, userName, userEmail);
  
  setIsLoading(true);
};
```

### Handle Incoming Messages
```typescript
const handleWebSocketMessage = (msg: IncomingMessage) => {
  switch (msg.type) {
    case 'message':
      // Replace thinking message or append
      break;
    case 'complete':
      // Make last message sticky
      setIsLoading(false);
      break;
    case 'human_intervention':
      // Show intervention card
      setActiveIntervention(msg);
      break;
  }
};
```

### Handle Intervention Response
```typescript
// User clicks "Save & Continue"
const handleInterventionSave = (editedData) => {
  const payload = {
    ...editedData,
    action_taken: 'UPDATED'
  };
  sendChatMessage(JSON.stringify(payload));
  setActiveIntervention(null);
};
```

---

## 🚀 Quick Start

### 1. Setup Environment
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_CHAT_BACKEND_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8000
```

### 2. Install Dependencies
```bash
npm install framer-motion lucide-react dayjs @mui/x-date-pickers
npx shadcn-ui@latest add avatar button card input textarea badge
```

### 3. Use the Component
```tsx
import ChatInterface from '@/siyaa/components/chat-interface';

export default function ChatPage() {
  return <ChatInterface fullWidth={true} />;
}
```

---

## 🐛 Common Issues

### Messages Not Appearing
✅ Check `connectionState === 'CONNECTED'`  
✅ Verify message handler is registered  
✅ Check for unique message IDs

### WebSocket Connection Failed
✅ Verify backend is running  
✅ Check JWT token validity  
✅ Confirm WebSocket URL is correct

### Intervention Not Working
✅ Verify `activeIntervention` state is set  
✅ Check `operation` field exists  
✅ Ensure `action_taken` is sent

---

## 📦 Main Data Structures

### Message Interface
```typescript
interface Message {
  id: string;
  content: string | object;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "message" | "status" | "error" | "complete" | 
         "human_intervention" | "ui_component";
  componentType?: string;
  data?: any;
  operation?: string;
  action_taken?: string;
}
```

### Meeting Intervention
```typescript
interface MeetingInterventionData {
  operation: 'update_meeting';
  message_to_user: string;
  meeting_id?: string;
  payload_preview?: {
    meeting_id: string;
    meeting_title: string;
    start_date_time: string;
    end_date_time: string;
    participant_data_list: Array<{email: string; name: string}>;
    location: string;
  };
}
```

---

## 📚 Additional Resources

- **Full Documentation**: `CHAT_WINDOW_IMPLEMENTATION_GUIDE.md`
- **Design Principles**: `.cursor/rules/design-principles.mdc`
- **Backend APIs**: `memory-bank/backend_integration.md`
- **Live Example**: `src/siyaa/components/chat-interface.tsx`

---

## ✅ Implementation Checklist

- [ ] Setup WebSocket connection with JWT auth
- [ ] Implement message sending/receiving
- [ ] Handle all message types (message, status, error, complete)
- [ ] Build intervention cards (5 types)
- [ ] Add auto-expanding textarea
- [ ] Implement smart auto-scroll
- [ ] Add loading states and animations
- [ ] Handle connection errors and retries
- [ ] Load message history on mount
- [ ] Add welcome message for first load
- [ ] Implement responsive design
- [ ] Add keyboard navigation
- [ ] Test all edge cases

---

**Total Implementation Time Estimate**: 3-5 days for experienced frontend developer

**Key Dependencies**:
- Backend WebSocket server running on `ws://localhost:8000`
- REST API server running on `http://localhost:8080`
- Valid JWT token from Google OAuth

