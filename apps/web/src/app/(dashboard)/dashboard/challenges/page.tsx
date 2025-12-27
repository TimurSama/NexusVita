'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'fitness' | 'nutrition' | 'habits' | 'wellness' | 'community';
  duration: number;
  startDate: string;
  endDate: string;
  participants: number;
  rewardNVT?: number;
  rewardFiat?: number;
  image?: string;
  isActive: boolean;
  progress?: number;
  isJoined?: boolean;
}

const activeChallenges: Challenge[] = [
  {
    id: '1',
    title: '30 дней фитнеса',
    description: 'Тренируйтесь каждый день в течение месяца и получите награду',
    type: 'fitness',
    duration: 30,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    participants: 1234,
    rewardNVT: 500,
    rewardFiat: 4990,
    isActive: true,
    progress: 65,
    isJoined: true,
  },
  {
    id: '2',
    title: '10,000 шагов ежедневно',
    description: 'Проходите минимум 10,000 шагов каждый день',
    type: 'fitness',
    duration: 14,
    startDate: '2024-01-15',
    endDate: '2024-01-29',
    participants: 567,
    rewardNVT: 200,
    rewardFiat: 1990,
    isActive: true,
    progress: 80,
    isJoined: true,
  },
  {
    id: '3',
    title: 'Здоровое питание 21 день',
    description: 'Следуйте плану здорового питания без срывов',
    type: 'nutrition',
    duration: 21,
    startDate: '2024-01-10',
    endDate: '2024-01-31',
    participants: 890,
    rewardNVT: 300,
    rewardFiat: 2990,
    isActive: true,
    progress: 52,
    isJoined: false,
  },
];

const upcomingChallenges: Challenge[] = [
  {
    id: '4',
    title: 'Медитация каждый день',
    description: '30 дней ежедневной практики медитации',
    type: 'wellness',
    duration: 30,
    startDate: '2024-02-01',
    endDate: '2024-03-02',
    participants: 0,
    rewardNVT: 400,
    rewardFiat: 3990,
    isActive: false,
    isJoined: false,
  },
];

const completedChallenges: Challenge[] = [
  {
    id: '5',
    title: '7 дней без сахара',
    description: 'Исключите сахар из рациона на неделю',
    type: 'nutrition',
    duration: 7,
    startDate: '2024-01-01',
    endDate: '2024-01-08',
    participants: 234,
    rewardNVT: 100,
    rewardFiat: 990,
    isActive: false,
    progress: 100,
    isJoined: true,
  },
];

export default function ChallengesPage() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'upcoming' | 'completed' | 'create'>('active');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fitness': return '💪';
      case 'nutrition': return '🥗';
      case 'habits': return '📊';
      case 'wellness': return '🧘';
      case 'community': return '👥';
      default: return '🏆';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fitness': return 'from-violet-500 to-purple-500';
      case 'nutrition': return 'from-emerald-500 to-teal-500';
      case 'habits': return 'from-amber-500 to-orange-500';
      case 'wellness': return 'from-pink-500 to-rose-500';
      case 'community': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Челленджи 🏆</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Участвуйте в челленджах и получайте награды
          </p>
        </div>
        <Button onClick={() => setSelectedTab('create')}>
          <span>➕</span>
          <span>Создать челлендж</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-gradient mb-2">12</div>
            <div className="text-sm text-[var(--text-secondary)]">Завершено</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
            <div className="text-sm text-[var(--text-secondary)]">Активных</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">1,250</div>
            <div className="text-sm text-[var(--text-secondary)]">NVT заработано</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">#42</div>
            <div className="text-sm text-[var(--text-secondary)]">Рейтинг</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'active', label: 'Активные', icon: '🔥' },
          { id: 'upcoming', label: 'Предстоящие', icon: '📅' },
          { id: 'completed', label: 'Завершённые', icon: '✅' },
          { id: 'create', label: 'Создать', icon: '➕' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'bg-amber-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Challenges */}
      {selectedTab === 'active' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeChallenges.map((challenge) => (
            <Card key={challenge.id} hover className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getTypeColor(challenge.type)} opacity-20 rounded-full blur-3xl`} />
              <div className="relative">
                <div className={`aspect-video rounded-t-xl bg-gradient-to-br ${getTypeColor(challenge.type)} flex items-center justify-center text-6xl`}>
                  {getTypeIcon(challenge.type)}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{challenge.title}</h3>
                    {challenge.isJoined && (
                      <Badge variant="success" size="sm" dot>Участвую</Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  
                  {challenge.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-[var(--text-secondary)]">Прогресс</span>
                        <span className="font-medium">{challenge.progress}%</span>
                      </div>
                      <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getTypeColor(challenge.type)} rounded-full transition-all`}
                          style={{ width: `${challenge.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Длительность</span>
                      <span className="font-medium">{challenge.duration} дней</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Участников</span>
                      <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Награда</span>
                      <span className="font-medium text-amber-400">
                        {challenge.rewardNVT} NVT
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {challenge.isJoined ? (
                      <Button fullWidth>Продолжить</Button>
                    ) : (
                      <Button fullWidth>Присоединиться</Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Upcoming Challenges */}
      {selectedTab === 'upcoming' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingChallenges.map((challenge) => (
            <Card key={challenge.id} hover>
              <div className={`aspect-video rounded-t-xl bg-gradient-to-br ${getTypeColor(challenge.type)} flex items-center justify-center text-6xl`}>
                {getTypeIcon(challenge.type)}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{challenge.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {challenge.description}
                </p>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Начало</span>
                    <span className="font-medium">
                      {new Date(challenge.startDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Награда</span>
                    <span className="font-medium text-amber-400">
                      {challenge.rewardNVT} NVT
                    </span>
                  </div>
                </div>
                <Button fullWidth variant="secondary">Напомнить</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Completed Challenges */}
      {selectedTab === 'completed' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedChallenges.map((challenge) => (
            <Card key={challenge.id} className="opacity-75">
              <div className={`aspect-video rounded-t-xl bg-gradient-to-br ${getTypeColor(challenge.type)} flex items-center justify-center text-6xl relative`}>
                {getTypeIcon(challenge.type)}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-4xl">✅</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{challenge.title}</h3>
                  <Badge variant="success" size="sm">Завершено</Badge>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {challenge.description}
                </div>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-secondary)]">Награда получена</span>
                    <span className="font-medium text-green-400">
                      {challenge.rewardNVT} NVT
                    </span>
                  </div>
                </div>
                <Button fullWidth variant="ghost">Посмотреть детали</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Challenge */}
      {selectedTab === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Создать челлендж</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Название</label>
              <input
                type="text"
                placeholder="Например: 30 дней фитнеса"
                className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">Описание</label>
              <textarea
                placeholder="Опишите челлендж..."
                className="w-full min-h-[100px] px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl resize-none"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Тип</label>
                <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl">
                  <option>Фитнес</option>
                  <option>Питание</option>
                  <option>Привычки</option>
                  <option>Wellness</option>
                  <option>Сообщество</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Длительность (дней)</label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Награда NVT</label>
                <input
                  type="number"
                  placeholder="500"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">Награда ₽</label>
                <input
                  type="number"
                  placeholder="4990"
                  className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" fullWidth onClick={() => setSelectedTab('active')}>
                Отмена
              </Button>
              <Button fullWidth>Создать челлендж</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

