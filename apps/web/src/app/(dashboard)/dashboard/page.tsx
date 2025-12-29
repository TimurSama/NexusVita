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

// Weekly progress data for charts
const weeklySteps = [8500, 9200, 7800, 10500, 9800, 11200, 8432];
const weeklyCalories = [2100, 1950, 2200, 2050, 2300, 2150, 1850];
const weeklySleep = [7.5, 8.0, 7.2, 8.5, 7.8, 8.2, 7.5];

// Health score data
const healthScore = {
  overall: 87,
  fitness: 92,
  nutrition: 85,
  sleep: 88,
  mental: 90,
};

// Recent activity feed
const recentActivity = [
  { id: 1, type: 'workout', title: 'Завершена тренировка "Силовая"', time: '2 часа назад', icon: '💪', points: 150 },
  { id: 2, type: 'meal', title: 'Добавлен прием пищи', time: '4 часа назад', icon: '🍎', points: 50 },
  { id: 3, type: 'achievement', title: 'Получено достижение "Неделя активности"', time: 'Вчера', icon: '🏆', points: 200 },
  { id: 4, type: 'challenge', title: 'Присоединились к челленджу "30 дней фитнеса"', time: '2 дня назад', icon: '🎯', points: 100 },
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

      {/* Weekly Progress Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Steps Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Шаги за неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklySteps.map((value, index) => {
                const max = Math.max(...weeklySteps);
                const height = (value / max) * 100;
                const isToday = index === weeklySteps.length - 1;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex items-end justify-center" style={{ height: '160px' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 ${
                          isToday 
                            ? 'bg-gradient-to-t from-violet-600 to-violet-400' 
                            : 'bg-gradient-to-t from-violet-500/60 to-violet-400/40'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {(value / 1000).toFixed(1)}K
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Calories Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Калории за неделю</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyCalories.map((value, index) => {
                const max = Math.max(...weeklyCalories);
                const height = (value / max) * 100;
                const isToday = index === weeklyCalories.length - 1;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full flex items-end justify-center" style={{ height: '160px' }}>
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 ${
                          isToday 
                            ? 'bg-gradient-to-t from-orange-600 to-orange-400' 
                            : 'bg-gradient-to-t from-orange-500/60 to-orange-400/40'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][index]}
                    </span>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Score */}
      <Card>
        <CardHeader>
          <CardTitle>Общий индекс здоровья</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Overall Score */}
            <div className="text-center">
              <div className="relative inline-block">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#healthGradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${(healthScore.overall / 100) * 352} 352`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">{healthScore.overall}</div>
                    <div className="text-xs text-[var(--text-tertiary)]">из 100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Scores */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Фитнес', value: healthScore.fitness, icon: '💪', color: 'from-violet-500 to-purple-600' },
                { label: 'Питание', value: healthScore.nutrition, icon: '🥗', color: 'from-emerald-500 to-teal-600' },
                { label: 'Сон', value: healthScore.sleep, icon: '😴', color: 'from-indigo-500 to-purple-600' },
                { label: 'Ментал', value: healthScore.mental, icon: '🧠', color: 'from-pink-500 to-rose-600' },
              ].map((category) => (
                <div key={category.label} className="text-center p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-lg font-bold mb-1">{category.value}</div>
                  <div className="text-xs text-[var(--text-secondary)] mb-2">{category.label}</div>
                  <div className="h-1.5 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-500`}
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Последняя активность</CardTitle>
          <Link href="/dashboard/activity" className="text-sm text-violet-400 hover:underline">
            Вся активность
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{activity.title}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{activity.time}</div>
                </div>
                <Badge variant="primary" size="sm">
                  +{activity.points} NVT
                </Badge>
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
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] hover:scale-105 transition-all text-center group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}



