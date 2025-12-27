'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

interface UserProfile {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  stats: {
    workouts: number;
    achievements: number;
    challenges: number;
    followers: number;
    following: number;
  };
  achievements: any[];
  recentActivity: any[];
}

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'achievements'>('overview');
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Fetch user profile
    const fetchProfile = async () => {
      try {
        // const data = await api.get(`/users/${userId}/profile`);
        // setProfile(data);
        
        // Mock data
        setProfile({
          id: userId,
          name: 'Иван Иванов',
          bio: 'Люблю спорт и здоровый образ жизни. Активно занимаюсь фитнесом и участвую в челленджах.',
          stats: {
            workouts: 156,
            achievements: 23,
            challenges: 8,
            followers: 234,
            following: 89,
          },
          achievements: [],
          recentActivity: [],
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

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

  if (!profile) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">😕</span>
        <h2 className="heading-3 mb-2">Профиль не найден</h2>
        <p className="text-[var(--text-secondary)]">Такого пользователя не существует</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="relative">
        <div className="h-48 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative -mt-16 px-8 pb-8">
          <div className="flex items-end gap-6">
            <Avatar name={profile.name} size="2xl" className="ring-4 ring-[var(--bg-secondary)]" />
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              {profile.bio && (
                <p className="text-white/80 mb-4">{profile.bio}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setIsFollowing(!isFollowing)}>
                {isFollowing ? '✓ Подписка' : '+ Подписаться'}
              </Button>
              <Button variant="secondary">💬 Сообщение</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-violet-400 mb-1">{profile.stats.workouts}</div>
            <div className="text-xs text-[var(--text-secondary)]">Тренировок</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-amber-400 mb-1">{profile.stats.achievements}</div>
            <div className="text-xs text-[var(--text-secondary)]">Достижений</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-emerald-400 mb-1">{profile.stats.challenges}</div>
            <div className="text-xs text-[var(--text-secondary)]">Челленджей</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-400 mb-1">{profile.stats.followers}</div>
            <div className="text-xs text-[var(--text-secondary)]">Подписчиков</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-1">{profile.stats.following}</div>
            <div className="text-xs text-[var(--text-secondary)]">Подписок</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'overview', label: 'Обзор', icon: '📊' },
          { id: 'activity', label: 'Активность', icon: '📰' },
          { id: 'achievements', label: 'Достижения', icon: '🏆' },
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

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">📊</span>
                <p className="text-[var(--text-secondary)]">Статистика скоро появится</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'activity' && (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">📰</span>
                <p className="text-[var(--text-secondary)]">Активность скоро появится</p>
              </CardContent>
            </Card>
          )}

          {activeTab === 'achievements' && (
            <Card>
              <CardContent className="p-12 text-center">
                <span className="text-6xl mb-4 block">🏆</span>
                <p className="text-[var(--text-secondary)]">Достижения скоро появятся</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Тренировок</span>
                <span className="font-medium">{profile.stats.workouts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Достижений</span>
                <span className="font-medium">{profile.stats.achievements}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">Челленджей</span>
                <span className="font-medium">{profile.stats.challenges}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

