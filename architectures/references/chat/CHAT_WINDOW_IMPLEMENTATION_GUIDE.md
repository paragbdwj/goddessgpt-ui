# Chat Window Implementation Guide

## Overview
This document provides a comprehensive guide for implementing the Siyaa AI Chat Interface. The chat window is the core feature of the application, allowing users to interact with an AI assistant for calendar management, scheduling, and productivity tasks through natural language.

---

## 1. Architecture Overview

### Tech Stack
- **Frontend Framework**: Next.js 14+ (React)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS
- **WebSocket**: Native WebSocket API
- **State Management**: React Context + Hooks
- **Animations**: Framer Motion
- **Date Handling**: Day.js with MUI DateTimePicker

### Key Files
- **Main Component**: `src/siyaa/components/chat-interface.tsx` (5000+ lines)
- **WebSocket Client**: `src/lib/websocket-client.ts`
- **Chat Context**: `src/contexts/ChatContext.tsx`
- **Configuration**: `src/lib/config.ts`
- **Backend Integration**: `memory-bank/backend_integration.md`

---

## 2. UI/UX Design Specifications

### Layout Structure
```
┌─────────────────────────────────────────────┐
│  Header (Optional Navigation)               │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome Message (First Load)               │
│  or                                         │
│  Message History                            │
│  - User Messages (Right, Gray Bubbles)      │
│  - Assistant Messages (Left, White/Border)  │
│  - Status Messages (Blue)                   │
│  - Error Messages (Red)                     │
│  - Human Intervention Cards                 │
│  - UI Components (Dynamic)                  │
│                                             │
│  [Loading Indicator]                        │
│                                             │
├─────────────────────────────────────────────┤
│  Input Area (Fixed Bottom)                  │
│  - Auto-expanding Textarea                  │
│  - Animated Placeholder                     │
│  - Send Button                              │
└─────────────────────────────────────────────┘
```

### Design System

#### Colors
- **Primary Brand**: `#E55381` (Purple-pink)
- **Background**: `#ffffff` (White)
- **User Message**: `#f5f5f1` (Light gray)
- **Assistant Message**: White with left border `#E55381`
- **Error**: Red tones (`#ef4444`)
- **Status**: Blue tones (`#3b82f6`)

#### Typography
- **Page Headers**: `text-lg font-semibold text-black`
- **Main Content**: `text-sm font-semibold text-black`
- **Body Text**: `text-sm`
- **Metadata**: `text-xs text-muted-foreground`

#### Message Bubbles
```tsx
// User Message
className="bg-[#f5f5f1] text-black rounded-2xl p-4 shadow-sm"

// Assistant Message  
className="border-l-2 border-[#E55381] pl-4"

// Error Message
className="bg-red-50 border border-red-200/50 shadow-md"

// Status Message
className="bg-blue-50 border border-blue-200/50 shadow-md"
```

#### Input Area
```tsx
className="flex w-full items-end gap-2 rounded-full bg-white/90 
           backdrop-blur-md px-4 py-4 shadow-2xl border 
           border-[#c7c7c7] transition-all duration-300 
           focus-within:border-[#E55381] focus-within:shadow-2xl"
```

### Animated Placeholder
The input field features rotating placeholder examples:
- "Schedule a meeting with Raghu tomorrow at 2 PM"
- "What meetings do I have this week?"
- "Find a time for coffee with Aakash next week"
- "Cancel my 3 PM meeting with Parag today"
- Transitions every 4 seconds with 800ms fade effect

---

## 3. Message Types & Rendering

### Message Interface
```typescript
interface Message {
  id: string;
  content: string | object;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: 
    | "message"           // Regular text message
    | "status"            // Status update (blue)
    | "error"             // Error message (red)
    | "complete"          // Final message (sticky)
    | "human_intervention" // Requires user action
    | "ui_component"      // Dynamic UI component
    | "intervention_sent"  // User confirmed intervention
    | "intervention_continued" // User approved as-is
    | "intervention_cancelled" // User cancelled
    | "email_intervention_sent" | "email_intervention_continued" | "email_intervention_cancelled"
    | "directory_intervention_sent" | "directory_intervention_continued" | "directory_intervention_cancelled"
    | "meeting_request_intervention_sent" | "meeting_request_intervention_continued" | "meeting_request_intervention_cancelled"
    | "preferences_intervention_sent" | "preferences_intervention_continued" | "preferences_intervention_cancelled";
  
  // For UI components
  componentType?: string;
  data?: any;
  
  // For historical messages
  operation?: string;
  action_taken?: string;
  
  // For welcome detection
  messageEnum?: 'FIRST_CHAT_MESSAGE' | null;
}
```

