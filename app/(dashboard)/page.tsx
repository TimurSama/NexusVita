'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Clock, MessageCircle, Bell, TrendingUp, Target, Calendar, CheckCircle, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import MetricLabel from '@/components/dashboard/MetricLabel'
import { DashboardMetric } from '@/types'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import TodayWidget from '@/components/dashboard/TodayWidget'
import WeekWidget from '@/components/dashboard/WeekWidget'
import ProgressWidget from '@/components/dashboard/ProgressWidget'
import { cn } from '@/lib/utils/cn'

// Моковые данные
const mockMetrics: DashboardMetric[] = [
  {
    id: 'health',
    label: 'Здоровье',
    value: 'Сон 7ч 10м',
    unit: 'пульс 62',
    link: '/medical-card',
    position: { x: 50, y: 20 },
  },
  {
    id: 'sport',
    label: 'Спорт',
    value: 'Тренировка',
    unit: 'силовая 40м',
    link: '/training',
    position: { x: 15, y: 50 },
  },
  {
    id: 'nutrition',
    label: 'Питание',
    value: '1,840',
    unit: 'ккал на день',
    link: '/nutrition',
    position: { x: 85, y: 50 },
  },
  {
    id: 'psyche',
    label: 'Психика',
    value: 'Стресс',
    unit: 'умеренный',
    link: '/journal',
    position: { x: 50, y: 80 },
  },
  {
    id: 'social',
    label: 'Социальное',
    value: 'Группы',
    unit: '2 занятия',
    link: '/social',
    position: { x: 50, y: 5 },
  },
]

