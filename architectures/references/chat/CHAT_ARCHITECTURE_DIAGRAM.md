# Chat Window Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Chat Interface Component                     │  │
│  │        (src/siyaa/components/chat-interface.tsx)         │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │  Message Display Area                           │    │  │
│  │  │  • User Messages (right, gray)                  │    │  │
│  │  │  • Assistant Messages (left, white)             │    │  │
│  │  │  • Status Messages (blue)                       │    │  │
│  │  │  • Error Messages (red)                         │    │  │
│  │  │  • Intervention Cards (interactive)             │    │  │
│  │  │  • UI Components (dynamic)                      │    │  │
│  │  │  • Loading Indicator                            │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────┐    │  │
│  │  │  Input Area                                     │    │  │
│  │  │  • Auto-expanding Textarea                      │    │  │
│  │  │  • Animated Placeholder                         │    │  │
│  │  │  • Send Button                                  │    │  │
│  │  └─────────────────────────────────────────────────┘    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Chat Context Provider                        │  │
│  │           (src/contexts/ChatContext.tsx)                 │  │
│  │                                                           │  │
│  │  • WebSocket Client Management                           │  │
│  │  • Connection State Tracking                             │  │
│  │  • Message Handler Registry                              │  │
│  │  • Location Management                                   │  │
│  │  • JWT Token Updates                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              WebSocket Client                             │  │
│  │         (src/lib/websocket-client.ts)                    │  │
│  │                                                           │  │
│  │  • Connection Lifecycle                                  │  │
│  │  • Message Queue Management                              │  │
│  │  • Auto-reconnection Logic                               │  │
│  │  • Error Handling                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────┬──────────────────────┬──────────────────┘
                       │                      │
                       │ WebSocket            │ REST APIs
                       │ (Real-time)          │ (HTTP)
                       │                      │
┌──────────────────────┴──────────────────────┴──────────────────┐
│                         Backend Services                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │     Chat Backend (Python/FastAPI)                         │  │
│  │     ws://localhost:8000                                   │  │
│  │                                                           │  │
│  │  • WebSocket Server                                      │  │
│  │  • Message Processing                                    │  │
│  │  • AI Agent Orchestration                                │  │
│  │  • Real-time Status Updates                              │  │
│  │  • Intervention Generation                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │     Main API Backend                                      │  │
│  │     http://localhost:8080/api                            │  │
│  │                                                           │  │
│  │  • Authentication (Google OAuth)                         │  │
│  │  • User Management                                       │  │
│  │  • Calendar Management                                   │  │
│  │  • Chat History Storage                                  │  │
│  │  • Tool APIs (create/update meetings, etc.)              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │     External Services                                     │  │
│  │                                                           │  │
│  │  • Google Calendar API                                   │  │
│  │  • Google OAuth2                                         │  │
│  │  • OpenAI API (GPT-4)                                    │  │
│  │  • Email Services                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Message Flow Diagram

### 1. Simple Message Flow

```
User Types Message
       │
       ▼
┌─────────────────┐
│  Input Field    │
│  "Schedule a    │
│  meeting..."    │
└─────────────────┘
       │
       │ Enter / Click Send
       ▼
┌─────────────────────────────────────┐
│  handleSendMessage()                │
│  • Generate message_id              │
│  • Get timezone, user info          │
│  • Add message to UI (gray bubble)  │
│  • Set loading state                │
└─────────────────────────────────────┘
       │
       │ sendChatMessage()
       ▼
┌─────────────────────────────────────┐
│  WebSocket Client                   │
│  • Format OutgoingMessage           │
│  • Send via WebSocket               │
└─────────────────────────────────────┘
       │
       │ ws.send()
       ▼
════════════════════════════════════════
       │
       ▼
┌─────────────────────────────────────┐
│  Backend Chat Server                │
│  • Receive message                  │
│  • Parse user intent (AI)           │
│  • Process request                  │
└─────────────────────────────────────┘
       │
       │ Multiple responses
       ▼
┌─────────────────────────────────────┐
│  Send: {type: "status"}             │
│  "Checking your calendar..."        │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Send: {type: "message"}            │
│  "I found 3 available slots..."     │
└─────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Send: {type: "complete"}           │
└─────────────────────────────────────┘
════════════════════════════════════════
       │
       ▼
┌─────────────────────────────────────┐
│  WebSocket Client                   │
│  • Receive IncomingMessage[]        │
│  • Call message handlers            │
└─────────────────────────────────────┘
       │
       │ handleWebSocketMessage()
       ▼
┌─────────────────────────────────────┐
│  Update UI                          │
│  • Show status (blue bubble)        │
│  • Replace with response (white)    │
│  • Make sticky on complete          │
│  • Hide loading indicator           │
└─────────────────────────────────────┘
       │
       ▼
   User sees response
```

