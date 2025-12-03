'use client'

interface DemoBannerProps {
  role: string
  feature: string
}

export default function DemoBanner({ role, feature }: DemoBannerProps) {
  const roleNames: Record<string, string> = {
    guest: 'Гость',
    user: 'Пользователь',
    trainer: 'Тренер',
    location_manager: 'Менеджер локации',
    admin: 'Администратор',
  }

  const featureNames: Record<string, string> = {
    home: 'Главная страница',
    trainer_page: 'Страница тренера',
    body_avatar: 'Аватар тела',
    shop: 'Магазин',
    calendar: 'Календарь',
    chat: 'Чат',
  }

  return (
    <div className="bg-yellow-100 border-b-2 border-yellow-400 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-bold text-yellow-800">ДЕМО-РЕЖИМ</span>
          <span className="text-sm text-yellow-700">
            Роль: <strong>{roleNames[role] || role}</strong>
          </span>
          <span className="text-sm text-yellow-700">
            Функция: <strong>{featureNames[feature] || feature}</strong>
          </span>
        </div>
        <div className="text-xs text-yellow-600">
          Это демонстрационная версия. Все действия не сохраняются.
        </div>
      </div>
    </div>
  )
}

