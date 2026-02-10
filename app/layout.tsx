import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import { I18nProvider } from '@/lib/i18n/I18nProvider'
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
      <body className={inter.className}>
        <I18nProvider>
          <Header />
          <main className="min-h-screen relative z-10">{children}</main>
        </I18nProvider>
      </body>
    </html>
  )
}
