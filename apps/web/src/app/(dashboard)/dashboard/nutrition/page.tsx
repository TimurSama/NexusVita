'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button, Avatar } from '@/components/ui';

interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image?: string;
}

interface MealPlan {
  id: string;
  name: string;
  description: string;
  totalCalories: number;
  meals: Meal[];
  trainer?: {
    name: string;
    avatar?: string;
  };
}

const todayMeals: Meal[] = [
  {
    id: '1',
    name: 'Овсянка с ягодами',
    time: '08:00',
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 8,
  },
  {
    id: '2',
    name: 'Протеиновый коктейль',
    time: '11:00',
    calories: 200,
    protein: 30,
    carbs: 15,
    fat: 3,
  },
  {
    id: '3',
    name: 'Куриная грудка с овощами',
    time: '14:00',
    calories: 450,
    protein: 45,
    carbs: 30,
    fat: 12,
  },
  {
    id: '4',
    name: 'Творог с орехами',
    time: '17:00',
    calories: 280,
    protein: 25,
    carbs: 15,
    fat: 12,
  },
  {
    id: '5',
    name: 'Рыба с рисом',
    time: '20:00',
    calories: 420,
    protein: 35,
    carbs: 45,
    fat: 10,
  },
];

const weeklyStats = [
  { day: 'Пн', calories: 1850, target: 2200 },
  { day: 'Вт', calories: 2100, target: 2200 },
  { day: 'Ср', calories: 1950, target: 2200 },
  { day: 'Чт', calories: 2200, target: 2200 },
  { day: 'Пт', calories: 1800, target: 2200 },
  { day: 'Сб', calories: 0, target: 2200 },
  { day: 'Вс', calories: 0, target: 2200 },
];

const mealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'План для набора мышечной массы',
    description: 'Высокобелковый план питания для роста мышц',
    totalCalories: 2800,
    meals: [],
    trainer: {
      name: 'Мария Козлова',
    },
  },
  {
    id: '2',
    name: 'План для похудения',
    description: 'Сбалансированное питание с дефицитом калорий',
    totalCalories: 1800,
    meals: [],
    trainer: {
      name: 'Анна Смирнова',
    },
  },
  {
    id: '3',
    name: 'Веганский план',
    description: 'Полноценное растительное питание',
    totalCalories: 2200,
    meals: [],
    trainer: {
      name: 'Дмитрий Иванов',
    },
  },
];

