import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/layout/Navigation'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nexus Vita - Унифицированная экосистема здоровья',
  description: 'Экосистема здоровья, построенная вокруг концепции Витрувианского человека',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} parchment-bg`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

