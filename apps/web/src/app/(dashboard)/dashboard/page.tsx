'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Avatar } from '@/components/ui';

// Mock data for dashboard
const todayStats = [
  { label: 'Калории', value: '1,850', target: '2,200', unit: 'ккал', icon: '🔥', color: 'from-orange-500 to-red-500' },
  { label: 'Шаги', value: '8,432', target: '10,000', unit: '', icon: '👟', color: 'from-green-500 to-emerald-500' },
  { label: 'Сон', value: '7.5', target: '8', unit: 'ч', icon: '😴', color: 'from-indigo-500 to-purple-500' },
  { label: 'Вода', value: '1.8', target: '2.5', unit: 'л', icon: '💧', color: 'from-blue-500 to-cyan-500' },
];

const upcomingActivities = [
  { id: 1, title: 'Утренняя тренировка', time: '07:00', type: 'workout', trainer: 'Алекс П.' },
  { id: 2, title: 'Консультация психолога', time: '14:00', type: 'psychology', trainer: 'Мария К.' },
  { id: 3, title: 'Вебинар: Питание для энергии', time: '19:00', type: 'education', trainer: 'Нутрициолог' },
];

const recentAchievements = [
  { id: 1, title: '7 дней подряд', description: 'Тренировки каждый день', icon: '🏆', date: 'Сегодня' },
  { id: 2, title: 'Первые 10К шагов', description: 'Пройдено 10,000 шагов за день', icon: '🥇', date: 'Вчера' },
  { id: 3, title: 'Медитация мастер', description: '30 минут медитации', icon: '🧘', date: '2 дня назад' },
];

const activeChallenges = [
  { id: 1, title: '30 дней фитнеса', progress: 65, participants: 1234, reward: 500 },
  { id: 2, title: '10K шагов ежедневно', progress: 80, participants: 567, reward: 200 },
];

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Доброе утро');
    else if (hour < 17) setGreeting('Добрый день');
    else setGreeting('Добрый вечер');

    setCurrentDate(new Date().toLocaleDateString('ru-RU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">{greeting}! 👋</h1>
          <p className="text-[var(--text-secondary)] mt-1 capitalize">{currentDate}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/fitness/start"
            className="btn btn-primary"
          >
            <span>🏋️</span>
            <span>Начать тренировку</span>
          </Link>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {todayStats.map((stat) => {
          const progress = (parseFloat(stat.value.replace(',', '')) / parseFloat(stat.target.replace(',', ''))) * 100;
          return (
            <Card key={stat.label} hover className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <Badge variant={progress >= 100 ? 'success' : 'default'} size="sm">
                  {Math.round(progress)}%
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {stat.value}
                <span className="text-sm font-normal text-[var(--text-tertiary)] ml-1">{stat.unit}</span>
              </div>
              <div className="text-sm text-[var(--text-secondary)] mt-1">{stat.label}</div>
              <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">
                Цель: {stat.target} {stat.unit}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Activities */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Расписание на сегодня</CardTitle>
            <Link href="/dashboard/schedule" className="text-sm text-violet-400 hover:underline">
              Все события
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-2xl">
                  {activity.type === 'workout' && '💪'}
                  {activity.type === 'psychology' && '🧠'}
                  {activity.type === 'education' && '📚'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{activity.title}</div>
                  <div className="text-sm text-[var(--text-secondary)]">с {activity.trainer}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-violet-400">{activity.time}</div>
                  <Badge variant="primary" size="sm">Сегодня</Badge>
                </div>
              </div>
            ))}
            
            {upcomingActivities.length === 0 && (
              <div className="text-center py-8 text-[var(--text-secondary)]">
                <span className="text-4xl mb-4 block">📅</span>
                <p>Нет запланированных событий</p>
                <Link href="/dashboard/trainers" className="text-violet-400 hover:underline mt-2 inline-block">
                  Найти специалиста
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Достижения</CardTitle>
            <Link href="/dashboard/achievements" className="text-sm text-violet-400 hover:underline">
              Все
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <span className="text-2xl">{achievement.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{achievement.title}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{achievement.description}</div>
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">{achievement.date}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Активные челленджи</CardTitle>
          <Link href="/dashboard/challenges" className="text-sm text-violet-400 hover:underline">
            Все челленджи
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {activeChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{challenge.title}</h3>
                  <Badge variant="warning" size="sm">🪙 {challenge.reward} NVT</Badge>
                </div>
                <div className="mb-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-[var(--text-secondary)]">Прогресс</span>
                    <span className="font-medium">{challenge.progress}%</span>
                  </div>
                  <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                  <span>👥</span>
                  <span>{challenge.participants.toLocaleString()} участников</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '🍎', label: 'Записать прием пищи', href: '/dashboard/nutrition/log' },
          { icon: '💊', label: 'Добавить анализы', href: '/dashboard/medical/tests' },
          { icon: '😊', label: 'Отметить настроение', href: '/dashboard/psychology/mood' },
          { icon: '✅', label: 'Отметить привычку', href: '/dashboard/habits' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] transition-all text-center"
          >
            <span className="text-3xl">{action.icon}</span>
            <span className="text-sm text-[var(--text-secondary)]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