export default function NutritionPage() {
  const [selectedTab, setSelectedTab] = useState<'today' | 'plans' | 'recipes'>('today');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const totalToday = todayMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targetCalories = 2200;
  const targetProtein = 150;
  const targetCarbs = 250;
  const targetFat = 70;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="heading-2">Питание & Нутрициология 🥗</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Отслеживайте калории и макронутриенты
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/nutrition/log" className="btn btn-primary">
            <span>➕</span>
            <span>Добавить приём пищи</span>
          </Link>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🔥</span>
              <Badge variant={totalToday.calories >= targetCalories ? 'success' : 'warning'} size="sm">
                {Math.round((totalToday.calories / targetCalories) * 100)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">
              {totalToday.calories}
              <span className="text-base font-normal text-[var(--text-tertiary)]"> / {targetCalories}</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Калории</div>
            <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalToday.calories / targetCalories) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">💪</span>
              <Badge variant={totalToday.protein >= targetProtein ? 'success' : 'warning'} size="sm">
                {Math.round((totalToday.protein / targetProtein) * 100)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">
              {totalToday.protein}g
              <span className="text-base font-normal text-[var(--text-tertiary)]"> / {targetProtein}g</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Белки</div>
            <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalToday.protein / targetProtein) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🍞</span>
              <Badge variant={totalToday.carbs >= targetCarbs ? 'success' : 'warning'} size="sm">
                {Math.round((totalToday.carbs / targetCarbs) * 100)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">
              {totalToday.carbs}g
              <span className="text-base font-normal text-[var(--text-tertiary)]"> / {targetCarbs}g</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Углеводы</div>
            <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalToday.carbs / targetCarbs) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">🥑</span>
              <Badge variant={totalToday.fat >= targetFat ? 'success' : 'warning'} size="sm">
                {Math.round((totalToday.fat / targetFat) * 100)}%
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-1">
              {totalToday.fat}g
              <span className="text-base font-normal text-[var(--text-tertiary)]"> / {targetFat}g</span>
            </div>
            <div className="text-sm text-[var(--text-secondary)]">Жиры</div>
            <div className="mt-3 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalToday.fat / targetFat) * 100, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Недельный прогресс</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyStats.map((day, index) => {
              const height = day.calories > 0 ? (day.calories / 2500) * 100 : 5;
              const isToday = index === 3;
              return (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-[var(--text-secondary)] mb-1">
                    {day.calories > 0 ? day.calories : '-'}
                  </span>
                  <div className="w-full flex flex-col items-center justify-end h-32">
                    <div
                      className={`w-full max-w-8 rounded-t-lg transition-all ${
                        day.calories >= day.target
                          ? 'bg-gradient-to-t from-green-600 to-green-400'
                          : day.calories > 0
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                          : 'bg-[var(--bg-tertiary)]'
                      } ${isToday ? 'ring-2 ring-emerald-500 ring-offset-2 ring-offset-[var(--bg-secondary)]' : ''}`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? 'text-emerald-400 font-medium' : 'text-[var(--text-tertiary)]'}`}>
                    {day.day}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-secondary)] rounded-xl w-fit">
        {[
          { id: 'today', label: 'Сегодня', icon: '📅' },
          { id: 'plans', label: 'Планы питания', icon: '📋' },
          { id: 'recipes', label: 'Рецепты', icon: '🍳' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedTab === tab.id
                ? 'bg-emerald-500 text-white'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Today's Meals */}
      {selectedTab === 'today' && (
        <div className="space-y-4">
          {todayMeals.map((meal) => (
            <Card key={meal.id} hover>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl flex-shrink-0">
                    🍽️
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold mb-1">{meal.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)]">{meal.time}</p>
                      </div>
                      <Badge variant="default" size="sm">{meal.calories} ккал</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-[var(--text-secondary)]">
                        <span className="text-blue-400 font-medium">{meal.protein}g</span> белки
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        <span className="text-yellow-400 font-medium">{meal.carbs}g</span> углеводы
                      </span>
                      <span className="text-[var(--text-secondary)]">
                        <span className="text-green-400 font-medium">{meal.fat}g</span> жиры
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">✏️</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Meal Plans */}
      {selectedTab === 'plans' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mealPlans.map((plan) => (
            <Card key={plan.id} hover clickable>
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-emerald-500 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🥗
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">{plan.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm">
                    <span className="text-[var(--text-secondary)]">Калорий: </span>
                    <span className="font-medium">{plan.totalCalories} ккал/день</span>
                  </div>
                </div>
                {plan.trainer && (
                  <div className="flex items-center gap-2 mb-4">
                    <Avatar size="xs" name={plan.trainer.name} />
                    <span className="text-sm text-[var(--text-secondary)]">{plan.trainer.name}</span>
                  </div>
                )}
                <Button fullWidth>Выбрать план</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recipes */}
      {selectedTab === 'recipes' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Протеиновые панкейки', calories: 320, time: '15 мин', difficulty: 'Легко' },
            { name: 'Салат с курицей', calories: 280, time: '20 мин', difficulty: 'Легко' },
            { name: 'Смузи-боул', calories: 250, time: '10 мин', difficulty: 'Легко' },
            { name: 'Лосось с овощами', calories: 450, time: '30 мин', difficulty: 'Средне' },
            { name: 'Протеиновые батончики', calories: 200, time: '25 мин', difficulty: 'Средне' },
            { name: 'Куриные наггетсы', calories: 380, time: '35 мин', difficulty: 'Средне' },
          ].map((recipe) => (
            <Card key={recipe.name} hover clickable>
              <div className="aspect-video rounded-t-xl bg-gradient-to-br from-emerald-500/50 to-teal-500/50 flex items-center justify-center text-5xl">
                🍳
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">{recipe.name}</h3>
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-4">
                  <span>🔥 {recipe.calories} ккал</span>
                  <span>⏱️ {recipe.time}</span>
                  <Badge variant="default" size="sm">{recipe.difficulty}</Badge>
                </div>
                <Button fullWidth size="sm">Открыть рецепт</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: '📝', label: 'Записать приём пищи', href: '/dashboard/nutrition/log' },
          { icon: '📊', label: 'Аналитика питания', href: '/dashboard/nutrition/analytics' },
          { icon: '👨‍⚕️', label: 'Консультация нутрициолога', href: '/dashboard/trainers?type=nutrition' },
          { icon: '🎯', label: 'Цели по питанию', href: '/dashboard/nutrition/goals' },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-emerald-500/50 hover:bg-[var(--bg-tertiary)] transition-all text-center group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{action.icon}</span>
            <span className="text-sm text-[var(--text-secondary)]">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}


