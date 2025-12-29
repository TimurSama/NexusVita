'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';

interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly';
  targetCount: number;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  history: boolean[]; // Last 7 days
}

const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Утренняя зарядка',
    icon: '🏃',
    color: 'from-orange-500 to-red-500',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 12,
    longestStreak: 21,
    completedToday: true,
    history: [true, true, true, true, false, true, true],
  },
  {
    id: '2',
    name: 'Медитация',
    icon: '🧘',
    color: 'from-purple-500 to-violet-500',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 5,
    longestStreak: 14,
    completedToday: false,
    history: [true, false, true, true, true, true, false],
  },
  {
    id: '3',
    name: 'Чтение 30 минут',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 3,
    longestStreak: 30,
    completedToday: true,
    history: [true, true, true, false, false, true, true],
  },
  {
    id: '4',
    name: '8 стаканов воды',
    icon: '💧',
    color: 'from-cyan-500 to-teal-500',
    frequency: 'daily',
    targetCount: 8,
    currentStreak: 7,
    longestStreak: 7,
    completedToday: false,
    history: [true, true, true, true, true, true, true],
  },
  {
    id: '5',
    name: 'Без социальных сетей до 12:00',
    icon: '📵',
    color: 'from-pink-500 to-rose-500',
    frequency: 'daily',
    targetCount: 1,
    currentStreak: 2,
    longestStreak: 5,
    completedToday: true,
    history: [true, true, false, false, true, false, true],
  },
];

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function HabitsPage() {
  const [habits, setHabits] = useState(mockHabits);
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === habitId 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            currentStreak: !habit.completedToday ? habit.currentStreak + 1 : habit.currentStreak - 1
          } 
        : habit
    ));
  };

  const totalCompleted = habits.filter(h => h.completedToday).length;
  const completionRate = Math.round((totalCompleted / habits.length) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Привычки & Рутины 📊</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Формируйте полезные привычки каждый день
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <span>➕</span>
          <span>Добавить привычку</span>
        </Button>
      </div>

      {/* Today's Progress */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="relative">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#progress-gradient)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${completionRate * 2.83} 283`}
                    className="transition-all duration-500"
                  />
                  <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{completionRate}%</span>
                  <span className="text-xs text-[var(--text-tertiary)]">выполнено</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Сегодняшний прогресс</h3>
              <p className="text-[var(--text-secondary)] mb-4">
                Выполнено {totalCompleted} из {habits.length} привычек
              </p>
              <div className="flex flex-wrap gap-2">
                {habits.map(habit => (
                  <div
                    key={habit.id}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                      habit.completedToday
                        ? 'bg-gradient-to-br ' + habit.color + ' shadow-lg'
                        : 'bg-[var(--bg-tertiary)] opacity-50'
                    }`}
                  >
                    {habit.icon}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-violet-400">
                  {Math.max(...habits.map(h => h.currentStreak))}
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">Лучшая серия</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">{totalCompleted}</div>
                <div className="text-xs text-[var(--text-tertiary)]">Сегодня</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(habits.reduce((sum, h) => sum + (h.history.filter(Boolean).length / 7) * 100, 0) / habits.length)}%
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">За неделю</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <div className="space-y-4">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className={`transition-all ${habit.completedToday ? 'ring-2 ring-green-500/30' : ''}`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all ${
                  habit.completedToday
                    ? 'bg-gradient-to-br ' + habit.color + ' shadow-lg scale-105'
                    : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {habit.completedToday ? '✅' : habit.icon}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${habit.completedToday ? 'line-through text-[var(--text-tertiary)]' : ''}`}>
                    {habit.name}
                  </h3>
                  {habit.currentStreak >= 7 && (
                    <Badge variant="warning" size="sm">🔥 {habit.currentStreak}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm text-[var(--text-secondary)]">
                    Серия: {habit.currentStreak} дн.
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)]">
                    Рекорд: {habit.longestStreak} дн.
                  </span>
                </div>
              </div>

              {/* Week History */}
              <div className="hidden sm:flex items-center gap-1">
                {habit.history.map((completed, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded flex items-center justify-center text-xs ${
                      completed
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
                    }`}
                    title={weekDays[index]}
                  >
                    {completed ? '✓' : '−'}
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleHabit(habit.id)}
              >
                {habit.completedToday ? 'Отменить' : 'Выполнить'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Suggested Habits */}
      <Card>
        <CardHeader>
          <CardTitle>Рекомендуемые привычки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🌅', name: 'Ранний подъём', benefit: 'Продуктивность +30%' },
              { icon: '🧊', name: 'Холодный душ', benefit: 'Энергия и иммунитет' },
              { icon: '📝', name: 'Ведение дневника', benefit: 'Ментальное здоровье' },
              { icon: '🚶', name: '10,000 шагов', benefit: 'Сердечно-сосудистая' },
              { icon: '🥗', name: 'Здоровый завтрак', benefit: 'Метаболизм' },
              { icon: '😴', name: 'Сон до 23:00', benefit: 'Восстановление' },
            ].map((suggestion) => (
              <button
                key={suggestion.name}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors text-left group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {suggestion.icon}
                </span>
                <div>
                  <div className="font-medium">{suggestion.name}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{suggestion.benefit}</div>
                </div>
                <span className="ml-auto text-[var(--text-muted)] group-hover:text-violet-400 transition-colors">
                  +
                </span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gamification */}
      <Card>
        <CardHeader>
          <CardTitle>Достижения за привычки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '🌟', name: 'Первый шаг', desc: 'Создайте первую привычку', unlocked: true },
              { icon: '🔥', name: 'В огне', desc: '7 дней серии', unlocked: true },
              { icon: '💎', name: 'Непоколебимый', desc: '30 дней серии', unlocked: false },
              { icon: '👑', name: 'Мастер привычек', desc: '100 дней серии', unlocked: false },
            ].map((achievement) => (
              <div
                key={achievement.name}
                className={`p-4 rounded-xl text-center ${
                  achievement.unlocked
                    ? 'bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30'
                    : 'bg-[var(--bg-tertiary)] opacity-50'
                }`}
              >
                <span className="text-3xl block mb-2">{achievement.icon}</span>
                <div className="font-medium text-sm">{achievement.name}</div>
                <div className="text-xs text-[var(--text-tertiary)]">{achievement.desc}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



