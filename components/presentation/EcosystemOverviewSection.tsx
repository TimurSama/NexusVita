'use client'

import { motion } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { useI18n } from '@/lib/i18n/I18nProvider'

export default function EcosystemOverviewSection() {
  const { lang } = useI18n()

  return (
    <section
      id="ecosystem"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            {lang === 'en'
              ? 'What is NexusVita as an ecosystem'
              : 'Что такое NexusVita как экосистема'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Not just an app, but a multi-layer digital environment for managing health, lifestyle and personal development.'
              : 'Не просто приложение, а многоуровневая цифровая среда для комплексного управления здоровьем, образом жизни и развитием человека.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'General overview' : 'Общее описание'}
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• Ecosystem digital application and social platform.'
                  : '• Экосистемное цифровое приложение и социальная платформа.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Tracking and analysis of health status.'
                  : '• Отслеживание и анализ состояния здоровья.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Formation of recommendations and personal plans.'
                  : '• Формирование рекомендаций и персональных планов.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Goal setting and achievement.'
                  : '• Постановка и достижение целей.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Interaction between users, specialists and services.'
                  : '• Взаимодействие с пользователями, специалистами и сервисами.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• A single space for projects, products and the ecosystem economy.'
                  : '• Единое пространство для проектов, продуктов и экономики.'}
              </li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-xl font-semibold text-warmGraphite-800 mb-3">
              {lang === 'en' ? 'Purpose and mission' : 'Цель и назначение'}
            </h3>
            <ul className="space-y-2 text-sm sm:text-base text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• Long-term management of health and well-being.'
                  : '• Управление здоровьем в долгосрочной перспективе.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Systemic recommendations instead of isolated tips.'
                  : '• Системные рекомендации вместо разрозненных советов.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Plans and goals that consider real limitations.'
                  : '• Планы и цели с учетом реальных ограничений.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Interaction with other users and professionals.'
                  : '• Взаимодействие с другими пользователями и профессионалами.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Participation in ecosystem projects and products.'
                  : '• Участие в проектах и продуктах экосистемы.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Inclusion in a broader social and economic structure.'
                  : '• Включенность в общую социально-экономическую структуру.'}
              </li>
            </ul>
          </NeumorphicCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-8">
          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
              {lang === 'en' ? 'Social layer' : 'Социальный слой'}
            </h3>
            <ul className="space-y-1.5 text-sm text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• Communities by goals, interests and health states.'
                  : '• Сообщества по целям, интересам и состояниям.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Joint programs, challenges and activities.'
                  : '• Совместные программы, челленджи и активности.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Sharing experience, practices and results.'
                  : '• Обмен опытом, практиками и результатами.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Inviting friends, specialists and partners.'
                  : '• Приглашение друзей, специалистов и партнёров.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Social layer embedded into all modules.'
                  : '• Социальный слой встроен во все модули.'}
              </li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
              {lang === 'en' ? 'Ecosystem products' : 'Продукты экосистемы'}
            </h3>
            <ul className="space-y-1.5 text-sm text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• User products: app, health profile, journals, planner, calendar.'
                  : '• Пользовательские: приложение, профиль здоровья, дневники, планировщик, календарь.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Professional: specialist workspaces, client and program management.'
                  : '• Профессиональные: кабинеты тренеров и врачей, управление клиентами и программами.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Ecosystem: communities, educational and research projects, partnerships.'
                  : '• Экосистемные: сообщества, образовательные и исследовательские проекты, партнёрства.'}
              </li>
            </ul>
          </NeumorphicCard>

          <NeumorphicCard className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-warmGraphite-800 mb-2">
              {lang === 'en' ? 'Ecosystem approach' : 'Экосистемный подход'}
            </h3>
            <ul className="space-y-1.5 text-sm text-warmGraphite-700">
              <li>
                {lang === 'en'
                  ? '• All elements are connected: user ↔ data ↔ plans ↔ specialists ↔ projects.'
                  : '• Все элементы связаны: пользователь ↔ данные ↔ планы ↔ специалисты ↔ проекты.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Functions do not exist in isolation.'
                  : '• Функции не существуют изолированно.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Data is reused and interpreted across modules.'
                  : '• Данные используются повторно и осмысленно.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Modularity and scalability of products.'
                  : '• Модульность и масштабируемость продуктов.'}
              </li>
              <li>
                {lang === 'en'
                  ? '• Long-term value for all participants.'
                  : '• Долгосрочная ценность для всех участников.'}
              </li>
            </ul>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}