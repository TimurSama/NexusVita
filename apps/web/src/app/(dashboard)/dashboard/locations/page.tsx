'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, Badge, Button, Input } from '@/components/ui';

interface Location {
  id: string;
  name: string;
  type: 'gym' | 'studio' | 'clinic' | 'wellness' | 'sports';
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  priceRange: string;
  amenities: string[];
  image?: string;
  distance?: number;
  isOpen: boolean;
  workingHours: string;
}

const locationTypes = [
  { id: 'all', name: 'Все', icon: '🌐' },
  { id: 'gym', name: 'Спортзалы', icon: '💪' },
  { id: 'studio', name: 'Студии', icon: '🧘' },
  { id: 'clinic', name: 'Клиники', icon: '🏥' },
  { id: 'wellness', name: 'Wellness', icon: '✨' },
  { id: 'sports', name: 'Спорткомплексы', icon: '⚽' },
];

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Fitness First Premium',
    type: 'gym',
    address: 'ул. Тверская, 10',
    city: 'Москва',
    rating: 4.8,
    reviewsCount: 456,
    priceRange: '3000-5000 ₽/мес',
    amenities: ['Тренажёры', 'Бассейн', 'Сауна', 'Парковка'],
    distance: 1.2,
    isOpen: true,
    workingHours: '06:00 - 23:00',
  },
  {
    id: '2',
    name: 'Yoga Studio Harmony',
    type: 'studio',
    address: 'пр. Невский, 45',
    city: 'Санкт-Петербург',
    rating: 4.9,
    reviewsCount: 234,
    priceRange: '2000-3500 ₽/мес',
    amenities: ['Йога', 'Медитация', 'Пилатес', 'Кафе'],
    distance: 2.5,
    isOpen: true,
    workingHours: '08:00 - 21:00',
  },
  {
    id: '3',
    name: 'Wellness Center Vitality',
    type: 'wellness',
    address: 'ул. Ленина, 25',
    city: 'Москва',
    rating: 4.7,
    reviewsCount: 189,
    priceRange: '5000-8000 ₽/мес',
    amenities: ['SPA', 'Массаж', 'Бассейн', 'Ресторан'],
    distance: 3.8,
    isOpen: true,
    workingHours: '09:00 - 22:00',
  },
  {
    id: '4',
    name: 'Rehab Clinic Pro',
    type: 'clinic',
    address: 'ул. Мира, 15',
    city: 'Москва',
    rating: 5.0,
    reviewsCount: 123,
    priceRange: 'По записи',
    amenities: ['Реабилитация', 'Физиотерапия', 'Массаж', 'Консультации'],
    distance: 5.2,
    isOpen: false,
    workingHours: '10:00 - 19:00',
  },
  {
    id: '5',
    name: 'Sports Complex Arena',
    type: 'sports',
    address: 'пр. Победы, 100',
    city: 'Москва',
    rating: 4.6,
    reviewsCount: 567,
    priceRange: '4000-6000 ₽/мес',
    amenities: ['Футбол', 'Теннис', 'Баскетбол', 'Кафе'],
    distance: 7.5,
    isOpen: true,
    workingHours: '07:00 - 23:00',
  },
];

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  const cities = ['all', ...Array.from(new Set(mockLocations.map(l => l.city)))];

  useEffect(() => {
    let filtered = [...mockLocations];

    if (searchQuery) {
      filtered = filtered.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(l => l.type === selectedType);
    }

    if (selectedCity !== 'all') {
      filtered = filtered.filter(l => l.city === selectedCity);
    }

    setLocations(filtered);
  }, [searchQuery, selectedType, selectedCity]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Поиск локаций 📍</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Найдите фитнес-клубы, студии и wellness-центры рядом с вами
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-violet-500 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-violet-500 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'map' ? 'bg-violet-500 text-white' : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
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
              placeholder="Поиск по названию или адресу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl text-sm"
            >
              {cities.map(city => (
                <option key={city} value={city}>
                  {city === 'all' ? 'Все города' : city}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Location Types */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {locationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedType === type.id
                ? 'bg-violet-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.name}</span>
          </button>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-sm text-[var(--text-secondary)]">
        Найдено локаций: <span className="font-medium text-[var(--text-primary)]">{locations.length}</span>
      </div>

      {/* Locations Grid/List */}
      {viewMode === 'grid' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.id} hover clickable>
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-violet-500 to-cyan-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  {location.type === 'gym' && '💪'}
                  {location.type === 'studio' && '🧘'}
                  {location.type === 'clinic' && '🏥'}
                  {location.type === 'wellness' && '✨'}
                  {location.type === 'sports' && '⚽'}
                </div>
                <div className="absolute top-3 right-3">
                  {location.isOpen ? (
                    <Badge variant="success" size="sm">Открыто</Badge>
                  ) : (
                    <Badge variant="default" size="sm">Закрыто</Badge>
                  )}
                </div>
                {location.distance && (
                  <div className="absolute bottom-3 left-3">
                    <Badge variant="info" size="sm">📍 {location.distance} км</Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {location.address}, {location.city}
                </p>
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-medium">{location.rating}</span>
                    <span className="text-[var(--text-tertiary)]">({location.reviewsCount})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {location.amenities.slice(0, 3).map((amenity) => (
                    <Badge key={amenity} variant="default" size="sm">{amenity}</Badge>
                  ))}
                  {location.amenities.length > 3 && (
                    <Badge variant="default" size="sm">+{location.amenities.length - 3}</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-[var(--text-secondary)]">{location.workingHours}</span>
                  <span className="text-sm font-medium text-violet-400">{location.priceRange}</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/locations/${location.id}`}
                    className="btn btn-primary flex-1"
                  >
                    Подробнее
                  </Link>
                  <Button variant="secondary" size="sm">
                    📍
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="space-y-4">
          {locations.map((location) => (
            <Card key={location.id} hover clickable>
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-5xl flex-shrink-0">
                    {location.type === 'gym' && '💪'}
                    {location.type === 'studio' && '🧘'}
                    {location.type === 'clinic' && '🏥'}
                    {location.type === 'wellness' && '✨'}
                    {location.type === 'sports' && '⚽'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {location.address}, {location.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {location.isOpen ? (
                          <Badge variant="success" size="sm">Открыто</Badge>
                        ) : (
                          <Badge variant="default" size="sm">Закрыто</Badge>
                        )}
                        {location.distance && (
                          <Badge variant="info" size="sm">📍 {location.distance} км</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="font-medium">{location.rating}</span>
                        <span className="text-[var(--text-tertiary)]">({location.reviewsCount})</span>
                      </div>
                      <span className="text-[var(--text-secondary)]">{location.workingHours}</span>
                      <span className="font-medium text-violet-400">{location.priceRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {location.amenities.map((amenity) => (
                        <Badge key={amenity} variant="default" size="sm">{amenity}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/locations/${location.id}`}
                        className="btn btn-primary"
                      >
                        Подробнее
                      </Link>
                      <Button variant="secondary">📍 На карте</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {viewMode === 'map' && (
        <Card>
          <CardContent className="p-12 text-center">
            <span className="text-6xl mb-4 block">🗺️</span>
            <p className="text-[var(--text-secondary)] mb-2">Карта локаций</p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Интеграция с картами будет добавлена в следующей версии
            </p>
          </CardContent>
        </Card>
      )}

      {locations.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <span className="text-6xl mb-4 block">🔍</span>
            <p className="text-[var(--text-secondary)] mb-2">Локации не найдены</p>
            <p className="text-sm text-[var(--text-tertiary)]">
              Попробуйте изменить параметры поиска
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

