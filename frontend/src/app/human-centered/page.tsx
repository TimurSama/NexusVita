'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import { motion, AnimatePresence } from 'framer-motion'

export default function HumanCenteredPage() {
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null)

  const aspects = [
    {
      id: 'physical',
      title: 'Физическое здоровье',
      icon: '💪',
      description: 'Тренировки, питание, восстановление',
      details: 'Отслеживание физических показателей: сила, выносливость, гибкость, состав тела. Интеграция с фитнес-трекерами, умными весами, анализ техники упражнений.',
      components: [
        'Программы тренировок',
        'Планы питания',
        'Отслеживание прогресса',
        'Анализ техники',
        'Восстановление и сон',
      ],
    },
    {
      id: 'emotional',
      title: 'Психоэмоциональное благополучие',
      icon: '🧘',
      description: 'Стресс, настроение, ментальное здоровье',
      details: 'Мониторинг эмоционального состояния через опросники, интеграция с приложениями медитации, доступ к психологам, трекинг сна и восстановления.',
      components: [
        'Опросники настроения',
        'Медитация и релаксация',
        'Консультации психологов',
        'Трекинг стресса',
        'Управление сном',
      ],
    },
    {
      id: 'social',
      title: 'Социальная активность',
      icon: '🤝',
      description: 'Сообщество, поддержка, мотивация',
      details: 'Создание сообществ по интересам, групповые тренировки, челленджи, общение с единомышленниками, поддержка от тренеров и друзей.',
      components: [
        'Сообщества',
        'Групповые тренировки',
        'Челленджи',
        'Социальная лента',
        'Менторство',
      ],
    },
    {
      id: 'lifestyle',
      title: 'Бытовое здоровье',
      icon: '🏠',
      description: 'Привычки, окружение, эргономика',
      details: 'Рекомендации по эргономике рабочего места, анализ бытовой активности, советы по организации пространства, интеграция с умным домом.',
      components: [
        'Эргономика',
        'Бытовая активность',
        'Организация пространства',
        'Привычки',
        'Интеграция с IoT',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-4 text-ink-900"
          >
            Человекоцентричный подход
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink-600 max-w-3xl mx-auto"
          >
            Здоровье рассматривается не узко, а во всей полноте человеческих аспектов.
            Комплексный подход к благополучию человека
          </motion.p>
        </div>

        {/* Определение здоровья ВОЗ */}
        <section className="mb-16">
          <div className="card card-sketch bg-ink-50">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🌍</div>
              <h2 className="text-2xl font-bold mb-3">Определение здоровья ВОЗ</h2>
              <p className="text-lg text-ink-700 italic max-w-2xl mx-auto">
                "Здоровье — это состояние полного физического, душевного и социального
                благополучия, а не только отсутствие болезней и физических дефектов"
              </p>
            </div>
          </div>
        </section>

        {/* Четыре аспекта здоровья */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Четыре аспекта здоровья</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aspects.map((aspect, index) => (
              <motion.div
                key={aspect.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch"
              >
                <div
                  onClick={() => setSelectedAspect(selectedAspect === aspect.id ? null : aspect.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-5xl">{aspect.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{aspect.title}</h3>
                      <p className="text-ink-600">{aspect.description}</p>
                    </div>
                    <div className="text-2xl text-ink-400">
                      {selectedAspect === aspect.id ? '▲' : '▼'}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {selectedAspect === aspect.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-ink-200 pt-4 mt-4"
                    >
                      <p className="text-ink-700 mb-4 leading-relaxed">{aspect.details}</p>
                      <div>
                        <h4 className="font-bold mb-2">Компоненты платформы:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {aspect.components.map((component, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-sm text-ink-700"
                            >
                              <span className="text-accent-turquoise">•</span>
                              {component}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Интеграция аспектов */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold text-center mb-6">Интеграция всех аспектов</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-ink-700 mb-6 leading-relaxed">
                Nexus Vita не рассматривает аспекты здоровья изолированно. Платформа понимает,
                что они взаимосвязаны и влияют друг на друга. Например:
              </p>
              <div className="space-y-4">
                {[
                  {
                    scenario: 'Эмоциональное выгорание',
                    solution: 'Платформа может одновременно рекомендовать групповую тренировку (социальный + физический аспекты) и сессию с психологом (эмоциональный аспект)',
                  },
                  {
                    scenario: 'Снижение активности',
                    solution: 'Анализ показывает связь с плохим сном → рекомендации по улучшению сна и эргономике рабочего места (бытовой аспект)',
                  },
                  {
                    scenario: 'Социальная изоляция',
                    solution: 'Предложение участия в сообществе по интересам и групповых мероприятиях для восстановления социальных связей',
                  },
                ].map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-ink-50 rounded-lg border-l-4 border-accent-turquoise"
                  >
                    <div className="font-bold text-ink-900 mb-2">{example.scenario}</div>
                    <div className="text-ink-700">{example.solution}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества подхода */}
        <section>
          <div className="card card-sketch bg-accent-turquoise bg-opacity-10">
            <h2 className="text-3xl font-bold text-center mb-6">Преимущества комплексного подхода</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Персонализация',
                  text: 'Учёт всех аспектов жизни пользователя для создания индивидуальных решений',
                },
                {
                  title: 'Эффективность',
                  text: 'Одновременная работа по нескольким направлениям повышает шансы успеха',
                },
                {
                  title: 'Устойчивость',
                  text: 'Комплексная поддержка формирует устойчивые здоровые привычки',
                },
                {
                  title: 'Доверие',
                  text: 'Пользователь видит, что о нём заботятся всесторонне',
                },
                {
                  title: 'Масштабируемость',
                  text: 'Подход работает для разных категорий пользователей с разными потребностями',
                },
                {
                  title: 'Результаты',
                  text: 'Реальные улучшения самочувствия и образа жизни',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-ink-700">{benefit.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