### Message Rendering Logic

#### 1. **Regular Messages** (`type: "message"`)
- Display text content
- Show flickering animation for assistant thinking
- Replace previous thinking message with new content
- Support HTML rendering with safe sanitization

#### 2. **Status Messages** (`type: "status"`)
- Blue background styling
- Temporary updates like "Checking availability..."
- Auto-removed when complete

#### 3. **Error Messages** (`type: "error"`)
- Red background styling
- Stop loading indicator
- Display error details

#### 4. **Complete Messages** (`type: "complete"`)
- Make the last assistant message "sticky" (permanent)
- Stop flickering animation
- Hide loading indicator

#### 5. **Human Intervention** (`type: "human_intervention"`)
Special interactive cards requiring user approval/modification:

**Types of Interventions:**

##### a) Meeting Update Intervention
```typescript
interface MeetingInterventionData {
  operation: 'update_meeting';
  message_to_user: string;
  meeting_id?: string;
  changes_count?: number;
  payload_preview?: {
    meeting_id: string;
    client: string;
    start_date_time: string;
    end_date_time: string;
    meeting_title: string;
    participant_data_list: Array<{
      email: string;
      name: string;
    }>;
    location: string;
  };
}
```

**User Actions:**
- **Edit**: Modify meeting details inline
- **Save & Continue**: Approve changes and send to backend
- **Cancel**: Reject the intervention

##### b) Email Intervention
```typescript
interface EmailInterventionData {
  operation: 'send_email';
  subject: string;
  body: string;
  recipients: Array<{
    email: string;
    name: string;
    type: 'to' | 'cc' | 'bcc';
  }>;
  message_to_user: string;
}
```

##### c) Directory Update Intervention
```typescript
interface DirectoryInterventionData {
  operation: 'update_directory';
  contacts: Array<{
    name: string;
    email: string;
    phone_number: string;
    is_favorite: boolean;
  }>;
  total_contacts: number;
  team_name: string;
  message_to_user: string;
}
```

##### d) Meeting Request Intervention
```typescript
interface MeetingRequestInterventionData {
  operation: 'create_meeting_request';
  start_date_time: string;
  end_date_time: string;
  participant_data_list: Array<{
    email: string;
    name: string;
  }>;
  meeting_title: string;
  meeting_description: string;
  location: string;
  meeting_duration: number;
  recurrence_key: string;
  message_to_user: string;
}
```

##### e) User Preferences Intervention
```typescript
interface UserPreferencesInterventionData {
  operation: 'update_user_preferences';
  preferences_to_add: string[];
  preferences_to_delete: string[];
  total_changes: number;
  message_to_user: string;
}
```

**Intervention Card UI:**
- Modern card design with gradient header
- Editable fields (when Edit mode is active)
- Three action buttons:
  - **Cancel** (Outline, Left): `action_taken: 'CANCEL'`
  - **Continue as-is** (Secondary, Center): `action_taken: 'NOT_TOUCHED'`
  - **Save & Continue** (Primary, Right): `action_taken: 'UPDATED'`

#### 6. **UI Components** (`type: "ui_component"`)
Dynamic React components rendered based on `componentType`:
- Meeting list cards
- Time slot pickers
- Calendar views
- Custom data visualizations

---

## 4. WebSocket Communication

### Connection Setup

#### Configuration
```typescript
// WebSocket URL
const CHAT_WS_URL = 'ws://localhost:8000/api/chat/ws/{client_id}?token={jwt_token}'
```

#### Connection Flow
1. User authenticates → JWT token obtained
2. ChatContext initializes WebSocket client
3. Client connects with JWT token in query param
4. Connection states: `CONNECTING` → `CONNECTED` / `ERROR` / `DISCONNECTED`
5. Automatic reconnection with exponential backoff (max 5 attempts)

### Outgoing Messages (Frontend → Backend)

