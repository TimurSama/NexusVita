'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, HeartPulse, Activity, Stethoscope, Moon, Sparkles } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import { cn } from '@/lib/utils/cn'
import { useI18n } from '@/lib/i18n/I18nProvider'

type SystemId =
  | 'musculo'
  | 'cardio'
  | 'nervous'
  | 'resp'
  | 'digest'
  | 'sleep'

const systems: {
  id: SystemId
  label: string
  icon: React.ReactNode
  muscles: string[]
  description: string
  do: string[]
  avoid: string[]
}[] = [
  {
    id: 'musculo',
    label: 'Опорно‑двигательная система',
    icon: <Activity className="w-4 h-4" />,
    muscles: ['shoulders', 'chest', 'core', 'hips', 'quadriceps', 'hamstrings', 'spine'],
    description:
      'Мышцы, суставы и позвоночник обеспечивают движение, удержание позы и способность выполнять физическую нагрузку.',
    do: [
      'Постепенная прогрессия нагрузки в тренировках.',
      'Регулярная работа над мобильностью и растяжкой.',
      'Контроль техники упражнений.',
    ],
    avoid: [
      'Резкий рост объёма и веса без адаптации.',
      'Игнорирование боли в суставах и спине.',
      'Длительное статическое сидение без перерывов.',
    ],
  },
  {
    id: 'cardio',
    label: 'Сердечно‑сосудистая система',
    icon: <HeartPulse className="w-4 h-4" />,
    muscles: ['chest', 'core'],
    description:
      'Сердце и сосуды обеспечивают доставку кислорода и питательных веществ к тканям, влияют на выносливость и восстановление.',
    do: [
      'Регулярная аэробная активность (ходьба, бег, вело).',
      'Контроль пульса в безопасных зонах нагрузки.',
      'Работа с факторами риска (сон, стресс, питание).',
    ],
    avoid: [
      'Чрезмерные нагрузки без оценки состояния.',
      'Комбинация стресса, недосыпа и тяжёлых тренировок.',
      'Игнорирование симптомов (одышка, боль в груди).',
    ],
  },
  {
    id: 'nervous',
    label: 'Нервная система и стресс',
    icon: <Brain className="w-4 h-4" />,
    muscles: ['core', 'spine'],
    description:
      'Нервная система регулирует координацию, скорость реакции, уровень стресса, качество сна и когнитивные функции.',
    do: [
      'Регулярные практики релаксации и дыхания.',
      'Планирование нагрузки с учётом восстановления.',
      'Мониторинг настроения и уровня стресса.',
    ],
    avoid: [
      'Хронический недосып и постоянный «аврал».',
      'Злоупотребление стимуляторами (кофеин, энерготоники).',
      'Игнорирование признаков выгорания.',
    ],
  },
  {
    id: 'resp',
    label: 'Дыхательная система',
    icon: <Stethoscope className="w-4 h-4" />,
    muscles: ['chest'],
    description:
      'Лёгкие и дыхательная мускулатура обеспечивают газообмен и толерантность к нагрузке, влияют на выносливость и восстановление.',
    do: [
      'Тренировка дыхания (диафрагмальное, ритмичное).',
      'Активность на свежем воздухе.',
      'Работа с осанкой для свободного дыхания.',
    ],
    avoid: [
      'Курение и длительное пребывание в загрязнённом воздухе.',
      'Тренировки при выражённых дыхательных симптомах без консультации врача.',
    ],
  },
  {
    id: 'digest',
    label: 'Пищеварение и метаболизм',
    icon: <Sparkles className="w-4 h-4" />,
    muscles: ['core'],
    description:
      'ЖКТ и метаболические процессы обеспечивают усвоение питательных веществ, баланс энергии и качество восстановления.',
    do: [
      'Регулярное питание с достаточным белком и клетчаткой.',
      'Учёт индивидуальной переносимости продуктов.',
      'Мониторинг реакции на изменения диеты.',
    ],
    avoid: [
      'Частые экстремальные диеты и «качели» веса.',
      'Переедание перед сном и тяжёлая пища на ночь.',
    ],
  },
  {
    id: 'sleep',
    label: 'Сон и восстановление',
    icon: <Moon className="w-4 h-4" />,
    muscles: ['core', 'spine'],
    description:
      'Сон и пассивное восстановление — основа адаптации к нагрузкам, гормонального баланса и когнитивных функций.',
    do: [
      'Стабильный режим сна (7–9 часов в одно и то же время).',
      'Гигиена сна: свет, температура, отсутствие гаджетов перед сном.',
      'Планирование дней без тяжёлых нагрузок.',
    ],
    avoid: [
      'Хронический недосып и «доспать» только в выходные.',
      'Тяжёлые тренировки и обильная еда поздно вечером.',
    ],
  },
]

