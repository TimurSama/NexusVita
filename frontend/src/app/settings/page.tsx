'use client'

import Header from '@/components/layout/Header'
import { useTheme } from '@/components/theme/ThemeProvider'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { themes, currentTheme, setTheme } = useTheme()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Настройки</h1>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Профиль */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card card-sketch"
          >
            <h2 className="text-2xl font-bold mb-4">Профиль</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Имя</label>
                <input
                  type="text"
                  defaultValue={user?.firstName}
                  className="w-full px-4 py-2 border border-ink-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-4 py-2 border border-ink-300 rounded-lg"
                />
              </div>
              <button className="button-primary">Сохранить изменения</button>
            </div>
          </motion.div>

          {/* Тема оформления */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card card-sketch"
          >
            <h2 className="text-2xl font-bold mb-4">Тема оформления</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setTheme(theme.slug)}
                  className={`p-4 border-2 rounded-lg text-left transition ${
                    currentTheme?.id === theme.id
                      ? 'border-accent-turquoise bg-accent-turquoise bg-opacity-10'
                      : 'border-ink-200 hover:border-ink-300'
                  }`}
                >
                  <div className="font-bold mb-1">{theme.name}</div>
                  <div className="text-sm text-ink-600">{theme.description || ''}</div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Уведомления */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card card-sketch"
          >
            <h2 className="text-2xl font-bold mb-4">Уведомления</h2>
            <div className="space-y-3">
              {[
                { label: 'Уведомления о тренировках', enabled: true },
                { label: 'Новые сообщения', enabled: true },
                { label: 'Получение токенов', enabled: true },
                { label: 'Новые челленджи', enabled: false },
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{setting.label}</span>
                  <input
                    type="checkbox"
                    defaultChecked={setting.enabled}
                    className="w-5 h-5"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