```typescript
interface OutgoingMessage {
  message: string;              // User message or JSON payload
  thread_id: string;            // Unique thread identifier
  message_id: string;           // 32-char alphanumeric ID
  timezone?: string;            // IANA timezone (e.g., "America/New_York")
  user_name?: string;           // User's display name
  user_email?: string;          // User's email
  user_location?: string;       // User's location (e.g., "San Francisco, CA")
}
```

**Example:**
```json
{
  "message": "Schedule a meeting with John tomorrow at 2 PM",
  "thread_id": "thread_abc123xyz",
  "message_id": "msg_20231130_a1b2c3d4e5f6g7h8",
  "timezone": "America/Los_Angeles",
  "user_name": "Jane Doe",
  "user_email": "jane@example.com",
  "user_location": "San Francisco, CA"
}
```

### Incoming Messages (Backend → Frontend)

```typescript
interface IncomingMessage {
  type: 'message' | 'status' | 'error' | 'complete' | 'human_intervention' | 'ui_component';
  content?: string;          // Text content or HTML
  message?: string;          // Status/error message
  sender?: string;           // Agent name
  timestamp: number;         // Unix timestamp (seconds)
  componentType?: string;    // UI component type
  data?: any;               // Structured data for components
}
```

#### Message Type Examples

**1. Assistant Thinking/Response**
```json
{
  "type": "message",
  "content": "I'm checking your calendar for tomorrow...",
  "sender": "assistant",
  "timestamp": 1699564823
}
```

**2. Status Update**
```json
{
  "type": "status",
  "message": "Searching for available time slots...",
  "timestamp": 1699564825
}
```

**3. Error**
```json
{
  "type": "error",
  "message": "Unable to access calendar. Please check permissions.",
  "timestamp": 1699564827
}
```

**4. Completion**
```json
{
  "type": "complete",
  "message": "Task completed successfully",
  "timestamp": 1699564830
}
```

**5. Human Intervention**
```json
{
  "type": "human_intervention",
  "content": {
    "operation": "update_meeting",
    "message_to_user": "I found a conflict. Please review these changes:",
    "meeting_id": "evt_123",
    "payload_preview": {
      "meeting_id": "evt_123",
      "meeting_title": "Team Standup",
      "start_date_time": "2023-11-01T10:00:00Z",
      "end_date_time": "2023-11-01T10:30:00Z",
      "participant_data_list": [
        { "email": "john@example.com", "name": "John Doe" }
      ],
      "location": "Conference Room A"
    }
  },
  "timestamp": 1699564832
}
```

**6. UI Component**
```json
{
  "type": "ui_component",
  "componentType": "meeting_list",
  "content": "<html>...</html>",
  "data": {
    "meetings": [
      {
        "id": "evt_123",
        "title": "Team Meeting",
        "start_time": "2023-11-01T10:00:00Z"
      }
    ]
  },
  "timestamp": 1699564835
}
```

### Message Flow Examples

#### Example 1: Simple Question
```
User → "What meetings do I have today?"

Backend → {type: "message", content: "Let me check your calendar..."}
Backend → {type: "status", message: "Retrieving today's events..."}
Backend → {type: "message", content: "You have 3 meetings today:..."}
Backend → {type: "complete"}
```

#### Example 2: Meeting Creation with Intervention
```
User → "Schedule a meeting with John tomorrow at 2 PM"

Backend → {type: "message", content: "I'll schedule that meeting for you..."}
Backend → {type: "status", message: "Checking availability..."}
Backend → {type: "human_intervention", content: {operation: "create_meeting_request", ...}}

User → [Clicks "Save & Continue"] → JSON with action_taken: "UPDATED"

Backend → {type: "message", content: "Meeting scheduled successfully!"}
Backend → {type: "complete"}
```

---

## 5. State Management

### React Context Architecture

#### ChatContext (`src/contexts/ChatContext.tsx`)
**Responsibilities:**
- WebSocket lifecycle management
- Connection state tracking
- Message broadcasting to all registered handlers
- Location management (geolocation)
- JWT token updates

**Provided Values:**
```typescript
interface ChatContextType {
  connectionState: ConnectionState;
  isConnecting: boolean;
  sendMessage: (message: string, message_id: string, timezone?: string, 
                userName?: string, userEmail?: string, location?: string) => void;
  forceReconnect: () => void;
  clientId: string | null;
  threadId: string | null;
  userLocation: string | null;
  locationLoading: boolean;
  lastError: string | null;
  clearError: () => void;
}
```

