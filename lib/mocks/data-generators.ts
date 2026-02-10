// Генераторы моковых данных для демо-режима

export interface MockUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'specialist' | 'partner'
}

export interface MockPost {
  id: string
  author: MockUser
  content: string
  images?: string[]
  likes: number
  comments: number
  shares: number
  createdAt: Date
  tags?: string[]
}

export interface MockSpecialist {
  id: string
  name: string
  specialization: string
  rating: number
  reviews: number
  price: number
  avatar?: string
  description: string
  services: Array<{ name: string; price: number }>
}

export interface MockProduct {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category: string
  rating: number
  reviews: number
}

export interface MockEvent {
  id: string
  title: string
  type: 'consultation' | 'training' | 'nutrition' | 'analysis' | 'personal' | 'reminder'
  date: Date
  duration?: number
  description?: string
}

export interface MockGoal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  deadline: Date
  status: 'active' | 'completed' | 'cancelled'
}

export interface MockMetric {
  id: string
  label: string
  value: number
  unit: string
  trend?: 'up' | 'down' | 'stable'
  date: Date
}

// Генераторы
export function generateMockUsers(count: number): MockUser[] {
  const names = [
    'Алексей Иванов', 'Мария Петрова', 'Дмитрий Сидоров', 'Анна Козлова',
    'Сергей Волков', 'Елена Новикова', 'Игорь Морозов', 'Ольга Лебедева',
  ]
  const roles: Array<'user' | 'specialist' | 'partner'> = ['user', 'specialist', 'partner']

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: names[i % names.length],
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
  }))
}

export function generateMockPosts(count: number, users: MockUser[]): MockPost[] {
  const contents = [
    'Отличная тренировка сегодня! Чувствую себя прекрасно.',
    'Попробовал новый рецепт из плана питания. Очень вкусно!',
    'Завершил недельный челлендж по медитации. Рекомендую всем!',
    'Встретился с тренером, скорректировали программу тренировок.',
    'Анализы пришли в норму! Радуюсь прогрессу.',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `post-${i + 1}`,
    author: users[i % users.length],
    content: contents[i % contents.length],
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
    shares: Math.floor(Math.random() * 10),
    createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    tags: ['здоровье', 'тренировки', 'питание'].slice(0, Math.floor(Math.random() * 3)),
  }))
}

export function generateMockSpecialists(count: number): MockSpecialist[] {
  const specializations = [
    'Тренер по силовым тренировкам',
    'Диетолог',
    'Психолог',
    'Врач-терапевт',
    'Йога-инструктор',
    'Массажист',
  ]

  const names = [
    'Иван Петров', 'Елена Сидорова', 'Александр Козлов',
    'Мария Волкова', 'Дмитрий Новиков', 'Анна Морозова',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `specialist-${i + 1}`,
    name: names[i % names.length],
    specialization: specializations[i % specializations.length],
    rating: 4 + Math.random(),
    reviews: Math.floor(Math.random() * 100) + 10,
    price: Math.floor(Math.random() * 5000) + 1000,
    description: `Опытный специалист в области ${specializations[i % specializations.length].toLowerCase()}.`,
    services: [
      { name: 'Консультация', price: Math.floor(Math.random() * 3000) + 1000 },
      { name: 'Индивидуальная программа', price: Math.floor(Math.random() * 5000) + 2000 },
    ],
  }))
}

export function generateMockProducts(count: number): MockProduct[] {
  const categories = ['БАДы', 'Питание', 'Оборудование', 'Медикаменты']
  const names = [
    'Протеиновый коктейль', 'Витаминный комплекс', 'Гантели 5кг',
    'Йога-мат', 'Омега-3', 'Креатин', 'BCAA', 'Глюкозамин',
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: names[i % names.length],
    description: `Качественный продукт для здоровья и фитнеса.`,
    price: Math.floor(Math.random() * 5000) + 500,
    category: categories[i % categories.length],
    rating: 3 + Math.random() * 2,
    reviews: Math.floor(Math.random() * 50) + 5,
  }))
}

export function generateMockEvents(count: number): MockEvent[] {
  const types: Array<'consultation' | 'training' | 'nutrition' | 'analysis' | 'personal' | 'reminder'> = [
    'consultation', 'training', 'nutrition', 'analysis', 'personal', 'reminder',
  ]
  const titles = [
    'Консультация с тренером', 'Силовая тренировка', 'План питания',
    'Сдача анализов', 'Личная встреча', 'Напоминание о тренировке',
  ]

  const now = new Date()
  return Array.from({ length: count }, (_, i) => ({
    id: `event-${i + 1}`,
    title: titles[i % titles.length],
    type: types[i % types.length],
    date: new Date(now.getTime() + (i - count / 2) * 24 * 60 * 60 * 1000),
    duration: Math.floor(Math.random() * 120) + 30,
    description: `Описание события ${i + 1}`,
  }))
}

export function generateMockGoals(count: number): MockGoal[] {
  const titles = [
    'Похудеть на 5 кг', 'Пробежать 10 км', 'Снизить стресс',
    'Улучшить сон', 'Набрать мышечную массу', 'Правильно питаться',
  ]
  const units = ['кг', 'км', 'балл', 'час', 'кг', 'день']

  const now = new Date()
  return Array.from({ length: count }, (_, i) => ({
    id: `goal-${i + 1}`,
    title: titles[i % titles.length],
    target: Math.floor(Math.random() * 50) + 10,
    current: Math.floor(Math.random() * 30) + 5,
    unit: units[i % units.length],
    deadline: new Date(now.getTime() + (i + 1) * 30 * 24 * 60 * 60 * 1000),
    status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'active' : 'cancelled',
  }))
}

export function generateMockMetrics(count: number): MockMetric[] {
  const labels = ['Вес', 'Пульс', 'Шаги', 'Калории', 'Сон', 'Стресс']
  const units = ['кг', 'уд/мин', 'шагов', 'ккал', 'часов', 'балл']
  const trends: Array<'up' | 'down' | 'stable'> = ['up', 'down', 'stable']

  const now = new Date()
  return Array.from({ length: count }, (_, i) => ({
    id: `metric-${i + 1}`,
    label: labels[i % labels.length],
    value: Math.floor(Math.random() * 100) + 50,
    unit: units[i % units.length],
    trend: trends[i % trends.length],
    date: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
  }))
}
