'use client'

import { Sparkles, Users, TrendingUp, Calendar, CheckCircle } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const healthContours = [
  'Кардиометаболическое здоровье и профилактика',
  'Гормональный баланс и эндокринология',
  'Сон, циркадные ритмы и восстановление',
  'Психическое здоровье и стресс-менеджмент',
  'Сексуальное и репродуктивное здоровье',
  'Питание, микробиом и нутрицевтики',
  'Спортивные показатели и биомеханика',
  'Реабилитация травм и хронической боли',
  'Иммунитет, воспаление и аллергии',
  'Когнитивные функции и нейропластичность',
  'Кожа, дерматология и здоровье волос',
  'Долголетие и биохакинг протоколы',
  'Стоматология и здоровье челюстно-лицевой зоны',
  'Зрение и офтальмология',
  'Экологическая среда, токсичная нагрузка, детокс',
  'Социальное здоровье и групповые практики',
]

const aiFeatures = [
  {
    title: 'ИИ-коуч 24/7',
    description: 'Планы, напоминания, коррекция привычек и мотивации.',
  },
  {
    title: 'AI-анализ данных',
    description: 'Сводка по метрикам, выявление рисков и трекерам.',
  },
  {
    title: 'Персональные протоколы',
    description: 'Сон, питание, тренировки, стресс — под вашу цель.',
  },
  {
    title: 'Терапевтические сценарии',
    description: 'Поддержка в восстановлении и хронических состояниях.',
  },
]

const tokenomics = [
  { label: 'Общий выпуск', value: '1 000 000 000 NVT' },
  { label: 'Продажа комьюнити', value: '18%' },
  { label: 'DAO-трезори', value: '22%' },
  { label: 'Экосистема и гранты', value: '20%' },
  { label: 'Команда и эксперты', value: '16% (вестинг 36 мес)' },
  { label: 'Ликвидность', value: '10%' },
  { label: 'Партнеры и интеграции', value: '14%' },
]

const roadmap = [
  {
    phase: 'Q2 2026',
    items: ['MVP соцсети', 'Единая медкарта', 'Платные подписки специалистов'],
  },
  {
    phase: 'Q3 2026',
    items: ['AI-коуч', 'Маркетплейс', 'Интеграция абонементов'],
  },
  {
    phase: 'Q4 2026',
    items: ['DAO голосования', 'Токен NVT', 'Гранты и акселератор'],
  },
  {
    phase: '2027',
    items: ['Глобальные клиники', 'Research Hub', 'RWA и страхование'],
  },
]

