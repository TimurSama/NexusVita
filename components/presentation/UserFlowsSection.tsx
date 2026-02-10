'use client'

import { motion } from 'framer-motion'
import { Sparkles, CalendarCheck, Stethoscope, Users } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { useI18n } from '@/lib/i18n/I18nProvider'

const flows = [
  {
    id: 'onboarding',
    icon: <Sparkles className="w-6 h-6 text-warmBlue-500" />,
    title: 'Онбординг',
    subtitle: 'Быстрый вход в экосистему',
    steps: [
      'Первичная диагностика состояния и контекста.',
      'Определение целей и приоритетов.',
      'Настройка трекеров и интеграций.',
      'Формирование стартового плана.',
    ],
  },
  {
    id: 'daily',
    icon: <CalendarCheck className="w-6 h-6 text-warmGreen-500" />,
    title: 'Ежедневное использование',
    subtitle: 'Цикл «рекомендация → действие → фиксация»',
    steps: [
      'Просмотр рекомендаций и планов на день.',
      'Выполнение активностей из календаря.',
      'Фиксация состояния и обратной связи.',
      'Социальное взаимодействие и поддержка.',
    ],
  },
  {
    id: 'specialist',
    icon: <Stethoscope className="w-6 h-6 text-warmPurple-500" />,
    title: 'Работа со специалистом',
    subtitle: 'Профессиональное сопровождение',
    steps: [
      'Выбор специалиста и пакета услуг.',
      'Согласование доступа к данным и целям.',
      'Совместное планирование программ.',
      'Контроль прогресса и корректировки.',
    ],
  },
  {
    id: 'community',
    icon: <Users className="w-6 h-6 text-warmOrange-500" />,
    title: 'Участие в сообществе',
    subtitle: 'Мотивация и поддержка',
    steps: [
      'Вступление в группы по целям и интересам.',
      'Участие в челленджах и совместных целях.',
      'Обмен результатами и практиками.',
      'Получение поддержки от сообщества.',
    ],
  },
]

export default function UserFlowsSection() {
  const { lang } = useI18n()

  const localizedFlows = flows.map((flow) => {
    if (lang !== 'en') return flow
    switch (flow.id) {
      case 'onboarding':
        return {
          ...flow,
          title: 'Onboarding',
          subtitle: 'Fast entry into the ecosystem',
          steps: [
            'Initial assessment of state and context.',
            'Defining goals and priorities.',
            'Setting up trackers and integrations.',
            'Forming a starting plan.',
          ],
        }
      case 'daily':
        return {
          ...flow,
          title: 'Daily use',
          subtitle: 'Cycle “recommendation → action → logging”',
          steps: [
            'Review recommendations and plans for the day.',
            'Perform activities from the calendar.',
            'Log state and feedback.',
            'Social interaction and support.',
          ],
        }
      case 'specialist':
        return {
          ...flow,
          title: 'Work with a specialist',
          subtitle: 'Professional guidance',
          steps: [
            'Select a specialist and service package.',
            'Agree on access to data and goals.',
            'Plan programs together.',
            'Track progress and adjust.',
          ],
        }
      case 'community':
        return {
          ...flow,
          title: 'Community participation',
          subtitle: 'Motivation and support',
          steps: [
            'Join groups by goals and interests.',
            'Participate in challenges and shared goals.',
            'Share results and practices.',
            'Receive support from the community.',
          ],
        }
      default:
        return flow
    }
  })

  return (
    <section
      id="user-flows"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-warmBeige-50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 lg:mb-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmGraphite-800 mb-3 sm:mb-4">
            {lang === 'en' ? 'User scenarios' : 'Пользовательские сценарии'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Continuous cycle: goal → action → result → adjustment — at the level of an individual, a team and a community.'
              : 'Непрерывный цикл: цель → действие → результат → корректировка — на уровне одного пользователя, команды и сообщества.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {localizedFlows.map((flow, index) => (
            <motion.div
              key={flow.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <NeumorphicCard className="p-4 sm:p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  {flow.icon}
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
                      {flow.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-warmGraphite-600">
                      {flow.subtitle}
                    </p>
                  </div>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
                  {flow.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </NeumorphicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

