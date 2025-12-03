import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { DemoProvider } from '@/contexts/DemoContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nexus Vita - Экосистема здоровья и тренировок',
  description: 'Модульная экосистема для пользователей, тренеров, врачей и фитнес-клубов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        <ThemeProvider>
          <AuthProvider>
            <DemoProvider>
              {children}
            </DemoProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

