'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Input } from '@/components/ui';

const faqCategories = [
  { id: 'all', name: 'Все', icon: '🌐' },
  { id: 'getting-started', name: 'Начало работы', icon: '🚀' },
  { id: 'account', name: 'Аккаунт', icon: '👤' },
  { id: 'features', name: 'Функции', icon: '⚙️' },
  { id: 'payments', name: 'Платежи', icon: '💳' },
  { id: 'technical', name: 'Техническое', icon: '🔧' },
];

const faqItems = [
  {
    id: '1',
    category: 'getting-started',
    question: 'Как начать использовать Nexus Vita?',
    answer: 'Зарегистрируйтесь на платформе, заполните профиль и начните отслеживать свою активность. Вы можете присоединиться к челленджам, найти тренера или начать программу тренировок.',
  },
  {
    id: '2',
    category: 'account',
    question: 'Как изменить пароль?',
    answer: 'Перейдите в Настройки → Безопасность → Смена пароля. Введите текущий пароль и новый пароль дважды.',
  },
  {
    id: '3',
    category: 'features',
    question: 'Как работает реферальная система?',
    answer: 'Вы можете рекомендовать специалистов, локации и магазины. Когда кто-то использует ваш реферальный код, вы получаете комиссию с каждой транзакции.',
  },
  {
    id: '4',
    category: 'payments',
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты, NVT токены и Telegram Stars. Также доступна оплата через криптовалютные кошельки.',
  },
  {
    id: '5',
    category: 'technical',
    question: 'Как подключить Apple Health?',
    answer: 'Перейдите в Настройки → Интеграции → Apple Health и следуйте инструкциям. Вам нужно будет разрешить доступ к данным о здоровье.',
  },
  {
    id: '6',
    category: 'features',
    question: 'Что такое Move-to-Earn?',
    answer: 'Move-to-Earn - это механика, которая позволяет зарабатывать NVT токены за физическую активность. Чем больше вы двигаетесь, тем больше токенов получаете.',
  },
];

const guides = [
  {
    title: 'Руководство для новичков',
    description: 'Полное руководство по использованию платформы',
    icon: '📖',
    time: '15 мин',
  },
  {
    title: 'Как заработать NVT токены',
    description: 'Все способы получения токенов на платформе',
    icon: '🪙',
    time: '10 мин',
  },
  {
    title: 'Создание страницы тренера',
    description: 'Пошаговая инструкция для специалистов',
    icon: '👨‍🏫',
    time: '20 мин',
  },
  {
    title: 'Интеграция с гаджетами',
    description: 'Как подключить фитнес-трекеры',
    icon: '⌚',
    time: '8 мин',
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const filteredFaq = faqItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery && !item.question.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.answer.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-2">Центр помощи ❓</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Найдите ответы на ваши вопросы
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="search"
              placeholder="Поиск по вопросам и ответам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {faqCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-violet-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* FAQ */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="heading-3">Часто задаваемые вопросы</h2>
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => (
              <Card key={item.id} hover>
                <CardContent className="p-6">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                    className="w-full text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-semibold flex-1">{item.question}</h3>
                      <svg
                        className={`w-5 h-5 text-[var(--text-secondary)] transition-transform flex-shrink-0 ${
                          expandedFaq === item.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {expandedFaq === item.id && (
                      <p className="text-[var(--text-secondary)] mt-4">{item.answer}</p>
                    )}
                  </button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-[var(--text-secondary)]">Вопросы не найдены</p>
                <p className="text-sm text-[var(--text-tertiary)] mt-2">
                  Попробуйте изменить параметры поиска
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guides */}
          <Card>
            <CardHeader>
              <CardTitle>Руководства</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {guides.map((guide) => (
                <Link
                  key={guide.title}
                  href="#"
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{guide.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1 group-hover:text-violet-400 transition-colors">
                      {guide.title}
                    </div>
                    <div className="text-xs text-[var(--text-tertiary)]">{guide.time}</div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card>
            <CardHeader>
              <CardTitle>Нужна помощь?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-[var(--text-secondary)]">
                Не нашли ответ на свой вопрос? Свяжитесь с нашей службой поддержки
              </p>
              <div className="space-y-2">
                <Button fullWidth variant="secondary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Чат поддержки</span>
                </Button>
                <Button fullWidth variant="secondary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email поддержка</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Community */}
          <Card>
            <CardHeader>
              <CardTitle>Сообщество</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <span className="text-2xl">💬</span>
                <div>
                  <div className="font-medium text-sm">Telegram чат</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Общение с сообществом</div>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
              >
                <span className="text-2xl">📢</span>
                <div>
                  <div className="font-medium text-sm">Новости</div>
                  <div className="text-xs text-[var(--text-tertiary)]">Обновления платформы</div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



