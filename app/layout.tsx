import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "700"], // adjust weights as needed
});

export const metadata: Metadata = {
  title: {
    default: "Bistro Retro",
    template: "%s | Bistro Retro",
  },
  description: "Bistro Retro – A modern bistro experience. Explore our menu, make reservations, and enjoy delicious food in a cozy atmosphere.",
  keywords: [
    "Bistro",
    "Restaurant",
    "Food",
    "Menu",
    "Reservations",
    "Dining",
    "Cozy",
    "Modern",
    "Bistro Retro",
  ],
  authors: [{ name: "Bistro Retro Team", url: "https://bistro-retro.example.com" }],
  openGraph: {
    title: "Bistro Retro",
    description: "Discover Bistro Retro – your destination for great food and a welcoming atmosphere.",
    url: "https://bistro-retro.example.com",
    siteName: "Bistro Retro",
    images: [
      {
        url: "https://bistro-retro.example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bistro Retro restaurant interior",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bistro Retro",
    description: "A modern bistro experience. Explore our menu and make reservations.",
    images: ["https://bistro-retro.example.com/og-image.jpg"],
    creator: "@bistroretro",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
