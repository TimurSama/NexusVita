'use client';

import { useState } from 'react';
import { Card, CardContent, Button, Avatar, Badge } from '@/components/ui';
import { api } from '@/lib/api';

interface InviteCardProps {
  user: {
    name: string;
    avatarUrl?: string;
    referralCode: string;
  };
  onShare?: () => void;
}

export function InviteCard({ user, onShare }: InviteCardProps) {
  const [copied, setCopied] = useState(false);
  const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'nexusvita_bot';
  const telegramLink = `https://t.me/${botUsername}?start=${user.referralCode}`;
  const webLink = typeof window !== 'undefined' ? `${window.location.origin}/register?ref=${user.referralCode}` : '';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(telegramLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTelegramShare = async () => {
    try {
      const { telegramApi } = await import('@/lib/api');
      // Send invite via Telegram Bot API
      await telegramApi.sendInvite({
        telegramId: undefined, // Will use connected account
      });
      
      const { showTelegramAlert } = await import('@/lib/telegram');
      showTelegramAlert('Приглашение отправлено!');
    } catch (error) {
      console.error('Error sending invite:', error);
      alert('Ошибка при отправке приглашения');
    }
  };

  const handleSocialShare = (platform: string) => {
    const text = `🎉 ${user.name} приглашает тебя в Nexus Vita - экосистему здоровья и фитнеса!

💪 Персональные тренировки
🥗 Планы питания  
🧠 Психология и ментальное здоровье
🏆 Челленджи и награды
🪙 Зарабатывай NVT токены

🎁 Получи 50 NVT при регистрации!

Присоединяйся: ${telegramLink}

#NexusVita #Здоровье #Фитнес #Web3`;

    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(telegramLink)}`,
      vk: `https://vk.com/share.php?url=${encodeURIComponent(telegramLink)}&title=${encodeURIComponent('Nexus Vita - Экосистема здоровья')}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(telegramLink)}&text=${encodeURIComponent('Присоединяйся к Nexus Vita!')}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <Card className="border-0 shadow-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
      <CardContent className="p-8 relative">
        {/* Header */}
        <div className="text-center mb-6">
          <Avatar
            name={user.name}
            size="xl"
            className="mx-auto mb-4 ring-4 ring-white/30"
            src={user.avatarUrl}
          />
          <h2 className="text-2xl font-bold text-white mb-2">
            Присоединяйся к Nexus Vita! 🎉
          </h2>
          <p className="text-white/90">
            {user.name} приглашает тебя в экосистему здоровья и фитнеса
          </p>
        </div>

        {/* Benefits */}
        <div className="space-y-2 mb-6">
          {[
            { icon: '💪', text: 'Персональные тренировки' },
            { icon: '🥗', text: 'Планы питания' },
            { icon: '🧠', text: 'Психология и ментальное здоровье' },
            { icon: '🏆', text: 'Челленджи и награды' },
            { icon: '🪙', text: 'Зарабатывай NVT токены' },
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              <span className="text-2xl">{benefit.icon}</span>
              <span className="text-white font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>

        {/* Bonus Badge */}
        <div className="text-center mb-6">
          <Badge variant="success" size="lg" className="bg-white/20 text-white border-white/30 backdrop-blur">
            🎁 Бонус за регистрацию: 50 NVT токенов
          </Badge>
        </div>

        {/* Referral Code */}
        <div className="mb-6 p-4 rounded-xl bg-white/10 backdrop-blur-sm">
          <div className="text-sm text-white/80 mb-2">Твоя реферальная ссылка:</div>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 bg-white/20 rounded-lg text-white font-mono text-sm break-all">
              {telegramLink}
            </code>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              {copied ? '✓' : '📋'}
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Telegram Share */}
          {(() => {
            try {
              const { isTelegramWebApp } = require('@/lib/telegram');
              return isTelegramWebApp() && (
                <Button
                  fullWidth
                  size="lg"
                  onClick={handleTelegramShare}
                  className="bg-white text-violet-600 hover:bg-white/90 font-semibold"
                >
                  ✈️ Отправить в Telegram
                </Button>
              );
            } catch {
              return null;
            }
          })()}

          {/* Social Share */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              onClick={() => handleSocialShare('telegram')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              📱 Telegram
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSocialShare('vk')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              🔵 VK
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSocialShare('twitter')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              🐦 Twitter
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSocialShare('facebook')}
              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
            >
              📘 Facebook
            </Button>
          </div>

          {/* Copy Link */}
          <Button
            variant="secondary"
            fullWidth
            onClick={handleCopy}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            {copied ? '✓ Ссылка скопирована!' : '📋 Копировать ссылку'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

