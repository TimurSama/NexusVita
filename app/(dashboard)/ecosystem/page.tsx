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
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="grid grid-cols-1 lg:grid-cols-[1.4fr,1fr] gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-ink-800">
              Nexus Vita — DAO экосистема здоровья человека
            </h1>
            <p className="text-ink-600 text-lg">
              Единое пространство для метрик, специалистов, сообществ, подписок и
              токенизированных сервисов вокруг здоровья.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="sketch-button">Запросить доступ</button>
              <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
                Презентация для инвесторов
              </button>
            </div>
          </div>
          <div className="sketch-card p-6 space-y-4">
            <div className="text-sm uppercase tracking-widest text-ink-500">
              Витрувианская модель
            </div>
            <h2 className="text-2xl font-semibold text-ink-800">
              Человек как центральный интерфейс данных
            </h2>
            <p className="text-ink-600">
              Мы объединяем медицинские данные, образ жизни и сообщество в одной
              визуальной и понятной среде, похожей на чертежи Леонардо.
            </p>
          </div>
        </header>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">
            Контуры здоровья, которые покрывает экосистема
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-ink-700">
            {healthContours.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 p-3 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <span className="text-lg">✦</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-6">
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Подписка AI Health+
            </h2>
            <p className="text-ink-600 mb-4">
              Платный пакет, который включает персонального ИИ-ассистента,
              аналитическую панель и готовые протоколы улучшения здоровья.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="font-semibold text-ink-800">{feature.title}</div>
                  <div className="text-sm text-ink-600">{feature.description}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="sketch-button">Оформить подписку</button>
              <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
                Сравнить тарифы
              </button>
            </div>
          </div>

          <div className="sketch-card p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-ink-800">
              Сообщество и DAO
            </h2>
            <p className="text-ink-600">
              Управление экосистемой, гранты на исследования, голосования и
              распределение доходов через DAO.
            </p>
            <div className="space-y-3 text-sm text-ink-700">
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Голосование по протоколам лечения и сервисам
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Вознаграждения за участие и данные
              </div>
              <div className="p-3 rounded-lg border border-ink-200 bg-parchment-100">
                Казначейство на исследования здоровья
              </div>
            </div>
            <button className="sketch-button w-full">Подключиться к DAO</button>
          </div>
        </section>

        <section className="sketch-card p-6">
          <h2 className="text-2xl font-semibold text-ink-800 mb-4">Токеномика NVT</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-ink-700">
            {tokenomics.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 rounded-lg border border-ink-200 bg-parchment-100"
              >
                <span>{item.label}</span>
                <span className="font-semibold text-ink-800">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-ink-700">
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
              Использование токена: оплата услуг специалистов, абонементов,
              подписок, голосования и доступ к премиальным исследованиям.
            </div>
            <div className="p-4 rounded-lg border border-ink-200 bg-parchment-100">
              Механики: кэшбек за здоровье, стейкинг для доступа к клубам,
              делегирование голоса и начисление за качественные данные.
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-6">
          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">
              Воронка продажи токенов
            </h2>
            <div className="space-y-3">
              {saleStages.map((stage) => (
                <div
                  key={stage.title}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-ink-800">{stage.title}</div>
                    <span className="text-xs px-2 py-1 rounded-full bg-ink-700 text-white">
                      Скидка {stage.discount}
                    </span>
                  </div>
                  <div className="text-sm text-ink-600">{stage.focus}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-6">
            <h2 className="text-2xl font-semibold text-ink-800 mb-4">Дорожная карта</h2>
            <div className="space-y-3">
              {roadmap.map((phase) => (
                <div
                  key={phase.phase}
                  className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                >
                  <div className="font-semibold text-ink-800">{phase.phase}</div>
                  <ul className="text-sm text-ink-600 mt-2 space-y-1">
                    {phase.items.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