---

### 2. Intervention Flow

```
User: "Update my meeting with John"
       │
       ▼
   [Same initial flow as above]
       │
       ▼
Backend detects need for approval
       │
       ▼
┌─────────────────────────────────────────┐
│  Send: {                                │
│    type: "human_intervention",          │
│    content: {                           │
│      operation: "update_meeting",       │
│      message_to_user: "Review changes", │
│      payload_preview: {...}             │
│    }                                    │
│  }                                      │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Frontend                               │
│  • Set activeIntervention               │
│  • Parse operation type                 │
│  • Render intervention card             │
└─────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────┐
│  Intervention Card UI                   │
│  ┌───────────────────────────────────┐  │
│  │ Meeting Update                    │  │
│  │ ────────────────────────────────  │  │
│  │ Title: [Team Standup]             │  │
│  │ Time: [10:00 AM - 10:30 AM]       │  │
│  │ Attendees: [John, Jane]           │  │
│  │ Location: [Room A]                │  │
│  │                                   │  │
│  │ [Cancel] [Continue] [Edit & Save] │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
       │
       │ User chooses action
       ▼
┌──────────┬──────────────┬──────────────┐
│  Cancel  │  Continue    │  Edit & Save │
└──────────┴──────────────┴──────────────┘
     │           │                │
     │           │                │ User edits fields
     │           │                ▼
     │           │         ┌──────────────┐
     │           │         │ Update local │
     │           │         │ state        │
     │           │         └──────────────┘
     │           │                │
     ▼           ▼                ▼
┌────────────────────────────────────────┐
│  Send JSON Response:                   │
│  {                                     │
│    ...interventionData,                │
│    action_taken: "CANCEL" |            │
│                  "NOT_TOUCHED" |       │
│                  "UPDATED"             │
│  }                                     │
└────────────────────────────────────────┘
       │
       ▼
   Backend processes action
       │
       ▼
   Confirmation message
```

---

## State Management Flow

```
┌────────────────────────────────────────────────────────────┐
│                    Application State                        │
└────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Auth        │  │  Chat        │  │  Component   │
│  Context     │  │  Context     │  │  State       │
└──────────────┘  └──────────────┘  └──────────────┘
│                 │                 │
│ • user         │ • wsClient      │ • messages[]
│ • jwtToken     │ • clientId      │ • inputValue
│ • isAuth       │ • threadId      │ • isLoading
│                │ • connection    │ • activeIntervention
│                │   State         │ • interventionValues
│                │ • userLocation  │ • showSuggestions
│                │ • lastError     │ • isUserNearBottom
│                │                 │
│                │  Provides:      │
│                │ • sendMessage() │
│                │ • reconnect()   │
│                │ • clearError()  │
└────────────────┴─────────────────┴──────────────┘
```

---

## Component Hierarchy

