import { Question } from './types'

export const questions: Question[] = [
  { id: 'name', text: 'Как вас зовут?', type: 'text', required: true },
  { id: 'age', text: 'Сколько вам лет?', type: 'number', required: true },
  { id: 'gender', text: 'Ваш пол?', type: 'select', options: ['Мужской', 'Женский', 'Другое'], required: true },
  { id: 'weight', text: 'Ваш вес (кг)?', type: 'number', required: false },
  { id: 'height', text: 'Ваш рост (см)?', type: 'number', required: false },
  { id: 'goals', text: 'Какие у вас цели? (можно выбрать несколько)', type: 'multiselect', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'], required: true },
  { id: 'primaryGoal', text: 'Главная цель?', type: 'select', options: ['Снижение веса', 'Набор мышечной массы', 'Улучшение выносливости', 'Улучшение сна', 'Снижение стресса', 'Улучшение питания', 'Реабилитация', 'Общее оздоровление'], required: true },
  { id: 'mood', text: 'Как ваше настроение?', type: 'select', options: ['Отлично', 'Хорошо', 'Нормально', 'Плохо', 'Очень плохо'], required: false },
  { id: 'activityLevel', text: 'Уровень активности?', type: 'select', options: ['Минимальный', 'Низкий', 'Умеренный', 'Высокий', 'Очень высокий'], required: true },
  { id: 'sleepHours', text: 'Сколько часов вы спите в среднем?', type: 'number', required: false },
  { id: 'stressLevel', text: 'Уровень стресса?', type: 'select', options: ['Очень низкий', 'Низкий', 'Умеренный', 'Высокий', 'Очень высокий'], required: false },
  { id: 'nutritionHabits', text: 'Ваши пищевые привычки?', type: 'multiselect', options: ['Веган', 'Вегетарианец', 'Пескетарианец', 'Обычное питание', 'Кето', 'Палео', 'Интервальное голодание'], required: false },
  { id: 'trainingExperience', text: 'Опыт тренировок?', type: 'select', options: ['Новичок', 'Начинающий', 'Средний', 'Продвинутый', 'Профессионал'], required: false },
  { id: 'healthIssues', text: 'Есть ли проблемы со здоровьем?', type: 'multiselect', options: ['Нет', 'Диабет', 'Гипертония', 'Проблемы с суставами', 'Проблемы с позвоночником', 'Сердечно-сосудистые', 'Другое'], required: false },
  { id: 'timeAvailable', text: 'Сколько времени можете уделять в неделю?', type: 'select', options: ['Меньше 3 часов', '3-5 часов', '5-7 часов', '7-10 часов', 'Больше 10 часов'], required: false },
  { id: 'budget', text: 'Бюджет на здоровье в месяц?', type: 'select', options: ['До $50', '$50-$100', '$100-$200', '$200-$500', 'Больше $500'], required: false },
  { id: 'planLevel', text: 'Уровень плана?', type: 'select', options: ['Мягкий', 'Умеренный', 'Интенсивный'], required: true },
]
