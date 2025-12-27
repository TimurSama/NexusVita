'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Button, Input } from '@/components/ui';

interface Referral {
  id: string;
  type: 'trainer' | 'location' | 'shop' | 'user';
  name: string;
  description: string;
  referralCode: string;
  commission: number;
  totalEarned: number;
  referralsCount: number;
  status: 'active' | 'pending' | 'completed';
}

const mockReferrals: Referral[] = [
  {
    id: '1',
    type: 'trainer',
    name: 'Алекс Петров - Фитнес тренер',
    description: 'Сертифицированный фитнес-тренер с 10-летним опытом',
    referralCode: 'ALEX2024',
    commission: 15,
    totalEarned: 12500,
    referralsCount: 23,
    status: 'active',
  },
  {
    id: '2',
    type: 'location',
    name: 'Fitness First Premium',
    description: 'Премиальный фитнес-клуб в центре Москвы',
    referralCode: 'FITNESS10',
    commission: 10,
    totalEarned: 8500,
    referralsCount: 17,
    status: 'active',
  },
  {
    id: '3',
    type: 'shop',
    name: 'Nexus Vita Store',
    description: 'Официальный магазин спортивного питания',
    referralCode: 'STORE20',
    commission: 20,
    totalEarned: 3200,
    referralsCount: 8,
    status: 'active',
  },
  {
    id: '4',
    type: 'trainer',
    name: 'Мария Козлова - Нутрициолог',
    description: 'Специалист по правильному питанию',
    referralCode: 'MARIA15',
    commission: 12,
    totalEarned: 0,
    referralsCount: 0,
    status: 'pending',
  },
];

const myReferralCode = 'MASTER2024';
const myStats = {
  totalEarned: 24200,
  totalReferrals: 48,
  activeReferrals: 3,
  pendingRewards: 1500,
};

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<Referral[]>(mockReferrals);
  const [newReferralCode, setNewReferralCode] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // Show toast notification
  };

  const handleAddReferral = () => {
    if (!newReferralCode.trim()) return;
    // Add referral logic
    setNewReferralCode('');
    setShowAddModal(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'trainer': return '👨‍🏫';
      case 'location': return '📍';
      case 'shop': return '🛒';
      default: return '👤';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'trainer': return 'Тренер';
      case 'location': return 'Локация';
      case 'shop': return 'Магазин';
      default: return 'Пользователь';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Реферальная система 💰</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Рекомендуйте специалистов, локации и магазины и получайте комиссию
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/referrals/invite" className="btn btn-primary">
            <span>🎁</span>
            <span>Пригласить друзей</span>
          </Link>
          <Link href="/dashboard/referrals/share" className="btn btn-secondary">
            <span>📤</span>
            <span>Поделиться</span>
          </Link>
          <Button onClick={() => setShowAddModal(true)}>
            <span>➕</span>
            <span>Добавить реферал</span>
          </Button>
        </div>
      </div>

      {/* My Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-gradient mb-2">
              {myStats.totalEarned.toLocaleString()} ₽
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Всего заработано</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2">
              {myStats.totalReferrals}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Всего рефералов</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {myStats.activeReferrals}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Активных</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-amber-400 mb-2">
              {myStats.pendingRewards.toLocaleString()} ₽
            </div>
            <div className="text-sm text-[var(--text-secondary)]">В ожидании</div>
          </CardContent>
        </Card>
      </div>

      {/* My Referral Code */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
        <CardHeader>
          <CardTitle>Ваш реферальный код</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center gap-4">
            <div className="flex-1 px-6 py-4 bg-[var(--bg-tertiary)] rounded-xl border-2 border-dashed border-violet-500/30">
              <div className="text-sm text-[var(--text-secondary)] mb-1">Поделитесь этим кодом</div>
              <div className="text-2xl font-bold font-mono text-violet-400">{myReferralCode}</div>
            </div>
            <Button onClick={() => handleCopyCode(myReferralCode)}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Копировать</span>
            </Button>
          </div>
          <div className="mt-4 p-4 bg-violet-500/10 rounded-xl">
            <p className="text-sm text-[var(--text-secondary)]">
              💡 Когда кто-то использует ваш код при регистрации или покупке, вы получаете комиссию. 
              Чем больше вы рекомендуете, тем больше зарабатываете!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* My Referrals */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="heading-3">Мои рефералы</h2>
          <Badge variant="primary" size="sm">{referrals.length} активных</Badge>
        </div>

        <div className="space-y-4">
          {referrals.map((referral) => (
            <Card key={referral.id} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl flex-shrink-0">
                    {getTypeIcon(referral.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{referral.name}</h3>
                          <Badge variant="default" size="sm">{getTypeLabel(referral.type)}</Badge>
                          {referral.status === 'active' && (
                            <Badge variant="success" size="sm" dot>Активен</Badge>
                          )}
                          {referral.status === 'pending' && (
                            <Badge variant="warning" size="sm" dot>Ожидание</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                          {referral.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Код</div>
                        <div className="font-mono text-sm font-medium">{referral.referralCode}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Комиссия</div>
                        <div className="text-sm font-medium text-violet-400">{referral.commission}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Рефералов</div>
                        <div className="text-sm font-medium">{referral.referralsCount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[var(--text-tertiary)] mb-1">Заработано</div>
                        <div className="text-sm font-medium text-green-400">
                          {referral.totalEarned.toLocaleString()} ₽
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCopyCode(referral.referralCode)}
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Копировать код</span>
                      </Button>
                      <Button variant="ghost" size="sm">
                        Статистика
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>Как это работает?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="font-semibold mb-2">Добавьте реферал</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Рекомендуйте специалистов, локации или магазины, которые вы знаете и доверяете
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="font-semibold mb-2">Поделитесь кодом</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Используйте уникальный реферальный код для каждого реферала и делитесь им с клиентами
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-3xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="font-semibold mb-2">Получайте комиссию</h3>
              <p className="text-sm text-[var(--text-secondary)]">
                Когда клиент использует ваш код, вы автоматически получаете комиссию с каждой транзакции
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Referral Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Добавить реферал</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                  Тип реферала
                </label>
                <select className="w-full px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl">
                  <option value="trainer">Тренер / Специалист</option>
                  <option value="location">Локация</option>
                  <option value="shop">Магазин</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                  Название
                </label>
                <Input placeholder="Например: Алекс Петров" />
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                  Описание
                </label>
                <textarea
                  placeholder="Краткое описание..."
                  className="w-full min-h-[100px] px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl resize-none"
                />
              </div>
              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                  Реферальный код
                </label>
                <Input
                  value={newReferralCode}
                  onChange={(e) => setNewReferralCode(e.target.value)}
                  placeholder="Уникальный код"
                />
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button variant="secondary" fullWidth onClick={() => setShowAddModal(false)}>
                Отмена
              </Button>
              <Button fullWidth onClick={handleAddReferral}>
                Добавить
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}

