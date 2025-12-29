'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Feature cards data
const features = [
  {
    id: 'fitness',
    icon: '💪',
    title: 'Фитнес & Тренировки',
    description: 'Персональные программы, трекинг прогресса, виртуальные тренеры и Move-to-Earn вознаграждения',
    color: 'from-violet-500 to-purple-600',
    href: '/fitness',
  },
  {
    id: 'nutrition',
    icon: '🥗',
    title: 'Питание & Нутрициология',
    description: 'Персонализированные планы питания, подсчёт калорий, рецепты и консультации нутрициологов',
    color: 'from-emerald-500 to-teal-600',
    href: '/nutrition',
  },
  {
    id: 'medical',
    icon: '🏥',
    title: 'Здоровье & Медицина',
    description: 'Телемедицина, хранение анализов, интеграция с гаджетами и медицинская аналитика',
    color: 'from-blue-500 to-cyan-600',
    href: '/medical',
  },
  {
    id: 'psychology',
    icon: '🧠',
    title: 'Психология & Ментальное здоровье',
    description: 'Медитации, трекинг настроения, консультации психологов и антистресс программы',
    color: 'from-pink-500 to-rose-600',
    href: '/psychology',
  },
  {
    id: 'sexology',
    icon: '❤️‍🔥',
    title: 'Интимное здоровье',
    description: 'Анонимные консультации сексологов, образовательный контент и персональные рекомендации',
    color: 'from-red-500 to-pink-600',
    href: '/sexology',
  },
  {
    id: 'habits',
    icon: '📊',
    title: 'Привычки & Рутины',
    description: 'Трекинг привычек, утренние и вечерние рутины, челленджи и gamification',
    color: 'from-amber-500 to-orange-600',
    href: '/habits',
  },
  {
    id: 'lifestyle',
    icon: '🏠',
    title: 'Быт & Образ жизни',
    description: 'Сон, водный баланс, экранное время, организация дня и lifestyle-рекомендации',
    color: 'from-indigo-500 to-blue-600',
    href: '/lifestyle',
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Образование & Курсы',
    description: 'Библиотека знаний, онлайн-курсы, сертификации и экспертный контент',
    color: 'from-cyan-500 to-teal-600',
    href: '/education',
  },
];