```
App
 └─ ChatProvider
     └─ AuthProvider
         └─ ChatInterface
             ├─ WelcomeMessage
             │   └─ ExampleCards (clickable)
             │
             ├─ MessageList
             │   ├─ UserMessage
             │   │   └─ MessageBubble (gray)
             │   │
             │   ├─ AssistantMessage
             │   │   ├─ FlickeringMessage (thinking)
             │   │   ├─ MessageBubble (white)
             │   │   └─ MessageContentRenderer (HTML)
             │   │
             │   ├─ StatusMessage
             │   │   └─ MessageBubble (blue)
             │   │
             │   ├─ ErrorMessage
             │   │   └─ MessageBubble (red)
             │   │
             │   ├─ InterventionMessage
             │   │   ├─ UpdateMeetingCard
             │   │   ├─ SendEmailCard
             │   │   ├─ UpdateDirectoryCard
             │   │   ├─ CreateMeetingCard
             │   │   └─ UpdatePreferencesCard
             │   │       ├─ EditableFields
             │   │       └─ ActionButtons
             │   │           ├─ Cancel
             │   │           ├─ Continue
             │   │           └─ SaveAndContinue
             │   │
             │   └─ UIComponent
             │       └─ UIComponentRenderer
             │           └─ DynamicComponent
             │
             ├─ LoadingIndicator
             │   └─ AnimatedSpinner
             │
             └─ InputArea
                 ├─ AnimatedPlaceholder
                 ├─ AutoExpandingTextarea
                 └─ SendButton
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interaction                        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Local State Update                                          │
│  • setInputValue()                                           │
│  • setMessages()                                             │
│  • setIsLoading(true)                                        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Context Method Call                                         │
│  • sendChatMessage(message, id, timezone, user, location)   │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  WebSocket Client                                            │
│  • Format OutgoingMessage                                    │
│  • ws.send(JSON.stringify(message))                          │
│  • Queue if offline                                          │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
        ═══════════════════════════════════════
                    Network
        ═══════════════════════════════════════
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend Processing                                          │
│  • Parse message                                             │
│  • Identify intent (AI)                                      │
│  • Execute actions                                           │
│  • Generate responses                                        │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
        ═══════════════════════════════════════
                    Network
        ═══════════════════════════════════════
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  WebSocket Client                                            │
│  • ws.onmessage event                                        │
│  • Parse IncomingMessage                                     │
│  • Call registered handlers                                  │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Context Message Handler                                     │
│  • Broadcast to all registered components                    │
│  • globalMessageHandlers.forEach(handler)                    │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  Component Handler (handleWebSocketMessage)                  │
│  • Switch on message type                                    │
│  • Update local state accordingly                            │
│  • setMessages(), setIsLoading(), etc.                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│  React Re-render                                             │
│  • Update UI with new messages                               │
│  • Show/hide loading states                                  │
│  • Render intervention cards                                 │
│  • Auto-scroll if needed                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## WebSocket Lifecycle

```
┌─────────────────┐
│  App Starts     │
└─────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  User Logs In               │
│  • JWT token obtained       │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  ChatContext Initializes    │
│  • Create WebSocket client  │
│  • Set client_id, thread_id │
└─────────────────────────────┘
        │
        ▼
┌─────────────────────────────┐
│  Connection Attempt         │
│  State: CONNECTING          │
└─────────────────────────────┘
        │
        ├─ Success ──────────────────────────┐
        │                                    │
        │                                    ▼
        │                          ┌──────────────────┐
        │                          │  State: CONNECTED│
        │                          │  • Process queue │
        │                          │  • Ready to send │
        │                          └──────────────────┘
        │                                    │
        │                                    │
        │                          ┌─────────▼────────┐
        │                          │ Messages flowing │
        │                          │ ◄──────────────► │
        │                          │ Frontend ↔ Back  │
        │                          └──────────────────┘
        │                                    │
        │                          ┌─────────▼────────┐
        │                          │ Connection Lost  │
        │                          │ (Network issue)  │
        │                          └──────────────────┘
        │                                    │
        └─ Failure ─────────────────────────┘
                    │
                    ▼
          ┌──────────────────┐
          │ State: ERROR     │
          └──────────────────┘
                    │
                    ▼
          ┌──────────────────────────┐
          │ Auto-Reconnect           │
          │ • Attempt 1: 3s delay    │
          │ • Attempt 2: 6s delay    │
          │ • Attempt 3: 12s delay   │
          │ • Attempt 4: 24s delay   │
          │ • Attempt 5: 48s delay   │
          │ • Max attempts: 5        │
          └──────────────────────────┘
                    │
                    ├─ Success ──► [CONNECTED]
                    │
                    └─ All Failed ──► [ERROR - Manual Retry]
