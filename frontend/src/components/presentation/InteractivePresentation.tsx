'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/layout/Header'
import ConceptVisualization from './ConceptVisualization'
import InfoGraphics from './InfoGraphics'
import Link from 'next/link'

interface ConceptBlock {
  id: string
  title: string
  icon: string
  shortDescription: string
  fullDescription: string
  visualizations: string[]
}

const concepts: ConceptBlock[] = [
  {
    id: 'human-centered',
    title: 'Человекоцентричность',
    icon: '🧘',
    shortDescription: 'Здоровье как комплексное понятие',
    fullDescription: `Здоровье рассматривается в Nexus Vita не узко, а во всей полноте человеческих аспектов. Человекоцентричный подход означает, что физическое состояние, психоэмоциональное благополучие, социальная активность и даже бытовые привычки пользователя учитываются как единое целое.

Такой взгляд соответствует определению здоровья Всемирной организации здравоохранения, согласно которому здоровье – это не просто отсутствие болезней, а состояние полного физического, душевного и социального благополучия.

Стратегически, комплексное понимание здоровья позволяет Nexus Vita создавать решения, которые масштабируются на разные категории пользователей с учетом их индивидуальных потребностей. Например, одному пользователю может требоваться помощь в налаживании сна и управления стрессом (психоэмоциональный аспект), другому – социальная мотивация для регулярных тренировок (социальный аспект), третьему – рекомендации по эргономике рабочего места и бытовой активности (аспект «бытового» здоровья).

В экосистеме Nexus Vita все эти направления интегрированы: платформа одновременно может отслеживать показатели активности и сна, предлагать психологические опросники и поддерживать общение в сообществе. Такой цельный подход повышает эффективность: пользователь получает персонализированную поддержку сразу по нескольким направлениям, благодаря чему увеличивается шанс реальных улучшений самочувствия и образа жизни.`,
    visualizations: [
      'Физическое здоровье',
      'Психоэмоциональное благополучие',
      'Социальная активность',
      'Бытовые привычки',
    ],
  },
  {
    id: 'social-interactions',
    title: 'Живые социальные взаимодействия',
    icon: '🤝',
    shortDescription: 'Офлайн-активности и сообщества',
    fullDescription: `Одним из ключевых элементов экосистемы Nexus Vita являются живые офлайн-активности, которые дополняют цифровые сервисы. Платформа стимулирует пользователей выходить за рамки приложения и взаимодействовать в реальном мире, создавая вокруг себя сообщество здорового образа жизни.

Форматы таких мероприятий могут быть разнообразными:

• Групповые тренировки и прогулки на природе: пользователи объединяются для совместных пробежек, занятий йогой в парке или походов. Совместная физическая активность не только улучшает форму, но и дает мощный заряд мотивации за счет духа товарищества.

• Городские мероприятия по здоровью: Nexus Vita может сотрудничать с городскими властями или общественными организациями для проведения массовых забегов, велосипедных дней, ярмарок здоровья, лекций и мастер-классов.

• Встречи со специалистами: офлайн-сессии, где пользователи лично знакомятся с тренерами, психологами, нутрициологами.

• Сообщества по интересам: пользователи могут самостоятельно организовывать клубы по интересам – от кружков скандинавской ходьбы для пенсионеров до групп поддержки для людей с диабетом.

Практическая польза живых взаимодействий заключается в создании поддержки на уровне сообщества. Человек, приходящий, например, на утреннюю пробежку Nexus Vita, получает не только физическую нагрузку, но и общение – новые знакомства, обмен опытом, чувство принадлежности к группе.`,
    visualizations: [
      'Групповые тренировки',
      'Городские мероприятия',
      'Встречи со специалистами',
      'Сообщества по интересам',
    ],
  },
  {
    id: 'social-tools',
    title: 'Социальные инструменты',
    icon: '💬',
    shortDescription: 'Внутриплатформенное общение',
    fullDescription: `Чтобы поддержать постоянное вовлечение пользователей, Nexus Vita интегрирует полноценные социальные функции прямо в платформе. Пользователи не чувствуют себя изолированными в приложении – наоборот, сервис поощряет общение и совместное достижение целей, превращая индивидуальные оздоровительные программы в коллективное путешествие.

Основные социальные инструменты включают:

• Система друзей и личные сообщения: пользователи могут добавлять друг друга в друзья, следить за успехами знакомых, делиться обновлениями. Встроенный мессенджер позволяет напрямую общаться с единомышленниками или консультироваться со своим тренером/врачом в чате.

• Группы и ветки обсуждений: тематические сообщества внутри приложения, где можно обсуждать интересующие темы – будь то советы по марафонской подготовке, рецепты здорового питания или поддержка в восстановлении после травм.

• Челленджи и соревнования: групповые вызовы, где участники мотивируют друг друга достигать целей. Рейтинги и таблицы лидеров создают здоровую конкуренцию и дополнительную мотивацию.

• Совместные цели и команды: пользователи могут объединяться в команды для достижения общих целей, например, команда коллег может участвовать в корпоративном челлендже по снижению веса.

Такая социальная интеграция делает процесс оздоровления более увлекательным и устойчивым. Исследования показывают, что социальная поддержка значительно повышает вероятность успешного изменения образа жизни.`,
    visualizations: [
      'Система друзей',
      'Группы и обсуждения',
      'Челленджи',
      'Команды и совместные цели',
    ],
  },
]