const stats = [
  { value: '50K+', label: 'Активных пользователей', icon: '👥', trend: '+12%' },
  { value: '1200+', label: 'Специалистов', icon: '👨‍🏫', trend: '+8%' },
  { value: '500K+', label: 'NVT токенов в обороте', icon: '🪙', trend: '+25%' },
  { value: '95%', label: 'Удовлетворённость', icon: '⭐', trend: '+2%' },
];

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="gradient-blur gradient-blur-primary absolute -top-64 -left-64 opacity-20" />
        <div className="gradient-blur gradient-blur-accent absolute top-1/3 -right-64 opacity-15" />
        <div className="gradient-blur gradient-blur-secondary absolute -bottom-64 left-1/3 opacity-15" />
        <div className="mesh-gradient absolute inset-0" />
        <div className="grid-pattern absolute inset-0 opacity-30" />
      </div>

      {/* Header/Navigation */}
      <header className="relative z-50">
        <nav className="container py-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="text-xl font-bold text-gradient">Nexus Vita</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/roadmap" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Дорожная карта
            </Link>
            <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              О проекте
            </Link>
            <Link href="/trainers" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Специалисты
            </Link>
            <Link href="/marketplace" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Маркетплейс
            </Link>
            <Link href="/dao" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              DAO
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="btn btn-ghost">
              Войти
            </Link>
            <Link href="/register" className="btn btn-primary">
              Начать
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-default)] mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">
                Web3 экосистема здоровья и развития
              </span>
            </div>

            <h1 
              className={`heading-1 mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Ваше здоровье в{' '}
              <span className="text-gradient">децентрализованной</span>
              {' '}экосистеме
            </h1>

            <p 
              className={`body-large text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              Nexus Vita объединяет фитнес, медицину, психологию, образование и повседневную жизнь 
              в единой DAO-платформе с токеномикой, NFT-достижениями и Move-to-Earn механикой
            </p>

            <div 
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link href="/register" className="btn btn-primary btn-lg">
                <span>Присоединиться</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link href="/about" className="btn btn-secondary btn-lg">
                Узнать больше
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="group text-center p-6 rounded-2xl glass hover:glass-strong cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                <div className="text-sm text-[var(--text-secondary)] mb-1">{stat.label}</div>
                <div className="text-xs text-green-400 font-medium flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  {stat.trend} за месяц
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Полная экосистема для вашего развития</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Все аспекты здоровья и личностного роста в одном месте — 
              от физических тренировок до ментального благополучия
            </p>
          </div>

          <div className="grid-auto-fill">
            {features.map((feature, index) => (
              <Link
                key={feature.id}
                href={feature.href}
                className={`card group cursor-pointer opacity-0 animate-fade-in-up relative overflow-hidden hover:border-[var(--primary-500)] transition-all duration-300`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon with glow effect */}
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:shadow-[var(--primary-500)]/30`}>
                    {feature.icon}
                  </div>
                  <h3 className="heading-4 mb-2 group-hover:text-[var(--primary-400)] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] body-small group-hover:text-[var(--text-primary)] transition-colors">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-[var(--primary-400)] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                    <span>Подробнее</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Web3/DAO Section */}
      <section className="relative z-10 py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-900)] text-[var(--primary-400)] text-sm font-medium mb-6">
                Web3 & DAO
              </span>
              <h2 className="heading-2 mb-6">
                Децентрализованное управление и токеномика
              </h2>
              <p className="body-large text-[var(--text-secondary)] mb-8">
                NVT токен даёт право голоса в DAO, открывает премиум-функции 
                и позволяет зарабатывать на активном образе жизни через 
                Move-to-Earn и Health-to-Earn механики.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  { icon: '🪙', text: 'NVT токен для транзакций и голосования' },
                  { icon: '🏆', text: 'NFT достижения и сертификаты' },
                  { icon: '📜', text: 'SBT репутация специалистов' },
                  { icon: '💰', text: 'Стейкинг для премиум-доступа' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[var(--text-secondary)]">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/dao" className="btn btn-accent">
                Участвовать в DAO
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 p-8 border border-[var(--border-default)] hover:border-[var(--primary-500)] transition-all duration-300 group">
                <div className="w-full h-full rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center relative overflow-hidden">
                  {/* Animated background particles */}
                  <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-violet-400/30 animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Token visualization */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 animate-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                      <span className="text-6xl font-bold text-white drop-shadow-lg">NVT</span>
                    </div>
                  </div>
                  
                  {/* Orbiting elements */}
                  <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center text-xl shadow-lg group-hover:scale-125 transition-transform">
                      🏆
                    </div>
                  </div>
                  <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-xl shadow-lg group-hover:scale-125 transition-transform">
                      💎
                    </div>
                  </div>
                  <div className="absolute w-full h-full animate-spin" style={{ animationDuration: '15s' }}>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-lg shadow-lg group-hover:scale-125 transition-transform">
                      🪙
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialists Section */}
      <section className="relative z-10 py-24 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">Станьте частью экосистемы</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Тренеры, нутрициологи, психологи и другие специалисты могут создать 
              свою мини-страницу и привлекать клиентов через Telegram и веб
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg shadow-violet-500/30">
                👨‍🏫
              </div>
              <h3 className="heading-4 mb-3">Создайте страницу</h3>
              <p className="text-[var(--text-secondary)]">
                Модульный конструктор с публикациями, расписанием, магазином и видеозвонками
              </p>
            </div>

            <div className="card text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30">
                📱
              </div>
              <h3 className="heading-4 mb-3">Telegram интеграция</h3>
              <p className="text-[var(--text-secondary)]">
                Ваша страница как Mini App, встроенный чат и оплата через Telegram Stars
              </p>
            </div>

            <div className="card text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 mx-auto mb-6 flex items-center justify-center text-4xl shadow-lg shadow-amber-500/30">
                💸
              </div>
              <h3 className="heading-4 mb-3">Монетизация</h3>
              <p className="text-[var(--text-secondary)]">
                Продажа программ, абонементов, NFT-услуг и получение токенов NVT
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/become-trainer" className="btn btn-primary btn-lg">
              Стать специалистом
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600" />
            <div className="absolute inset-0 mesh-gradient opacity-50" />
            
            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="heading-2 text-white mb-6">
                Готовы начать путь к лучшей версии себя?
              </h2>
              <p className="body-large text-white/80 mb-10 max-w-2xl mx-auto">
                Присоединяйтесь к тысячам пользователей, которые уже трансформируют 
                свою жизнь с Nexus Vita
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link 
                  href="/register" 
                  className="btn btn-lg bg-white text-violet-600 hover:bg-white/90 transition-colors"
                >
                  Создать аккаунт
                </Link>
                <Link 
                  href="/telegram" 
                  className="btn btn-lg bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.057-.693-1.654-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.093.034.306.019.472z"/>
                  </svg>
                  <span>Открыть в Telegram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 border-t border-[var(--border-subtle)]">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                  N
                </div>
                <span className="text-xl font-bold">Nexus Vita</span>
              </Link>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Децентрализованная экосистема для здоровья, фитнеса и личностного развития
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.057-.693-1.654-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.009-1.252-.242-1.865-.442-.751-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.015 3.333-1.386 4.025-1.627 4.477-1.635.099-.002.321.023.465.141.121.099.154.232.17.325.015.093.034.306.019.472z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Платформа</h4>
              <ul className="space-y-3">
                <li><Link href="/fitness" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Фитнес</Link></li>
                <li><Link href="/nutrition" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Питание</Link></li>
                <li><Link href="/medical" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Здоровье</Link></li>
                <li><Link href="/psychology" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Психология</Link></li>
                <li><Link href="/education" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Образование</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Web3</h4>
              <ul className="space-y-3">
                <li><Link href="/dao" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">DAO управление</Link></li>
                <li><Link href="/token" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">NVT токен</Link></li>
                <li><Link href="/nft" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">NFT коллекции</Link></li>
                <li><Link href="/staking" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Стейкинг</Link></li>
                <li><Link href="/marketplace" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Маркетплейс</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Центр помощи</Link></li>
                <li><Link href="/docs" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Документация</Link></li>
                <li><Link href="/api" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">API</Link></li>
                <li><Link href="/contact" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Контакты</Link></li>
                <li><Link href="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors text-sm">Конфиденциальность</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-tertiary)] text-sm">
              © 2024 Nexus Vita. Все права защищены.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors text-sm">
                Условия использования
              </Link>
              <Link href="/privacy" className="text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors text-sm">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

