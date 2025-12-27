import type { Metadata, Viewport } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/ToastProvider";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Nexus Vita - Децентрализованная экосистема здоровья",
    template: "%s | Nexus Vita",
  },
  description:
    "Web3 платформа для фитнеса, здоровья, психологии и образования. DAO управление, NVT токен, NFT достижения и Move-to-Earn механика.",
  keywords: [
    "fitness",
    "health",
    "wellness",
    "DAO",
    "Web3",
    "blockchain",
    "NFT",
    "move to earn",
    "health to earn",
    "фитнес",
    "здоровье",
    "психология",
    "нутрициология",
    "тренировки",
  ],
  authors: [{ name: "Nexus Vita Team" }],
  creator: "Nexus Vita",
  publisher: "Nexus Vita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://nexusvita.io"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "Nexus Vita",
    title: "Nexus Vita - Децентрализованная экосистема здоровья",
    description:
      "Web3 платформа для фитнеса, здоровья, психологии и образования. DAO управление, NVT токен, NFT достижения.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nexus Vita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Vita - Децентрализованная экосистема здоровья",
    description:
      "Web3 платформа для фитнеса, здоровья, психологии и образования.",
    images: ["/og-image.png"],
    creator: "@nexusvita",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {/* Noise overlay for texture */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {/* Main content */}
        {children}
        
        {/* Toast notifications */}
        <ToastProvider />
        
        {/* Telegram Web App Script */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </body>
    </html>
  );
}
