'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Avatar } from '@/components/ui';
import { api, authApi, User } from '@/lib/api';

const navigation = [
  { name: 'Главная', href: '/dashboard', icon: '🏠' },
  { name: 'Лента', href: '/dashboard/feed', icon: '📰' },
  { name: 'Тренировки', href: '/dashboard/fitness', icon: '💪' },
  { name: 'Питание', href: '/dashboard/nutrition', icon: '🥗' },
  { name: 'Здоровье', href: '/dashboard/medical', icon: '🏥' },
  { name: 'Психология', href: '/dashboard/psychology', icon: '🧠' },
  { name: 'Привычки', href: '/dashboard/habits', icon: '📊' },
  { name: 'Образование', href: '/dashboard/education', icon: '📚' },
  { name: 'Специалисты', href: '/dashboard/trainers', icon: '👨‍🏫' },
  { name: 'Локации', href: '/dashboard/locations', icon: '📍' },
  { name: 'Челленджи', href: '/dashboard/challenges', icon: '🏆' },
  { name: 'Маркетплейс', href: '/dashboard/marketplace', icon: '🛒' },
  { name: 'DAO', href: '/dashboard/dao', icon: '🗳️' },
  { name: 'Рефералы', href: '/dashboard/referrals', icon: '💰' },
  { name: 'Чат', href: '/dashboard/chat', icon: '💬' },
];

const bottomNavigation = [
  { name: 'Интеграции', href: '/dashboard/integrations', icon: '🔗' },
  { name: 'Web3', href: '/dashboard/web3', icon: '⛓️' },
  { name: 'Настройки', href: '/dashboard/settings', icon: '⚙️' },
  { name: 'Помощь', href: '/dashboard/help', icon: '❓' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = api.getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchUser = async () => {
      const response = await authApi.getMe();
      if (response.data) {
        setUser(response.data);
      } else {
        router.push('/login');
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await authApi.logout();
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 animate-pulse" />
          <div className="text-[var(--text-secondary)]">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border-subtle)]
          transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[var(--border-subtle)]">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                N
              </div>
              <span className="text-xl font-bold text-gradient">Nexus Vita</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                      ? 'bg-violet-500/10 text-violet-400'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="p-4 space-y-1 border-t border-[var(--border-subtle)]">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                      ? 'bg-violet-500/10 text-violet-400'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }
                  `}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* User section */}
          <div className="p-4 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <Avatar name={user?.name} size="md" status="online" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{user?.name}</div>
                <div className="text-xs text-[var(--text-tertiary)] truncate">{user?.email}</div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-red-400 transition-colors"
                title="Выйти"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 -ml-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] lg:hidden"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Search */}
              <div className="relative hidden sm:block">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="search"
                  placeholder="Поиск..."
                  className="w-64 pl-10 pr-4 py-2 text-sm bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-xl placeholder:text-[var(--text-muted)] focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Token balance */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 rounded-full">
                <span className="text-violet-400">🪙</span>
                <span className="font-medium text-violet-400">1,250 NVT</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User menu (mobile) */}
              <Link href="/dashboard/profile" className="lg:hidden">
                <Avatar name={user?.name} size="sm" status="online" />
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

