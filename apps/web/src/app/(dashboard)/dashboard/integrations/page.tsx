'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@/components/ui';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'fitness' | 'health' | 'social' | 'payment';
  connected: boolean;
  features: string[];
}

const integrations: Integration[] = [
  {
    id: 'apple-health',
    name: 'Apple Health',
    description: 'Синхронизация данных о здоровье и активности с Apple Health',
    icon: '🍎',
    category: 'health',
    connected: false,
    features: ['Шаги', 'Сердцебиение', 'Калории', 'Сон', 'Вес'],
  },
  {
    id: 'google-fit',
    name: 'Google Fit',
    description: 'Интеграция с Google Fit для отслеживания активности',
    icon: '📱',
    category: 'fitness',
    connected: false,
    features: ['Шаги', 'Дистанция', 'Калории', 'Активность'],
  },
  {
    id: 'fitbit',
    name: 'Fitbit',
    description: 'Подключите ваш Fitbit для автоматической синхронизации данных',
    icon: '⌚',
    category: 'fitness',
    connected: false,
    features: ['Шаги', 'Сердцебиение', 'Сон', 'Вес', 'Активность'],
  },
  {
    id: 'garmin',
    name: 'Garmin',
    description: 'Синхронизация с устройствами Garmin',
    icon: '🏃',
    category: 'fitness',
    connected: false,
    features: ['Тренировки', 'GPS', 'Сердцебиение', 'Восстановление'],
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Интеграция с Telegram для уведомлений и мини-приложений',
    icon: '✈️',
    category: 'social',
    connected: true,
    features: ['Уведомления', 'Мини-приложение', 'Чат-бот', 'Платежи'],
  },
  {
    id: 'strava',
    name: 'Strava',
    description: 'Импорт тренировок из Strava',
    icon: '🚴',
    category: 'fitness',
    connected: false,
    features: ['Тренировки', 'Маршруты', 'Статистика'],
  },
];

export default function IntegrationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Все', icon: '🌐' },
    { id: 'fitness', name: 'Фитнес', icon: '💪' },
    { id: 'health', name: 'Здоровье', icon: '🏥' },
    { id: 'social', name: 'Социальные', icon: '👥' },
    { id: 'payment', name: 'Платежи', icon: '💳' },
  ];

  const filteredIntegrations = selectedCategory === 'all'
    ? integrations
    : integrations.filter(i => i.category === selectedCategory);

  const handleConnect = async (integrationId: string) => {
    // Handle integration connection
    console.log('Connecting:', integrationId);
    // Show OAuth flow or connection modal
  };

  const handleDisconnect = async (integrationId: string) => {
    // Handle disconnection
    console.log('Disconnecting:', integrationId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="heading-2">Интеграции 🔗</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Подключите внешние сервисы для расширенной функциональности
        </p>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
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

      {/* Integrations Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.id} hover>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{integration.icon}</div>
                {integration.connected && (
                  <Badge variant="success" size="sm">Подключено</Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-lg mb-2">{integration.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {integration.description}
              </p>

              <div className="mb-4">
                <div className="text-xs text-[var(--text-tertiary)] mb-2">Доступные данные:</div>
                <div className="flex flex-wrap gap-1">
                  {integration.features.map((feature) => (
                    <Badge key={feature} variant="default" size="sm">{feature}</Badge>
                  ))}
                </div>
              </div>

              {integration.connected ? (
                <Button variant="danger" fullWidth onClick={() => handleDisconnect(integration.id)}>
                  Отключить
                </Button>
              ) : (
                <Button fullWidth onClick={() => handleConnect(integration.id)}>
                  Подключить
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle>Статус подключений</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.filter(i => i.connected).map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{integration.icon}</span>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-[var(--text-secondary)]">
                      Последняя синхронизация: {new Date().toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                </div>
                <Badge variant="success" size="sm">Активно</Badge>
              </div>
            ))}
            {integrations.filter(i => i.connected).length === 0 && (
              <div className="text-center py-8 text-[var(--text-secondary)]">
                Нет активных подключений
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