**Usage in Components:**
```tsx
const { 
  connectionState, 
  sendMessage, 
  lastError 
} = useChat();
```

#### Component-Level State
```typescript
// Messages
const [messages, setMessages] = useState<Message[]>([]);

// Input
const [inputValue, setInputValue] = useState("");

// Loading
const [isLoading, setIsLoading] = useState(false);

// Intervention handling
const [activeIntervention, setActiveIntervention] = useState<Message | null>(null);
const [interventionValues, setInterventionValues] = useState<Record<string, any>>({});

// UI state
const [showSuggestionCards, setShowSuggestionCards] = useState(false);
const [isUserNearBottom, setIsUserNearBottom] = useState(true);
```

### Message Handler Registration
```typescript
// Register handler for WebSocket messages
useChatMessages((incomingMessage: IncomingMessage) => {
  // Handle different message types
  if (incomingMessage.type === 'message') {
    // Add to messages array
  } else if (incomingMessage.type === 'human_intervention') {
    // Show intervention card
  }
  // ... more handlers
});
```

---

## 6. Key Features Implementation

### 6.1 Auto-Expanding Textarea
```tsx
<textarea
  ref={textareaRef}
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }}
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 96) + 'px';
  }}
  className="w-full resize-none border-0 bg-transparent 
             px-0 py-0.5 text-sm focus-visible:outline-none"
  rows={1}
  style={{ height: 'auto', minHeight: '24px' }}
/>
```

### 6.2 Smart Auto-Scroll
```typescript
const isUserNearBottom = () => {
  if (!messagesContainerRef.current) return true;
  const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
  return scrollHeight - scrollTop - clientHeight < 150;
};

useEffect(() => {
  // Only auto-scroll if user is near bottom
  if (isUserNearBottom) {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);
```

### 6.3 Flickering Message Animation
```tsx
const FlickeringMessage = ({ content }: { content: string | object }) => {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7, 1.0],
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 1],
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="text-sm"
    >
      {typeof content === 'string' ? content : JSON.stringify(content, null, 2)}
    </motion.div>
  );
};
```

### 6.4 Welcome Message
Display on first load (when no message history):
```tsx
{messages.length === 0 && !isLoading && (
  <WelcomeMessage 
    onExampleClick={(message) => {
      // Send example message
      handleSendMessage(message);
    }}
  />
)}
```

### 6.5 Intervention Card Handling

**Edit Mode:**
```typescript
const [isEditing, setIsEditing] = useState(false);
const [editedData, setEditedData] = useState<MeetingInterventionData>(data);

const handleFieldChange = (field: string, value: any) => {
  setEditedData(prev => ({
    ...prev,
    [field]: value
  }));
};

const handleSaveAndContinue = () => {
  onSaveAndContinue(editedData); // Send updated data
};
```

**Action Handlers:**
```typescript
// Continue without changes
const handleContinue = () => {
  const payload = {
    ...interventionContent,
    action_taken: 'NOT_TOUCHED'
  };
  sendMessage(JSON.stringify(payload));
};

// Save with modifications
const handleSave = () => {
  const payload = {
    ...editedInterventionData,
    action_taken: 'UPDATED'
  };
  sendMessage(JSON.stringify(payload));
};

// Cancel intervention
const handleCancel = () => {
  const payload = {
    ...interventionContent,
    action_taken: 'CANCEL'
  };
  sendMessage(JSON.stringify(payload));
};
```

### 6.6 Loading States
```tsx
// Show loading after user sends message
{isLoading && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-2 text-muted-foreground"
  >
    <LoaderIcon className="h-4 w-4 animate-spin" />
    <span className="text-sm">Siyaa is thinking...</span>
  </motion.div>
)}
```

### 6.7 Connection Status Indicator
```tsx
{connectionState !== 'CONNECTED' && (
  <div className="flex items-center justify-center p-4 bg-yellow-50 border-b">
    <AlertCircleIcon className="h-4 w-4 text-yellow-600 mr-2" />
    <span className="text-sm text-yellow-800">
      Connecting to Siyaa...
    </span>
    <Button 
      onClick={forceReconnect}
      variant="ghost"
      size="sm"
      className="ml-2"
    >
      Retry
    </Button>
  </div>
)}
```

---

