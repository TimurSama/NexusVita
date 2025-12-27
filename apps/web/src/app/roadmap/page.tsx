'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  quarter: string;
  category: 'backend' | 'frontend' | 'mobile' | 'blockchain' | 'marketing' | 'partnerships';
  budget?: number;
}

const roadmapItems: RoadmapItem[] = [
  // Completed
  {
    id: '1',
    title: 'Базовая архитектура и схема БД',
    description: 'Создана полная схема базы данных с 30+ моделями, включая все модули экосистемы',
    status: 'completed',
    quarter: 'Q4 2023',
    category: 'backend',
    budget: 50000,
  },
  {
    id: '2',
    title: 'Backend API (21 модуль)',
    description: 'Реализованы все основные API endpoints для всех модулей платформы',
    status: 'completed',
    quarter: 'Q4 2023',
    category: 'backend',
    budget: 150000,
  },
  {
    id: '3',
    title: 'Frontend на Next.js 14',
    description: 'Создан современный фронтенд с дизайн-системой, компонентами и основными страницами',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'frontend',
    budget: 120000,
  },
  {
    id: '4',
    title: 'Система авторизации и профилей',
    description: 'Реализована полная система регистрации, авторизации и управления профилями',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'backend',
    budget: 80000,
  },
  {
    id: '5',
    title: 'Модули: Фитнес, Питание, Медицина',
    description: 'Полностью реализованы модули тренировок, питания и медицинских записей',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'backend',
    budget: 200000,
  },
  {
    id: '6',
    title: 'Модули: Психология, Сексология, Привычки',
    description: 'Добавлены модули для ментального здоровья, интимного здоровья и трекинга привычек',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'backend',
    budget: 150000,
  },
  {
    id: '7',
    title: 'Социальная сеть и лента новостей',
    description: 'Реализована лента новостей, посты, комментарии, лайки и подписки',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'frontend',
    budget: 100000,
  },
  {
    id: '8',
    title: 'Поиск специалистов и локаций',
    description: 'Созданы страницы поиска с фильтрами для специалистов и локаций',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'frontend',
    budget: 60000,
  },
  {
    id: '9',
    title: 'Реферальная система',
    description: 'Реализована система рефералов для мастеров, локаций и магазинов',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'backend',
    budget: 70000,
  },
  {
    id: '10',
    title: 'Маркетплейс и DAO',
    description: 'Создан маркетплейс для товаров и NFT, а также система DAO управления',
    status: 'completed',
    quarter: 'Q1 2024',
    category: 'blockchain',
    budget: 180000,
  },
  
  // In Progress
  {
    id: '11',
    title: 'Telegram Mini App интеграция',
    description: 'Разработка Telegram Mini App для упрощённого доступа и оплаты через Telegram Stars',
    status: 'in-progress',
    quarter: 'Q2 2024',
    category: 'frontend',
    budget: 120000,
  },
  {
    id: '12',
    title: 'Мобильные приложения (iOS/Android)',
    description: 'Разработка нативных мобильных приложений на React Native',
    status: 'in-progress',
    quarter: 'Q2 2024',
    category: 'mobile',
    budget: 300000,
  },
  {
    id: '13',
    title: 'Интеграции с гаджетами',
    description: 'Подключение Apple Health, Google Fit, Fitbit, Garmin и других устройств',
    status: 'in-progress',
    quarter: 'Q2 2024',
    category: 'backend',
    budget: 150000,
  },
  {
    id: '14',
    title: 'Система тем и кастомизации',
    description: 'Расширенная система тем с возможностью создания и публикации собственных',
    status: 'in-progress',
    quarter: 'Q2 2024',
    category: 'frontend',
    budget: 80000,
  },
  
  // Planned
  {
    id: '15',
    title: 'Web3 кошелёк и токеномика',
    description: 'Интеграция Web3 кошельков, стейкинг NVT токенов, Move-to-Earn механика',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'blockchain',
    budget: 250000,
  },
  {
    id: '16',
    title: 'NFT маркетплейс и коллекции',
    description: 'Полноценный NFT маркетплейс с коллекциями достижений и сертификатов',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'blockchain',
    budget: 200000,
  },
  {
    id: '17',
    title: 'AI-персональный ассистент',
    description: 'Искусственный интеллект для персональных рекомендаций и поддержки',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'backend',
    budget: 400000,
  },
  {
    id: '18',
    title: 'Видеозвонки и телемедицина',
    description: 'Встроенная система видеозвонков для консультаций со специалистами',
    status: 'planned',
    quarter: 'Q3 2024',
    category: 'backend',
    budget: 180000,
  },
  {
    id: '19',
    title: 'Международная экспансия',
    description: 'Локализация на английский, испанский, китайский языки',
    status: 'planned',
    quarter: 'Q4 2024',
    category: 'marketing',
    budget: 300000,
  },
  {
    id: '20',
    title: 'Партнёрства с фитнес-сетями',
    description: 'Интеграция с крупными сетями фитнес-клубов и wellness-центров',
    status: 'planned',
    quarter: 'Q4 2024',
    category: 'partnerships',
    budget: 500000,
  },
  {
    id: '21',
    title: 'Государственные интеграции',
    description: 'Интеграция с государственными сервисами здравоохранения',
    status: 'planned',
    quarter: 'Q4 2024',
    category: 'partnerships',
    budget: 600000,
  },
];

