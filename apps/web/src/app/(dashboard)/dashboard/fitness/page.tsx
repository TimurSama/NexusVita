'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Button, Avatar } from '@/components/ui';

const weeklyData = [
  { day: 'Пн', calories: 450, target: 500 },
  { day: 'Вт', calories: 520, target: 500 },
  { day: 'Ср', calories: 380, target: 500 },
  { day: 'Чт', calories: 600, target: 500 },
  { day: 'Пт', calories: 0, target: 500 },
  { day: 'Сб', calories: 0, target: 500 },
  { day: 'Вс', calories: 0, target: 500 },
];

const workoutPrograms = [
  {
    id: 1,
    title: 'Силовая тренировка',
    trainer: 'Алекс Петров',
    duration: 45,
    difficulty: 'Средняя',
    calories: 350,
    image: '/workout-strength.jpg',
    isPremium: false,
  },
  {
    id: 2,
    title: 'HIIT для сжигания жира',
    trainer: 'Мария Козлова',
    duration: 30,
    difficulty: 'Высокая',
    calories: 450,
    image: '/workout-hiit.jpg',
    isPremium: true,
  },
  {
    id: 3,
    title: 'Йога для начинающих',
    trainer: 'Анна Смирнова',
    duration: 60,
    difficulty: 'Лёгкая',
    calories: 200,
    image: '/workout-yoga.jpg',
    isPremium: false,
  },
  {
    id: 4,
    title: 'Функциональный тренинг',
    trainer: 'Денис Иванов',
    duration: 40,
    difficulty: 'Средняя',
    calories: 400,
    image: '/workout-functional.jpg',
    isPremium: true,
  },
];

const exerciseHistory = [
  { id: 1, name: 'Жим лёжа', sets: 4, reps: 10, weight: 80, date: 'Сегодня' },
  { id: 2, name: 'Приседания', sets: 4, reps: 12, weight: 100, date: 'Сегодня' },
  { id: 3, name: 'Становая тяга', sets: 3, reps: 8, weight: 120, date: 'Вчера' },
  { id: 4, name: 'Подтягивания', sets: 3, reps: 10, weight: 0, date: 'Вчера' },
];

const bodyStats = [
  { label: 'Вес', value: '78.5', unit: 'кг', change: -0.5, icon: '⚖️' },
  { label: 'Мышечная масса', value: '42.3', unit: '%', change: 0.2, icon: '💪' },
  { label: 'Жировая масса', value: '18.2', unit: '%', change: -0.3, icon: '📉' },
  { label: 'Вода', value: '58', unit: '%', change: 0.5, icon: '💧' },
];

export default function FitnessPage() {
  const [selectedTab, setSelectedTab] = useState<'programs' | 'history' | 'body'>('programs');
  const maxCalories = Math.max(...weeklyData.map(d => d.target));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Фитнес & Тренировки 💪</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Ваш путь к здоровому телу
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/fitness/start" className="btn btn-primary">
            Начать тренировку
          </Link>
        </div>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Недельный прогресс</CardTitle>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Сожжено калорий за неделю
            </p>
          </div>
          <Badge variant="success" dot>На 15% лучше прошлой недели</Badge>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((day, index) => {
              const height = day.calories > 0 ? (day.calories / maxCalories) * 100 : 5;
              const isToday = index === 3; // Thursday
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center justify-end h-32">
                    <span className="text-xs text-[var(--text-secondary)] mb-1">
                      {day.calories > 0 ? day.calories : '-'}
                    </span>
                    <div
                      className={`w-full max-w-8 rounded-t-lg transition-all ${
                        day.calories >= day.target
                          ? 'bg-gradient-to-t from-green-600 to-green-400'
                          : day.calories > 0
                          ? 'bg-gradient-to-t from-violet-600 to-violet-400'
                          : 'bg-[var(--bg-tertiary)]'
                      } ${isToday ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-[var(--bg-secondary)]' : ''}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? 'text-violet-400 font-medium' : 'text-[var(--text-tertiary)]'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-violet-600 to-violet-400" />
              <span className="text-sm text-[var(--text-secondary)]">Тренировки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-gradient-to-r from-green-600 to-green-400" />
              <span className="text-sm text-[var(--text-secondary)]">Цель достигнута</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'programs', label: 'Программы', icon: '📋' },
          { id: 'history', label: 'История', icon: '📊' },
          { id: 'body', label: 'Тело', icon: '🏋️' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'bg-violet-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Programs Tab */}
      {selectedTab === 'programs' && (
        <div className="grid md:grid-cols-2 gap-6">
          {workoutPrograms.map((program) => (
            <Card key={program.id} hover clickable>
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-4xl flex-shrink-0">
                  {program.difficulty === 'Высокая' ? '🔥' : program.difficulty === 'Средняя' ? '💪' : '🧘'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold truncate">{program.title}</h3>
                    {program.isPremium && (
                      <Badge variant="warning" size="sm">PRO</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {program.trainer}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                      ⏱️ {program.duration} мин
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                      🔥 {program.calories} ккал
                    </span>
                    <Badge variant={
                      program.difficulty === 'Высокая' ? 'danger' :
                      program.difficulty === 'Средняя' ? 'warning' : 'success'
                    } size="sm">
                      {program.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Avatar size="xs" name={program.trainer} />
                  <span className="text-sm text-[var(--text-secondary)]">{program.trainer}</span>
                </div>
                <Button size="sm">Начать</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* History Tab */}
      {selectedTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>История упражнений</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exerciseHistory.map((exercise) => (
                <div
                  key={exercise.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-xl">
                      🏋️
                    </div>
                    <div>
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        {exercise.sets} × {exercise.reps} {exercise.weight > 0 && `@ ${exercise.weight} кг`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default" size="sm">{exercise.date}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="ghost">Загрузить ещё</Button>
          </CardFooter>
        </Card>
      )}

      {/* Body Tab */}
      {selectedTab === 'body' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bodyStats.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <Badge
                  variant={stat.change > 0 ? 'success' : stat.change < 0 ? 'danger' : 'default'}
                  size="sm"
                >
                  {stat.change > 0 ? '+' : ''}{stat.change} {stat.unit}
                </Badge>
              </div>
              <div className="text-3xl font-bold">
                {stat.value}
                <span className="text-base font-normal text-[var(--text-tertiary)] ml-1">{stat.unit}</span>
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</div>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: '📝', label: 'Записать тренировку', href: '/dashboard/fitness/log' },
          { icon: '📊', label: 'Аналитика', href: '/dashboard/fitness/analytics' },
          { icon: '👥', label: 'Найти тренера', href: '/dashboard/trainers?type=fitness' },
          { icon: '🎯', label: 'Поставить цель', href: '/dashboard/fitness/goals' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-violet-500/50 hover:bg-[var(--bg-tertiary)] transition-all text-center group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm text-[var(--text-secondary)]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}



