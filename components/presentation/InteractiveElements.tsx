'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Calendar, 
  TrendingUp, 
  Activity,
  Apple,
  Brain,
  Clock,
  CheckCircle,
  X,
  Plus
} from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'

interface InteractiveElementProps {
  type: 'goal' | 'metric' | 'plan' | 'calendar'
  onComplete?: () => void
}

export function InteractiveGoal({ onComplete }: { onComplete?: () => void }) {
  const [goal, setGoal] = useState({ title: '', category: 'Здоровье', deadline: '' })
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = () => {
    if (goal.title && goal.deadline) {
      onComplete?.()
      setShowForm(false)
      setGoal({ title: '', category: 'Здоровье', deadline: '' })
    }
  }

  return (
    <NeumorphicCard className="p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-warmBlue-500" />
        <h3 className="text-lg font-semibold text-warmGraphite-800">Создайте свою первую цель</h3>
      </div>
      <AnimatePresence>
        {showForm ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <NeumorphicInput
              placeholder="Например: Снизить вес на 5 кг"
              value={goal.title}
              onChange={(e) => setGoal({ ...goal, title: e.target.value })}
            />
            <select
              value={goal.category}
              onChange={(e) => setGoal({ ...goal, category: e.target.value })}
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
              value={goal.deadline}
              onChange={(e) => setGoal({ ...goal, deadline: e.target.value })}
            />
            <div className="flex gap-2">
              <NeumorphicButton primary onClick={handleSubmit} className="flex-1">
                Создать цель
              </NeumorphicButton>
              <NeumorphicButton onClick={() => setShowForm(false)}>
                <X className="w-4 h-4" />
              </NeumorphicButton>
            </div>
          </motion.div>
        ) : (
          <NeumorphicButton onClick={() => setShowForm(true)} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Добавить цель
          </NeumorphicButton>
        )}
      </AnimatePresence>
    </NeumorphicCard>
  )
}

export function InteractiveMetric({ metric, onUpdate }: { metric: { label: string; value: number; target: number; icon: React.ReactNode; color: string }, onUpdate?: (value: number) => void }) {
  const [value, setValue] = useState(metric.value)

  const handleClick = () => {
    const newValue = Math.min(value + (metric.target * 0.1), metric.target)
    setValue(newValue)
    onUpdate?.(newValue)
  }

  return (
    <NeumorphicCard 
      className={cn("p-4 cursor-pointer hover:scale-105 transition-transform", `border-2 border-${metric.color}-200`)}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`text-${metric.color}-500`}>
          {metric.icon}
        </div>
        <span className="text-sm text-warmGraphite-600">{metric.label}</span>
      </div>
      <div className="text-2xl font-bold text-warmGraphite-800 mb-1">
        {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}
        {metric.label === 'Сон' && 'ч'}
        {metric.label === 'Калории' && ' ккал'}
        {metric.label === 'Шаги' && ''}
      </div>
      <div className="text-xs text-warmGraphite-500 mb-2">
        из {metric.target}{metric.label === 'Сон' && 'ч'}{metric.label === 'Калории' && ' ккал'}
      </div>
      <NeumorphicProgress 
        value={(value / metric.target) * 100} 
        className="h-2"
      />
      <p className="text-xs text-warmGraphite-500 mt-2">Кликните для обновления</p>
    </NeumorphicCard>
  )
}

export function InteractivePlan({ onComplete }: { onComplete?: () => void }) {
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [planType, setPlanType] = useState<'training' | 'nutrition' | 'recovery' | null>(null)

  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <NeumorphicCard className="p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-warmGraphite-800 mb-4">Создайте план на неделю</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-warmGraphite-600 mb-2">Выберите тип плана:</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'training', label: 'Тренировки', icon: <Activity className="w-4 h-4" /> },
              { id: 'nutrition', label: 'Питание', icon: <Apple className="w-4 h-4" /> },
              { id: 'recovery', label: 'Восстановление', icon: <Clock className="w-4 h-4" /> },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setPlanType(type.id as any)}
                className={cn(
                  'p-3 rounded-2xl border-2 transition-all',
                  planType === type.id
                    ? 'border-warmBlue-500 bg-warmBlue-50'
                    : 'border-warmGray-300 bg-warmBeige-50 hover:border-warmGray-400'
                )}
              >
                <div className="text-warmBlue-500 mb-1 flex justify-center">{type.icon}</div>
                <span className="text-xs text-warmGraphite-700">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {planType && (
          <div>
            <p className="text-sm text-warmGraphite-600 mb-2">Выберите дни:</p>
            <div className="flex gap-2 flex-wrap">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={cn(
                    'w-10 h-10 rounded-xl border-2 transition-all text-sm font-medium',
                    selectedDays.includes(day)
                      ? 'border-warmBlue-500 bg-warmBlue-500 text-white'
                      : 'border-warmGray-300 bg-warmBeige-50 text-warmGraphite-700 hover:border-warmGray-400'
                  )}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDays.length > 0 && planType && (
          <NeumorphicButton primary onClick={onComplete} className="w-full">
            <CheckCircle className="w-4 h-4 mr-2" />
            Создать план ({selectedDays.length} дней)
          </NeumorphicButton>
        )}
      </div>
    </NeumorphicCard>
  )
}