export default function InteractivePresentation() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)

  const selectedConceptData = concepts.find((c) => c.id === selectedConcept)

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Hero секция */}
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-6 text-ink-900"
          >
            Nexus Vita
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-ink-600 mb-8 max-w-3xl mx-auto"
          >
            Модульная экосистема здоровья, тренировок и работы с тренерами
          </motion.p>
        </section>

        {/* Инфографика - ключевые механики */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Ключевые механики</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '👤', title: 'Интерактивный аватар', desc: 'Отслеживание прогресса на модели тела' },
              { icon: '🎨', title: 'Мини-сайты тренеров', desc: 'Уникальные страницы с кастомным дизайном' },
              { icon: '💰', title: 'Токеномика', desc: 'Внутренняя экономика за активности' },
              { icon: '📱', title: 'Telegram интеграция', desc: 'Синхронизация чатов и мини-приложение' },
              { icon: '🏋️', title: 'Программы тренировок', desc: 'Персональные планы от тренеров' },
              { icon: '🥗', title: 'Планы питания', desc: 'Индивидуальные рекомендации' },
              { icon: '🏢', title: 'Локации и абонементы', desc: 'QR/NFC проход в залы' },
              { icon: '🏆', title: 'Челленджи', desc: 'Групповые соревнования и достижения' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-ink-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Концептуальные блоки с попапами */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12">Ключевые концепции</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {concepts.map((concept) => (
              <motion.div
                key={concept.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedConcept(concept.id)}
                className="card card-sketch cursor-pointer"
              >
                <div className="text-5xl mb-4">{concept.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{concept.title}</h3>
                <p className="text-ink-600 mb-4">{concept.shortDescription}</p>
                <div className="text-sm text-accent-turquoise font-medium">
                  Нажмите для подробностей →
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Попап с детальной информацией */}
        <AnimatePresence>
          {selectedConceptData && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50"
                onClick={() => setSelectedConcept(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl z-50"
              >
                <div className="card card-sketch h-full md:h-auto max-h-[90vh] overflow-y-auto bg-white">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{selectedConceptData.icon}</div>
                      <div>
                        <h2 className="text-3xl font-bold mb-2">
                          {selectedConceptData.title}
                        </h2>
                        <p className="text-ink-600">{selectedConceptData.shortDescription}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedConcept(null)}
                      className="text-2xl hover:text-red-600 transition"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="prose max-w-none mb-6">
                    <p className="text-ink-700 leading-relaxed whitespace-pre-line">
                      {selectedConceptData.fullDescription}
                    </p>
                  </div>

                  <div className="border-t border-ink-200 pt-6">
                    <ConceptVisualization concept={selectedConceptData} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Инфографика */}
        <InfoGraphics />

        {/* Статистика и цифры */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold text-center mb-8">Экосистема в цифрах</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: '5', label: 'Ролей пользователей' },
                { number: '10+', label: 'Модулей страниц тренеров' },
                { number: '3', label: 'Базовые темы оформления' },
                { number: '∞', label: 'Возможностей кастомизации' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-accent-turquoise mb-2">
                    {stat.number}
                  </div>
                  <div className="text-ink-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Дополнительные ресурсы */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Изучите подробнее</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/decentralization">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card card-sketch cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-2xl font-bold mb-2">Децентрализация</h3>
                <p className="text-ink-600">
                  Блокчейн инфраструктура, токены, DAO управление
                </p>
              </motion.div>
            </Link>
            <Link href="/human-centered">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card card-sketch cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">🧘</div>
                <h3 className="text-2xl font-bold mb-2">Человекоцентричность</h3>
                <p className="text-ink-600">
                  Комплексный подход к здоровью во всех аспектах
                </p>
              </motion.div>
            </Link>
            <Link href="/business-plan">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="card card-sketch cursor-pointer text-center"
              >
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2">Бизнес-план</h3>
                <p className="text-ink-600">
                  Стратегия развития и монетизации
                </p>
              </motion.div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

