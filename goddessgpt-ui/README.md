# GoddessGPT UI

GoddessGPT is an AI chatbot specifically tailored for addressing emotional, mental, social, and physical challenges faced by women. This project provides a supportive digital companion designed with a woman-focused approach.

## Features

- 🔐 **Google Authentication**: Secure sign-in with Google (with development mode for testing)
- 💬 **Personalized Chat Interface**: Get supportive responses tailored to your needs
- 👥 **Community Support**: Share and read experiences in a safe community space 
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🚀 **Modern UI**: Beautiful interface designed with women's preferences in mind

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/goddessgpt-ui.git
cd goddessgpt-ui
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Copy the example environment file and modify as needed:

```bash
cp .env.example .env.local
```

For development, you can keep the defaults which use mock data.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Development Mode

This project includes a development mode that:

- Mocks the Google Authentication process
- Provides simulated responses in the chat interface
- Uses mock data for the community chat
- Simulates loading states and error handling

To use the real Google Authentication in production:

1. Create a Google OAuth Client ID and Secret through the [Google Cloud Console](https://console.cloud.google.com/)
2. Add the credentials to your `.env.local` file
3. Set `DEV_MODE=false` in the environment variables

## Tech Stack

- **Framework**: Next.js 15+
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **TypeScript**: For type safety

## Project Structure

- `/app`: Next.js app router
- `/components`: UI components
  - `/auth`: Authentication-related components
  - `/chat`: Chat interface components
  - `/community`: Community features
  - `/ui`: Reusable UI components from shadcn
- `/lib`: Utility functions and shared code
- `/public`: Static assets

## Deployment

The application can be deployed to Vercel or any other hosting platform that supports Next.js.

```bash
npm run build
# or
yarn build
```
