'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Badge, Button, Avatar } from '@/components/ui';

const proposals = [
  {
    id: 1,
    title: 'Добавить раздел медитаций для сна',
    description: 'Предлагаю добавить специальный раздел с медитациями и звуками природы для улучшения качества сна.',
    category: 'Функционал',
    author: 'Анна С.',
    votesFor: 1250,
    votesAgainst: 320,
    status: 'active',
    endDate: '2024-01-15',
    totalVoters: 1570,
  },
  {
    id: 2,
    title: 'Партнёрство с фитнес-клубами',
    description: 'Заключить партнёрские соглашения с сетью фитнес-клубов для предоставления скидок держателям NVT.',
    category: 'Партнёрство',
    author: 'Максим К.',
    votesFor: 890,
    votesAgainst: 150,
    status: 'active',
    endDate: '2024-01-18',
    totalVoters: 1040,
  },
  {
    id: 3,
    title: 'Увеличить награды Move-to-Earn на 20%',
    description: 'Предлагаю увеличить базовые награды за активность в модуле Move-to-Earn для стимулирования пользователей.',
    category: 'Токеномика',
    author: 'Дмитрий В.',
    votesFor: 2100,
    votesAgainst: 1800,
    status: 'passed',
    endDate: '2024-01-10',
    totalVoters: 3900,
  },
  {
    id: 4,
    title: 'Интеграция с Apple Watch',
    description: 'Разработать нативное приложение для Apple Watch с синхронизацией данных о здоровье.',
    category: 'Интеграция',
    author: 'Елена П.',
    votesFor: 450,
    votesAgainst: 780,
    status: 'rejected',
    endDate: '2024-01-05',
    totalVoters: 1230,
  },
];

const tokenStats = {
  balance: 5250,
  stakedBalance: 2000,
  pendingRewards: 125,
  votingPower: 7250,
  totalSupply: 10000000,
  circulatingSupply: 4500000,
  treasuryBalance: 1500000,
};

const stakingTiers = [
  { name: 'Бронза', minStake: 100, benefits: ['Базовое голосование', 'Скидка 5%'], color: 'from-amber-600 to-amber-800' },
  { name: 'Серебро', minStake: 1000, benefits: ['Усиленное голосование', 'Скидка 10%', 'Ранний доступ'], color: 'from-gray-400 to-gray-600' },
  { name: 'Золото', minStake: 5000, benefits: ['VIP голосование', 'Скидка 20%', 'Эксклюзивный контент'], color: 'from-yellow-500 to-amber-500' },
  { name: 'Платина', minStake: 10000, benefits: ['Максимальное влияние', 'Скидка 30%', 'Персональный менеджер'], color: 'from-cyan-400 to-blue-500' },
];

