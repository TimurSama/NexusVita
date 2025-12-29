'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from '@/components/ui';
import { api } from '@/lib/api';
import { isTelegramWebApp, initTelegramWebApp, getTelegramReferralCode } from '@/lib/telegram';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const refCode = searchParams.get('ref') || getTelegramReferralCode();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    referralCode: refCode || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Initialize Telegram Web App if available
    initTelegramWebApp();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        referralCode: formData.referralCode || undefined,
      });

      if (response.data?.token) {
        // Store token
        api.setToken(response.data.token);
        
        // Redirect to dashboard
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  const handleTelegramAuth = async () => {
    try {
      const tg = initTelegramWebApp();
      if (!tg) {
        alert('Эта функция доступна только в Telegram');
        return;
      }

      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/telegram/mini-app/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ initData: tg.initData }),
      });

      if (response.ok) {
        const data = await response.json();
        api.setToken(data.token);
        router.push('/dashboard');
      } else {
        setError('Ошибка авторизации через Telegram');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при авторизации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-500 via-purple-600 to-pink-500">
      <Card className="max-w-md w-full border-0 shadow-2xl">
        <CardHeader className="text-center">
          <h1 className="heading-2 mb-2">Регистрация</h1>
          <p className="text-[var(--text-secondary)]">
            Создай аккаунт и начни свой путь к здоровью
          </p>
          {refCode && (
            <Badge variant="success" className="mt-2">
              🎁 Бонус за регистрацию: 50 NVT
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          {/* Telegram Auth Button */}
          {isTelegramWebApp() && (
            <div className="mb-6">
              <Button
                fullWidth
                size="lg"
                onClick={handleTelegramAuth}
                className="bg-[#0088cc] hover:bg-[#0077b5] text-white mb-4"
                disabled={loading}
              >
                <span>✈️</span>
                <span>Войти через Telegram</span>
              </Button>
              <div className="text-center text-sm text-[var(--text-secondary)] mb-4">
                или
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Имя"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Фамилия"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Пароль"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={8}
            />

            <Input
              label="Подтвердите пароль"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            {refCode && (
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                <div className="text-sm text-[var(--text-secondary)] mb-1">Реферальный код</div>
                <div className="font-mono font-bold text-violet-400">{refCode}</div>
                <div className="text-xs text-[var(--text-tertiary)] mt-1">
                  Ты получишь бонус при регистрации!
                </div>
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={loading}
            >
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-[var(--text-secondary)]">Уже есть аккаунт? </span>
              <Link href="/login" className="text-violet-400 hover:underline">
                Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}



