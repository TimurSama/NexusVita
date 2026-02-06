const stories = [
  { name: 'Алина', role: 'Йога-тренер', status: 'Новая практика' },
  { name: 'Денис', role: 'Кардио', status: 'Забег 10 км' },
  { name: 'Мария', role: 'Нутрициолог', status: 'Разбор меню' },
  { name: 'Ольга', role: 'Психолог', status: 'Эфир сегодня' },
  { name: 'Иван', role: 'Реабилитолог', status: 'Новая программа' },
]

const posts = [
  {
    id: '1',
    author: 'Анна К.',
    role: 'Участник DAO',
    time: '2 часа назад',
    text: 'Наконец-то добрала норму сна 7.5 часов и заметила, как улучшилось восстановление после силовых.',
    tags: ['сон', 'восстановление', 'силовые'],
    stats: { likes: 42, comments: 8, saves: 12 },
  },
  {
    id: '2',
    author: 'Нутрициолог Мария',
    role: 'Эксперт',
    time: 'Сегодня',
    text: 'Подготовила чек-лист по микронутриентам. Проверяем железо, D3, B12 и магний.',
    tags: ['нутрициология', 'анализы', 'микронутриенты'],
    stats: { likes: 118, comments: 24, saves: 56 },
  },
  {
    id: '3',
    author: 'Тренер Алексей',
    role: 'Силовой тренинг',
    time: 'Вчера',
    text: 'Запустил новый курс по безопасной технике становой тяги. Старт через 5 дней.',
    tags: ['тренировки', 'техника', 'курс'],
    stats: { likes: 86, comments: 12, saves: 31 },
  },
]

const friendSuggestions = [
  { name: 'Ксения', focus: 'Пилатес', mutual: 4 },
  { name: 'Максим', focus: 'Биохакинг', mutual: 2 },
  { name: 'Екатерина', focus: 'Психология', mutual: 6 },
]

const subscriptions = [
  { name: 'Pro AI', price: '990 ₽/мес', desc: 'ИИ-коуч + аналитика', badge: 'Популярно' },
  { name: 'Team Health', price: '2 490 ₽/мес', desc: 'Семейный доступ + телемедицина' },
]

const groups = [
  { name: 'Утренний бег', members: 320, schedule: 'Пн/Ср/Пт 07:00' },
  { name: 'Осознанность', members: 210, schedule: 'Вт/Чт 20:00' },
  { name: 'Здоровая спина', members: 145, schedule: 'Сб 11:00' },
]

export default function SocialPage() {
  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-ink-800">Социальная лента</h1>
            <p className="text-ink-600">
              Истории, прогресс, мероприятия и подписки на специалистов.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="sketch-button">Создать пост</button>
            <button className="px-5 py-2.5 rounded-lg border-2 border-ink-300 text-ink-700 hover:bg-parchment-200">
              Мои подписки
            </button>
          </div>
        </header>

        <section className="sketch-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-ink-800">Истории дня</h2>
            <button className="ink-link text-sm">Добавить историю</button>
          </div>
          <div className="flex flex-wrap gap-4">
            {stories.map((story) => (
              <div
                key={story.name}
                className="w-36 p-3 rounded-xl border-2 border-ink-200 bg-parchment-100 text-center"
              >
                <div className="w-12 h-12 mx-auto rounded-full border-2 border-ink-400 bg-parchment-200 flex items-center justify-center text-lg">
                  {story.name[0]}
                </div>
                <div className="mt-2 text-sm font-semibold text-ink-800">
                  {story.name}
                </div>
                <div className="text-xs text-ink-500">{story.role}</div>
                <div className="text-xs text-ink-600 mt-1">{story.status}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-6">
          <div className="space-y-6">
            <section className="sketch-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-ink-400 bg-parchment-200 flex items-center justify-center text-lg">
                  Я
                </div>
                <input
                  className="sketch-input"
                  placeholder="Поделиться прогрессом, анализами или идеей..."
                />
                <button className="sketch-button">Опубликовать</button>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-600">
                <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
                  📊 Добавить метрики
                </span>
                <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
                  🎥 Прямой эфир
                </span>
                <span className="px-3 py-1 rounded-full border border-ink-300 bg-parchment-100">
                  🤝 Совместная тренировка
                </span>
              </div>
            </section>

            {posts.map((post) => (
              <article key={post.id} className="sketch-card p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-ink-800">
                      {post.author}
                    </div>
                    <div className="text-xs text-ink-500">
                      {post.role} · {post.time}
                    </div>
                  </div>
                  <button className="text-sm text-ink-600 hover:text-ink-800">
                    Подписаться
                  </button>
                </div>
                <p className="text-ink-700">{post.text}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-parchment-100 border border-ink-200 text-xs text-ink-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6 text-sm text-ink-600">
                  <span>❤️ {post.stats.likes}</span>
                  <span>💬 {post.stats.comments}</span>
                  <span>🔖 {post.stats.saves}</span>
                  <button className="ink-link text-sm">Сохранить в прогресс</button>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <section className="sketch-card p-6">
              <h3 className="text-lg font-semibold text-ink-800 mb-3">
                Рекомендации друзей
              </h3>
              <div className="space-y-3">
                {friendSuggestions.map((friend) => (
                  <div
                    key={friend.name}
                    className="flex items-center justify-between p-3 bg-parchment-100 rounded-lg border border-ink-200"
                  >
                    <div>
                      <div className="font-semibold text-ink-800">{friend.name}</div>
                      <div className="text-xs text-ink-500">
                        {friend.focus} · общих друзей {friend.mutual}
                      </div>
                    </div>
                    <button className="px-3 py-1 rounded-md border border-ink-300 text-xs text-ink-700 hover:bg-parchment-200">
                      Добавить
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className="sketch-card p-6">
              <h3 className="text-lg font-semibold text-ink-800 mb-3">
                Подписки и абонементы
              </h3>
              <div className="space-y-3">
                {subscriptions.map((sub) => (
                  <div
                    key={sub.name}
                    className="p-4 rounded-lg border border-ink-200 bg-parchment-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-ink-800">{sub.name}</div>
                      {sub.badge && (
                        <span className="text-xs px-2 py-1 rounded-full bg-ink-700 text-white">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-ink-600">{sub.desc}</div>
                    <div className="text-sm font-semibold text-ink-800 mt-2">
                      {sub.price}
                    </div>
                    <button className="mt-3 w-full sketch-button">Подключить</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="sketch-card p-6">
              <h3 className="text-lg font-semibold text-ink-800 mb-3">
                Групповые занятия
              </h3>
              <div className="space-y-3">
                {groups.map((group) => (
                  <div
                    key={group.name}
                    className="p-3 rounded-lg border border-ink-200 bg-parchment-100"
                  >
                    <div className="font-semibold text-ink-800">{group.name}</div>
                    <div className="text-xs text-ink-500">
                      {group.members} участников
                    </div>
                    <div className="text-xs text-ink-600">{group.schedule}</div>
                    <button className="mt-2 text-sm ink-link">Присоединиться</button>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