export default function DAOPage() {
  const [selectedTab, setSelectedTab] = useState<'proposals' | 'staking' | 'treasury'>('proposals');
  const [stakeAmount, setStakeAmount] = useState<string>('');

  const currentTier = stakingTiers.reduce((acc, tier) => {
    if (tokenStats.stakedBalance >= tier.minStake) return tier;
    return acc;
  }, stakingTiers[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">DAO Управление 🗳️</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Участвуйте в развитии платформы
          </p>
        </div>
        <Link href="/dashboard/dao/create-proposal" className="btn btn-primary">
          <span>📝</span>
          <span>Создать предложение</span>
        </Link>
      </div>

      {/* Token Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-violet-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-3xl font-bold text-gradient">{tokenStats.balance.toLocaleString()}</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">NVT Баланс</div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-3xl font-bold text-cyan-400">{tokenStats.stakedBalance.toLocaleString()}</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">В стейкинге</div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-3xl font-bold text-green-400">{tokenStats.pendingRewards.toLocaleString()}</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">Награды</div>
          </div>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/20 rounded-full blur-2xl" />
          <div className="relative">
            <div className="text-3xl font-bold text-amber-400">{tokenStats.votingPower.toLocaleString()}</div>
            <div className="text-sm text-[var(--text-secondary)] mt-1">Сила голоса</div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'proposals', label: 'Предложения', icon: '🗳️' },
          { id: 'staking', label: 'Стейкинг', icon: '💎' },
          { id: 'treasury', label: 'Казна', icon: '🏦' },
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

      {/* Proposals Tab */}
      {selectedTab === 'proposals' && (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            const forPercentage = Math.round((proposal.votesFor / totalVotes) * 100);
            const againstPercentage = 100 - forPercentage;

            return (
              <Card key={proposal.id}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Badge
                        variant={
                          proposal.status === 'active' ? 'info' :
                          proposal.status === 'passed' ? 'success' : 'danger'
                        }
                        dot
                      >
                        {proposal.status === 'active' ? 'Активно' :
                         proposal.status === 'passed' ? 'Принято' : 'Отклонено'}
                      </Badge>
                      <Badge variant="default">{proposal.category}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{proposal.title}</h3>
                    <p className="text-[var(--text-secondary)] text-sm mb-4">
                      {proposal.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                      <div className="flex items-center gap-2">
                        <Avatar size="xs" name={proposal.author} />
                        <span>{proposal.author}</span>
                      </div>
                      <span>•</span>
                      <span>{proposal.totalVoters.toLocaleString()} голосов</span>
                      <span>•</span>
                      <span>До {new Date(proposal.endDate).toLocaleDateString('ru-RU')}</span>
                    </div>
                  </div>

                  <div className="lg:w-64 space-y-3">
                    {/* Voting Progress */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">За: {forPercentage}%</span>
                        <span className="text-red-400">Против: {againstPercentage}%</span>
                      </div>
                      <div className="h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden flex">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                          style={{ width: `${forPercentage}%` }}
                        />
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all"
                          style={{ width: `${againstPercentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-tertiary)]">
                        <span>{proposal.votesFor.toLocaleString()} NVT</span>
                        <span>{proposal.votesAgainst.toLocaleString()} NVT</span>
                      </div>
                    </div>

                    {proposal.status === 'active' && (
                      <div className="flex gap-2">
                        <Button size="sm" fullWidth className="bg-green-500 hover:bg-green-600">
                          👍 За
                        </Button>
                        <Button size="sm" fullWidth variant="danger">
                          👎 Против
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Staking Tab */}
      {selectedTab === 'staking' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Stake */}
          <Card>
            <CardHeader>
              <CardTitle>Ваш стейкинг</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${currentTier.color} text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">{currentTier.name}</span>
                  <span className="text-2xl">
                    {currentTier.name === 'Бронза' ? '🥉' :
                     currentTier.name === 'Серебро' ? '🥈' :
                     currentTier.name === 'Золото' ? '🥇' : '💎'}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">
                  {tokenStats.stakedBalance.toLocaleString()} NVT
                </div>
                <div className="text-sm opacity-80">
                  +{tokenStats.pendingRewards} NVT в ожидании
                </div>
              </div>

              <div>
                <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                  Добавить в стейкинг
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    placeholder="Количество NVT"
                    className="flex-1 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl"
                  />
                  <Button>Застейкать</Button>
                </div>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  Доступно: {tokenStats.balance.toLocaleString()} NVT
                </p>
              </div>

              <Button variant="secondary" fullWidth>
                Вывести из стейкинга
              </Button>
            </CardContent>
          </Card>

          {/* Staking Tiers */}
          <Card>
            <CardHeader>
              <CardTitle>Уровни стейкинга</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stakingTiers.map((tier) => {
                const isCurrentTier = tier.name === currentTier.name;
                const isUnlocked = tokenStats.stakedBalance >= tier.minStake;
                return (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-xl border transition-all ${
                      isCurrentTier
                        ? 'border-violet-500 bg-violet-500/10'
                        : isUnlocked
                        ? 'border-[var(--border-default)] bg-[var(--bg-tertiary)]'
                        : 'border-[var(--border-subtle)] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center text-white text-sm font-bold`}>
                          {tier.name[0]}
                        </div>
                        <span className="font-medium">{tier.name}</span>
                        {isCurrentTier && <Badge variant="primary" size="sm">Текущий</Badge>}
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">
                        от {tier.minStake.toLocaleString()} NVT
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {tier.benefits.map((benefit) => (
                        <Badge key={benefit} variant="default" size="sm">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Treasury Tab */}
      {selectedTab === 'treasury' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Статистика казны</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white">
                <div className="text-sm opacity-80 mb-1">Баланс казны</div>
                <div className="text-3xl font-bold">{tokenStats.treasuryBalance.toLocaleString()} NVT</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-sm text-[var(--text-secondary)] mb-1">Всего выпущено</div>
                  <div className="text-xl font-bold">{tokenStats.totalSupply.toLocaleString()}</div>
                </div>
                <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
                  <div className="text-sm text-[var(--text-secondary)] mb-1">В обращении</div>
                  <div className="text-xl font-bold">{tokenStats.circulatingSupply.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Распределение средств</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Развитие платформы', percentage: 40, color: 'bg-violet-500' },
                  { label: 'Маркетинг', percentage: 25, color: 'bg-cyan-500' },
                  { label: 'Награды сообщества', percentage: 20, color: 'bg-green-500' },
                  { label: 'Резервный фонд', percentage: 15, color: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}


