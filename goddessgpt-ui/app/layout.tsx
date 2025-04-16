import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "GoddessGPT - Supportive AI for Women's Wellbeing",
  description: "GoddessGPT is a compassionate AI companion designed specifically for women's emotional, physical, social, and mental health support.",
  keywords: ["AI chatbot", "women's health", "emotional support", "mental health", "wellbeing"],
  authors: [{ name: "GoddessGPT Team" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
