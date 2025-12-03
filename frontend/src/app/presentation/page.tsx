'use client'

import InteractivePresentation from '@/components/presentation/InteractivePresentation'

export default function PresentationPage() {
  return <InteractivePresentation />
}

// Старая версия сохранена ниже для справки
export function OldPresentationPage() {
  return (
    <div className="min-h-screen bg-parchment-50">
      <main>
        {/* Hero секция */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 text-ink-900">
            Nexus Vita
          </h1>
          <p className="text-2xl text-ink-600 mb-8 max-w-3xl mx-auto">
            Модульная экосистема здоровья, тренировок и работы с тренерами.
            Объединяем пользователей, тренеров, врачей и фитнес-клубы в едином пространстве.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push('/register')}
              className="button-primary text-lg px-8 py-4"
            >
              Начать бесплатно
            </button>
            <button
              onClick={() => router.push('/demo')}
              className="button-secondary text-lg px-8 py-4"
            >
              Попробовать демо
            </button>
          </div>
        </section>

        {/* Ключевые особенности */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Ключевые особенности</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold mb-3">Уникальные мини-сайты тренеров</h3>
              <p className="text-ink-600">
                Каждый тренер создаёт свой мини-сайт с кастомным дизайном, модулями и контентом.
                Выбирайте темы оформления или создавайте свои.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-2xl font-bold mb-3">Интерактивный аватар тела</h3>
              <p className="text-ink-600">
                Отслеживайте прогресс, отмечайте цели и проблемные зоны на схематичной модели тела
                в стиле чертежей Леонардо да Винчи.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-3">Токеномика</h3>
              <p className="text-ink-600">
                Получайте токены за активности, используйте их для покупок и скидок.
                Внутренняя экономика мотивирует к регулярным тренировкам.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3">Интеграция с Telegram</h3>
              <p className="text-ink-600">
                Синхронизация чатов, мини-приложение в Telegram, уведомления.
                Общайтесь с тренерами прямо из мессенджера.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🏋️</div>
              <h3 className="text-2xl font-bold mb-3">Программы тренировок</h3>
              <p className="text-ink-600">
                Персональные программы от тренеров, планы питания, отслеживание прогресса.
                Всё в одном месте.
              </p>
            </div>
            <div className="card text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold mb-3">Челленджи и достижения</h3>
              <p className="text-ink-600">
                Участвуйте в челленджах, соревнуйтесь с другими, получайте награды и токены.
                Мотивация к постоянному развитию.
              </p>
            </div>
          </div>
        </section>

        {/* Для кого */}
        <section className="bg-parchment-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Для кого Nexus Vita?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold mb-3">👤 Пользователи</h3>
                <ul className="space-y-2 text-ink-600">
                  <li>• Отслеживание прогресса</li>
                  <li>• Программы тренировок</li>
                  <li>• Подписка на тренеров</li>
                  <li>• Участие в челленджах</li>
                  <li>• Получение токенов</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-3">🏋️ Тренеры</h3>
                <ul className="space-y-2 text-ink-600">
                  <li>• Создание мини-сайта</li>
                  <li>• Управление контентом</li>
                  <li>• Продажа программ</li>
                  <li>• Работа с клиентами</li>
                  <li>• Календарь тренировок</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-3">🏢 Фитнес-клубы</h3>
                <ul className="space-y-2 text-ink-600">
                  <li>• Управление абонементами</li>
                  <li>• QR/NFC проход</li>
                  <li>• Партнёрские программы</li>
                  <li>• Интеграция с тренерами</li>
                  <li>• Аналитика посещений</li>
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold mb-3">👨‍⚕️ Врачи</h3>
                <ul className="space-y-2 text-ink-600">
                  <li>• Медицинские рекомендации</li>
                  <li>• Работа с анализами</li>
                  <li>• Интеграция с тренировками</li>
                  <li>• Консультации</li>
                  <li>• Отслеживание здоровья</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Как это работает */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-center mb-12">Как это работает?</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="text-4xl font-bold text-accent-turquoise">1</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Регистрация</h3>
                <p className="text-ink-600">
                  Создайте аккаунт, выберите роль (пользователь или тренер), настройте профиль
                  и интерактивный аватар тела.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-4xl font-bold text-accent-turquoise">2</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Выбор тренера</h3>
                <p className="text-ink-600">
                  Изучите страницы тренеров, их программы и контент. Подпишитесь на понравившихся
                  тренеров и получите доступ к их материалам.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-4xl font-bold text-accent-turquoise">3</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Тренировки и прогресс</h3>
                <p className="text-ink-600">
                  Выполняйте программы тренировок, записывайте результаты, отслеживайте прогресс
                  на интерактивном аватаре тела. Получайте токены за активности.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="text-4xl font-bold text-accent-turquoise">4</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Использование токенов</h3>
                <p className="text-ink-600">
                  Тратьте накопленные токены на покупку программ, услуг тренеров, абонементов
                  в залы или скидки на товары.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent-turquoise text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-xl mb-8 opacity-90">
              Присоединяйтесь к экосистеме Nexus Vita уже сегодня
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => router.push('/register')}
                className="bg-white text-accent-turquoise px-8 py-4 rounded-lg font-bold text-lg hover:bg-ink-50 transition"
              >
                Зарегистрироваться
              </button>
              <button
                onClick={() => router.push('/demo')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-accent-turquoise transition"
              >
                Попробовать демо
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

