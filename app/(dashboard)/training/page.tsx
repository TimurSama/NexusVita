'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Calendar, Target, Clock, AlertTriangle } from 'lucide-react'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

export default function TrainingPage() {
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

  const mockProgram = {
    programName: 'Программа на массу',
    goal: 'MASS',
    durationWeeks: 12,
    schedule: [
      {
        dayNumber: 1,
        trainingFocus: 'Грудь и трицепс',
        exercises: [
          {
            exerciseName: 'Жим штанги лежа',
            sets: 4,
            repsRange: '8-10',
            restTimeSec: 120,
            muscleGroupsPrimary: ['chest', 'triceps'],
            safetyNotes: 'Держите спину прямой, ноги на полу',
            visualizationTag: 'bench-press',
          },
          {
            exerciseName: 'Разводка гантелей',
            sets: 3,
            repsRange: '12-15',
            restTimeSec: 90,
            muscleGroupsPrimary: ['chest'],
            visualizationTag: 'flyes',
          },
        ],
      },
      {
        dayNumber: 2,
        trainingFocus: 'Спина и бицепс',
        exercises: [
          {
            exerciseName: 'Становая тяга',
            sets: 4,
            repsRange: '6-8',
            restTimeSec: 180,
            muscleGroupsPrimary: ['back', 'hamstrings', 'core'],
            safetyNotes: 'Прямая спина, не округляйте поясницу',
            visualizationTag: 'deadlift',
          },
        ],
      },
    ],
  }

  const getGoalLabel = (goal: string) => {
    const labels: Record<string, string> = {
      MASS: 'Набор массы',
      CUTTING: 'Сушка',
      STRENGTH: 'Сила',
      ENDURANCE: 'Выносливость',
    }
    return labels[goal] || goal
  }

  const handleExerciseClick = (exercise: any) => {
    setSelectedExercise(
      selectedExercise === exercise.exerciseName ? null : exercise.exerciseName
    )
  }

  const getHighlightedMuscles = () => {
    if (!selectedExercise) return []
    const exercise = mockProgram.schedule
      .flatMap((day) => day.exercises)
      .find((ex) => ex.exerciseName === selectedExercise)
    return exercise?.muscleGroupsPrimary || []
  }

  const getMuscleLabel = (muscle: string) => {
    const labels: Record<string, string> = {
      chest: 'Грудь',
      triceps: 'Трицепс',
      back: 'Спина',
      biceps: 'Бицепс',
      hamstrings: 'Бицепс бедра',
      core: 'Пресс',
      quadriceps: 'Квадрицепс',
    }
    return labels[muscle] || muscle
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-warmBlue-600 hover:text-warmBlue-700 mb-4 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800 mb-2">
                Тренировки
              </h1>
              <p className="text-base sm:text-lg text-warmGraphite-600">
                Программы тренировок и отслеживание прогресса
              </p>
            </div>
            <NeumorphicButton primary>
              <Play className="w-4 h-4 mr-2" />
              Начать тренировку
            </NeumorphicButton>
          </div>
        </div>

        {/* Информация о программе */}
        <NeumorphicCard className="p-4 sm:p-6 mb-6 sm:mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-warmGraphite-800 mb-2">
                {mockProgram.programName}
              </h2>
              <div className="flex items-center gap-4 text-sm sm:text-base text-warmGraphite-600 flex-wrap">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <span>{getGoalLabel(mockProgram.goal)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{mockProgram.durationWeeks} недель</span>
                </div>
              </div>
            </div>
          </div>
        </NeumorphicCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Витрувианский человек с визуализацией */}
          <div className="lg:col-span-1">
            <NeumorphicCard className="p-4 sm:p-6 sticky top-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg sm:text-xl font-bold text-warmGraphite-800 mb-4 text-center">
                Визуализация упражнения
              </h3>
              <div className="flex justify-center mb-4">
                <VitruvianMan
                  width={250}
                  height={250}
                  className="sm:w-[300px] sm:h-[300px]"
                  highlightedMuscles={getHighlightedMuscles()}
                />
              </div>
              {selectedExercise && (
                <NeumorphicCard soft className="mt-4 p-4">
                  <h4 className="font-semibold text-warmGraphite-800 mb-2 text-sm sm:text-base">
                    {selectedExercise}
                  </h4>
                  <p className="text-xs sm:text-sm text-warmGraphite-600">
                    {mockProgram.schedule
                      .flatMap((day) => day.exercises)
                      .find((ex) => ex.exerciseName === selectedExercise)
                      ?.safetyNotes || 'Выполняйте упражнение с правильной техникой'}
                  </p>
                </NeumorphicCard>
              )}
            </NeumorphicCard>
          </div>

          {/* Расписание тренировок */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {mockProgram.schedule.map((day, dayIndex) => (
              <NeumorphicCard
                key={day.dayNumber}
                className="p-4 sm:p-6 animate-fadeIn"
                style={{ animationDelay: `${0.3 + dayIndex * 0.1}s` }}
              >
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-warmGraphite-800">
                    День {day.dayNumber}
                  </h3>
                  <p className="text-sm sm:text-base text-warmGraphite-600 mt-1">
                    {day.trainingFocus}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {day.exercises.map((exercise, idx) => {
                    const isSelected = selectedExercise === exercise.exerciseName
                    return (
                      <NeumorphicCard
                        key={idx}
                        soft={!isSelected}
                        pressed={isSelected}
                        className={cn(
                          'p-4 cursor-pointer transition-all duration-300',
                          isSelected && 'ring-2 ring-warmBlue-500'
                        )}
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                            {exercise.exerciseName}
                          </h4>
                          <NeumorphicButton className="text-xs px-3 py-1.5">
                            Выполнить
                          </NeumorphicButton>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-warmGraphite-600 mb-2">
                          <div>
                            <span className="font-medium">Подходы:</span> {exercise.sets}
                          </div>
                          <div>
                            <span className="font-medium">Повторы:</span> {exercise.repsRange}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>
                              <span className="font-medium">Отдых:</span> {exercise.restTimeSec}с
                            </span>
                          </div>
                        </div>
                        {exercise.muscleGroupsPrimary.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {exercise.muscleGroupsPrimary.map((m) => (
                              <NeumorphicBadge key={m} variant="info" size="sm">
                                {getMuscleLabel(m)}
                              </NeumorphicBadge>
                            ))}
                          </div>
                        )}
                        {exercise.safetyNotes && (
                          <NeumorphicCard
                            soft
                            className="mt-3 p-2 bg-warmPink-50/50 border border-warmPink-200"
                          >
                            <div className="flex items-start gap-2 text-xs text-warmPink-800">
                              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <span>{exercise.safetyNotes}</span>
                            </div>
                          </NeumorphicCard>
                        )}
                      </NeumorphicCard>
                    )
                  })}
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
