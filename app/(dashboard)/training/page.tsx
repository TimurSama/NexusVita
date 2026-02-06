'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Calendar, Target } from 'lucide-react'
import VitruvianMan from '@/components/vitruvian/VitruvianMan'

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

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ink-600 hover:text-ink-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-ink-800 mb-2">
                Тренировки
              </h1>
              <p className="text-ink-600">
                Программы тренировок и отслеживание прогресса
              </p>
            </div>
            <button className="px-6 py-3 bg-ink-700 text-white rounded-lg hover:bg-ink-800 transition-colors flex items-center gap-2">
              <Play className="w-5 h-5" />
              Начать тренировку
            </button>
          </div>
        </div>

        {/* Информация о программе */}
        <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-ink-800 mb-2">
                {mockProgram.programName}
              </h2>
              <div className="flex items-center gap-4 text-ink-600">
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Витрувианский человек с визуализацией */}
          <div className="lg:col-span-1">
            <div className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-ink-800 mb-4 text-center">
                Визуализация упражнения
              </h3>
              <div className="flex justify-center">
                <VitruvianMan
                  width={300}
                  height={300}
                  highlightedMuscles={getHighlightedMuscles()}
                />
              </div>
              {selectedExercise && (
                <div className="mt-4 p-4 bg-parchment-100 rounded border border-ink-200">
                  <h4 className="font-semibold text-ink-800 mb-2">
                    {selectedExercise}
                  </h4>
                  <p className="text-sm text-ink-600">
                    {mockProgram.schedule
                      .flatMap((day) => day.exercises)
                      .find((ex) => ex.exerciseName === selectedExercise)
                      ?.safetyNotes || 'Выполняйте упражнение с правильной техникой'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Расписание тренировок */}
          <div className="lg:col-span-2 space-y-6">
            {mockProgram.schedule.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-parchment-200/80 backdrop-blur-sm border-2 border-ink-300 rounded-lg shadow-lg p-6"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-ink-800">
                    День {day.dayNumber}
                  </h3>
                  <p className="text-ink-600">{day.trainingFocus}</p>
                </div>

                <div className="space-y-4">
                  {day.exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        selectedExercise === exercise.exerciseName
                          ? 'border-ink-700 bg-parchment-300'
                          : 'border-ink-200 bg-parchment-100 hover:border-ink-400'
                      }`}
                      onClick={() => handleExerciseClick(exercise)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-lg font-semibold text-ink-800">
                          {exercise.exerciseName}
                        </h4>
                        <button className="px-3 py-1 bg-ink-700 text-white rounded text-sm hover:bg-ink-800 transition-colors">
                          Выполнить
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm text-ink-600">
                        <div>
                          <span className="font-medium">Подходы:</span> {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Повторы:</span> {exercise.repsRange}
                        </div>
                        <div>
                          <span className="font-medium">Отдых:</span> {exercise.restTimeSec}с
                        </div>
                      </div>
                      {exercise.muscleGroupsPrimary.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-ink-500">
                            Группы мышц:{' '}
                            {exercise.muscleGroupsPrimary
                              .map((m) => {
                                const labels: Record<string, string> = {
                                  chest: 'Грудь',
                                  triceps: 'Трицепс',
                                  back: 'Спина',
                                  biceps: 'Бицепс',
                                  hamstrings: 'Бицепс бедра',
                                  core: 'Пресс',
                                  quadriceps: 'Квадрицепс',
                                }
                                return labels[m] || m
                              })
                              .join(', ')}
                          </span>
                        </div>
                      )}
                      {exercise.safetyNotes && (
                        <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                          ⚠️ {exercise.safetyNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


