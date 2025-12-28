'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Очень плохо', color: 'from-red-500 to-rose-500' },
  { value: 2, emoji: '😟', label: 'Плохо', color: 'from-orange-500 to-red-500' },
  { value: 3, emoji: '😐', label: 'Нормально', color: 'from-yellow-500 to-orange-500' },
  { value: 4, emoji: '🙂', label: 'Хорошо', color: 'from-green-500 to-emerald-500' },
  { value: 5, emoji: '😊', label: 'Отлично', color: 'from-cyan-500 to-teal-500' },
];

const moodHistory = [
  { date: 'Сегодня', mood: 4, energy: 4, stress: 2 },
  { date: 'Вчера', mood: 3, energy: 3, stress: 4 },
  { date: '2 дня назад', mood: 5, energy: 5, stress: 1 },
  { date: '3 дня назад', mood: 4, energy: 3, stress: 3 },
  { date: '4 дня назад', mood: 2, energy: 2, stress: 5 },
  { date: '5 дней назад', mood: 3, energy: 4, stress: 3 },
  { date: '6 дней назад', mood: 4, energy: 4, stress: 2 },
];

const meditations = [
  {
    id: 1,
    title: 'Утреннее пробуждение',
    duration: 10,
    category: 'Утро',
    plays: 12500,
    isPremium: false,
  },
  {
    id: 2,
    title: 'Снятие стресса',
    duration: 15,
    category: 'Антистресс',
    plays: 8900,
    isPremium: false,
  },
  {
    id: 3,
    title: 'Глубокий сон',
    duration: 30,
    category: 'Сон',
    plays: 25000,
    isPremium: true,
  },
  {
    id: 4,
    title: 'Фокус и концентрация',
    duration: 20,
    category: 'Продуктивность',
    plays: 6700,
    isPremium: true,
  },
];

const psychologists = [
  {
    id: 1,
    name: 'Мария Козлова',
    specialization: 'Когнитивно-поведенческая терапия',
    rating: 4.9,
    reviews: 156,
    price: 3500,
    available: true,
  },
  {
    id: 2,
    name: 'Андрей Смирнов',
    specialization: 'Семейная психология',
    rating: 4.8,
    reviews: 89,
    price: 4000,
    available: true,
  },
  {
    id: 3,
    name: 'Елена Петрова',
    specialization: 'Стресс-менеджмент',
    rating: 4.7,
    reviews: 234,
    price: 2800,
    available: false,
  },
];

export default function PsychologyPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(3);
  const [stressLevel, setStressLevel] = useState<number>(2);

  const averageMood = moodHistory.reduce((sum, day) => sum + day.mood, 0) / moodHistory.length;
  const averageEnergy = moodHistory.reduce((sum, day) => sum + day.energy, 0) / moodHistory.length;
  const averageStress = moodHistory.reduce((sum, day) => sum + day.stress, 0) / moodHistory.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Психология & Ментальное здоровье 🧠</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Заботьтесь о своём внутреннем мире
          </p>
        </div>
        <Link href="/dashboard/psychology/consultation" className="btn btn-primary">
          <span>💬</span>
          <span>Записаться на консультацию</span>
        </Link>
      </div>

      {/* Mood Tracker */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardHeader>
          <CardTitle>Как вы себя чувствуете сегодня?</CardTitle>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* Mood Selection */}
          <div className="flex justify-center gap-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  selectedMood === mood.value
                    ? 'bg-gradient-to-br ' + mood.color + ' scale-110 shadow-lg'
                    : 'bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className={`text-xs ${selectedMood === mood.value ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Energy Level */}
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                Уровень энергии: {energyLevel}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
                <span>😴 Истощён</span>
                <span>⚡ Энергичен</span>
              </div>
            </div>

            {/* Stress Level */}
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                Уровень стресса: {stressLevel}/5
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
              <div className="flex justify-between text-xs text-[var(--text-tertiary)] mt-1">
                <span>😌 Спокоен</span>
                <span>😰 Стресс</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button disabled={!selectedMood}>
              Сохранить запись
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Stats */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Динамика за неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Mood Chart */}
              <div className="flex items-end gap-2 h-32">
                {moodHistory.map((day, index) => {
                  const height = (day.mood / 5) * 100;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-lg">{moodOptions[day.mood - 1].emoji}</span>
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-violet-400 transition-all"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-xs text-[var(--text-tertiary)]">
                        {day.date.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Averages */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-subtle)]">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-400">{averageMood.toFixed(1)}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Среднее настроение</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">{averageEnergy.toFixed(1)}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Средняя энергия</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-rose-400">{averageStress.toFixed(1)}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Средний стресс</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: '🧘', label: 'Начать медитацию', href: '/dashboard/psychology/meditate' },
              { icon: '📝', label: 'Вести дневник', href: '/dashboard/psychology/journal' },
              { icon: '💭', label: 'Упражнения на дыхание', href: '/dashboard/psychology/breathing' },
              { icon: '🎯', label: 'Поставить цель', href: '/dashboard/psychology/goals' },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Meditations */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Медитации</CardTitle>
          <Link href="/dashboard/psychology/meditations" className="text-sm text-violet-400 hover:underline">
            Все медитации
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {meditations.map((meditation) => (
              <div
                key={meditation.id}
                className="p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer group"
              >
                <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4 flex items-center justify-center relative overflow-hidden">
                  <span className="text-5xl">🧘</span>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-4xl">▶️</span>
                  </div>
                  {meditation.isPremium && (
                    <Badge variant="warning" size="sm" className="absolute top-2 right-2">
                      PRO
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-sm mb-1">{meditation.title}</h3>
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                  <span>{meditation.duration} мин</span>
                  <span>{meditation.plays.toLocaleString()} прослушиваний</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Psychologists */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Психологи</CardTitle>
          <Link href="/dashboard/trainers?type=psychology" className="text-sm text-violet-400 hover:underline">
            Все специалисты
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {psychologists.map((psychologist) => (
              <div
                key={psychologist.id}
                className="p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar name={psychologist.name} size="lg" status={psychologist.available ? 'online' : 'offline'} />
                  <div>
                    <div className="font-medium">{psychologist.name}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{psychologist.specialization}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{psychologist.rating}</span>
                    <span className="text-[var(--text-tertiary)]">({psychologist.reviews})</span>
                  </div>
                  <span className="font-medium">{psychologist.price} ₽</span>
                </div>
                <Button
                  fullWidth
                  size="sm"
                  variant={psychologist.available ? 'primary' : 'secondary'}
                  disabled={!psychologist.available}
                >
                  {psychologist.available ? 'Записаться' : 'Нет записи'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Полезные материалы</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '📖', title: 'Как справиться с тревогой', type: 'Статья', time: '5 мин' },
              { icon: '🎥', title: 'Техники релаксации', type: 'Видео', time: '12 мин' },
              { icon: '🎧', title: 'Подкаст о самооценке', type: 'Подкаст', time: '25 мин' },
              { icon: '📝', title: 'Чек-лист для хорошего сна', type: 'Гайд', time: '3 мин' },
              { icon: '📖', title: 'Работа с негативными мыслями', type: 'Статья', time: '8 мин' },
              { icon: '🎥', title: 'Медитация для начинающих', type: 'Видео', time: '15 мин' },
            ].map((resource) => (
              <div
                key={resource.title}
                className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              >
                <span className="text-2xl">{resource.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{resource.title}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    {resource.type} • {resource.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