## 7. Backend API Integration

### Base URLs
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v1';
const CHAT_BACKEND_URL = 'http://localhost:8000';
const WEBSOCKET_URL = 'ws://localhost:8000/api/chat/ws';
```

### Authentication
All REST API requests require JWT token in header:
```typescript
headers: {
  'Content-Type': 'application/json',
  'xo': jwtToken,
  'LOG-TRACE-ID': generateTraceId() // Unique request ID
}
```

### Key REST APIs

#### 1. Fetch Chat History
```bash
POST /chat/messages/list/v1
```

**Request:**
```json
{
  "limit": 50,
  "offset": 0,
  "sort_order": "desc"
}
```

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_123",
      "content": "Schedule a meeting...",
      "sender": "user",
      "timestamp": "2023-11-01T10:00:00Z",
      "type": "message"
    }
  ],
  "total_count": 125,
  "has_more": true
}
```

#### 2. Get User Data
```bash
GET /users/data/v1
```

**Response:**
```json
{
  "success": true,
  "id": "user_123",
  "name": "Jane Doe",
  "primary_email": "jane@example.com",
  "avatar": "https://...",
  "preferences": {
    "timezone": "America/Los_Angeles",
    "working_hours": {
      "start": "09:00",
      "end": "17:00"
    }
  }
}
```

#### 3. Create Meeting (Tool API)
```bash
POST /tools/create-meeting/v1
```

**Request:**
```json
{
  "title": "Team Standup",
  "start_date_time": "2023-11-01T10:00:00Z",
  "end_date_time": "2023-11-01T10:30:00Z",
  "participant_data_list": [
    { "email": "john@example.com", "name": "John Doe" }
  ],
  "location": "Conference Room A",
  "meeting_description": "Daily sync"
}
```

#### 4. Update Meeting
```bash
POST /tools/update-meeting/v1
```

**Request:**
```json
{
  "meeting_id": "evt_123",
  "updates": {
    "start_date_time": "2023-11-01T11:00:00Z",
    "end_date_time": "2023-11-01T11:30:00Z"
  }
}
```

#### 5. Search Calendar Events
```bash
POST /tools/search-calendar-events/v1
```

**Request:**
```json
{
  "start_date": "2023-11-01",
  "end_date": "2023-11-07",
  "query": "team meeting"
}
```

#### 6. Search People
```bash
POST /tools/search-people/v1
```

**Request:**
```json
{
  "query": "John",
  "limit": 10
}
```

#### 7. Update User Preferences
```bash
POST /tools/update-user-preferences/v1
```

**Request:**
```json
{
  "preferences_to_add": ["preference_key_1", "preference_key_2"],
  "preferences_to_delete": ["old_preference"]
}
```

### Error Handling
All APIs return standardized error responses:
```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid or expired token",
    "details": "..."
  }
}
```

---

## 8. Testing & Edge Cases

### Connection Scenarios
1. **Initial Connection** - Show connecting state
2. **Connection Lost** - Display reconnection UI, auto-retry
3. **Connection Failed** - Show error with manual retry button
4. **Token Expired** - Handle 401, redirect to login

### Message Scenarios
1. **Empty Input** - Disable send button
2. **Long Messages** - Support multi-line with proper scrolling
3. **Rapid Messages** - Queue properly, don't duplicate
4. **Echo Prevention** - Don't display user's message echoed back
5. **Duplicate Messages** - Use unique IDs to prevent duplicates

### Intervention Scenarios
1. **Multiple Interventions** - Only handle one at a time
2. **Intervention Timeout** - Add timeout mechanism
3. **Validation Errors** - Show inline errors in edit mode
4. **Partial Data** - Handle missing optional fields gracefully

### UI/UX Edge Cases
1. **No Internet** - Clear error message with retry
2. **Slow Backend** - Show thinking animation, don't timeout too fast
3. **Large Message History** - Implement infinite scroll
4. **Mobile View** - Responsive design, touch-friendly
5. **Accessibility** - Keyboard navigation, screen reader support

---

## 9. Performance Optimizations

### 1. Message Virtualization
For large message histories (100+ messages):
```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={messages.length}
  itemSize={100}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <MessageBubble message={messages[index]} />
    </div>
  )}
</FixedSizeList>
```

### 2. Memoization
```typescript
const MessageBubble = memo(({ message }: { message: Message }) => {
  // Component implementation
});
```

