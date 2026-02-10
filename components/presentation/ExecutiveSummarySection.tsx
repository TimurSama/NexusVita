'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, Globe2 } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

type View = 'user' | 'specialist' | 'partner'

export default function ExecutiveSummarySection() {
  const [view, setView] = useState<View>('user')
  const { lang } = useI18n()

  return (
    <section
      id="executive-summary"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            Executive Summary
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'NexusVita is an ecosystem platform for holistic management of health, lifestyle and personal development with a sustainable economic model.'
              : 'NexusVita — экосистемная платформа для комплексного управления здоровьем, образом жизни и развитием человека с устойчивой экономической моделью.'}
          </p>
        </motion.div>

        {/* Переключатель перспективы */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <span className="text-sm text-warmGraphite-600">
            {lang === 'en' ? 'Show value for:' : 'Показать ценность для:'}
          </span>
          <div className="flex gap-2">
            <ToggleChip
              icon={<Users className="w-4 h-4" />}
              label={lang === 'en' ? 'Users' : 'Пользователей'}
              active={view === 'user'}
              onClick={() => setView('user')}
            />
            <ToggleChip
              icon={<Briefcase className="w-4 h-4" />}
              label={lang === 'en' ? 'Specialists' : 'Специалистов'}
              active={view === 'specialist'}
              onClick={() => setView('specialist')}
            />
            <ToggleChip
              icon={<Globe2 className="w-4 h-4" />}
              label={lang === 'en' ? 'Partners' : 'Партнёров'}
              active={view === 'partner'}
              onClick={() => setView('partner')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Краткое описание */}
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Short overview of the ecosystem' : 'Краткое описание экосистемы'}
            </h3>
            <p className="text-sm sm:text-base text-warmGraphite-700 mb-3">
              {lang === 'en'
                ? 'NexusVita unites data tracking, recommendations, planning, social interaction, professional services and economic mechanisms in one coherent system.'
                : 'NexusVita объединяет отслеживание данных, рекомендации, планирование, социальное взаимодействие, профессиональные услуги и экономические механизмы в одной согласованной системе.'}
            </p>
            <ul className="space-y-1.5 text-sm text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• Long-term user support and guidance.'
                  : '• Долгосрочное сопровождение пользователя.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Connecting specialists and services as needs grow.'
                  : '• Подключение специалистов и сервисов по мере роста.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Embedded social and economic mechanisms.'
                  : '• Встроенные социальные и экономические механизмы.'}
              </li>
            </ul>
          </NeumorphicCard>

          {/* Ценность (динамический блок) */}
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Platform value' : 'Ценность платформы'}
            </h3>
            {view === 'user' && (
              <motion.div
                key="user"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5 text-sm text-warmGraphite-700"
              >
                <li>
                  {lang === 'en'
                    ? '• A holistic view of health and lifestyle.'
                    : '• Целостная картина здоровья и образа жизни.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Single interface for data, plans, goals and actions.'
                    : '• Единый интерфейс для данных, планов, целей и действий.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Personalised recommendations that reflect dynamics and constraints.'
                    : '• Персональные рекомендации с учётом динамики и ограничений.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Built-in calendar and planner.'
                    : '• Встроенный календарь и планировщик.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Social environment for support and joint activities.'
                    : '• Социальная среда поддержки и совместных активностей.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Access to vetted specialists and services.'
                    : '• Доступ к проверенным специалистам и сервисам.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Transparent subscription and rewards model.'
                    : '• Прозрачная модель подписок и вознаграждений.'}
                </li>
              </motion.div>
            )}
            {view === 'specialist' && (
              <motion.div
                key="specialist"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5 text-sm text-warmGraphite-700"
              >
                <li>
                  {lang === 'en'
                    ? '• Access to a highly targeted audience inside the ecosystem.'
                    : '• Доступ к целевой аудитории внутри экосистемы.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• User data context (with explicit consent).'
                    : '• Контекст данных пользователя (с согласия).'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Tools for managing programs and schedules.'
                    : '• Инструменты управления программами и расписаниями.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Integrated billing and payments.'
                    : '• Встроенная биллинговая инфраструктура.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Partnership and referral mechanics.'
                    : '• Партнёрские и реферальные механизмы.'}
                </li>
              </motion.div>
            )}
            {view === 'partner' && (
              <motion.div
                key="partner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1.5 text-sm text-warmGraphite-700"
              >
                <li>
                  {lang === 'en'
                    ? '• Channel for selling services and products, embedded in user journeys.'
                    : '• Канал продаж услуг и товаров, встроенный в сценарии.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Joint programs with centres and brands.'
                    : '• Совместные программы с центрами и брендами.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Ability to create new ecosystem projects.'
                    : '• Возможность создавать экосистемные проекты.'}
                </li>
                <li>
                  {lang === 'en'
                    ? '• Engagement and effectiveness metrics.'
                    : '• Метрики вовлечённости и эффективности.'}
                </li>
              </motion.div>
            )}
          </NeumorphicCard>

          {/* Экономика и масштабируемость */}
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Economics and scaling' : 'Экономика и масштабирование'}
            </h3>
            <p className="text-sm sm:text-base text-warmGraphite-700 mb-3">
              {lang === 'en'
                ? 'A combined monetisation model focused on recurring revenue and LTV growth.'
                : 'Комбинированная модель монетизации с фокусом на повторяющиеся доходы и рост LTV.'}
            </p>
            <ul className="space-y-1.5 text-sm text-warmGraphite-700 mb-3">
              <li>
                {lang === 'en'
                  ? '• User subscriptions for advanced features.'
                  : '• Подписка пользователей на расширенный функционал.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Commissions from the marketplace of services.'
                  : '• Комиссии с маркетплейса услуг и сервисов.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Paid professional accounts.'
                  : '• Платные профессиональные аккаунты.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Partnership and advertising mechanics.'
                  : '• Партнёрские и рекламные механизмы.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Ecosystem rewards and tokens.'
                  : '• Экосистемные вознаграждения и токены.'}
              </li>
            </ul>
            <p className="text-xs sm:text-sm text-warmGraphite-500">
              {lang === 'en'
                ? 'The architecture is modular and scalable: new products and segments are added without breaking the core.'
                : 'Архитектура модульная и масштабируемая: новые продукты и сегменты добавляются без разрушения ядра.'}
            </p>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}

interface ToggleChipProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function ToggleChip({ icon, label, active, onClick }: ToggleChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs sm:text-sm transition-all',
        active
          ? 'bg-warmBlue-500 text-white border-warmBlue-500 shadow-sm'
          : 'bg-warmBeige-50 text-warmGraphite-700 border-warmGray-300 hover:border-warmBlue-400'
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

