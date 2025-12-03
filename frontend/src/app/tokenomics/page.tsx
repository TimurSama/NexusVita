'use client'

import Header from '@/components/layout/Header'

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-parchment-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Токеномика Nexus Vita</h1>
          <p className="text-xl text-ink-600">
            Внутренняя экономика для мотивации и вознаграждения активных участников
          </p>
        </div>

        {/* Как получить токены */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Как получить токены?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card">
              <div className="text-4xl mb-4">🏋️</div>
              <h3 className="text-xl font-bold mb-3">Тренировки</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Завершение тренировки: <strong>10-50 токенов</strong></li>
                <li>• Выполнение программы: <strong>100-200 токенов</strong></li>
                <li>• Неделя регулярных тренировок: <strong>50 токенов</strong></li>
                <li>• Месяц регулярных тренировок: <strong>300 токенов</strong></li>
              </ul>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-3">Челленджи</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Участие в челлендже: <strong>20-100 токенов</strong></li>
                <li>• Завершение челленджа: <strong>200-500 токенов</strong></li>
                <li>• Место в топ-10: <strong>+100 токенов</strong></li>
                <li>• Первое место: <strong>+500 токенов</strong></li>
              </ul>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Социальная активность</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Приглашение друга: <strong>100 токенов</strong></li>
                <li>• Друг зарегистрировался: <strong>50 токенов</strong></li>
                <li>• Публикация поста: <strong>5-20 токенов</strong></li>
                <li>• Комментарий к посту: <strong>2 токена</strong></li>
              </ul>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Достижения</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Достижение цели: <strong>50-200 токенов</strong></li>
                <li>• Новый уровень: <strong>100 токенов</strong></li>
                <li>• Бейдж за активность: <strong>25-100 токенов</strong></li>
                <li>• Стрик (серия дней): <strong>10 токенов/день</strong></li>
              </ul>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Покупки и подписки</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Покупка программы: <strong>5% кэшбэк</strong></li>
                <li>• Подписка на тренера: <strong>10% кэшбэк</strong></li>
                <li>• Покупка абонемента: <strong>3% кэшбэк</strong></li>
                <li>• Отзыв о тренере: <strong>10 токенов</strong></li>
              </ul>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">Обучение</h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Просмотр образовательного видео: <strong>5 токенов</strong></li>
                <li>• Завершение курса: <strong>50-150 токенов</strong></li>
                <li>• Прохождение теста: <strong>10-30 токенов</strong></li>
                <li>• Чтение статьи: <strong>2 токена</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Как использовать токены */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Как использовать токены?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-bold mb-3">Покупки</h3>
              <p className="text-ink-600 mb-4">
                Оплачивайте токенами программы тренировок, консультации тренеров,
                абонементы в залы и товары в магазине.
              </p>
              <div className="text-sm text-ink-500">
                Курс: ~2 токена = 1 ₽
              </div>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-bold mb-3">Премиум функции</h3>
              <p className="text-ink-600 mb-4">
                Открывайте доступ к премиум-программам, эксклюзивным челленджам
                и расширенной аналитике.
              </p>
              <div className="text-sm text-ink-500">
                От 100 токенов
              </div>
            </div>
            <div className="card">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-bold mb-3">Скидки и бонусы</h3>
              <p className="text-ink-600 mb-4">
                Используйте токены для получения скидок на тарифы, программы
                и услуги тренеров.
              </p>
              <div className="text-sm text-ink-500">
                До 50% скидки
              </div>
            </div>
          </div>
        </section>

        {/* Экономическая модель */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Экономическая модель</h2>
          <div className="card">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Источники токенов</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Активности пользователей</span>
                    <span className="font-bold text-accent-turquoise">70%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-turquoise h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Покупки и подписки</span>
                    <span className="font-bold text-accent-turquoise">20%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-turquoise h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Бонусы и награды</span>
                    <span className="font-bold text-accent-turquoise">10%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-turquoise h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Использование токенов</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Покупка программ</span>
                    <span className="font-bold text-accent-red">40%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-red h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Тарифы и подписки</span>
                    <span className="font-bold text-accent-red">30%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-red h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Абонементы и услуги</span>
                    <span className="font-bold text-accent-red">20%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-red h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Товары в магазине</span>
                    <span className="font-bold text-accent-red">10%</span>
                  </div>
                  <div className="w-full bg-ink-200 rounded-full h-2">
                    <div className="bg-accent-red h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Уровни и бонусы */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Уровни пользователей</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { level: 1, name: 'Новичок', tokens: 0, bonus: '0%', color: 'bg-ink-200' },
              { level: 2, name: 'Активный', tokens: 1000, bonus: '5%', color: 'bg-green-200' },
              { level: 3, name: 'Продвинутый', tokens: 5000, bonus: '10%', color: 'bg-blue-200' },
              { level: 4, name: 'Эксперт', tokens: 10000, bonus: '15%', color: 'bg-purple-200' },
            ].map((lvl) => (
              <div key={lvl.level} className="card text-center">
                <div className={`w-16 h-16 ${lvl.color} rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold`}>
                  {lvl.level}
                </div>
                <h3 className="text-xl font-bold mb-2">{lvl.name}</h3>
                <p className="text-sm text-ink-600 mb-2">От {lvl.tokens.toLocaleString()} токенов</p>
                <p className="text-lg font-bold text-accent-turquoise">Бонус: {lvl.bonus}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            <div className="card">
              <h3 className="font-bold mb-2">Можно ли обменять токены на деньги?</h3>
              <p className="text-ink-600">
                Нет, токены Nexus Vita — это внутренняя валюта, которая может использоваться только
                внутри экосистемы для покупки услуг, программ и товаров.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Истекают ли токены?</h3>
              <p className="text-ink-600">
                Токены не истекают, но мы рекомендуем активно их использовать для получения максимальной
                пользы от экосистемы.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Можно ли купить токены за деньги?</h3>
              <p className="text-ink-600">
                В будущем планируется возможность покупки токенов, но основная цель — зарабатывать их
                через активное участие в экосистеме.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold mb-2">Как отслеживать баланс токенов?</h3>
              <p className="text-ink-600">
                Баланс токенов отображается на главной странице и в профиле. Вы также можете просмотреть
                историю всех транзакций в разделе "Токены".
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

