'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Users, Target } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

type Lens = 'user' | 'specialist' | 'platform'

export default function MarketAnalysisSection() {
  const [lens, setLens] = useState<Lens>('user')
  const { lang } = useI18n()

  return (
    <section
      id="market-analysis"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
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
            {lang === 'en' ? 'Market and challenges' : 'Рынок и проблематика'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Digital health and wellness are growing, but the market is fragmented: separate apps for activity, nutrition, sleep, training and communication with specialists.'
              : 'Digital health растёт, но рынок фрагментирован: отдельные приложения для активности, питания, сна, тренировок и общения со специалистами.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Market state' : 'Состояние рынка'}
            </h3>
            <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• Growth of the digital health and wellness market.'
                  : '• Рост рынка digital health и wellness.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• High fragmentation of solutions.'
                  : '• Высокая фрагментация решений.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Apps cover narrow tasks: trackers, nutrition, sleep, calendars, specialists.'
                  : '• Приложения закрывают узкие задачи: трекеры, питание, сон, календари, специалисты.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• No unified context connecting data and actions.'
                  : '• Нет единого контекста данных и действий.'}
              </li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Key problems' : 'Основные проблемы'}
            </h3>
            <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• No single context and end-to-end logic.'
                  : '• Отсутствие единого контекста и сквозной логики.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Weak integration between functions and services.'
                  : '• Слабая интеграция между функциями и сервисами.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Gap between recommendations and real actions.'
                  : '• Разрыв между рекомендациями и реальными действиями.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• No embedded social and professional support.'
                  : '• Нет встроенного социального и профессионального сопровождения.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Low long-term engagement and retention.'
                  : '• Низкая долгосрочная вовлечённость и удержание.'}
              </li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Market need' : 'Потребность рынка'}
            </h3>
            <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• A single platform for data, plans, actions and results.'
                  : '• Единая платформа данных, планов, действий и результатов.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Reduced complexity and cognitive load for the user.'
                  : '• Снижение сложности и когнитивной нагрузки для пользователя.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Unified interaction loop for people, specialists and businesses.'
                  : '• Общий контур взаимодействия людей, специалистов и бизнеса.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Ecosystem model instead of a set of disconnected services.'
                  : '• Экосистемная модель вместо набора сервисов.'}
              </li>
            </ul>
          </NeumorphicCard>
        </div>

        {/* Линза восприятия: пользователь / специалист / платформа */}
        <div className="mb-4 sm:mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <LensChip
              icon={<Users className="w-4 h-4" />}
              label={lang === 'en' ? 'User view' : 'Глазами пользователя'}
              active={lens === 'user'}
              onClick={() => setLens('user')}
            />
            <LensChip
              icon={<Activity className="w-4 h-4" />}
              label={lang === 'en' ? 'Specialist view' : 'Глазами специалиста'}
              active={lens === 'specialist'}
              onClick={() => setLens('specialist')}
            />
            <LensChip
              icon={<Target className="w-4 h-4" />}
              label={lang === 'en' ? 'Platform view' : 'Глазами платформы'}
              active={lens === 'platform'}
              onClick={() => setLens('platform')}
            />
          </div>
        </div>

        <motion.div
          key={lens}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <NeumorphicCard className="p-4 sm:p-6">
            {lens === 'user' && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2">
                  {lang === 'en' ? 'User problems' : 'Проблемы пользователя'}
                </h3>
                <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700 mb-3">
                  <li>
                    {lang === 'en'
                      ? '• Has to remember and manually synchronise several apps.'
                      : '• Нужно держать в голове и вручную синхронизировать несколько приложений.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• No single place that shows how nutrition, sleep, training and stress are connected.'
                      : '• Нет единого места, где видно, как питание, сон, тренировки и стресс связаны.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• Recommendations rarely become real actions and habits.'
                      : '• Рекомендации не доводятся до реальных действий и привычек.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• No continuous guidance and support.'
                      : '• Нет постоянного сопровождения и поддержки.'}
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-warmGraphite-500">
                  {lang === 'en'
                    ? 'NexusVita solves this through a single dashboard, unified data model, AI planner and social environment.'
                    : 'NexusVita решает это через единый дашборд, общую модель данных, ИИ‑планировщик и социальную среду.'}
                </p>
              </>
            )}
            {lens === 'specialist' && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2">
                  {lang === 'en'
                    ? 'Problems of specialists and services'
                    : 'Проблемы специалистов и сервисов'}
                </h3>
                <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700 mb-3">
                  <li>
                    {lang === 'en'
                      ? '• Fragmented channels for acquiring clients.'
                      : '• Разрозненные каналы привлечения клиентов.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• No systemic data about user condition and dynamics.'
                      : '• Нет системных данных о состоянии пользователя и динамике.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• Manual management of schedules, payments and programmes.'
                      : '• Ручное управление расписаниями, оплатами и программами.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• Low scalability of individual work.'
                      : '• Низкая масштабируемость индивидуальной работы.'}
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-warmGraphite-500">
                  {lang === 'en'
                    ? 'NexusVita offers specialist dashboards, programme management, access to data context and integrated billing.'
                    : 'NexusVita предлагает кабинеты специалистов, управление программами, доступ к контексту данных и встроенный биллинг.'}
                </p>
              </>
            )}
            {lens === 'platform' && (
              <>
                <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800 mb-2">
                  {lang === 'en' ? 'NexusVita positioning' : 'Позиционирование NexusVita'}
                </h3>
                <ul className="space-y-1.5 text-sm sm:text-base text-warmGraphite-700 mb-3">
                  <li>
                    {lang === 'en'
                      ? '• Positioned between trackers, nutrition services, calendars and specialist marketplaces.'
                      : '• Между трекерами, сервисами питания, календарями и маркетплейсами специалистов.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• Focus on long-term guidance instead of one-off solutions.'
                      : '• Фокус не на одноразовых решениях, а на долгосрочном сопровождении.'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• An ecosystem, not just another fitness app.'
                      : '• Экосистема, а не ещё одно «фитнес‑приложение».'}
                  </li>
                  <li>
                    {lang === 'en'
                      ? '• Combination of B2C, B2B and B2B2C scenarios.'
                      : '• Объединение B2C, B2B и B2B2C сценариев.'}
                  </li>
                </ul>
                <p className="text-xs sm:text-sm text-warmGraphite-500">
                  {lang === 'en'
                    ? 'The model is built for growth via new segments (centres, brands, educational projects) and recurring revenue.'
                    : 'Модель рассчитана на рост за счёт подключения новых сегментов (центры, бренды, образовательные проекты) и повторяющихся доходов.'}
                </p>
              </>
            )}
          </NeumorphicCard>
        </motion.div>
      </div>
    </section>
  )
}

interface LensChipProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

function LensChip({ icon, label, active, onClick }: LensChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs sm:text-sm transition-all',
        active
          ? 'bg-warmGraphite-800 text-warmBeige-50 border-warmGraphite-800 shadow-sm'
          : 'bg-warmBeige-50 text-warmGraphite-700 border-warmGray-300 hover:border-warmGraphite-500'
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

