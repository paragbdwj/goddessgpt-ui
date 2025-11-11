# Backend APIs for Chat Window Integration

## Quick Reference for Frontend Developer

This document lists all backend APIs that the chat window uses, with curl examples for testing.

---

## Base URLs

```bash
API_BASE_URL="http://localhost:8080/api/v1"
CHAT_BACKEND_URL="http://localhost:8000"
WEBSOCKET_URL="ws://localhost:8000/api/chat/ws"
```

---

## Authentication

### 1. Google OAuth Login
**Endpoint**: `POST /auth/login/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/auth/login/v1" \
  -H "Content-Type: application/json" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "code": "4/0AdLIrYeQ7gH8fR...",
    "redirect_uri": "http://localhost:3000/auth/callback"
  }'
```

**Response**:
```json
{
  "success": true,
  "jwt_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "https://lh3.googleusercontent.com/...",
    "verified": true
  }
}
```

---

## User Management

### 2. Get User Data
**Endpoint**: `GET /users/data/v1`

```bash
curl -X GET "http://localhost:8080/api/v1/users/data/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)"
```

**Response**:
```json
{
  "success": true,
  "id": "user123",
  "name": "John Doe",
  "primary_email": "john@example.com",
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

---

## Chat History

### 3. Fetch Chat Messages
**Endpoint**: `POST /chat/messages/list/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/chat/messages/list/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "limit": 50,
    "offset": 0,
    "sort_order": "desc"
  }'
```

**Response**:
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_123",
      "content": "Schedule a meeting with John",
      "sender": "user",
      "timestamp": "2023-11-01T10:00:00Z",
      "type": "message"
    },
    {
      "id": "msg_124",
      "content": "I'll schedule that for you...",
      "sender": "assistant",
      "timestamp": "2023-11-01T10:00:05Z",
      "type": "message"
    }
  ],
  "total_count": 125,
  "has_more": true
}
```

---

## WebSocket Connection

### 4. WebSocket Chat Endpoint
**URL**: `ws://localhost:8000/api/chat/ws/{client_id}?token={jwt_token}`

**Example Connection**:
```javascript
const clientId = 'client_' + Math.random().toString(36).substr(2, 9);
const jwtToken = 'your_jwt_token_here';
const ws = new WebSocket(`ws://localhost:8000/api/chat/ws/${clientId}?token=${jwtToken}`);

ws.onopen = () => {
  console.log('Connected');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};
```

### Outgoing Message Format
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

### Incoming Message Types

**Assistant Response**:
```json
{
  "type": "message",
  "content": "I'm checking your calendar...",
  "sender": "assistant",
  "timestamp": 1699564823
}
```

**Status Update**:
```json
{
  "type": "status",
  "message": "Searching for available slots...",
  "timestamp": 1699564825
}
```

**Error**:
```json
{
  "type": "error",
  "message": "Unable to access calendar",
  "timestamp": 1699564827
}
```

**Complete**:
```json
{
  "type": "complete",
  "message": "Task completed",
  "timestamp": 1699564830
}
```

**Human Intervention**:
```json
{
  "type": "human_intervention",
  "content": {
    "operation": "update_meeting",
    "message_to_user": "Please review these changes",
    "meeting_id": "evt_123",
    "payload_preview": {
      "meeting_id": "evt_123",
      "meeting_title": "Team Standup",
      "start_date_time": "2023-11-01T10:00:00Z",
      "end_date_time": "2023-11-01T10:30:00Z",
      "participant_data_list": [
        {"email": "john@example.com", "name": "John Doe"}
      ],
      "location": "Conference Room A"
    }
  },
  "timestamp": 1699564832
}
```

---

## Meeting Management APIs

### 5. Create Meeting
**Endpoint**: `POST /tools/create-meeting/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/create-meeting/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "title": "Team Standup",
    "start_date_time": "2023-11-01T10:00:00Z",
    "end_date_time": "2023-11-01T10:30:00Z",
    "participant_data_list": [
      {"email": "john@example.com", "name": "John Doe"}
    ],
    "location": "Conference Room A",
    "meeting_description": "Daily team sync"
  }'
