import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { Toaster } from "@/components/ui/sonner";

// Modern, clean sans-serif font for most content
const outfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Elegant serif font for accents and headings
const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

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
        className={`${outfitFont.variable} ${playfairFont.variable} antialiased font-sans`}
      >
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
