# System Patterns & Architecture

## Application Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Landing Page  │────│   Authentication │────│   Main Layout   │
│                 │    │   (Mock Google)   │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                        │
                                              ┌─────────┴─────────┐
                                              │                   │
                                    ┌─────────▼──────┐   ┌───────▼──────┐
                                    │ Chat Interface │   │ Community    │
                                    │ (3 Specialists)│   │ Page         │
                                    └────────────────┘   └──────────────┘
```

## Component Patterns

### Authentication Pattern
- **App.tsx**: Central authentication state management
- **Conditional Rendering**: LandingPage vs MainLayout based on auth state
- **Mock Implementation**: Ready for real OAuth integration

### Layout Pattern  
- **Header**: Consistent branding + navigation across authenticated app
- **Tab Navigation**: Simple chat/community toggle
- **Responsive Design**: Mobile-first approach with proper breakpoints

### Chat Interface Pattern
- **Specialist Selection**: Sidebar with three AI types
- **Message System**: User/AI message distinction with timestamps
- **State Management**: Messages per specialist, input handling
- **Mock AI Responses**: Templated responses for demonstration

### Community Pattern
- **Feed Layout**: Main posts + sidebar (trending, guidelines)
- **Post Structure**: Author, content, category, engagement metrics
- **Engagement UI**: Like/reply buttons (UI only currently)
- **Category System**: Health, Legal, Wellness color coding

## Design System Patterns

### Color System
```css
/* Primary Brand Colors */
--primary: oklch(0.65 0.15 320)     /* Soft purple */
--accent: oklch(0.75 0.12 160)      /* Teal accent */
--chart-3: oklch(0.7 0.1 200)       /* Blue wellness */

/* UI Colors */
--background: oklch(0.99 0.01 320)   /* Warm white */
--card: oklch(0.98 0.01 320)         /* Subtle card background */
--muted: oklch(0.95 0.02 315)        /* Muted backgrounds */
```

### Component Hierarchy
1. **shadcn/ui Base Components**: Button, Card, Input, Avatar, Dialog
2. **Composite Components**: ChatInterface, CommunityPage, LandingPage
3. **Layout Components**: App, MainLayout
4. **Page Components**: Feature-specific implementations

### Responsive Patterns
- **Mobile First**: Base styles for mobile, expand upward
- **Breakpoint Strategy**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Grid Systems**: CSS Grid for layouts, Flexbox for components
- **Navigation**: Collapsible sidebar, tab-based mobile navigation

## State Management Patterns
- **Component State**: React useState for UI interactions
- **Authentication State**: Centralized in App.tsx
- **Mock Data**: Static arrays for posts, messages, specialists
- **Future**: Context API or Zustand for complex state

## Icon & Visual Patterns
- **Lucide React**: Consistent icon library across application
- **Specialist Icons**: Stethoscope (health), Scale (legal), Brain (mental)
- **Brand Elements**: Heart icon for GoddessGPT branding
- **Color-Coded Features**: Each specialist has associated color theme

## Data Flow Patterns
```
User Action → Component Handler → State Update → UI Re-render
                                      ↓
                              Mock API Response (Future: Real API)
```

## Code Organization Patterns
- **src/app/**: Next.js app router files (layout, page, globals)
- **src/components/**: Feature components (non-UI)
- **src/components/ui/**: Reusable UI components (shadcn/ui)
- **src/lib/**: Utilities and helpers
- **Constants**: Inline for now, future extraction to constants files