```

**Response**:
```json
{
  "success": true,
  "meeting": {
    "id": "evt_456",
    "title": "Team Standup",
    "start_time": "2023-11-01T10:00:00Z",
    "end_time": "2023-11-01T10:30:00Z",
    "attendees": [...]
  }
}
```

### 6. Update Meeting
**Endpoint**: `POST /tools/update-meeting/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/update-meeting/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "meeting_id": "evt_123",
    "meeting_title": "Updated Team Standup",
    "start_date_time": "2023-11-01T11:00:00Z",
    "end_date_time": "2023-11-01T11:30:00Z"
  }'
```

**Response**:
```json
{
  "success": true,
  "meeting": {
    "id": "evt_123",
    "title": "Updated Team Standup",
    "start_time": "2023-11-01T11:00:00Z",
    "end_time": "2023-11-01T11:30:00Z"
  }
}
```

### 7. Search Calendar Events
**Endpoint**: `POST /tools/search-calendar-events/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/search-calendar-events/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "start_date": "2023-11-01",
    "end_date": "2023-11-07",
    "query": "team meeting"
  }'
```

**Response**:
```json
{
  "success": true,
  "events": [
    {
      "id": "evt_123",
      "title": "Team Meeting",
      "start_time": "2023-11-01T10:00:00Z",
      "end_time": "2023-11-01T11:00:00Z"
    }
  ]
}
```

---

## People/Contacts APIs

### 8. Search People
**Endpoint**: `POST /tools/search-people/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/search-people/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "query": "John",
    "limit": 10
  }'
```

**Response**:
```json
{
  "success": true,
  "people": [
    {
      "id": "person_123",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://...",
      "is_favorite": false
    }
  ]
}
```

### 9. Get People List
**Endpoint**: `POST /people/list/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/people/list/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "limit": 50,
    "offset": 0
  }'
```

---

## User Preferences APIs

### 10. Get User Preferences
**Endpoint**: `POST /tools/get-user-preferences/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/get-user-preferences/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)"
```

**Response**:
```json
{
  "success": true,
  "preferences": {
    "timezone": "America/Los_Angeles",
    "working_hours": {
      "start": "09:00",
      "end": "17:00"
    },
    "notification_settings": {
      "email": true,
      "push": true
    },
    "ai_assistant": {
      "response_style": "casual",
      "proactive_suggestions": true
    }
  }
}
```

### 11. Update User Preferences
**Endpoint**: `POST /tools/update-user-preferences/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/tools/update-user-preferences/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "preferences_to_add": [
      "prefer_morning_meetings",
      "auto_decline_conflicts"
    ],
    "preferences_to_delete": [
      "old_preference"
    ]
  }'
```

---

## User Configuration APIs

### 12. Update User Config
**Endpoint**: `POST /users/config/update/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/users/config/update/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "timezone": "America/New_York",
    "working_hours": {
      "start": "08:00",
      "end": "16:00"
    }
  }'
```

---

## Analytics/Tracking

### 13. Send Mixpanel Event
**Endpoint**: `POST /mixpanel/send-event/v1`

```bash
curl -X POST "http://localhost:8080/api/v1/mixpanel/send-event/v1" \
  -H "Content-Type: application/json" \
  -H "xo: <JWT_TOKEN>" \
  -H "LOG-TRACE-ID: $(uuidgen)" \
  -d '{
    "event_name": "CHAT_MESSAGE_SENT",
    "properties": {
      "email": "user@example.com",
      "message_length": 45
    }
  }'
```

---

## Error Responses

All APIs return standardized error format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": "Additional error details"
  }
}
```

### Common Error Codes
- `AUTH_ERROR` - Invalid or expired JWT token
- `VALIDATION_ERROR` - Invalid request parameters
- `NOT_FOUND` - Resource not found
- `CALENDAR_ERROR` - Google Calendar API error
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Required Headers

### All REST API Requests
```typescript
headers: {
  'Content-Type': 'application/json',
  'xo': jwtToken,                    // JWT authentication token
  'LOG-TRACE-ID': generateTraceId()  // Unique request identifier
}
```

### WebSocket Connection
```
ws://localhost:8000/api/chat/ws/{client_id}?token={jwt_token}
```

