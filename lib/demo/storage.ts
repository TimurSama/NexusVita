/**
 * Демо-режим: хранение данных в localStorage
 * Используется когда DATABASE_URL не настроен
 */

export type DemoUser = {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  role: string
  avatar?: string
  onboardingCompleted: boolean
  aiTrialEndsAt?: string
  createdAt: string
}

export type DemoFormData = {
  name?: string
  age?: string
  gender?: string
  goals?: string[]
  primaryGoal?: string
  mood?: string
  activityLevel?: string
  planLevel?: string
  healthIssues?: string[]
  preferences?: string[]
  weight?: string
  height?: string
  sleepHours?: string
  stressLevel?: string
  nutritionHabits?: string[]
  trainingExperience?: string
  budget?: string
  timeAvailable?: string
}

export type DemoPlan = {
  id: string
  userId: string
  level: 'soft' | 'medium' | 'hard'
  recommendations: string[]
  schedule: Array<{
    day: string
    time: string
    activity: string
    type: string
  }>
  specialists?: Array<{
    name: string
    role: string
    specialization: string
  }>
  createdAt: string
}

// Ключи для localStorage
const STORAGE_KEYS = {
  USER: 'nv_demo_user',
  FORM_DATA: 'nv_demo_form_data',
  PLANS: 'nv_demo_plans',
  METRICS: 'nv_demo_metrics',
  GOALS: 'nv_demo_goals',
  ACHIEVEMENTS: 'nv_demo_achievements',
} as const

// Работа с пользователем
export const demoStorage = {
  // Пользователь
  getUser(): DemoUser | null {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    return data ? JSON.parse(data) : null
  },

  setUser(user: DemoUser): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  createUser(data: {
    email: string
    username: string
    password: string
    firstName?: string
    lastName?: string
  }): DemoUser {
    const user: DemoUser = {
      id: `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      role: 'USER',
      onboardingCompleted: false,
      aiTrialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString(),
    }
    this.setUser(user)
    return user
  },

  // Данные формы
  getFormData(): DemoFormData {
    if (typeof window === 'undefined') return {}
    const data = localStorage.getItem(STORAGE_KEYS.FORM_DATA)
    return data ? JSON.parse(data) : {}
  },

  setFormData(data: DemoFormData): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEYS.FORM_DATA, JSON.stringify(data))
  },

  updateFormData(updates: Partial<DemoFormData>): void {
    const current = this.getFormData()
    this.setFormData({ ...current, ...updates })
  },

  // Планы
  getPlans(): DemoPlan[] {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.PLANS)
    return data ? JSON.parse(data) : []
  },

  savePlan(plan: DemoPlan): void {
    if (typeof window === 'undefined') return
    const plans = this.getPlans()
    plans.push(plan)
    localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(plans))
  },

  getPlanByUserId(userId: string): DemoPlan | null {
    const plans = this.getPlans()
    return plans.find(p => p.userId === userId) || null
  },

  // Метрики
  getMetrics(): Array<{
    type: string
    value: number
    unit?: string
    date: string
  }> {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.METRICS)
    return data ? JSON.parse(data) : []
  },

  addMetric(metric: {
    type: string
    value: number
    unit?: string
  }): void {
    if (typeof window === 'undefined') return
    const metrics = this.getMetrics()
    metrics.push({
      ...metric,
      date: new Date().toISOString(),
    })
    localStorage.setItem(STORAGE_KEYS.METRICS, JSON.stringify(metrics))
  },

  // Цели
  getGoals(): Array<{
    id: string
    title: string
    description: string
    target: number
    current: number
    unit: string
    deadline: string
  }> {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.GOALS)
    return data ? JSON.parse(data) : []
  },

  addGoal(goal: {
    title: string
    description: string
    target: number
    unit: string
    deadline: string
  }): void {
    if (typeof window === 'undefined') return
    const goals = this.getGoals()
    goals.push({
      id: `goal_${Date.now()}`,
      ...goal,
      current: 0,
    })
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals))
  },

  // Достижения
  getAchievements(): Array<{
    id: string
    title: string
    description: string
    icon: string
    earnedAt: string
  }> {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)
    return data ? JSON.parse(data) : []
  },

  addAchievement(achievement: {
    id: string
    title: string
    description: string
    icon: string
  }): void {
    if (typeof window === 'undefined') return
    const achievements = this.getAchievements()
    achievements.push({
      ...achievement,
      earnedAt: new Date().toISOString(),
    })
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements))
  },

  // Очистка (для тестирования)
  clearAll(): void {
    if (typeof window === 'undefined') return
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key)
    })
  },
}
