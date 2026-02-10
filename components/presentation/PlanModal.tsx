'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, Calendar, User, Activity } from 'lucide-react'
import NeumorphicModal from '@/components/ui/NeumorphicModal'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { demoStorage, type DemoPlan } from '@/lib/demo/storage'

interface PlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PlanModal({ isOpen, onClose }: PlanModalProps) {
  const router = useRouter()
  const [plan, setPlan] = useState<DemoPlan | null>(null)

  useEffect(() => {
    if (!isOpen) return
    const user = demoStorage.getUser()
    if (!user) {
      setPlan(null)
      return
    }
    const lastPlan = demoStorage.getPlanByUserId(user.id)
    setPlan(lastPlan)
  }, [isOpen])

  const trainingDays =
    plan?.schedule.filter((s) => s.type === 'training').length ?? 0
  const recoveryDays =
    plan?.schedule.filter((s) => s.type === 'activity' || s.type === 'mental')
      .length ?? 0

  return (
    <NeumorphicModal
      isOpen={isOpen}
      onClose={onClose}
      title="Ваш персональный план на месяц"
      size="xl"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-warmGreen-500 mx-auto mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg text-warmGraphite-600">
            План сформирован на основе ваших ответов в презентации. После регистрации он
            будет доступен в личном кабинете.
          </p>
        </div>

        {plan ? (
          <>
            <NeumorphicCard className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-warmBlue-600" />
                  <span className="text-sm sm:text-base text-warmGraphite-700">
                    Уровень плана:{' '}
                    <strong className="text-warmGraphite-800">
                      {plan.level === 'hard'
                        ? 'Интенсивный'
                        : plan.level === 'soft'
                          ? 'Мягкий'
                          : 'Умеренный'}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-warmGraphite-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Старт: {new Date(plan.createdAt).toLocaleDateString('ru-RU')}
                  </span>
                </div>
              </div>
            </NeumorphicCard>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <NeumorphicCard className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-2">
                  Нагрузка
                </h3>
                <p className="text-xs sm:text-sm text-warmGraphite-600 mb-3">
                  Основные тренировки и активные дни.
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-1">
                  {trainingDays}
                </div>
                <p className="text-xs text-warmGray-600">дней с фокусом на тренировках</p>
              </NeumorphicCard>

              <NeumorphicCard className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-2">
                  Восстановление и психика
                </h3>
                <p className="text-xs sm:text-sm text-warmGraphite-600 mb-3">
                  Дни с практиками восстановления и заботой о психике.
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-warmGraphite-800 mb-1">
                  {recoveryDays}
                </div>
                <p className="text-xs text-warmGray-600">
                  дней с мягкими активностями и практиками
                </p>
              </NeumorphicCard>

              <NeumorphicCard className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-2">
                  Специалисты
                </h3>
                <p className="text-xs sm:text-sm text-warmGraphite-600 mb-3">
                  Ключевые роли, с которыми вы можете работать.
                </p>
                <div className="space-y-1.5">
                  {(plan.specialists || []).map((s) => (
                    <div
                      key={s.name}
                      className="flex items-center justify-between text-xs sm:text-sm text-warmGraphite-700"
                    >
                      <span>{s.name}</span>
                      <span className="text-warmGray-500">{s.role}</span>
                    </div>
                  ))}
                  {(!plan.specialists || plan.specialists.length === 0) && (
                    <p className="text-xs text-warmGray-500">
                      В демо‑версии список специалистов сокращён.
                    </p>
                  )}
                </div>
              </NeumorphicCard>
            </div>

            <NeumorphicCard className="p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-3">
                Пример недели из плана
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {plan.schedule.slice(0, 7).map((item, idx) => (
                  <div
                    key={`${item.day}-${idx}`}
                    className="flex items-start gap-3 py-2 border-b border-warmGray-200/60 last:border-none"
                  >
                    <div className="mt-0.5">
                      <Activity className="w-4 h-4 text-warmBlue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        <NeumorphicBadge size="sm">{item.day}</NeumorphicBadge>
                        <span className="text-warmGray-600">{item.time}</span>
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-warmGraphite-800">
                        {item.activity}
                      </div>
                      <p className="text-xs text-warmGray-600 capitalize">
                        Тип: {item.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </>
        ) : (
          <NeumorphicCard className="p-4 sm:p-6 text-center">
            <p className="text-sm sm:text-base text-warmGraphite-600">
              Демо‑план не найден. Попробуйте ещё раз пройти опрос в презентации — после
              этого здесь появится ваш предварительный план.
            </p>
          </NeumorphicCard>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <NeumorphicButton
            primary
            onClick={() => router.push('/register')}
            className="flex-1"
          >
            Зарегистрироваться и получить этот план + 7 дней AI Health+
          </NeumorphicButton>
          <NeumorphicButton
            onClick={() => router.push('/subscriptions')}
            className="flex-1"
          >
            Посмотреть подписки и премиум‑функции
          </NeumorphicButton>
        </div>
      </div>
    </NeumorphicModal>
  )
}
