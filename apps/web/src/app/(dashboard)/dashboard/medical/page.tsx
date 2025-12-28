'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

interface MedicalRecord {
  id: string;
  type: 'analysis' | 'consultation' | 'vaccination' | 'medication' | 'other';
  title: string;
  date: string;
  doctor?: string;
  clinic?: string;
  description?: string;
  files?: string[];
  isImportant: boolean;
}

interface HealthMetric {
  name: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  lastUpdate: string;
  normalRange: string;
}

const recentRecords: MedicalRecord[] = [
  {
    id: '1',
    type: 'analysis',
    title: 'Общий анализ крови',
    date: '2024-01-15',
    clinic: 'Медицинский центр "Здоровье"',
    description: 'Все показатели в норме',
    isImportant: false,
  },
  {
    id: '2',
    type: 'consultation',
    title: 'Консультация кардиолога',
    date: '2024-01-10',
    doctor: 'Доктор Иванов А.В.',
    description: 'Плановый осмотр, рекомендации по питанию',
    isImportant: true,
  },
  {
    id: '3',
    type: 'vaccination',
    title: 'Вакцинация от гриппа',
    date: '2024-01-05',
    clinic: 'Поликлиника №1',
    isImportant: false,
  },
];

const healthMetrics: HealthMetric[] = [
  {
    name: 'Артериальное давление',
    value: '120/80',
    unit: 'мм рт.ст.',
    trend: 'stable',
    lastUpdate: 'Сегодня, 08:00',
    normalRange: '110-130/70-85',
  },
  {
    name: 'Пульс',
    value: '72',
    unit: 'уд/мин',
    trend: 'stable',
    lastUpdate: 'Сегодня, 08:00',
    normalRange: '60-100',
  },
  {
    name: 'Температура тела',
    value: '36.6',
    unit: '°C',
    trend: 'stable',
    lastUpdate: 'Вчера, 20:00',
    normalRange: '36.0-37.0',
  },
  {
    name: 'Вес',
    value: '78.5',
    unit: 'кг',
    trend: 'down',
    lastUpdate: 'Сегодня, 07:00',
    normalRange: '70-85',
  },
];

const upcomingAppointments = [
  {
    id: '1',
    doctor: 'Доктор Петрова М.С.',
    specialty: 'Терапевт',
    date: '2024-01-25',
    time: '14:00',
    type: 'consultation',
  },
  {
    id: '2',
    doctor: 'Доктор Сидоров В.А.',
    specialty: 'Ортопед',
    date: '2024-02-01',
    time: '10:30',
    type: 'consultation',
  },
];

