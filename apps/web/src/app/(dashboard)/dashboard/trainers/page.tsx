'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, Avatar, Badge, Button, Input } from '@/components/ui';
import { trainerApi, TrainerProfile } from '@/lib/api';

const specializations = [
  { id: 'all', name: 'Все', icon: '🌐' },
  { id: 'fitness', name: 'Фитнес', icon: '💪' },
  { id: 'yoga', name: 'Йога', icon: '🧘' },
  { id: 'pilates', name: 'Пилатес', icon: '🤸' },
  { id: 'nutrition', name: 'Нутрициология', icon: '🥗' },
  { id: 'psychology', name: 'Психология', icon: '🧠' },
  { id: 'rehabilitation', name: 'Реабилитация', icon: '🏥' },
  { id: 'dance', name: 'Танцы', icon: '💃' },
];

const sortOptions = [
  { id: 'rating', label: 'По рейтингу' },
  { id: 'reviews', label: 'По отзывам' },
  { id: 'price-low', label: 'Цена: по возрастанию' },
  { id: 'price-high', label: 'Цена: по убыванию' },
  { id: 'newest', label: 'Новые' },
];

const mockTrainers: TrainerProfile[] = [
  {
    id: '1',
    userId: 'u1',
    displayName: 'Алекс Петров',
    slug: 'alex-petrov',
    bio: 'Сертифицированный фитнес-тренер с 10-летним опытом. Специализация: силовые тренировки, функциональный тренинг, коррекция осанки.',
    specializations: ['Фитнес', 'Силовые тренировки', 'Функциональный тренинг'],
    certifications: ['ACSM Certified', 'FMS Level 2'],
    experience: 10,
    rating: 4.9,
    reviewsCount: 234,
    priceRange: '2000-3000 ₽/час',
    availableForOnline: true,
    availableForOffline: true,
    locations: ['Москва', 'Онлайн'],
    socialLinks: {},
    gallery: [],
  },
  {
    id: '2',
    userId: 'u2',
    displayName: 'Мария Козлова',
    slug: 'maria-kozlova',
    bio: 'Нутрициолог и wellness-коуч. Помогаю создать здоровые отношения с едой и достичь целей в питании.',
    specializations: ['Нутрициология', 'Wellness', 'Похудение'],
    certifications: ['INN Certified Nutritionist'],
    experience: 7,
    rating: 4.8,
    reviewsCount: 189,
    priceRange: '2500-3500 ₽/час',
    availableForOnline: true,
    availableForOffline: false,
    locations: ['Онлайн'],
    socialLinks: {},
    gallery: [],
  },
  {
    id: '3',
    userId: 'u3',
    displayName: 'Анна Смирнова',
    slug: 'anna-smirnova',
    bio: 'Инструктор по йоге и медитации. 500+ часов обучения, специализация на терапевтической йоге и работе с травмами.',
    specializations: ['Йога', 'Медитация', 'Терапевтическая йога'],
    certifications: ['Yoga Alliance RYT-500'],
    experience: 8,
    rating: 4.9,
    reviewsCount: 156,
    priceRange: '1500-2500 ₽/час',
    availableForOnline: true,
    availableForOffline: true,
    locations: ['Санкт-Петербург', 'Онлайн'],
    socialLinks: {},
    gallery: [],
  },
  {
    id: '4',
    userId: 'u4',
    displayName: 'Денис Иванов',
    slug: 'denis-ivanov',
    bio: 'Специалист по спортивной реабилитации и кинезиологии. Работаю с профессиональными спортсменами и любителями.',
    specializations: ['Реабилитация', 'Кинезиология', 'Спортивная медицина'],
    certifications: ['CSCS', 'FMS Certified'],
    experience: 12,
    rating: 5.0,
    reviewsCount: 278,
    priceRange: '3000-4000 ₽/час',
    availableForOnline: false,
    availableForOffline: true,
    locations: ['Москва'],
    socialLinks: {},
    gallery: [],
  },
  {
    id: '5',
    userId: 'u5',
    displayName: 'Елена Петрова',
    slug: 'elena-petrova',
    bio: 'Психолог, специализирующийся на работе со спортсменами и людьми, ведущими активный образ жизни.',
    specializations: ['Психология', 'Спортивная психология', 'Мотивация'],
    certifications: ['Licensed Psychologist'],
    experience: 6,
    rating: 4.7,
    reviewsCount: 98,
    priceRange: '3500-4500 ₽/час',
    availableForOnline: true,
    availableForOffline: true,
    locations: ['Москва', 'Онлайн'],
    socialLinks: {},
    gallery: [],
  },
];

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<TrainerProfile[]>(mockTrainers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  useEffect(() => {
    // Filter and sort trainers
    let filtered = [...mockTrainers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(t =>
        t.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specializations.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Specialization filter
    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(t =>
        t.specializations.some(s => s.toLowerCase().includes(selectedSpecialization.toLowerCase()))
      );
    }

    // Online only filter
    if (showOnlineOnly) {
      filtered = filtered.filter(t => t.availableForOnline);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'reviews':
          return b.reviewsCount - a.reviewsCount;
        case 'price-low':
          return 0; // Would need price parsing
        case 'price-high':
          return 0; // Would need price parsing
        case 'newest':
          return 0; // Would need createdAt
        default:
          return 0;
      }
    });

    setTrainers(filtered);
  }, [searchQuery, selectedSpecialization, sortBy, showOnlineOnly]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Поиск специалистов 👨‍🏫</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Найдите идеального тренера, нутрициолога или психолога
          </p>
        </div>
        <Link href="/dashboard/trainers/become" className="btn btn-primary">
          Стать специалистом
        </Link>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="relative mb-4">
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
              placeholder="Поиск по имени, специализации или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="online-only"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="w-4 h-4 rounded border-[var(--border-default)] bg-[var(--bg-tertiary)] text-violet-500"
              />
              <label htmlFor="online-only" className="text-sm text-[var(--text-secondary)] cursor-pointer">
                Только онлайн
              </label>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Specializations */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {specializations.map((spec) => (
          <button
            key={spec.id}
            onClick={() => setSelectedSpecialization(spec.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedSpecialization === spec.id
                ? 'bg-violet-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{spec.icon}</span>
            <span>{spec.name}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-[var(--text-secondary)]">
        Найдено специалистов: <span className="font-medium text-[var(--text-primary)]">{trainers.length}</span>
      </div>

      {/* Trainers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <Card key={trainer.id} hover clickable>
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar name={trainer.displayName} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold truncate">{trainer.displayName}</h3>
                    {trainer.rating && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-medium">{trainer.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                    {trainer.bio}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {trainer.specializations.slice(0, 2).map((spec) => (
                      <Badge key={spec} variant="default" size="sm">{spec}</Badge>
                    ))}
                    {trainer.specializations.length > 2 && (
                      <Badge variant="default" size="sm">+{trainer.specializations.length - 2}</Badge>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Опыт</span>
                  <span className="font-medium">{trainer.experience} лет</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Отзывы</span>
                  <span className="font-medium">{trainer.reviewsCount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Цена</span>
                  <span className="font-medium text-violet-400">{trainer.priceRange}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {trainer.availableForOnline && (
                    <Badge variant="success" size="sm">Онлайн</Badge>
                  )}
                  {trainer.availableForOffline && (
                    <Badge variant="info" size="sm">Офлайн</Badge>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/trainers/${trainer.slug}`}
                  className="btn btn-primary flex-1"
                >
                  Профиль
                </Link>
                <Button variant="secondary" size="sm">
                  💬
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {trainers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-[var(--text-secondary)] mb-2">Специалисты не найдены</p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Попробуйте изменить параметры поиска
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

