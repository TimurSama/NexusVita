'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, Database, Users, Activity, Wallet, Network } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { cn } from '@/lib/utils/cn'

type LevelId =
  | 'user'
  | 'data'
  | 'tools'
  | 'social'
  | 'professional'
  | 'economic'

const levels: {
  id: LevelId
  label: string
  icon: React.ReactNode
  color: string
  description: string
  bullets: string[]
}[] = [
  {
    id: 'user',
    label: 'Пользовательский уровень',
    icon: <Users className="w-4 h-4" />,
    color: 'warmBlue',
    description: 'Центральный субъект экосистемы.',
    bullets: [
      'Личный профиль пользователя.',
      'Данные о здоровье и образе жизни.',
      'Цели, планы, ограничения.',
      'История действий и результатов.',
    ],
  },
  {
    id: 'data',
    label: 'Уровень данных',
    icon: <Database className="w-4 h-4" />,
    color: 'warmGreen',
    description: 'Единое хранилище и контекст данных.',
    bullets: [
      'Ручные вводы и дневники.',
      'Данные трекеров и интеграций.',
      'Результаты программ и активностей.',
      'Обратная связь и динамика.',
    ],
  },
  {
    id: 'tools',
    label: 'Инструменты и функции',
    icon: <Activity className="w-4 h-4" />,
    color: 'warmOrange',
    description: 'Инструменты поверх общих данных.',
    bullets: [
      'Рекомендации и аналитика.',
      'Планировщик целей и задач.',
      'Календарь активности и восстановления.',
      'Дневники и журналы состояния.',
    ],
  },
  {
    id: 'social',
    label: 'Социальный уровень',
    icon: <Network className="w-4 h-4" />,
    color: 'warmPurple',
    description: 'Связи между пользователями.',
    bullets: [
      'Группы и сообщества.',
      'Совместные программы и челленджи.',
      'Обмен опытом и поддержкой.',
      'Социальные механизмы вовлечённости.',
    ],
  },
  {
    id: 'professional',
    label: 'Профессиональный уровень',
    icon: <Layers className="w-4 h-4" />,
    color: 'warmRed',
    description: 'Работа специалистов в общем контексте.',
    bullets: [
      'Кабинеты тренеров, коучей, врачей.',
      'Инструменты работы с клиентами.',
      'Программы и рекомендации.',
      'Управление расписаниями и оплатами.',
    ],
  },
  {
    id: 'economic',
    label: 'Экономический уровень',
    icon: <Wallet className="w-4 h-4" />,
    color: 'warmYellow',
    description: 'Механизмы устойчивости и мотивации.',
    bullets: [
      'Подписки и платные функции.',
      'Оплата услуг специалистов.',
      'Партнёрские и реферальные механизмы.',
      'Экосистемные вознаграждения и токены.',
    ],
  },
]

export default function ArchitectureSection() {
  const [activeLevel, setActiveLevel] = useState<LevelId>('user')

  const current = levels.find((l) => l.id === activeLevel) ?? levels[0]

  return (
    <section
      id="architecture"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Архитектура экосистемы NexusVita
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            Многоуровневая модель: пользовательский, данные, инструменты, социальный,
            профессиональный и экономический уровни в едином контуре взаимодействия.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1.8fr] gap-4 sm:gap-6">
          {/* Линейка уровней (слева) */}
          <NeumorphicCard className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-warmBlue-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                Уровни экосистемы
              </h3>
            </div>
            <div className="space-y-2">
              {levels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setActiveLevel(level.id)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border text-xs sm:text-sm mb-1 transition-all',
                    activeLevel === level.id
                      ? 'bg-warmBlue-500 text-white border-warmBlue-500 shadow-sm'
                      : 'bg-warmBeige-50 text-warmGraphite-700 border-warmGray-300 hover:border-warmBlue-400'
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        'inline-flex items-center justify-center w-6 h-6 rounded-full',
                        'bg-warmGraphite-800/5 text-warmGraphite-800'
                      )}
                    >
                      {level.icon}
                    </span>
                    <span>{level.label}</span>
                  </span>
                </button>
              ))}
            </div>
          </NeumorphicCard>

          {/* Детальный просмотр уровня + взаимодействия */}
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2">
              {current.label}
            </h3>
            <p className="text-sm sm:text-base text-warmGraphite-700 mb-3">
              {current.description}
            </p>
            <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700 mb-4">
              {current.bullets.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-warmGraphite-700">
              <div className="p-3 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
                <h4 className="font-semibold text-warmGraphite-800 mb-1">
                  Входящие связи
                </h4>
                <p>
                  Данные и сигналы, которые этот уровень получает из других уровней
                  (например, данные пользователя → инструменты → планы).
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-warmBeige-50 border border-warmGray-200">
                <h4 className="font-semibold text-warmGraphite-800 mb-1">
                  Исходящие связи
                </h4>
                <p>
                  Результаты и события, которые уровень отдаёт наверх и вниз (планы →
                  действия → результаты → корректировки).
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-warmGraphite-500">
              Принципы архитектуры: модульность, масштабируемость, повторное
              использование данных, прозрачность взаимодействий и расширяемость
              экосистемы.
            </p>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}

