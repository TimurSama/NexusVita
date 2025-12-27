'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, Button, Avatar, Badge } from '@/components/ui';
import { api } from '@/lib/api';
import { initTelegramWebApp, getTelegramReferralCode, isTelegramWebApp } from '@/lib/telegram';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export default function TelegramPage() {
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Initialize Telegram Web App
    const tg = initTelegramWebApp();
    
    if (tg && tg.initDataUnsafe?.user) {
      // Get user data from Telegram
      setUser(tg.initDataUnsafe.user);
      authenticateUser(tg.initData);
    } else {
      // Not in Telegram or no user data
      setLoading(false);
    }
  }, []);

  const authenticateUser = async (initData: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/telegram/mini-app/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token
        localStorage.setItem('token', data.token);
        api.setToken(data.token);
        setAuthenticated(true);
        
        // Show main app button
        const tg = initTelegramWebApp();
        if (tg) {
          tg.MainButton.setText('Открыть приложение');
          tg.MainButton.show();
          tg.MainButton.onClick(() => {
            router.push('/dashboard');
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!user && isTelegramWebApp()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600 p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <span className="text-6xl mb-4 block">👋</span>
            <h1 className="heading-3 mb-4">Добро пожаловать в Nexus Vita!</h1>
            <p className="text-[var(--text-secondary)] mb-6">
              {refCode ? 'Ты перешёл по реферальной ссылке! Получишь бонус при регистрации.' : 'Экосистема здоровья и фитнеса с Web3 технологиями.'}
            </p>
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                const tg = initTelegramWebApp();
                if (tg) {
                  authenticateUser(tg.initData);
                }
              }}
            >
              Войти через Telegram
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 p-4">
      <div className="max-w-md mx-auto space-y-6 pt-8">
        {/* Welcome Card */}
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            {user && (
              <div className="mb-6">
                <Avatar
                  name={user.first_name}
                  size="xl"
                  className="mx-auto mb-4 ring-4 ring-white/20"
                />
                <h1 className="heading-2 text-white mb-2">
                  Привет, {user.first_name}! 👋
                </h1>
                {refCode && (
                  <Badge variant="success" size="lg" className="mt-2">
                    🎁 Бонус за регистрацию: 50 NVT
                  </Badge>
                )}
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur">
                <span className="text-3xl">💪</span>
                <div className="text-left">
                  <div className="font-semibold text-white">Персональные тренировки</div>
                  <div className="text-sm text-white/80">Индивидуальные программы</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur">
                <span className="text-3xl">🥗</span>
                <div className="text-left">
                  <div className="font-semibold text-white">Планы питания</div>
                  <div className="text-sm text-white/80">Сбалансированный рацион</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur">
                <span className="text-3xl">🪙</span>
                <div className="text-left">
                  <div className="font-semibold text-white">Зарабатывай токены</div>
                  <div className="text-sm text-white/80">Move-to-Earn и награды</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <div className="font-semibold text-white">Челленджи</div>
                  <div className="text-sm text-white/80">Участвуй и побеждай</div>
                </div>
              </div>
            </div>

            {authenticated ? (
              <Button
                fullWidth
                size="lg"
                onClick={() => {
                  router.push('/dashboard');
                }}
                className="bg-white text-violet-600 hover:bg-white/90"
              >
                Открыть приложение →
              </Button>
            ) : (
              <Button
                fullWidth
                size="lg"
                onClick={() => {
                  const tg = initTelegramWebApp();
                  if (tg) {
                    authenticateUser(tg.initData);
                  }
                }}
                className="bg-white text-violet-600 hover:bg-white/90"
              >
                Начать использовать
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Что тебя ждёт</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: '🧠', text: 'Психология и ментальное здоровье' },
              { icon: '📚', text: 'Образовательные курсы' },
              { icon: '👨‍🏫', text: 'Онлайн консультации специалистов' },
              { icon: '📊', text: 'Трекинг прогресса и аналитика' },
              { icon: '⛓️', text: 'Web3 интеграция и NFT' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-tertiary)]">
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

