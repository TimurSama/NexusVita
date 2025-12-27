'use client';

import { useState, useEffect } from 'react';
import { InviteCard } from '@/components/invite/InviteCard';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/components/ui';
import { api, authApi } from '@/lib/api';
import { isTelegramWebApp } from '@/lib/telegram';

export default function ShareReferralPage() {
  const [referralData, setReferralData] = useState<{
    code: string;
    telegramLink: string;
    webLink: string;
    shareText: string;
  } | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

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

  const handleSendToContacts = async () => {
    if (!isTelegramWebApp()) {
      alert('Эта функция доступна только в Telegram');
      return;
    }

    try {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.requestContact((granted, contact) => {
          if (granted && contact) {
            // Send invite to contact
            const { telegramApi } = await import('@/lib/api');
            await telegramApi.sendInvite({
              telegramId: contact.contact.user_id?.toString(),
            });
            tg.showAlert('Приглашение отправлено!');
          }
        });
      }
    } catch (error) {
      console.error('Error sending to contacts:', error);
    }
  };

  const handleShareToGroup = () => {
    if (!referralData) return;

    const shareText = `🎉 Присоединяйся к Nexus Vita - экосистеме здоровья и фитнеса!

${referralData.shareText}

🔗 ${referralData.telegramLink}`;

    if (isTelegramWebApp()) {
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(referralData.telegramLink)}&text=${encodeURIComponent(shareText)}`);
      }
    } else {
      // Fallback for web
      navigator.share?.({
        title: 'Присоединяйся к Nexus Vita!',
        text: shareText,
        url: referralData.telegramLink,
      });
    }
  };

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
        <h1 className="heading-2 mb-2">Поделись с друзьями 🎁</h1>
        <p className="text-[var(--text-secondary)]">
          Отправь красивое приглашение через Telegram или соцсети
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

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        {isTelegramWebApp() && (
          <Card hover clickable>
            <CardContent className="p-6 text-center">
              <span className="text-5xl mb-4 block">📱</span>
              <h3 className="font-semibold mb-2">Отправить в Telegram</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                Выбери контакты из Telegram
              </p>
              <Button fullWidth onClick={handleSendToContacts}>
                Выбрать контакты
              </Button>
            </CardContent>
          </Card>
        )}

        <Card hover clickable>
          <CardContent className="p-6 text-center">
            <span className="text-5xl mb-4 block">👥</span>
            <h3 className="font-semibold mb-2">Поделиться в группе</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Отправить в Telegram группу или канал
            </p>
            <Button fullWidth onClick={handleShareToGroup}>
              Поделиться
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Как поделиться</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              step: '1',
              title: 'Выбери способ',
              description: 'Отправь через Telegram, скопируй ссылку или поделись в соцсетях',
            },
            {
              step: '2',
              title: 'Друг регистрируется',
              description: 'Твой друг переходит по ссылке и создаёт аккаунт',
            },
            {
              step: '3',
              title: 'Получай награды',
              description: 'Получай 100 NVT за каждого активного реферала',
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
    </div>
  );
}