### 3. Debounced Scroll Handling
```typescript
const handleScroll = useDebouncedCallback(() => {
  setIsUserNearBottom(checkIfNearBottom());
}, 100);
```

### 4. Lazy Loading
```typescript
const InteractiveHtmlRenderer = lazy(() => import('@/components/ui/interactive-html-renderer'));
const UIComponentRenderer = lazy(() => import('@/components/ui/ui-component-renderer'));
```

---

## 10. Accessibility

### Keyboard Navigation
- **Enter**: Send message
- **Shift + Enter**: New line
- **Tab**: Navigate through intervention fields
- **Escape**: Close intervention cards

### ARIA Labels
```tsx
<button 
  aria-label="Send message"
  aria-disabled={!inputValue.trim()}
>
  <SendIcon />
</button>

<div 
  role="log" 
  aria-live="polite"
  aria-label="Chat messages"
>
  {messages.map(...)}
</div>
```

### Screen Reader Support
- Announce new messages
- Describe intervention cards
- Provide status updates

---

## 11. Environment Configuration

### Development Setup
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_CHAT_BACKEND_BASE_URL=http://localhost:8000
NEXT_PUBLIC_CHAT_WS_URL=ws://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

### Production Setup
```bash
# .env.production
NEXT_PUBLIC_API_BASE_URL=https://api.siyaa.ai/api
NEXT_PUBLIC_CHAT_BACKEND_BASE_URL=https://chat.siyaa.ai
NEXT_PUBLIC_CHAT_WS_URL=wss://chat.siyaa.ai
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_google_client_id
```

---

## 12. Common Implementation Patterns

### Sending a Message
```typescript
const handleSendMessage = () => {
  if (!inputValue.trim() || connectionState !== 'CONNECTED') return;
  
  const messageContent = inputValue.trim();
  const messageId = generateMessageId(); // 32-char alphanumeric
  const userTimezone = getUserTimezone(); // e.g., "America/Los_Angeles"
  const userName = user?.name || '';
  const userEmail = user?.primary_email || '';
  
  // Add user message to UI
  const userMessage: Message = {
    id: generateUniqueId('user'),
    content: messageContent,
    sender: "user",
    timestamp: new Date(),
    type: "complete",
  };
  setMessages(prev => [...prev, userMessage]);
  
  // Send via WebSocket
  sendChatMessage(messageContent, messageId, userTimezone, userName, userEmail);
  
  // Clear input and show loading
  setInputValue('');
  setIsLoading(true);
};
```

### Handling WebSocket Messages
```typescript
const handleWebSocketMessage = (incomingMessage: IncomingMessage) => {
  switch (incomingMessage.type) {
    case 'message':
      // Replace thinking message or append new
      setMessages(prev => {
        const lastThinkingIndex = findLastThinkingMessage(prev);
        if (lastThinkingIndex !== -1) {
          const newMessages = [...prev];
          newMessages[lastThinkingIndex] = createMessage(incomingMessage);
          return newMessages;
        }
        return [...prev, createMessage(incomingMessage)];
      });
      break;
      
    case 'complete':
      // Make last message sticky
      setMessages(prev => {
        const lastAssistantIndex = findLastAssistantMessage(prev);
        if (lastAssistantIndex !== -1) {
          const newMessages = [...prev];
          newMessages[lastAssistantIndex] = {
            ...newMessages[lastAssistantIndex],
            type: 'complete'
          };
          return newMessages;
        }
        return prev;
      });
      setIsLoading(false);
      break;
      
    case 'human_intervention':
      const interventionMessage = createMessage(incomingMessage);
      setMessages(prev => [...prev, interventionMessage]);
      setActiveIntervention(interventionMessage);
      setIsLoading(false);
      break;
      
    case 'error':
      const errorMessage = createMessage(incomingMessage);
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
      break;
  }
};
```

### Loading Message History
```typescript
const loadMessageHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/messages/list/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xo': jwtToken,
        'LOG-TRACE-ID': generateTraceId(),
      },
      body: JSON.stringify({
        limit: 50,
        offset: messages.length,
        sort_order: 'desc'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      setMessages(prev => [...data.messages.reverse(), ...prev]);
    }
  } catch (error) {
    console.error('Failed to load message history:', error);
  }
};
```

---

