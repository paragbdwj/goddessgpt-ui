# GoddessGPT - AI Assistant for Women

A modern, responsive web application built with Next.js and TypeScript, designed specifically as an AI chatbot assistant for women seeking solutions in healthcare, legal, and mental wellness domains.

## ✨ Features

### 🏠 Landing Page
- **Women-focused design** with empowering color scheme (purple/pink tones)
- **Google Sign-In CTA** (currently mocked for demonstration)
- **Feature showcase** highlighting the three specialist domains
- **Trust & Safety section** emphasizing privacy and confidentiality
- **Responsive design** that works on all devices

### 🔐 Authentication Flow
- **Mock authentication system** for demonstration purposes
- Seamless transition from landing page to main application
- Sign-out functionality to return to landing page

### 💬 Chat Interface
- **Three AI Specialists**:
  - 🩺 **Dr. Wellness** - Medical guidance and health advice
  - ⚖️ **Legal Advisor** - Legal support and rights information  
  - 🧠 **Dr. Mindful** - Mental wellness and emotional support
- **Interactive sidebar** for specialist selection
- **Real-time chat interface** with mock AI responses
- **Message history** with timestamps
- **Responsive layout** with proper mobile support

### 👥 Community Page
- **Community statistics** showing active members and engagement
- **Discussion feed** with categorized posts (Health, Legal, Wellness)
- **Trending topics** sidebar
- **Featured community champions**
- **Community guidelines** for safe participation
- **Interactive elements** like likes and replies (UI only)

## 🎨 Design Principles

### Color Theme
- **Primary**: Soft purple tones (`oklch(0.65 0.15 320)`)
- **Accent**: Teal/emerald for contrast (`oklch(0.75 0.12 160)`)
- **Background**: Warm, light tones with subtle gradients
- **Emphasis on empowerment** and professional trust

### UX/UI Features
- **Modern gradient backgrounds**
- **Card-based layouts** for content organization
- **Consistent iconography** using Lucide React icons
- **Accessible color contrasts** and typography
- **Smooth transitions** and hover effects
- **Mobile-first responsive design**

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **Components**: shadcn/ui component library
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with custom color theme
│   ├── layout.tsx           # Root layout with Toaster
│   └── page.tsx             # Main entry point
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── App.tsx              # Main app with auth state management
│   ├── LandingPage.tsx      # Landing page component
│   ├── MainLayout.tsx       # Main app layout with navigation
│   ├── ChatInterface.tsx    # Chat interface with specialist tabs
│   └── CommunityPage.tsx    # Community features page
└── lib/
    └── utils.ts             # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd goddessgpt-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Configuration

### Custom Theme
The application uses a custom color theme defined in `src/app/globals.css`. The theme is specifically designed for the target audience with:
- Warm, empowering colors
- Professional yet approachable aesthetics
- Support for both light and dark modes

### Component Customization
All UI components are built with shadcn/ui and can be customized in the `src/components/ui/` directory.

## 🎯 Target Audience

Designed specifically for women seeking:
- **Medical guidance** and health information
- **Legal support** and rights awareness
- **Mental wellness** and emotional support

## 🔮 Future Enhancements

### Authentication
- Real Google OAuth integration
- User profiles and preferences
- Session management

### AI Integration
- Connect to actual AI services (OpenAI, Anthropic, etc.)
- Specialized training for medical, legal, and wellness domains
- Conversation history and context management

### Community Features
- Real-time messaging
- User-generated content moderation
- Expert verification system
- Privacy-focused design

### Advanced Features
- Multi-language support
- Voice chat capabilities
- Resource library and educational content
- Integration with healthcare providers

## 📝 Development Notes

- **Mock Implementation**: Currently uses mock data and responses for demonstration
- **Responsive Design**: Tested on desktop, tablet, and mobile viewports
- **Accessibility**: Built with semantic HTML and proper ARIA labels
- **Performance**: Optimized with Next.js best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lucide** for the comprehensive icon set
- **Tailwind CSS** for the utility-first CSS framework
- **Next.js** for the excellent React framework