export default function BodyExplorerSection() {
  const [activeSystem, setActiveSystem] = useState<SystemId>('musculo')
  const { lang } = useI18n()

  const base = systems.find((s) => s.id === activeSystem) ?? systems[0]

  const current =
    lang === 'en'
      ? (() => {
          switch (base.id) {
            case 'musculo':
              return {
                ...base,
                label: 'Musculoskeletal system',
                description:
                  'Muscles, joints and the spine provide movement, posture and the ability to handle physical load.',
                do: [
                  'Gradual progression of load in training.',
                  'Regular work on mobility and stretching.',
                  'Control of exercise technique.',
                ],
                avoid: [
                  'Sharp increase in volume and weight without adaptation.',
                  'Ignoring joint and back pain.',
                  'Prolonged static sitting without breaks.',
                ],
              }
            case 'cardio':
              return {
                ...base,
                label: 'Cardiovascular system',
                description:
                  'Heart and vessels deliver oxygen and nutrients to tissues and affect endurance and recovery.',
                do: [
                  'Regular aerobic activity (walking, running, cycling).',
                  'Monitoring heart rate in safe load zones.',
                  'Managing risk factors (sleep, stress, nutrition).',
                ],
                avoid: [
                  'Excessive loads without assessing condition.',
                  'Combining stress, lack of sleep and heavy training.',
                  'Ignoring symptoms (shortness of breath, chest pain).',
                ],
              }
            case 'nervous':
              return {
                ...base,
                label: 'Nervous system and stress',
                description:
                  'The nervous system regulates coordination, reaction speed, stress level, sleep quality and cognition.',
                do: [
                  'Regular relaxation and breathing practices.',
                  'Planning load with recovery in mind.',
                  'Tracking mood and stress level.',
                ],
                avoid: [
                  'Chronic sleep deprivation and constant “crunch mode”.',
                  'Overuse of stimulants (caffeine, energy drinks).',
                  'Ignoring signs of burnout.',
                ],
              }
            case 'resp':
              return {
                ...base,
                label: 'Respiratory system',
                description:
                  'Lungs and respiratory muscles provide gas exchange and tolerance to load, influencing endurance and recovery.',
                do: [
                  'Breathing training (diaphragmatic, rhythmic).',
                  'Activity outdoors.',
                  'Posture work for free breathing.',
                ],
                avoid: [
                  'Smoking and long stay in polluted air.',
                  'Training with pronounced respiratory symptoms without medical advice.',
                ],
              }
            case 'digest':
              return {
                ...base,
                label: 'Digestion and metabolism',
                description:
                  'GI tract and metabolic processes ensure nutrient absorption, energy balance and quality of recovery.',
                do: [
                  'Regular meals with enough protein and fibre.',
                  'Considering individual product tolerance.',
                  'Monitoring reaction to diet changes.',
                ],
                avoid: [
                  'Frequent crash diets and weight “yo-yo”.',
                  'Overeating and heavy food late at night.',
                ],
              }
            case 'sleep':
              return {
                ...base,
                label: 'Sleep and recovery',
                description:
                  'Sleep and passive recovery are the basis of adaptation to load, hormone balance and cognitive function.',
                do: [
                  'Stable sleep schedule (7–9 hours at the same time).',
                  'Sleep hygiene: light, temperature, no gadgets before bed.',
                  'Planning days without heavy loads.',
                ],
                avoid: [
                  'Chronic lack of sleep and “catching up” only on weekends.',
                  'Heavy training and large meals late in the evening.',
                ],
              }
            default:
              return base
          }
        })()
      : base

  return (
    <section
      id="body-explorer"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
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
            {lang === 'en' ? 'Body explorer' : 'Исследователь тела'}
          </h2>
          <p className="text-lg sm:text-xl text-warmGraphite-600 max-w-3xl mx-auto">
            {lang === 'en'
              ? 'Understanding the body is as important as doing the right things. Explore body systems and see how NexusVita helps work with each of them.'
              : 'Понимание тела так же важно, как и правильные действия. Исследуйте системы организма и посмотрите, как NexusVita помогает работать с каждой из них.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr,1.6fr] gap-6">
          {/* Левая часть: Vitruvian + выбор систем */}
          <NeumorphicCard className="p-4 sm:p-6 flex flex-col">
            <div className="mb-4">
              <p className="text-sm text-warmGraphite-600 mb-3">
                {lang === 'en'
                  ? 'Choose a system — the Vitruvian diagram will highlight the relevant areas.'
                  : 'Выберите систему — схема Витрувианского человека подсветит соответствующие области.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {systems.map((system) => (
                  <button
                    key={system.id}
                    type="button"
                    onClick={() => setActiveSystem(system.id)}
                    className={cn(
                      'px-3 py-1.5 rounded-2xl border text-xs sm:text-sm flex items-center gap-1.5 transition-all',
                      activeSystem === system.id
                        ? 'bg-warmBlue-500 text-white border-warmBlue-500 shadow-sm'
                        : 'bg-warmBeige-50 text-warmGraphite-700 border-warmGray-300 hover:border-warmBlue-400'
                    )}
                  >
                    {system.icon}
                    <span>{current.id === system.id ? current.label : system.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-md aspect-square">
                <VitruvianMan
                  width={420}
                  height={420}
                  highlightedMuscles={current.muscles}
                  className="w-full h-full"
                />
              </div>
            </div>
          </NeumorphicCard>

          {/* Правая часть: объяснения и связь с платформой */}
          <NeumorphicCard className="p-4 sm:p-6 flex flex-col gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-warmGraphite-800 mb-2">
                {current.label}
              </h3>
              <p className="text-sm sm:text-base text-warmGraphite-700">
                {current.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3 rounded-2xl bg-warmGreen-50 border border-warmGreen-200">
                <h4 className="text-sm font-semibold text-warmGraphite-800 mb-1">
                  {lang === 'en' ? 'What supports health' : 'Что поддерживает здоровье'}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
                  {current.do.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3 rounded-2xl bg-warmRed-50 border border-warmRed-200">
                <h4 className="text-sm font-semibold text-warmGraphite-800 mb-1">
                  {lang === 'en' ? 'What to avoid' : 'Чего лучше избегать'}
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-warmGraphite-700">
                  {current.avoid.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-2 p-3 rounded-2xl bg-warmBeige-50 border border-warmGray-200 text-xs sm:text-sm text-warmGraphite-700">
              <h4 className="font-semibold text-warmGraphite-800 mb-1">
                {lang === 'en'
                  ? 'How NexusVita helps work with this system'
                  : 'Как NexusVita помогает работать с этой системой'}
              </h4>
              <p>
                {lang === 'en'
                  ? 'Through a combination of modules: dashboard, journals, AI planner, load and recovery tracking, plus connecting specialists who see your data context (with your consent).'
                  : 'Через сочетание модулей: дашборд, дневники, ИИ‑планировщик, трекинг нагрузки и восстановления, а также подключение специалистов, которые видят контекст ваших данных (с вашего согласия).'}
              </p>
            </div>

            <p className="text-[11px] sm:text-xs text-warmGraphite-500 mt-1">
              {lang === 'en'
                ? 'This visualisation is for educational purposes only and does not replace a medical consultation. Clinical data and professional judgement are required for medical decisions.'
                : 'Визуализация носит образовательный характер и не заменяет консультацию врача. Для медицинских решений необходимы клинические данные и профессиональная оценка.'}
            </p>
          </NeumorphicCard>
        </div>
      </div>
    </section>
  )
}