## 13. Debugging Tips

### Enable Detailed Logging
```typescript
// Add to chat-interface.tsx
const DEBUG_MODE = process.env.NODE_ENV === 'development';

if (DEBUG_MODE) {
  console.log('WebSocket Message:', incomingMessage);
  console.log('Current Messages State:', messages);
  console.log('Connection State:', connectionState);
}
```

### WebSocket Debugging
```typescript
// Check WebSocket status
console.log('WebSocket State:', wsClient.getConnectionState());
console.log('Client ID:', wsClient.getClientId());
console.log('Thread ID:', wsClient.getThreadId());

// Monitor WebSocket events
wsClient.addEventListener('open', () => console.log('WS Connected'));
wsClient.addEventListener('close', () => console.log('WS Disconnected'));
wsClient.addEventListener('error', (err) => console.error('WS Error:', err));
```

### Common Issues

**1. Messages Not Appearing**
- Check WebSocket connection state
- Verify message handler is registered
- Check for duplicate message IDs
- Ensure message type is handled in switch statement

**2. Intervention Not Working**
- Verify `activeIntervention` state is set
- Check `operation` field in intervention data
- Ensure `action_taken` is sent with response

**3. Connection Failing**
- Verify backend is running
- Check JWT token validity
- Confirm WebSocket URL is correct
- Check network/CORS issues

---

## 14. Future Enhancements

### Planned Features
1. **Voice Input** - Speech-to-text integration
2. **Message Search** - Full-text search through history
3. **Message Reactions** - Like/dislike for feedback
4. **Rich Media** - Image/file attachments
5. **Multi-language** - i18n support
6. **Offline Mode** - Queue messages when offline
7. **Push Notifications** - Desktop notifications for new messages
8. **Conversation Export** - Export chat history
9. **Message Editing** - Edit sent messages
10. **Threading** - Reply to specific messages

### Technical Improvements
1. **Message Batching** - Reduce re-renders
2. **IndexedDB** - Local message persistence
3. **Service Worker** - Background sync
4. **WebRTC** - Video/audio calls
5. **E2E Encryption** - Secure conversations

---

## 15. Quick Reference

### Key Commands
```typescript
// Send message
sendChatMessage(message, messageId, timezone, userName, userEmail, location);

// Force reconnect
forceReconnect();

// Clear error
clearError();

// Check connection
connectionState === 'CONNECTED'
```

### Message ID Generation
```typescript
const generateMessageId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `msg_${timestamp}_${randomStr}`.substring(0, 32);
};
```

### Trace ID Generation
```typescript
const generateTraceId = () => {
  return `trace_${Date.now()}_${Math.random().toString(36).substring(2)}`;
};
```

### Timezone Detection
```typescript
const getUserTimezone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
  // Returns: "America/Los_Angeles", "Europe/London", etc.
};
```

---

## 16. Component Dependencies

### Required npm Packages
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "framer-motion": "^10.16.4",
    "lucide-react": "^0.292.0",
    "dayjs": "^1.11.10",
    "@mui/x-date-pickers": "^6.18.0",
    "@mui/material": "^5.14.18",
    "tailwindcss": "^3.3.5"
  }
}
```

### UI Component Library (shadcn/ui)
```bash
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add label
```

---

## 17. Contact & Support

### Documentation References
- **Design System**: `.cursor/rules/design-principles.mdc`
- **Coding Principles**: `.cursor/rules/coding-principles.mdc`
- **Backend APIs**: `memory-bank/backend_integration.md`

### Getting Help
1. Check console logs for errors
2. Verify WebSocket connection in DevTools (Network tab)
3. Test REST APIs with curl/Postman
4. Review existing implementation patterns
5. Consult backend team for API issues

---

## Conclusion

This guide provides a complete reference for implementing the Siyaa chat window. The implementation focuses on:

✅ **Real-time Communication** - WebSocket-based instant messaging  
✅ **Interactive Interventions** - User approval workflows  
✅ **Modern UI/UX** - Smooth animations and responsive design  
✅ **Robust Error Handling** - Connection management and retries  
✅ **Type Safety** - Full TypeScript support  
✅ **Performance** - Optimized rendering and state management  
✅ **Accessibility** - Keyboard navigation and screen reader support

Follow the patterns and examples in this guide to build a production-ready chat interface that provides an exceptional user experience.