---

## Testing Checklist

### Authentication
- [ ] Login with Google OAuth
- [ ] Get user data
- [ ] Handle token expiration
- [ ] Refresh token flow

### WebSocket
- [ ] Connect with valid token
- [ ] Send message
- [ ] Receive messages (all types)
- [ ] Handle disconnection
- [ ] Auto-reconnect
- [ ] Handle errors

### Chat History
- [ ] Fetch initial messages
- [ ] Load more messages (pagination)
- [ ] Handle empty history

### Interventions
- [ ] Receive intervention request
- [ ] Send approval (NOT_TOUCHED)
- [ ] Send with modifications (UPDATED)
- [ ] Send cancellation (CANCEL)

### Meetings
- [ ] Create meeting
- [ ] Update meeting
- [ ] Search calendar events

### People
- [ ] Search people
- [ ] Get people list

### Preferences
- [ ] Get preferences
- [ ] Update preferences

---

## Environment Setup

### Development
```bash
export API_BASE_URL="http://localhost:8080/api/v1"
export CHAT_BACKEND_URL="http://localhost:8000"
export WEBSOCKET_URL="ws://localhost:8000/api/chat/ws"
```

### Testing with Postman

1. Create environment with variables:
   - `API_BASE_URL`: `http://localhost:8080/api/v1`
   - `JWT_TOKEN`: Your JWT token from login

2. Set headers for all requests:
   - `Content-Type`: `application/json`
   - `xo`: `{{JWT_TOKEN}}`
   - `LOG-TRACE-ID`: `{{$guid}}`

3. Test each endpoint sequentially

---

## WebSocket Testing with wscat

Install wscat:
```bash
npm install -g wscat
```

Connect and test:
```bash
# Connect
wscat -c "ws://localhost:8000/api/chat/ws/test_client_123?token=YOUR_JWT_TOKEN"

# Send message
{"message": "Hello", "thread_id": "thread_123", "message_id": "msg_001", "timezone": "America/Los_Angeles"}

# Receive messages
< {"type": "message", "content": "Hi there!", "timestamp": 1699564823}
```

---

## Rate Limiting

Most APIs have rate limits:
- **Chat Messages**: 60 requests/minute
- **Calendar APIs**: 100 requests/minute
- **Search APIs**: 30 requests/minute
- **WebSocket**: Unlimited (but message queue enforced)

If rate limited, you'll receive:
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "retry_after": 30
  }
}
```

---

## Monitoring & Debugging

### Check Backend Health
```bash
# API Backend
curl http://localhost:8080/health

# Chat Backend
curl http://localhost:8000/health
```

### WebSocket Debug Logs
Enable in browser DevTools:
1. Open Network tab
2. Filter by "WS"
3. Click on WebSocket connection
4. View Messages tab

### Common Issues

**401 Unauthorized**
- JWT token expired → Re-authenticate
- Invalid token → Check token format
- Missing xo header → Add header

**Connection Failed**
- Backend not running → Start backend services
- CORS issue → Check backend CORS config
- Network blocked → Check firewall/proxy

**WebSocket Disconnecting**
- Token expired → Refresh token
- Network unstable → Auto-reconnect will retry
- Backend restart → Wait and reconnect

---

## Backend Developer Handoff

When working with backend team, provide:

1. **Message Format Examples**
   - Show exact JSON structure for outgoing messages
   - Include all optional fields being used

2. **Expected Responses**
   - Document expected response formats
   - Include edge cases (empty results, errors)

3. **Timing Requirements**
   - Status updates should come within 1s
   - Complete message within 30s max
   - Timeout handling after 60s

4. **Error Scenarios**
   - How should backend indicate errors?
   - What error codes to use?
   - Include error details for debugging

5. **Intervention Types**
   - Document all intervention operations
   - Include required/optional fields
   - Specify action_taken values

---

For complete backend integration documentation, see:
- `memory-bank/backend_integration.md` - Full API specifications
- `CHAT_WINDOW_IMPLEMENTATION_GUIDE.md` - Frontend implementation guide
- `CHAT_ARCHITECTURE_DIAGRAM.md` - System architecture diagrams

