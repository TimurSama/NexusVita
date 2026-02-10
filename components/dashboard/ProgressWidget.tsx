'use client'

import { TrendingUp, Target } from 'lucide-react'
import DashboardWidget from './DashboardWidget'
import NeumorphicChart from '@/components/ui/NeumorphicChart'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import { generateMockGoals, generateMockMetrics } from '@/lib/mocks/data-generators'

export default function ProgressWidget() {
  const goals = generateMockGoals(3)
  const metrics = generateMockMetrics(7)

  const chartData = metrics.slice(0, 7).map((m, i) => ({
    label: m.label,
    value: m.value,
  }))

  return (
    <DashboardWidget
      title="Прогресс"
      icon={<TrendingUp className="w-5 h-5" />}
    >
      <div className="space-y-4">
        <NeumorphicChart
          type="line"
          data={chartData}
          height={150}
          showLabels={false}
        />

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-warmGraphite-800 mb-2">
            Активные цели
          </h4>
          {goals.filter((g) => g.status === 'active').map((goal) => {
            const progress = (goal.current / goal.target) * 100
            return (
              <NeumorphicCard key={goal.id} soft className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-warmGraphite-800">
                    {goal.title}
                  </span>
                  <span className="text-xs text-warmGraphite-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                </div>
                <div className="w-full bg-warmGray-200 rounded-full h-2">
                  <div
                    className="bg-warmBlue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </NeumorphicCard>
            )
          })}
        </div>
      </div>
    </DashboardWidget>
  )
}
