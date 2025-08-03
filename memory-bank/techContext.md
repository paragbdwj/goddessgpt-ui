# Technical Context

## Technology Stack

### Core Framework
- **Next.js 15**: React framework with App Router
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Type safety and developer experience

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library built on Radix UI
- **Radix UI Primitives**: Accessible component foundations
  - @radix-ui/react-avatar
  - @radix-ui/react-dialog  
  - @radix-ui/react-navigation-menu
  - @radix-ui/react-slot

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **TypeScript Config**: Strict type checking enabled
- **PostCSS**: CSS processing for Tailwind

### Utility Libraries
- **Lucide React**: Comprehensive icon set (500+ icons)
- **class-variance-authority**: Component variant management
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes efficiently
- **next-themes**: Dark/light mode support
- **Sonner**: Toast notifications

## Project Configuration

### Build System
```json
{
  "scripts": {
    "dev": "next dev --turbopack",    // Fast refresh with Turbopack
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### TypeScript Configuration
- **Strict Mode**: Enabled for type safety
- **Path Mapping**: `@/*` aliases to `src/*`
- **Next.js Integration**: Built-in TypeScript support

### Tailwind Configuration
- **Custom Theme**: Extended color palette with oklch colors
- **CSS Variables**: Dynamic theming support
- **Component Classes**: Custom utilities for consistent spacing

## Development Environment

### Prerequisites
- **Node.js 18+**: Required for Next.js 15
- **Package Manager**: npm (package-lock.json present)
- **Editor**: VS Code recommended with TypeScript support

### File Structure
```
goddessgpt-ui/
├── src/app/              # Next.js App Router
│   ├── globals.css       # Global styles & theme
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── src/components/       # React components
│   ├── ui/              # shadcn/ui components
│   └── *.tsx            # Feature components
├── src/lib/             # Utilities
│   └── utils.ts
├── public/              # Static assets
├── components.json      # shadcn/ui configuration
└── memory-bank/         # Project documentation
```

## Key Dependencies Analysis

### Production Dependencies
- **Core**: React ecosystem with Next.js
- **UI**: Radix UI + shadcn/ui for accessible components
- **Styling**: Tailwind CSS with utility-first approach
- **Icons**: Lucide React for consistent iconography
- **Utils**: Class manipulation and theme management

### Development Dependencies
- **Linting**: ESLint with Next.js rules
- **Types**: TypeScript definitions for Node.js and React
- **Build**: Next.js handles bundling, optimization
- **CSS**: Tailwind PostCSS plugin for processing

## Performance Considerations

### Next.js Optimizations
- **App Router**: Improved loading and caching
- **Turbopack**: Fast refresh in development
- **Automatic Code Splitting**: Route-based splitting
- **Image Optimization**: Built-in Next.js image handling

### Bundle Size
- **Tree Shaking**: Automatic with modern bundlers
- **Lucide Icons**: Import only used icons
- **Radix UI**: Modular component imports
- **Tailwind CSS**: Purged unused styles in production

## Future Technical Requirements

### Authentication Integration
- **Google OAuth**: @google-cloud/identity platform
- **Session Management**: NextAuth.js or similar
- **JWT Handling**: Secure token management

### AI Integration
- **OpenAI API**: For actual AI responses
- **Stream Handling**: Real-time response streaming
- **Context Management**: Conversation history

### Data Persistence
- **Database**: PostgreSQL or similar
- **ORM**: Prisma or Drizzle ORM
- **File Storage**: Cloud storage for images (AWS S3, Cloudinary)

### Deployment
- **Vercel**: Optimal for Next.js deployment
- **Environment Variables**: Secure API key management
- **CDN**: Global content delivery
- **Monitoring**: Error tracking and analytics

## Security Considerations
- **Type Safety**: TypeScript for runtime error prevention
- **Sanitization**: Input validation and XSS prevention
- **API Security**: Rate limiting and authentication
- **HTTPS**: Secure data transmission
- **Privacy**: GDPR compliance for women's health data