export default function MedicalPage() {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'records' | 'appointments' | 'metrics'>('overview');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return '🧪';
      case 'consultation': return '👨‍⚕️';
      case 'vaccination': return '💉';
      case 'medication': return '💊';
      default: return '📋';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'analysis': return 'Анализы';
      case 'consultation': return 'Консультация';
      case 'vaccination': return 'Вакцинация';
      case 'medication': return 'Лекарства';
      default: return 'Другое';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Здоровье & Медицина 🏥</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Храните медицинские записи и отслеживайте показатели здоровья
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/medical/add-record" className="btn btn-primary">
            <span>➕</span>
            <span>Добавить запись</span>
          </Link>
        </div>
      </div>

      {/* Health Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">
                  {metric.trend === 'up' && '📈'}
                  {metric.trend === 'down' && '📉'}
                  {metric.trend === 'stable' && '➡️'}
                </span>
                <Badge
                  variant={metric.trend === 'stable' ? 'success' : metric.trend === 'down' ? 'info' : 'warning'}
                  size="sm"
                >
                  {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">
                {metric.value}
                <span className="text-base font-normal text-[var(--text-tertiary)] ml-1">{metric.unit}</span>
              </div>
              <div className="text-sm text-[var(--text-secondary)] mb-2">{metric.name}</div>
              <div className="text-xs text-[var(--text-tertiary)]">
                Норма: {metric.normalRange}
              </div>
              <div className="text-xs text-[var(--text-tertiary)] mt-1">
                {metric.lastUpdate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Обзор', icon: '📊' },
          { id: 'records', label: 'Записи', icon: '📋' },
          { id: 'appointments', label: 'Приёмы', icon: '📅' },
          { id: 'metrics', label: 'Показатели', icon: '📈' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Records */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Последние записи</CardTitle>
              <Link href="/dashboard/medical/records" className="text-sm text-blue-400 hover:underline">
                Все записи
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <div className="text-3xl">{getTypeIcon(record.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{record.title}</h3>
                      {record.isImportant && (
                        <Badge variant="danger" size="sm">Важно</Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">
                      {record.doctor && `Доктор: ${record.doctor}`}
                      {record.clinic && `Клиника: ${record.clinic}`}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
                      <span>{new Date(record.date).toLocaleDateString('ru-RU')}</span>
                      <Badge variant="default" size="sm">{getTypeLabel(record.type)}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Ближайшие приёмы</CardTitle>
              <Link href="/dashboard/medical/appointments" className="text-sm text-blue-400 hover:underline">
                Все приёмы
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium mb-1">{appointment.doctor}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{appointment.specialty}</p>
                    </div>
                    <Badge variant="info" size="sm">
                      {new Date(appointment.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span>🕐 {appointment.time}</span>
                  </div>
                </div>
              ))}
              <Link href="/dashboard/medical/book-appointment" className="btn btn-secondary w-full">
                Записаться на приём
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Records Tab */}
      {selectedTab === 'records' && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Медицинские записи</CardTitle>
            <Link href="/dashboard/medical/add-record" className="btn btn-primary btn-sm">
              Добавить запись
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <div className="text-4xl">{getTypeIcon(record.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{record.title}</h3>
                      {record.isImportant && (
                        <Badge variant="danger" size="sm">Важно</Badge>
                      )}
                      <Badge variant="default" size="sm">{getTypeLabel(record.type)}</Badge>
                    </div>
                    {record.description && (
                      <p className="text-sm text-[var(--text-secondary)] mb-2">{record.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                      <span>📅 {new Date(record.date).toLocaleDateString('ru-RU')}</span>
                      {record.doctor && <span>👨‍⚕️ {record.doctor}</span>}
                      {record.clinic && <span>🏥 {record.clinic}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">👁️</Button>
                    <Button variant="ghost" size="sm">✏️</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Appointments Tab */}
      {selectedTab === 'appointments' && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Записи на приёмы</CardTitle>
            <Link href="/dashboard/medical/book-appointment" className="btn btn-primary btn-sm">
              Записаться
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-3xl flex-shrink-0">
                    👨‍⚕️
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{appointment.doctor}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-2">{appointment.specialty}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[var(--text-secondary)]">
                        📅 {new Date(appointment.date).toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        🕐 {appointment.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">Отменить</Button>
                    <Button size="sm">Подробнее</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metrics Tab */}
      {selectedTab === 'metrics' && (
        <div className="grid md:grid-cols-2 gap-6">
          {healthMetrics.map((metric) => (
            <Card key={metric.name}>
              <CardHeader>
                <CardTitle>{metric.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold mb-2">
                    {metric.value}
                    <span className="text-2xl font-normal text-[var(--text-tertiary)] ml-2">{metric.unit}</span>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    Норма: {metric.normalRange}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Тренд</span>
                    <Badge
                      variant={metric.trend === 'stable' ? 'success' : metric.trend === 'down' ? 'info' : 'warning'}
                      size="sm"
                    >
                      {metric.trend === 'up' ? 'Увеличивается' : metric.trend === 'down' ? 'Уменьшается' : 'Стабильно'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Последнее обновление</span>
                    <span>{metric.lastUpdate}</span>
                  </div>
                </div>
                <Button fullWidth className="mt-4">Добавить измерение</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '📋', label: 'Добавить анализ', href: '/dashboard/medical/add-record?type=analysis' },
          { icon: '👨‍⚕️', label: 'Записаться к врачу', href: '/dashboard/medical/book-appointment' },
          { icon: '💊', label: 'Лекарства', href: '/dashboard/medical/medications' },
          { icon: '📊', label: 'Аналитика здоровья', href: '/dashboard/medical/analytics' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-blue-500/50 hover:bg-[var(--bg-tertiary)] transition-all text-center group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm text-[var(--text-secondary)]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}