const saleStages = [
  { title: 'Allowlist', discount: '35%', focus: 'Ранние пользователи' },
  { title: 'Seed round', discount: '25%', focus: 'Стратегические партнёры' },
  { title: 'Public sale', discount: '15%', focus: 'Комьюнити' },
  { title: 'Launch', discount: '0%', focus: 'Маркетплейс и ликвидность' },
]

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <header className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-6 sm:gap-8 items-center animate-fadeIn">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800">
              Nexus Vita — DAO экосистема здоровья человека
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600">
              Единое пространство для метрик, специалистов, сообществ, подписок и
              токенизированных сервисов вокруг здоровья.
            </p>
            <div className="flex flex-wrap gap-3">
              <NeumorphicButton primary>Запросить доступ</NeumorphicButton>
              <NeumorphicButton>Презентация для инвесторов</NeumorphicButton>
            </div>
          </div>
          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="text-xs sm:text-sm uppercase tracking-widest text-warmGray-600">
              Витрувианская модель
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Человек как центральный интерфейс данных
            </h2>
            <p className="text-sm sm:text-base text-warmGraphite-600">
              Мы объединяем медицинские данные, образ жизни и сообщество в одной визуальной и
              понятной среде, похожей на чертежи Леонардо.
            </p>
          </NeumorphicCard>
        </header>

        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Контуры здоровья, которые покрывает экосистема
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {healthContours.map((item, index) => (
              <NeumorphicCard
                key={item}
                soft
                className="p-3 flex items-center gap-2 hover:scale-[1.02] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <span className="text-lg text-warmBlue-600">✦</span>
                <span className="text-xs sm:text-sm text-warmGraphite-700">{item}</span>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Подписка AI Health+
            </h2>
            <p className="text-sm sm:text-base text-warmGraphite-600 mb-4">
              Платный пакет, который включает персонального ИИ-ассистента, аналитическую панель и
              готовые протоколы улучшения здоровья.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {aiFeatures.map((feature, index) => (
                <NeumorphicCard
                  key={feature.title}
                  soft
                  className="p-4 hover:scale-[1.02] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-1">
                    {feature.title}
                  </div>
                  <div className="text-xs sm:text-sm text-warmGraphite-600">
                    {feature.description}
                  </div>
                </NeumorphicCard>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <NeumorphicButton primary>Оформить подписку</NeumorphicButton>
              <NeumorphicButton>Сравнить тарифы</NeumorphicButton>
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 space-y-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800">
              Сообщество и DAO
            </h2>
            <p className="text-sm sm:text-base text-warmGraphite-600">
              Управление экосистемой, гранты на исследования, голосования и распределение доходов
              через DAO.
            </p>
            <div className="space-y-3">
              {[
                'Голосование по протоколам лечения и сервисам',
                'Вознаграждения за участие и данные',
                'Казначейство на исследования здоровья',
              ].map((item, index) => (
                <NeumorphicCard
                  key={item}
                  soft
                  className="p-3 text-xs sm:text-sm text-warmGraphite-700 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  {item}
                </NeumorphicCard>
              ))}
            </div>
            <NeumorphicButton primary className="w-full">
              Подключиться к DAO
            </NeumorphicButton>
          </NeumorphicCard>
        </section>

        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
            Токеномика NVT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {tokenomics.map((item, index) => (
              <NeumorphicCard
                key={item.label}
                soft
                className="p-3 flex items-center justify-between hover:scale-[1.01] transition-transform animate-fadeIn"
                style={{ animationDelay: `${0.9 + index * 0.05}s` }}
              >
                <span className="text-xs sm:text-sm text-warmGraphite-700">{item.label}</span>
                <span className="font-semibold text-warmGraphite-800 text-xs sm:text-sm">
                  {item.value}
                </span>
              </NeumorphicCard>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NeumorphicCard soft className="p-4 text-xs sm:text-sm text-warmGraphite-700">
              Использование токена: оплата услуг специалистов, абонементов, подписок, голосования
              и доступ к премиальным исследованиям.
            </NeumorphicCard>
            <NeumorphicCard soft className="p-4 text-xs sm:text-sm text-warmGraphite-700">
              Механики: кэшбек за здоровье, стейкинг для доступа к клубам, делегирование голоса и
              начисление за качественные данные.
            </NeumorphicCard>
          </div>
        </NeumorphicCard>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '1s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Воронка продажи токенов
            </h2>
            <div className="space-y-3">
              {saleStages.map((stage, index) => (
                <NeumorphicCard
                  key={stage.title}
                  soft
                  className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${1.1 + index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base">
                      {stage.title}
                    </div>
                    <NeumorphicBadge variant="warning" size="sm">
                      Скидка {stage.discount}
                    </NeumorphicBadge>
                  </div>
                  <div className="text-xs sm:text-sm text-warmGraphite-600">{stage.focus}</div>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '1.2s' }}>
            <h2 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-4">
              Дорожная карта
            </h2>
            <div className="space-y-3">
              {roadmap.map((phase, index) => (
                <NeumorphicCard
                  key={phase.phase}
                  soft
                  className="p-4 hover:scale-[1.01] transition-transform animate-fadeIn"
                  style={{ animationDelay: `${1.3 + index * 0.1}s` }}
                >
                  <div className="font-semibold text-warmGraphite-800 text-sm sm:text-base mb-2">
                    {phase.phase}
                  </div>
                  <ul className="text-xs sm:text-sm text-warmGraphite-600 space-y-1">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-warmGreen-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </NeumorphicCard>
              ))}
            </div>
          </NeumorphicCard>
        </section>
      </div>
    </div>
  )
}
