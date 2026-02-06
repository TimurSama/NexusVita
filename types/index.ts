// Общие типы для приложения Nexus Vita

export type DashboardMetric = {
  id: string
  label: string
  value: string | number
  unit?: string
  link: string
  position: {
    x: number // Процент от центра Витрувианского человека
    y: number
  }
}

export type VitruvianManPose = {
  tag: string
  name: string
  description: string
  muscleGroups: string[]
  safetyNotes?: string
}


