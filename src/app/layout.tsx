import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChatProvider } from "@/contexts/ChatContext";
import { SidebarProvider } from "@/contexts/SidebarContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoddessGPT - AI Assistant for Women's Wellness",
  description: "Your trusted AI companion for healthcare, legal guidance, and mental wellness support. Empowering women with intelligent solutions tailored to their needs.",
  keywords: ["AI assistant", "women's health", "mental wellness", "legal guidance", "healthcare support"],
  authors: [{ name: "GoddessGPT" }],
  openGraph: {
    title: "GoddessGPT - AI Assistant for Women's Wellness",
    description: "Your trusted AI companion for healthcare, legal guidance, and mental wellness support.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <AuthProvider>
          <ChatProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ChatProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