const investmentTiers = [
  {
    tier: 'Seed',
    amount: '500K - 2M',
    equity: '10-20%',
    perks: [
      'Ранний доступ к платформе',
      'Эксклюзивные NFT',
      'VIP статус в DAO',
      'Персональный менеджер',
    ],
    status: 'open',
  },
  {
    tier: 'Series A',
    amount: '2M - 5M',
    equity: '15-25%',
    perks: [
      'Все из Seed раунда',
      'Место в совете директоров',
      'Приоритет в партнёрствах',
      'Эксклюзивные рекламные возможности',
    ],
    status: 'planned',
  },
];

const budgetBreakdown = {
  totalRaised: 1200000,
  totalSpent: 1010000,
  remaining: 190000,
  categories: [
    { name: 'Разработка', spent: 650000, percentage: 64 },
    { name: 'Дизайн и UX', spent: 150000, percentage: 15 },
    { name: 'Маркетинг', spent: 100000, percentage: 10 },
    { name: 'Юридические услуги', spent: 50000, percentage: 5 },
    { name: 'Инфраструктура', spent: 40000, percentage: 4 },
    { name: 'Операционные расходы', spent: 20000, percentage: 2 },
  ],
};

export default function RoadmapPage() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'in-progress' | 'planned'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems = roadmapItems.filter(item => {
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const completedCount = roadmapItems.filter(i => i.status === 'completed').length;
  const inProgressCount = roadmapItems.filter(i => i.status === 'in-progress').length;
  const plannedCount = roadmapItems.filter(i => i.status === 'planned').length;

  const totalBudget = roadmapItems.reduce((sum, item) => sum + (item.budget || 0), 0);
  const spentBudget = roadmapItems
    .filter(item => item.status === 'completed' || item.status === 'in-progress')
    .reduce((sum, item) => sum + (item.budget || 0), 0);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-64 -left-64 w-[500px] h-[500px] rounded-full bg-violet-500/20 blur-[100px]" />
          <div className="absolute -bottom-64 -right-64 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[100px]" />
          <div className="mesh-gradient absolute inset-0" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" size="lg" className="mb-6">
              Дорожная карта развития
            </Badge>
            <h1 className="heading-1 mb-6">
              Строим будущее{' '}
              <span className="text-gradient">децентрализованного здоровья</span>
            </h1>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Nexus Vita — это не просто платформа, это экосистема, которая трансформирует 
              подход к здоровью и развитию. Узнайте, что уже сделано и что нас ждёт впереди.
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gradient mb-1">{completedCount}</div>
                <div className="text-sm text-[var(--text-secondary)]">Завершено</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-default)]" />
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-1">{inProgressCount}</div>
                <div className="text-sm text-[var(--text-secondary)]">В разработке</div>
              </div>
              <div className="w-px h-12 bg-[var(--border-default)]" />
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-1">{plannedCount}</div>
                <div className="text-sm text-[var(--text-secondary)]">Запланировано</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-2">
                  {budgetBreakdown.totalRaised.toLocaleString()} ₽
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Привлечено средств</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">
                  {budgetBreakdown.totalSpent.toLocaleString()} ₽
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Потрачено</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {budgetBreakdown.remaining.toLocaleString()} ₽
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Остаток</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  {Math.round((spentBudget / totalBudget) * 100)}%
                </div>
                <div className="text-sm text-[var(--text-secondary)]">Прогресс бюджета</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="lg:w-64 flex-shrink-0">
              <Card>
                <CardHeader>
                  <CardTitle>Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm text-[var(--text-secondary)] mb-2 block">Статус</label>
                    <div className="space-y-2">
                      {[
                        { id: 'all', label: 'Все', count: roadmapItems.length },
                        { id: 'completed', label: 'Завершено', count: completedCount },
                        { id: 'in-progress', label: 'В работе', count: inProgressCount },
                        { id: 'planned', label: 'Запланировано', count: plannedCount },
                      ].map(option => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedStatus(option.id as typeof selectedStatus)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedStatus === option.id
                              ? 'bg-violet-500 text-white'
                              : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option.label}</span>
                            <Badge variant="default" size="sm">{option.count}</Badge>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Timeline */}
            <div className="flex-1">
              <div className="space-y-8">
                {filteredItems.map((item, index) => (
                  <Card key={item.id} className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-l-xl" />
                    <CardContent className="p-6 pl-8">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge
                              variant={
                                item.status === 'completed' ? 'success' :
                                item.status === 'in-progress' ? 'warning' : 'default'
                              }
                              size="sm"
                            >
                              {item.status === 'completed' ? '✓ Завершено' :
                               item.status === 'in-progress' ? '🔄 В работе' : '📅 Запланировано'}
                            </Badge>
                            <Badge variant="info" size="sm">{item.quarter}</Badge>
                          </div>
                          <p className="text-[var(--text-secondary)] mb-3">{item.description}</p>
                          {item.budget && (
                            <div className="text-sm text-[var(--text-tertiary)]">
                              Бюджет: <span className="font-medium text-violet-400">
                                {item.budget.toLocaleString()} ₽
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="heading-2 text-center mb-12">Распределение бюджета</h2>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  {budgetBreakdown.categories.map((category) => (
                    <div key={category.name}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{category.name}</span>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {category.spent.toLocaleString()} ₽ ({category.percentage}%)
                        </span>
                      </div>
                      <div className="h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full transition-all"
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Offer */}
      <section className="py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="warning" size="lg" className="mb-6">
                Инвестиционные возможности
              </Badge>
              <h2 className="heading-2 mb-4">Присоединяйтесь к экосистеме</h2>
              <p className="body-large text-[var(--text-secondary)]">
                Мы ищем стратегических партнёров и инвесторов для масштабирования платформы
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {investmentTiers.map((tier) => (
                <Card key={tier.tier} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full blur-3xl" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{tier.tier} Round</CardTitle>
                      <Badge variant={tier.status === 'open' ? 'success' : 'default'}>
                        {tier.status === 'open' ? 'Открыт' : 'Запланирован'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-4">
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Сумма инвестиции</div>
                      <div className="text-2xl font-bold text-gradient">{tier.amount} ₽</div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-1">Доля в компании</div>
                      <div className="text-xl font-semibold">{tier.equity}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[var(--text-secondary)] mb-2">Преимущества:</div>
                      <ul className="space-y-2">
                        {tier.perks.map((perk, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-violet-400 mt-0.5">✓</span>
                            <span>{perk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button fullWidth variant={tier.status === 'open' ? 'primary' : 'secondary'}>
                      {tier.status === 'open' ? 'Обсудить инвестицию' : 'Узнать больше'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-cyan-600/20" />
              <CardContent className="relative p-12 text-center">
                <h3 className="heading-3 mb-4">Готовы инвестировать?</h3>
                <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
                  Свяжитесь с нами для обсуждения условий инвестирования и получения 
                  подробной презентации проекта
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>invest@nexusvita.io</span>
                  </Button>
                  <Button variant="secondary" size="lg">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Telegram</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">Станьте частью будущего</h2>
            <p className="body-large text-[var(--text-secondary)] mb-8">
              Присоединяйтесь к экосистеме Nexus Vita и помогите нам трансформировать 
              подход к здоровью и развитию миллионов людей
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn btn-primary btn-lg">
                Зарегистрироваться
              </Link>
              <Link href="/dashboard" className="btn btn-secondary btn-lg">
                Открыть платформу
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

