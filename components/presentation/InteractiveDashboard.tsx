'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Target, 
  BookOpen, 
  TrendingUp, 
  Activity, 
  Apple, 
  Brain,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  X,
  ChevronRight,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

interface InteractiveDashboardProps {
  onGoalAdd?: () => void
  onJournalEntry?: () => void
  onPlanCreate?: () => void
}

export default function InteractiveDashboard({ 
  onGoalAdd, 
  onJournalEntry, 
  onPlanCreate 
}: InteractiveDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [goals, setGoals] = useState([
    { id: '1', title: 'Снизить вес на 5 кг', progress: 60, deadline: '2025-03-15', category: 'Здоровье' },
    { id: '2', title: 'Тренироваться 3 раза в неделю', progress: 80, deadline: '2025-02-28', category: 'Спорт' },
    { id: '3', title: 'Спать 8 часов ежедневно', progress: 45, deadline: '2025-03-01', category: 'Сон' },
  ])
  const [journalEntries, setJournalEntries] = useState([
    { id: '1', date: '2025-02-10', mood: 'Хорошо', energy: 7, notes: 'Отличная тренировка, чувствую себя энергично' },
    { id: '2', date: '2025-02-09', mood: 'Отлично', energy: 8, notes: 'Хороший сон, продуктивный день' },
  ])
  const [metrics, setMetrics] = useState({
    steps: 8240,
    stepsTarget: 10000,
    calories: 1850,
    caloriesTarget: 2000,
    sleep: 7.5,
    sleepTarget: 8,
    water: 1.5,
    waterTarget: 2,
    workouts: 3,
    workoutsTarget: 4,
  })
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [showJournalForm, setShowJournalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', category: 'Здоровье', deadline: '' })
  const [newJournal, setNewJournal] = useState({ mood: 'Хорошо', energy: 5, notes: '' })

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      setGoals([...goals, { 
        id: Date.now().toString(), 
        ...newGoal, 
        progress: 0 
      }])
      setNewGoal({ title: '', category: 'Здоровье', deadline: '' })
      setShowGoalForm(false)
      onGoalAdd?.()
    }
  }

  const handleAddJournal = () => {
    if (newJournal.notes) {
      setJournalEntries([{
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        ...newJournal
      }, ...journalEntries])
      setNewJournal({ mood: 'Хорошо', energy: 5, notes: '' })
      setShowJournalForm(false)
      onJournalEntry?.()
    }
  }

  const handleUpdateMetric = (key: string, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-warmGraphite-800">
            Персональный дашборд здоровья
          </h2>
          <p className="text-sm sm:text-base text-warmGraphite-600 mt-1">
            Управляйте здоровьем, целями и планами в одном месте
          </p>
        </div>
        <NeumorphicBadge className="bg-warmBlue-500 text-white">
          Премиум
        </NeumorphicBadge>
      </div>

      {/* Метрики здоровья */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <NeumorphicCard className="p-3 sm:p-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleUpdateMetric('steps', metrics.steps + 100)}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-warmBlue-500" />
            <span className="text-xs sm:text-sm text-warmGraphite-600">Шаги</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
            {metrics.steps.toLocaleString()}
          </div>
          <div className="text-xs text-warmGraphite-500 mt-1">
            из {metrics.stepsTarget.toLocaleString()}
          </div>
          <NeumorphicProgress 
            value={(metrics.steps / metrics.stepsTarget) * 100} 
            className="mt-2 h-1.5 sm:h-2"
          />
        </NeumorphicCard>

        <NeumorphicCard className="p-3 sm:p-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleUpdateMetric('calories', metrics.calories + 50)}>
          <div className="flex items-center gap-2 mb-2">
            <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-warmGreen-500" />
            <span className="text-xs sm:text-sm text-warmGraphite-600">Калории</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
            {metrics.calories}
          </div>
          <div className="text-xs text-warmGraphite-500 mt-1">
            из {metrics.caloriesTarget}
          </div>
          <NeumorphicProgress 
            value={(metrics.calories / metrics.caloriesTarget) * 100} 
            className="mt-2 h-1.5 sm:h-2"
          />
        </NeumorphicCard>

        <NeumorphicCard className="p-3 sm:p-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleUpdateMetric('sleep', metrics.sleep + 0.5)}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-warmPurple-500" />
            <span className="text-xs sm:text-sm text-warmGraphite-600">Сон</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
            {metrics.sleep}ч
          </div>
          <div className="text-xs text-warmGraphite-500 mt-1">
            цель {metrics.sleepTarget}ч
          </div>
          <NeumorphicProgress 
            value={(metrics.sleep / metrics.sleepTarget) * 100} 
            className="mt-2 h-1.5 sm:h-2"
          />
        </NeumorphicCard>

        <NeumorphicCard className="p-3 sm:p-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => handleUpdateMetric('workouts', metrics.workouts + 1)}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-warmOrange-500" />
            <span className="text-xs sm:text-sm text-warmGraphite-600">Тренировки</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-warmGraphite-800">
            {metrics.workouts}
          </div>
          <div className="text-xs text-warmGraphite-500 mt-1">
            из {metrics.workoutsTarget} в неделю
          </div>
          <NeumorphicProgress 
            value={(metrics.workouts / metrics.workoutsTarget) * 100} 
            className="mt-2 h-1.5 sm:h-2"
          />
        </NeumorphicCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Цели */}
        <NeumorphicCard className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-warmBlue-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">Мои цели</h3>
            </div>
            <NeumorphicButton
              onClick={() => setShowGoalForm(!showGoalForm)}
              className="p-2"
            >
              <Plus className="w-4 h-4" />
            </NeumorphicButton>
          </div>

          <AnimatePresence>
            {showGoalForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-3"
              >
                <NeumorphicInput
                  placeholder="Название цели"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  className="w-full px-4 py-2 rounded-2xl border border-warmGray-300 bg-warmBeige-50 text-warmGraphite-800"
                >
                  <option>Здоровье</option>
                  <option>Спорт</option>
                  <option>Питание</option>
                  <option>Сон</option>
                  <option>Психика</option>
                </select>
                <NeumorphicInput
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
                <NeumorphicButton primary onClick={handleAddGoal} className="w-full">
                  Добавить цель
                </NeumorphicButton>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3">
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-2xl bg-warmBeige-50/50 border border-warmGray-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-1">
                      {goal.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-warmGraphite-600">
                      <span>{goal.category}</span>
                      <span>•</span>
                      <span>До {new Date(goal.deadline).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>
                  <NeumorphicBadge className="bg-warmBlue-500 text-white text-xs">
                    {goal.progress}%
                  </NeumorphicBadge>
                </div>
                <NeumorphicProgress value={goal.progress} className="h-2" />
              </motion.div>
            ))}
          </div>
        </NeumorphicCard>

        {/* Ежедневник */}
        <NeumorphicCard className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-warmGreen-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">Ежедневник</h3>
            </div>
            <NeumorphicButton
              onClick={() => setShowJournalForm(!showJournalForm)}
              className="p-2"
            >
              <Plus className="w-4 h-4" />
            </NeumorphicButton>
          </div>

          <AnimatePresence>
            {showJournalForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 space-y-3"
              >
                <div className="flex gap-2">
                  <select
                    value={newJournal.mood}
                    onChange={(e) => setNewJournal({ ...newJournal, mood: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-2xl border border-warmGray-300 bg-warmBeige-50 text-warmGraphite-800 text-sm"
                  >
                    <option>Отлично</option>
                    <option>Хорошо</option>
                    <option>Нормально</option>
                    <option>Плохо</option>
                    <option>Очень плохо</option>
                  </select>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newJournal.energy}
                    onChange={(e) => setNewJournal({ ...newJournal, energy: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="text-sm text-warmGraphite-600 w-8">{newJournal.energy}</span>
                </div>
                <NeumorphicInput
                  placeholder="Заметки о дне..."
                  value={newJournal.notes}
                  onChange={(e) => setNewJournal({ ...newJournal, notes: e.target.value })}
                />
                <NeumorphicButton primary onClick={handleAddJournal} className="w-full">
                  Добавить запись
                </NeumorphicButton>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3 max-h-64 overflow-y-auto">
            {journalEntries.map((entry) => (
              <motion.div
                key={entry.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-2xl bg-warmBeige-50/50 border border-warmGray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-warmGraphite-600">
                    {new Date(entry.date).toLocaleDateString('ru-RU')}
                  </span>
                  <div className="flex items-center gap-2">
                    <NeumorphicBadge className="bg-warmGreen-500 text-white text-xs">
                      {entry.mood}
                    </NeumorphicBadge>
                    <NeumorphicBadge className="bg-warmBlue-500 text-white text-xs">
                      Энергия: {entry.energy}/10
                    </NeumorphicBadge>
                  </div>
                </div>
                <p className="text-sm text-warmGraphite-700">{entry.notes}</p>
              </motion.div>
            ))}
          </div>
        </NeumorphicCard>
      </div>

      {/* Календарь и планы */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <NeumorphicCard className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-warmPurple-500" />
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">Календарь</h3>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-semibold text-warmGraphite-600">
                {day}
              </div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => {
              const day = i + 1
              const isToday = day === selectedDate.getDate()
              const hasEvent = [5, 12, 18, 25].includes(day)
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(new Date(2025, 1, day))}
                  className={cn(
                    'aspect-square rounded-xl text-xs sm:text-sm font-medium transition-all',
                    isToday
                      ? 'bg-warmBlue-500 text-white'
                      : hasEvent
                      ? 'bg-warmGreen-100 text-warmGraphite-800 border-2 border-warmGreen-500'
                      : 'bg-warmBeige-50 text-warmGraphite-700 hover:bg-warmGray-100'
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-warmGraphite-700">
              <div className="w-3 h-3 rounded-full bg-warmBlue-500"></div>
              <span>Тренировка - 10:00</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-warmGraphite-700">
              <div className="w-3 h-3 rounded-full bg-warmGreen-500"></div>
              <span>Консультация с тренером - 15:00</span>
            </div>
          </div>
        </NeumorphicCard>

        <NeumorphicCard className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-warmOrange-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">Планы и рекомендации</h3>
            </div>
            <NeumorphicButton onClick={onPlanCreate} className="text-xs sm:text-sm">
              Создать план
            </NeumorphicButton>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-warmBlue-50 border border-warmBlue-200">
              <div className="flex items-start gap-2 mb-2">
                <Brain className="w-4 h-4 text-warmBlue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-warmGraphite-800 mb-1">
                    Рекомендация ИИ
                  </h4>
                  <p className="text-xs text-warmGraphite-700">
                    На основе ваших данных рекомендую увеличить потребление воды до 2.5л в день
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-warmGreen-50 border border-warmGreen-200">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-warmGreen-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-warmGraphite-800 mb-1">
                    План на неделю
                  </h4>
                  <p className="text-xs text-warmGraphite-700">
                    • 3 силовые тренировки<br />
                    • 2 кардио сессии<br />
                    • Ежедневные прогулки 30 мин
                  </p>
                </div>
              </div>
            </div>
          </div>
        </NeumorphicCard>
      </div>
    </div>
  )
}
