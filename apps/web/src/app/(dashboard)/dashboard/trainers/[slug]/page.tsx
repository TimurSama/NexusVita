'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar, Input } from '@/components/ui';
import { trainerApi, TrainerProfile } from '@/lib/api';

interface TrainerPageData extends TrainerProfile {
  posts?: any[];
  programs?: any[];
  schedule?: any;
  reviews?: any[];
  stats?: {
    totalClients: number;
    totalSessions: number;
    completionRate: number;
  };
}

export default function TrainerProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [trainer, setTrainer] = useState<TrainerPageData | null>(null);
  const [activeTab, setActiveTab] = useState<'about' | 'programs' | 'posts' | 'reviews' | 'schedule'>('about');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch trainer data
    const fetchTrainer = async () => {
      try {
        // const data = await trainerApi.getTrainerPage(slug);
        // setTrainer(data);
        
        // Mock data for now
        setTrainer({
          id: '1',
          userId: 'u1',
          displayName: 'Алекс Петров',
          slug: slug,
          bio: 'Сертифицированный фитнес-тренер с 10-летним опытом. Специализация: силовые тренировки, функциональный тренинг, коррекция осанки. Помогаю людям достигать своих целей через индивидуальный подход и научно обоснованные методы тренировок.',
          specializations: ['Фитнес', 'Силовые тренировки', 'Функциональный тренинг', 'Коррекция осанки'],
          certifications: ['ACSM Certified Personal Trainer', 'FMS Level 2', 'NASM CPT'],
          experience: 10,
          rating: 4.9,
          reviewsCount: 234,
          priceRange: '2000-3000 ₽/час',
          availableForOnline: true,
          availableForOffline: true,
          locations: ['Москва', 'Онлайн'],
          gallery: [],
          posts: [],
          programs: [
            { id: '1', name: 'Программа для начинающих', duration: '12 недель', price: 15000 },
            { id: '2', name: 'Силовой тренинг', duration: '8 недель', price: 20000 },
          ],
          schedule: { availableSlots: [] },
          reviews: [],
          stats: {
            totalClients: 156,
            totalSessions: 2340,
            completionRate: 87,
          },
        });
      } catch (error) {
        console.error('Error fetching trainer:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTrainer();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500 mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!trainer) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">😕</span>
        <h2 className="heading-3 mb-2">Тренер не найден</h2>
        <p className="text-[var(--text-secondary)] mb-4">Такого специалиста не существует</p>
        <Link href="/dashboard/trainers" className="btn btn-primary">
          Вернуться к поиску
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="h-64 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-end gap-6">
              <Avatar name={trainer.displayName} size="2xl" className="ring-4 ring-[var(--bg-secondary)]" />
              <div className="flex-1 text-white">
                <h1 className="text-3xl font-bold mb-2">{trainer.displayName}</h1>
                <div className="flex items-center gap-4 mb-2">
                  {trainer.rating && (
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-300">⭐</span>
                      <span className="font-semibold">{trainer.rating}</span>
                      <span className="text-white/70">({trainer.reviewsCount} отзывов)</span>
                    </div>
                  )}
                  <Badge variant="success" size="sm" className="bg-white/20 text-white border-white/30">
                    {trainer.experience} лет опыта
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trainer.specializations.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="default" size="sm" className="bg-white/20 text-white border-white/30">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="lg">Записаться</Button>
                <Button variant="secondary" size="sm">💬 Написать</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      {trainer.stats && (
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-violet-400 mb-2">{trainer.stats.totalClients}</div>
              <div className="text-sm text-[var(--text-secondary)]">Клиентов</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">{trainer.stats.totalSessions}</div>
              <div className="text-sm text-[var(--text-secondary)]">Тренировок</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">{trainer.stats.completionRate}%</div>
              <div className="text-sm text-[var(--text-secondary)]">Завершение программ</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'about', label: 'О тренере', icon: '👤' },
          { id: 'programs', label: 'Программы', icon: '💪' },
          { id: 'posts', label: 'Публикации', icon: '📰' },
          { id: 'reviews', label: 'Отзывы', icon: '⭐' },
          { id: 'schedule', label: 'Расписание', icon: '📅' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-violet-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Tab */}
          {activeTab === 'about' && (
            <Card>
              <CardHeader>
                <CardTitle>О специалисте</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Биография</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{trainer.bio}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Специализации</h3>
                  <div className="flex flex-wrap gap-2">
                    {trainer.specializations.map((spec) => (
                      <Badge key={spec} variant="default">{spec}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Сертификаты</h3>
                  <div className="space-y-2">
                    {trainer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)]">
                        <span className="text-2xl">📜</span>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Форматы работы</h3>
                  <div className="space-y-2">
                    {trainer.availableForOnline && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)]">
                        <span className="text-2xl">💻</span>
                        <div>
                          <div className="font-medium">Онлайн тренировки</div>
                          <div className="text-sm text-[var(--text-secondary)]">Видеозвонки, удалённые консультации</div>
                        </div>
                      </div>
                    )}
                    {trainer.availableForOffline && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)]">
                        <span className="text-2xl">📍</span>
                        <div>
                          <div className="font-medium">Офлайн тренировки</div>
                          <div className="text-sm text-[var(--text-secondary)]">
                            {trainer.locations?.filter(l => l !== 'Онлайн').join(', ')}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <div className="space-y-4">
              {trainer.programs?.map((program) => (
                <Card key={program.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{program.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                          <span>⏱️ {program.duration}</span>
                          <span>💰 {program.price.toLocaleString()} ₽</span>
                        </div>
                      </div>
                      <Button>Выбрать</Button>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Индивидуальная программа тренировок с персональным подходом
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">📰</span>
                <p className="text-[var(--text-secondary)]">Публикации скоро появятся</p>
              </CardContent>
            </Card>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">⭐</span>
                <p className="text-[var(--text-secondary)]">Отзывы скоро появятся</p>
              </CardContent>
            </Card>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <Card>
              <CardHeader>
                <CardTitle>Расписание</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] text-center py-8">
                  Выберите удобное время для записи
                </p>
                <Button fullWidth>Посмотреть расписание</Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Контакты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">Цена</div>
                <div className="font-semibold text-violet-400">{trainer.priceRange}</div>
              </div>
              <div className="flex gap-2">
                <Button fullWidth>Записаться</Button>
                <Button variant="secondary" fullWidth>💬 Чат</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Опыт</span>
                <span className="font-medium">{trainer.experience} лет</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Рейтинг</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-medium">{trainer.rating}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Отзывов</span>
                <span className="font-medium">{trainer.reviewsCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}



