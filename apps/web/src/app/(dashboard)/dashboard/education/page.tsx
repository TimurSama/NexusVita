'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  lessons: number;
  students: number;
  rating: number;
  priceNVT?: number;
  priceFiat?: number;
  isPremium: boolean;
  author: {
    name: string;
    avatar?: string;
  };
  image?: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  author: {
    name: string;
    avatar?: string;
  };
  views: number;
  publishedAt: string;
  image?: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Основы правильного питания',
    description: 'Изучите основы сбалансированного питания и научитесь составлять здоровый рацион',
    category: 'Питание',
    difficulty: 'beginner',
    duration: 120,
    lessons: 12,
    students: 2340,
    rating: 4.8,
    priceNVT: 200,
    priceFiat: 1990,
    isPremium: false,
    author: { name: 'Мария Козлова' },
  },
  {
    id: '2',
    title: 'Продвинутая программа тренировок',
    description: 'Углублённый курс по созданию эффективных тренировочных программ',
    category: 'Фитнес',
    difficulty: 'advanced',
    duration: 180,
    lessons: 18,
    students: 1567,
    rating: 4.9,
    priceNVT: 500,
    priceFiat: 4990,
    isPremium: true,
    author: { name: 'Алекс Петров' },
  },
  {
    id: '3',
    title: 'Медитация и осознанность',
    description: 'Научитесь техникам медитации для снижения стресса и улучшения ментального здоровья',
    category: 'Психология',
    difficulty: 'beginner',
    duration: 90,
    lessons: 10,
    students: 3200,
    rating: 4.7,
    priceNVT: 150,
    priceFiat: 1490,
    isPremium: false,
    author: { name: 'Елена Смирнова' },
  },
];

const articles: Article[] = [
  {
    id: '1',
    title: '10 способов увеличить метаболизм',
    excerpt: 'Простые и эффективные методы ускорения обмена веществ для здорового похудения',
    category: 'Питание',
    readTime: 8,
    author: { name: 'Мария Козлова' },
    views: 12340,
    publishedAt: '2024-01-20',
  },
  {
    id: '2',
    title: 'Как начать заниматься спортом: руководство для новичков',
    excerpt: 'Пошаговое руководство для тех, кто только начинает свой путь в фитнесе',
    category: 'Фитнес',
    readTime: 12,
    author: { name: 'Алекс Петров' },
    views: 8900,
    publishedAt: '2024-01-18',
  },
  {
    id: '3',
    title: 'Стресс и его влияние на здоровье',
    excerpt: 'Разбираемся, как стресс влияет на организм и как с ним бороться',
    category: 'Психология',
    readTime: 10,
    author: { name: 'Елена Смирнова' },
    views: 5670,
    publishedAt: '2024-01-15',
  },
];

const categories = [
  { id: 'all', name: 'Все', icon: '🌐' },
  { id: 'fitness', name: 'Фитнес', icon: '💪' },
  { id: 'nutrition', name: 'Питание', icon: '🥗' },
  { id: 'psychology', name: 'Психология', icon: '🧠' },
  { id: 'medical', name: 'Медицина', icon: '🏥' },
  { id: 'wellness', name: 'Wellness', icon: '✨' },
];