const reminders = [
  { id: '1', time: 'через 1 час', title: 'Тренировка', desc: 'Силовая тренировка в 18:00', action: 'Не забыть поесть и выпить предтрен' },
  { id: '2', time: 'через 2 часа', title: 'Прием пищи', desc: 'Ужин с высоким содержанием белка' },
  { id: '3', time: 'завтра 09:00', title: 'Йога', desc: 'Групповое занятие' },
]

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [aiMessages, setAiMessages] = useState<Array<{ role: 'user' | 'ai'; content: string; timestamp: Date }>>([])
  const [aiInput, setAiInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)

  useEffect(() => {
    setMetrics(mockMetrics)
    // Приветственное сообщение от AI
    setAiMessages([
      {
        role: 'ai',
        content: 'Привет! Я ваш персональный AI-ассистент. Как дела? Могу помочь с планами, ответить на вопросы или обновить статус.',
        timestamp: new Date(),
      },
    ])
  }, [])

  const handleAiSend = async () => {
    if (!aiInput.trim()) return

    const userMessage = {
      role: 'user' as const,
      content: aiInput,
      timestamp: new Date(),
    }
    setAiMessages((prev) => [...prev, userMessage])
    setAiInput('')
    setIsAiTyping(true)

    // Имитация ответа AI
    setTimeout(() => {
      const aiResponse = {
        role: 'ai' as const,
        content: 'Понял! Обновил ваш статус. Рекомендую сегодня легкую тренировку и ранний отход ко сну.',
        timestamp: new Date(),
      }
      setAiMessages((prev) => [...prev, aiResponse])
      setIsAiTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Заголовок */}
        <header className="text-center animate-fadeIn">
          <NeumorphicBadge variant="info" className="mb-4">
            ✦ Личный хаб здоровья
          </NeumorphicBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-warmGraphite-800 mt-4 mb-3">
            Витрувианский профиль
          </h1>
          <p className="text-lg sm:text-xl text-warmGraphite-600">
            Визуализация метрик, целей и сервисов экосистемы
          </p>
        </header>

        {/* Центральная область с Витрувианским человеком и секторами */}
        <NeumorphicCard className="relative flex items-center justify-center min-h-[500px] sm:min-h-[640px] p-8 sm:p-12 animate-scaleIn">
          <div className="absolute inset-10 border-2 border-dashed border-warmGray-300/50 rounded-full opacity-50" />
          <div className="absolute inset-24 border border-warmGray-300/30 rounded-full opacity-30" />

          {/* Витрувианский человек */}
          <div className="relative z-10">
            <VitruvianMan width={400} height={400} className="sm:w-[500px] sm:h-[500px]" />
          </div>

          {/* Интерактивные метки секторов */}
          {metrics.map((metric, index) => (
            <MetricLabel
              key={metric.id}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              link={metric.link}
              position={metric.position}
              delay={index * 0.1}
            />
          ))}
        </NeumorphicCard>

        {/* Секторы здоровья с метриками */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            { id: 'health', title: 'Здоровье', metric: 'Пульс 62', submetric: 'Сон 7ч 10м', link: '/medical-card', color: 'warmBlue' },
            { id: 'sport', title: 'Спорт', metric: 'Силовая 40м', submetric: 'Растяжка 10м', link: '/training', color: 'warmRed' },
            { id: 'nutrition', title: 'Питание', metric: '1 840 ккал', submetric: 'из 2 100', link: '/nutrition', color: 'warmGreen' },
            { id: 'psyche', title: 'Психика', metric: 'Стресс', submetric: 'умеренный', link: '/journal', color: 'warmPink' },
            { id: 'social', title: 'Социальное', metric: '2 занятия', submetric: 'Йога, бег', link: '/social', color: 'warmBlue' },
          ].map((sector, index) => (
            <Link key={sector.id} href={sector.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NeumorphicCard className="p-4 sm:p-6 text-center cursor-pointer h-full">
                  <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-2">
                    {sector.title}
                  </h3>
                  <div className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-1">
                    {sector.metric}
                  </div>
                  <div className="text-xs sm:text-sm text-warmGray-600">{sector.submetric}</div>
                  <ArrowRight className="w-4 h-4 mx-auto mt-3 text-warmBlue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NeumorphicCard>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Напоминания ближайших действий */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-warmPink-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Ближайшие действия
            </h2>
          </div>
          <div className="space-y-3">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NeumorphicCard
                  soft
                  className="p-4 flex items-start justify-between hover:scale-[1.01] transition-transform"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-warmBlue-600" />
                      <span className="text-xs text-warmGray-600">{reminder.time}</span>
                    </div>
                    <h3 className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                      {reminder.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-warmGraphite-600 mb-1">
                      {reminder.desc}
                    </p>
                    {reminder.action && (
                      <p className="text-xs text-warmPink-600 font-medium mt-2">
                        💡 {reminder.action}
                      </p>
                    )}
                  </div>
                  <CheckCircle className="w-5 h-5 text-warmGreen-600 flex-shrink-0 ml-3" />
                </NeumorphicCard>
              </motion.div>
            ))}
          </div>
        </NeumorphicCard>

        {/* AI Чат */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-warmBlue-600" />
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              AI-ассистент
            </h2>
            <NeumorphicBadge variant="info" size="sm" className="ml-auto">
              AI Health+
            </NeumorphicBadge>
          </div>

          {/* История сообщений */}
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-2">
            <AnimatePresence>
              {aiMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <NeumorphicCard
                    soft
                    className={cn(
                      'p-3 max-w-[80%]',
                      msg.role === 'user'
                        ? 'bg-warmBlue-50/50 border border-warmBlue-200/50'
                        : 'bg-warmGray-50/50'
                    )}
                  >
                    <p className="text-sm text-warmGraphite-700">{msg.content}</p>
                    <span className="text-xs text-warmGray-500 mt-1 block">
                      {msg.timestamp.toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </NeumorphicCard>
                </motion.div>
              ))}
              {isAiTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <NeumorphicCard soft className="p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-warmBlue-600 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-warmBlue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-warmBlue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </NeumorphicCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Поле ввода */}
          <div className="flex items-center gap-3">
            <NeumorphicInput
              placeholder="Задайте вопрос или обновите статус..."
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiSend()}
              className="flex-1"
            />
            <NeumorphicButton primary onClick={handleAiSend} disabled={!aiInput.trim() || isAiTyping}>
              <MessageCircle className="w-4 h-4" />
            </NeumorphicButton>
          </div>
        </NeumorphicCard>

        {/* Виджеты дашборда */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <TodayWidget />
          <WeekWidget />
          <ProgressWidget />
        </div>

        {/* Быстрые действия и достижения */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-warmGreen-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Быстрые действия
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: 'Запись в дневник', icon: '📔', link: '/journal', color: 'warmBlue' },
                { title: 'Запись к специалисту', icon: '👨‍⚕️', link: '/specialists', color: 'warmGreen' },
                { title: 'Добавить метрику', icon: '📊', link: '/metrics/weight', color: 'warmPink' },
                { title: 'Создать цель', icon: '🎯', link: '/goals', color: 'warmOrange' },
              ].map((action, index) => (
                <Link key={index} href={action.link}>
                  <NeumorphicCard
                    soft
                    className="p-4 text-center hover:scale-105 transition-transform cursor-pointer"
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-xs sm:text-sm font-medium text-warmGraphite-800">
                      {action.title}
                    </div>
                  </NeumorphicCard>
                </Link>
              ))}
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-warmPink-600" />
              <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
                Достижения сегодня
              </h2>
            </div>
            <div className="space-y-3">
              {[
                { title: '7 часов сна', reward: '+25 NVT' },
                { title: 'Тренировка завершена', reward: '+40 NVT' },
                { title: 'План питания выполнен', reward: '+20 NVT' },
              ].map((achievement, index) => (
                <NeumorphicCard
                  key={index}
                  soft
                  className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-warmGreen-600" />
                    <span className="text-sm text-warmGraphite-800">{achievement.title}</span>
                  </div>
                  <NeumorphicBadge variant="success" size="sm">
                    {achievement.reward}
                  </NeumorphicBadge>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>
        </div>
      </div>
    </div>
  )
}
