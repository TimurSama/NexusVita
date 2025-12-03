'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import { motion } from 'framer-motion'

export default function DecentralizationPage() {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)

  const blocks = [
    {
      id: 'blockchain',
      title: 'Блокчейн инфраструктура',
      description: 'Децентрализованное хранение данных о здоровье',
      details: 'Nexus Vita использует блокчейн для безопасного и децентрализованного хранения медицинских данных, результатов тренировок и достижений. Пользователи полностью контролируют свои данные через приватные ключи.',
    },
    {
      id: 'tokens',
      title: 'Токены и смарт-контракты',
      description: 'Умные контракты для автоматизации наград',
      details: 'Система токенов работает на смарт-контрактах, автоматически начисляя награды за активности. Это обеспечивает прозрачность и справедливость экономики платформы.',
    },
    {
      id: 'governance',
      title: 'Децентрализованное управление (DAO)',
      description: 'Сообщество управляет развитием платформы',
      details: 'Владельцы токенов могут участвовать в голосовании по ключевым решениям: новые функции, распределение бюджета, партнёрства. Каждый голос имеет вес в зависимости от количества токенов.',
    },
    {
      id: 'nft',
      title: 'NFT достижения',
      description: 'Уникальные цифровые награды',
      details: 'Достижения и бейджи выпускаются как NFT, что делает их уникальными и передаваемыми. Пользователи могут собирать коллекции достижений и обмениваться ими.',
    },
    {
      id: 'data-ownership',
      title: 'Владение данными',
      description: 'Пользователи владеют своими данными',
      details: 'Все данные о здоровье, тренировках и прогрессе хранятся децентрализованно. Пользователи могут решать, кому предоставлять доступ к своим данным, и даже монетизировать анонимные статистические данные.',
    },
    {
      id: 'interoperability',
      title: 'Интероперабельность',
      description: 'Интеграция с другими блокчейн-проектами',
      details: 'Nexus Vita совместима с другими DeFi и Web3 проектами. Токены можно использовать в других экосистемах, а данные можно экспортировать в другие приложения здоровья.',
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
            Децентрализованная экосистема
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-ink-600 max-w-3xl mx-auto"
          >
            Nexus Vita построена на принципах децентрализации, обеспечивая прозрачность,
            безопасность и контроль пользователей над своими данными
          </motion.p>
        </div>

        {/* Ключевые принципы */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Ключевые принципы</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔐',
                title: 'Безопасность',
                text: 'Данные защищены криптографией блокчейна',
              },
              {
                icon: '👤',
                title: 'Контроль',
                text: 'Пользователи полностью владеют своими данными',
              },
              {
                icon: '🌐',
                title: 'Прозрачность',
                text: 'Все транзакции и награды видны в блокчейне',
              },
              {
                icon: '🤝',
                title: 'Справедливость',
                text: 'Децентрализованное управление без центральной власти',
              },
              {
                icon: '💎',
                title: 'Ценность',
                text: 'Токены имеют реальную ценность в экосистеме',
              },
              {
                icon: '🔗',
                title: 'Интеграция',
                text: 'Совместимость с другими Web3 проектами',
              },
            ].map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card card-sketch text-center"
              >
                <div className="text-4xl mb-3">{principle.icon}</div>
                <h3 className="text-xl font-bold mb-2">{principle.title}</h3>
                <p className="text-ink-600">{principle.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Блоки децентрализации */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Компоненты децентрализации</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {blocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
                className="card card-sketch cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{block.title}</h3>
                    <p className="text-ink-600">{block.description}</p>
                  </div>
                  <div className="text-2xl">{selectedBlock === block.id ? '▲' : '▼'}</div>
                </div>
                {selectedBlock === block.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-ink-200"
                  >
                    <p className="text-ink-700 leading-relaxed">{block.details}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Техническая архитектура */}
        <section className="mb-16">
          <div className="card card-sketch">
            <h2 className="text-3xl font-bold text-center mb-8">Техническая архитектура</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Блокчейн слой</h3>
                <ul className="space-y-2 text-ink-700">
                  <li>• Ethereum / Polygon для смарт-контрактов</li>
                  <li>• IPFS для децентрализованного хранения</li>
                  <li>• Web3 кошельки для авторизации</li>
                  <li>• Oracles для интеграции внешних данных</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Приложение слой</h3>
                <ul className="space-y-2 text-ink-700">
                  <li>• Web3 интеграция в веб-приложение</li>
                  <li>• Мобильные кошельки (MetaMask, WalletConnect)</li>
                  <li>• API для взаимодействия с блокчейном</li>
                  <li>• Оффчейн вычисления для производительности</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section>
          <div className="card card-sketch bg-accent-turquoise bg-opacity-10">
            <h2 className="text-3xl font-bold text-center mb-6">Преимущества децентрализации</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold mb-3">Для пользователей</h3>
                <ul className="space-y-2 text-ink-700">
                  <li>✓ Полный контроль над данными</li>
                  <li>✓ Возможность монетизации данных</li>
                  <li>✓ Прозрачность всех операций</li>
                  <li>✓ Участие в управлении платформой</li>
                  <li>✓ Уникальные NFT достижения</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Для экосистемы</h3>
                <ul className="space-y-2 text-ink-700">
                  <li>✓ Устойчивость к цензуре</li>
                  <li>✓ Отсутствие единой точки отказа</li>
                  <li>✓ Справедливое распределение ценности</li>
                  <li>✓ Глобальная доступность</li>
                  <li>✓ Инновации через сообщество</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