```

---

## Message Processing Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                   Incoming Message                           │
│  {type: "...", content: "...", timestamp: ...}              │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
            ┌─────────────────────────┐
            │  Type Detection         │
            └─────────────────────────┘
                          │
        ┌─────────────────┼─────────────────────────────┐
        │                 │                             │
        ▼                 ▼                             ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│   message    │  │     status       │  │  human_intervention │
└──────────────┘  └──────────────────┘  └─────────────────────┘
        │                 │                             │
        ▼                 ▼                             ▼
┌──────────────┐  ┌──────────────────┐  ┌─────────────────────┐
│ • Replace    │  │ • Blue styling   │  │ • Detect operation  │
│   thinking   │  │ • Temp display   │  │ • Render card       │
│ • Flickering │  │ • Auto-remove    │  │ • Enable edit mode  │
│ • White      │  └──────────────────┘  │ • Set active        │
│   bubble     │                         └─────────────────────┘
└──────────────┘
        │
        ├─────────────────┬─────────────────┬────────────────┐
        ▼                 ▼                 ▼                ▼
┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐
│   error     │  │   complete   │  │ ui_component │  │   (more)   │
└─────────────┘  └──────────────┘  └──────────────┘  └────────────┘
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐  ┌──────────────┐  ┌──────────────┐
│ • Red style │  │ • Make sticky│  │ • Render     │
│ • Stop load │  │ • Stop flick │  │   dynamic    │
│ • Show      │  │ • Hide load  │  │   component  │
└─────────────┘  └──────────────┘  └──────────────┘
```

---

## Authentication Flow

```
┌─────────────────┐
│  Landing Page   │
└─────────────────┘
        │
        │ Click "Sign in with Google"
        ▼
┌─────────────────────────────────┐
│  Redirect to Google OAuth       │
│  • client_id                    │
│  • redirect_uri                 │
│  • scopes (calendar, profile)   │
└─────────────────────────────────┘
        │
        │ User authorizes
        ▼
┌─────────────────────────────────┐
│  Google redirects back          │
│  • Authorization code in URL    │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  Frontend receives code         │
│  POST /api/auth/login/v1        │
│  {code, redirect_uri}           │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  Backend validates code         │
│  • Exchange with Google         │
│  • Create/update user           │
│  • Generate JWT token           │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  Response:                      │
│  {                              │
│    jwt_token: "...",            │
│    user: {...}                  │
│  }                              │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  Frontend stores token          │
│  • Save to cookies              │
│  • Update AuthContext           │
│  • Initialize WebSocket         │
└─────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────┐
│  Redirect to /app               │
│  • Chat interface loads         │
│  • WebSocket connects           │
└─────────────────────────────────┘
```

---

## Error Handling Flow

```
┌─────────────────────────────────────┐
│         Error Occurs                │
└─────────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌────────┐ ┌─────────┐ ┌────────────┐
│WebSocket│ │  API    │ │ Component  │
│ Error  │ │ Error   │ │   Error    │
└────────┘ └─────────┘ └────────────┘
    │           │           │
    ▼           ▼           ▼
┌──────────────────────────────────┐
│   Error Classification           │
│   • Network error                │
│   • Authentication error         │
│   • Validation error             │
│   • Server error                 │
└──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│   Error Handling Strategy        │
└──────────────────────────────────┘
                │
    ┌───────────┼───────────┐
    │           │           │
    ▼           ▼           ▼
┌─────────┐ ┌────────┐ ┌─────────┐
│Retry    │ │Display │ │Redirect │
│Auto     │ │Message │ │to Login │
└─────────┘ └────────┘ └─────────┘
    │           │           │
    │           │           │
    └───────────┴───────────┘
                │
                ▼
┌──────────────────────────────────┐
│   User Notification              │
│   • Toast message                │
│   • Error banner                 │
│   • Retry button                 │
└──────────────────────────────────┘
                │
                ▼
┌──────────────────────────────────┐
│   Logging & Monitoring           │
│   • Console.error()              │
│   • Sentry/Analytics             │
│   • Error tracking               │
└──────────────────────────────────┘
```

---

This architecture ensures a robust, scalable, and maintainable chat interface with clear separation of concerns and well-defined data flows.