export default function EducationPage() {
  const [selectedTab, setSelectedTab] = useState<'courses' | 'articles' | 'library'>('courses');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(c => c.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(a => a.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Образование & Курсы 📚</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Развивайтесь с экспертами и получайте сертификаты
          </p>
        </div>
        <Link href="/dashboard/education/create" className="btn btn-primary">
          Создать курс
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'courses', label: 'Курсы', icon: '🎓' },
          { id: 'articles', label: 'Статьи', icon: '📖' },
          { id: 'library', label: 'Библиотека', icon: '📚' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'bg-cyan-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-cyan-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      {/* Courses Tab */}
      {selectedTab === 'courses' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} hover clickable>
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-cyan-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🎓
                </div>
                {course.isPremium && (
                  <Badge variant="warning" size="sm" className="absolute top-3 right-3">
                    PRO
                  </Badge>
                )}
                <Badge
                  variant={
                    course.difficulty === 'beginner' ? 'success' :
                    course.difficulty === 'intermediate' ? 'warning' : 'danger'
                  }
                  size="sm"
                  className="absolute top-3 left-3"
                >
                  {course.difficulty === 'beginner' ? 'Начальный' :
                   course.difficulty === 'intermediate' ? 'Средний' : 'Продвинутый'}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <Avatar size="xs" name={course.author.name} />
                  <span className="text-sm text-[var(--text-secondary)]">{course.author.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-4">
                  <div className="flex items-center gap-4">
                    <span>📚 {course.lessons} уроков</span>
                    <span>⏱️ {course.duration} мин</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span>{course.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border-subtle)]">
                  <div>
                    {course.priceNVT ? (
                      <>
                        <span className="font-bold text-cyan-400">{course.priceNVT} NVT</span>
                        <span className="text-xs text-[var(--text-tertiary)] ml-1">/ {course.priceFiat} ₽</span>
                      </>
                    ) : (
                      <span className="font-bold text-green-400">Бесплатно</span>
                    )}
                  </div>
                  <Button size="sm">Записаться</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Articles Tab */}
      {selectedTab === 'articles' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} hover clickable>
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-cyan-500/50 to-teal-500/50 flex items-center justify-center text-5xl">
                📖
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default" size="sm">{article.category}</Badge>
                  <span className="text-xs text-[var(--text-tertiary)]">⏱️ {article.readTime} мин</span>
                </div>
                <h3 className="font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar size="xs" name={article.author.name} />
                    <span className="text-[var(--text-secondary)]">{article.author.name}</span>
                  </div>
                  <span className="text-[var(--text-tertiary)]">👁️ {article.views.toLocaleString()}</span>
                </div>
                <div className="text-xs text-[var(--text-tertiary)] mt-2">
                  {new Date(article.publishedAt).toLocaleDateString('ru-RU')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Library Tab */}
      {selectedTab === 'library' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '📚', name: 'Книги', count: 156, color: 'from-violet-500 to-purple-500' },
            { icon: '🎥', name: 'Видео', count: 234, color: 'from-red-500 to-pink-500' },
            { icon: '🎧', name: 'Подкасты', count: 89, color: 'from-blue-500 to-cyan-500' },
            { icon: '📄', name: 'Документы', count: 567, color: 'from-green-500 to-emerald-500' },
            { icon: '🖼️', name: 'Инфографика', count: 123, color: 'from-amber-500 to-orange-500' },
            { icon: '📊', name: 'Исследования', count: 45, color: 'from-indigo-500 to-blue-500' },
            { icon: '📝', name: 'Чек-листы', count: 78, color: 'from-teal-500 to-cyan-500' },
            { icon: '🎯', name: 'Гайды', count: 112, color: 'from-rose-500 to-pink-500' },
          ].map((item) => (
            <Card key={item.name} hover clickable>
              <div className={`aspect-square rounded-xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center text-white p-6`}>
                <span className="text-6xl mb-4">{item.icon}</span>
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <div className="text-2xl font-bold">{item.count}</div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* My Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Моё обучение</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-[var(--bg-tertiary)]">
              <div className="text-4xl font-bold text-cyan-400 mb-2">3</div>
              <div className="text-sm text-[var(--text-secondary)]">Активных курсов</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[var(--bg-tertiary)]">
              <div className="text-4xl font-bold text-green-400 mb-2">12</div>
              <div className="text-sm text-[var(--text-secondary)]">Завершено курсов</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-[var(--bg-tertiary)]">
              <div className="text-4xl font-bold text-amber-400 mb-2">5</div>
              <div className="text-sm text-[var(--text-secondary)]">Сертификатов</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



