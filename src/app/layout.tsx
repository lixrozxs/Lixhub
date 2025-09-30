import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anime Community - Your Hub for Anime Discussions",
  description: "Join our vibrant anime community! Discover new series, discuss episodes, share fan art, and connect with anime fans worldwide. Enhanced moderation for quality discussions.",
  keywords: ["anime", "community", "discussions", "fan art", "watchlist", "moderation", "forum"],
  authors: [{ name: "Anime Community Team" }],
  openGraph: {
    title: "Anime Community",
    description: "Your hub for anime discussions, discoveries, and community interactions",
    url: "https://github.com/lixrozxs/Lixhub",
    siteName: "Anime Community",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anime Community",
    description: "Join our vibrant anime community with enhanced moderation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
