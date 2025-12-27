'use client';

import { useState, useEffect } from 'react';
import { InviteCard } from '@/components/invite/InviteCard';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { api, authApi } from '@/lib/api';

export default function InvitePage() {
  const [referralData, setReferralData] = useState<{
    code: string;
    telegramLink: string;
    webLink: string;
    shareText: string;
  } | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user profile
        const userData = await authApi.getMe();
        setUser(userData);

        // Get referral link
        const { telegramApi } = await import('@/lib/api');
        const referral = await telegramApi.getReferralLink();
        if (referral.data) {
          setReferralData(referral.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  if (!referralData || !user) {
    return (
      <div className="text-center py-12">
        <span className="text-6xl mb-4 block">😕</span>
        <p className="text-[var(--text-secondary)]">Не удалось загрузить данные</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="heading-2 mb-2">Пригласи друзей 🎉</h1>
        <p className="text-[var(--text-secondary)]">
          Получай награды за каждого приглашённого друга
        </p>
      </div>

      {/* Invite Card */}
      <InviteCard
        user={{
          name: user.profile?.displayName || user.email,
          avatarUrl: user.profile?.avatarUrl,
          referralCode: referralData.code,
        }}
      />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-violet-400 mb-2">0</div>
            <div className="text-sm text-[var(--text-secondary)]">Приглашено</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">0</div>
            <div className="text-sm text-[var(--text-secondary)]">Заработано NVT</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-2">0</div>
            <div className="text-sm text-[var(--text-secondary)]">Активных</div>
          </CardContent>
        </Card>
      </div>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>Как это работает</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              step: '1',
              title: 'Поделись ссылкой',
              description: 'Отправь реферальную ссылку друзьям через Telegram или соцсети',
            },
            {
              step: '2',
              title: 'Друг регистрируется',
              description: 'Твой друг переходит по ссылке и регистрируется в Nexus Vita',
            },
            {
              step: '3',
              title: 'Получай награды',
              description: 'Получай 100 NVT токенов за каждого активного реферала',
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 rounded-xl bg-[var(--bg-tertiary)]">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Referral Code Display */}
      <Card>
        <CardHeader>
          <CardTitle>Твой реферальный код</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-tertiary)] mb-4">
            <code className="flex-1 text-2xl font-mono font-bold text-violet-400">
              {referralData.code}
            </code>
            <Button
              variant="secondary"
              onClick={async () => {
                await navigator.clipboard.writeText(referralData.code);
                alert('Код скопирован!');
              }}
            >
              📋 Копировать
            </Button>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Друзья могут использовать этот код при регистрации или перейти по твоей ссылке
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

