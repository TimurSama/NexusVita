/**
 * Демо-данные для демонстрации функционала
 */

export const mockMetrics = {
  pulse: 62,
  sleep: { hours: 7, minutes: 10 },
  calories: { consumed: 1840, target: 2100 },
  stress: 'умеренный',
  social: 2,
  activities: ['Йога', 'бег'],
}

export const mockDailyPlan = [
  {
    id: '1',
    time: '18:00',
    title: 'Тренировка',
    type: 'training',
    description: 'Силовая тренировка',
    reminder: 'Не забыть поесть и выпить предтрен',
  },
  {
    id: '2',
    time: '19:30',
    title: 'Прием пищи',
    type: 'nutrition',
    description: 'Ужин с высоким содержанием белка',
  },
  {
    id: '3',
    time: '09:00',
    title: 'Йога',
    type: 'activity',
    description: 'Групповое занятие',
    isTomorrow: true,
  },
]

export const mockAchievements = [
  {
    id: 'sleep_7h',
    title: '7 часов сна',
    description: 'Полноценный сон',
    icon: '🌙',
    points: 25,
  },
  {
    id: 'workout_complete',
    title: 'Тренировка завершена',
    description: 'Отличная работа!',
    icon: '💪',
    points: 40,
  },
  {
    id: 'nutrition_plan',
    title: 'План питания выполнен',
    description: 'Все цели достигнуты',
    icon: '🥗',
    points: 20,
  },
]

export const mockSpecialists = [
  {
    id: '1',
    name: 'Анна Петрова',
    role: 'DOCTOR' as const,
    specialization: 'Кардиолог',
    rating: 4.9,
    experience: '10 лет',
    avatar: null,
  },
  {
    id: '2',
    name: 'Иван Сидоров',
    role: 'TRAINER' as const,
    specialization: 'Фитнес-тренер',
    rating: 4.8,
    experience: '5 лет',
    avatar: null,
  },
  {
    id: '3',
    name: 'Мария Козлова',
    role: 'PSYCHOLOGIST' as const,
    specialization: 'Психолог',
    rating: 4.9,
    experience: '8 лет',
    avatar: null,
  },
]

export const mockRecommendations = [
  {
    id: '1',
    title: 'Увеличьте потребление воды',
    description: 'Рекомендуется выпивать 2-2.5 литра воды в день',
    category: 'nutrition',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Добавьте кардио-тренировки',
    description: '3 раза в неделю по 30 минут для улучшения выносливости',
    category: 'training',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Практикуйте медитацию',
    description: '10 минут утром для снижения стресса',
    category: 'mental',
    priority: 'medium',
  },
]

export function generatePersonalizedPlan(formData: {
  goals?: string[]
  activityLevel?: string
  planLevel?: string
  timeAvailable?: string
}) {
  const level = formData.planLevel || 'medium'
  // timeAvailable пока не используется в демо-логике, но может понадобиться позже
  // Оставляем для будущего использования
  void formData.timeAvailable

  const baseSchedule = [
    { day: 'Понедельник', time: '07:00', activity: 'Утренняя зарядка', type: 'training' },
    { day: 'Понедельник', time: '12:00', activity: 'Обед с балансом БЖУ', type: 'nutrition' },
    { day: 'Понедельник', time: '18:00', activity: 'Силовая тренировка', type: 'training' },
    { day: 'Вторник', time: '07:00', activity: 'Йога/растяжка', type: 'activity' },
    { day: 'Вторник', time: '19:00', activity: 'Медитация', type: 'mental' },
    { day: 'Среда', time: '07:00', activity: 'Кардио-тренировка', type: 'training' },
    { day: 'Среда', time: '12:00', activity: 'Консультация с диетологом', type: 'consultation' },
    { day: 'Четверг', time: '18:00', activity: 'Силовая тренировка', type: 'training' },
    { day: 'Пятница', time: '07:00', activity: 'Плавание', type: 'activity' },
    { day: 'Суббота', time: '10:00', activity: 'Групповое занятие', type: 'activity' },
    { day: 'Воскресенье', time: '09:00', activity: 'Восстановительная йога', type: 'activity' },
  ]

  const recommendations = [
    'Следите за водным балансом: 2-2.5 литра в день',
    'Спите не менее 7-8 часов',
    'Делайте перерывы каждые 2 часа работы',
    'Включите в рацион больше овощей и фруктов',
    'Практикуйте дыхательные упражнения для снижения стресса',
  ]

  const specialists = [
    { name: 'Анна Петрова', role: 'Врач-терапевт', specialization: 'Общая медицина' },
    { name: 'Иван Сидоров', role: 'Фитнес-тренер', specialization: 'Силовые тренировки' },
  ]

  return {
    level,
    schedule: baseSchedule,
    recommendations,
    specialists,
  }
}
