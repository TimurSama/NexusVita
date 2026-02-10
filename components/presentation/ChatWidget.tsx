'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, ChevronDown, ChevronUp } from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicProgress from '@/components/ui/NeumorphicProgress'
import { cn } from '@/lib/utils/cn'
import { demoStorage, type DemoFormData } from '@/lib/demo/storage'
import { generatePersonalizedPlan } from '@/lib/demo/mock-data'
import { Question, ChatMessage } from './types'

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
  questions: Question[]
  onComplete: () => void
  context?: string | null
}

const contextQuestionMap: Record<string, string[]> = {
  // Общий контекст: базовые данные и главная цель
  general: ['age', 'gender', 'goals', 'primaryGoal', 'planLevel'],

  // Спорт и активность (BodyExplorer: musculo/cardio, Sport сектор, training-модуль)
  sport: ['trainingExperience', 'activityLevel', 'timeAvailable'],

  // Питание и масса тела (сектор nutrition, модули питания/marketplace)
  nutrition: ['weight', 'height', 'nutritionHabits'],

  // Сон и восстановление (BodyExplorer: sleep, сектор sleep, календарь восстановления)
  sleep: ['sleepHours', 'stressLevel'],

  // Психо‑эмоциональное состояние (сектор psyche, дневники, user flows)
  psyche: ['mood', 'stressLevel'],

  // Медицинский блок — используем общие вопросы и цели
  medicine: ['healthIssues', 'goals', 'primaryGoal'],

  // Социальная активность
  social: ['timeAvailable', 'goals'],

  // Профилактика и среда
  prevention: ['healthIssues', 'timeAvailable'],

  // Дополнительные контексты для конкретных модулей/секций
  'body-explorer': ['trainingExperience', 'healthIssues'],
  'product-modules': ['goals', 'timeAvailable'],
  'user-flows': ['planLevel', 'timeAvailable'],
  'dashboard': ['goals', 'primaryGoal'],
}

export default function ChatWidget({
  isOpen,
  onClose,
  questions,
  onComplete,
  context,
}: ChatWidgetProps) {
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [formProgress, setFormProgress] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  // Отслеживаем все пройденные вопросы и все контексты
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<Set<string>>(new Set())
  const [visitedContexts, setVisitedContexts] = useState<Set<string>>(new Set())

  // Собираем ВСЕ вопросы из всех контекстов, которые пользователь проходил
  const getAllQuestionsFromContexts = () => {
    const allQuestionIds = new Set<string>()
    
    // Добавляем вопросы из всех посещённых контекстов
    visitedContexts.forEach((ctx) => {
      const ids = contextQuestionMap[ctx] || contextQuestionMap.general
      ids.forEach((id) => allQuestionIds.add(id))
    })
    
    // Добавляем вопросы из текущего контекста
    const activeContext = context || 'general'
    const currentContextIds = contextQuestionMap[activeContext] || contextQuestionMap.general
    currentContextIds.forEach((id) => allQuestionIds.add(id))
    
    // Фильтруем вопросы, которые ещё не были заданы
    return questions.filter((q) => allQuestionIds.has(q.id) && !answeredQuestionIds.has(q.id))
  }

  const activeQuestions = getAllQuestionsFromContexts()

  const applyAnswerToFormData = (question: Question, answer: string | string[]) => {
    const valueArray = Array.isArray(answer) ? answer : answer.split(',').map((v) => v.trim())
    const single = Array.isArray(answer) ? answer[0] : answer

    const updates: Partial<DemoFormData> = {}

    switch (question.id) {
      case 'name':
        updates.name = single
        break
      case 'age':
        updates.age = single
        break
      case 'gender':
        updates.gender = single
        break
      case 'weight':
        updates.weight = single
        break
      case 'height':
        updates.height = single
        break
      case 'goals':
        updates.goals = valueArray
        break
      case 'primaryGoal':
        updates.primaryGoal = single
        break
      case 'mood':
        updates.mood = single
        break
      case 'activityLevel':
        updates.activityLevel = single
        break
      case 'sleepHours':
        updates.sleepHours = single
        break
      case 'stressLevel':
        updates.stressLevel = single
        break
      case 'nutritionHabits':
        updates.nutritionHabits = valueArray
        break
      case 'trainingExperience':
        updates.trainingExperience = single
        break
      case 'healthIssues':
        updates.healthIssues = valueArray
        break
      case 'timeAvailable':
        updates.timeAvailable = single
        break
      case 'budget':
        updates.budget = single
        break
      case 'planLevel':
        updates.planLevel = single
        break
      default:
        break
    }

    if (Object.keys(updates).length > 0) {
      demoStorage.updateFormData(updates)
    }

    // Синхронизация с локальными структурами ежедневника (профиль и состояние дня)
    if (typeof window !== 'undefined') {
      try {
        const profileRaw = window.localStorage.getItem('nexusvita_health_profile')
        const dailyRaw = window.localStorage.getItem('nexusvita_daily_state')
        const profile = profileRaw ? JSON.parse(profileRaw) : {}
        const daily = dailyRaw ? JSON.parse(dailyRaw) : {}

        if (question.id === 'age') profile.age = single
        if (question.id === 'height') profile.height = single
        if (question.id === 'weight') profile.weight = single
        if (question.id === 'gender') profile.sex = single
        if (question.id === 'activityLevel') profile.activityLevel = single
        if (question.id === 'sleepHours') {
          const num = Number(single)
          if (!Number.isNaN(num)) {
            profile.sleepTargetHours = num
            daily.sleepHours = num
          }
        }
        if (question.id === 'mood') {
          daily.mood = single
        }
        if (question.id === 'stressLevel') {
          daily.stress = single
        }

        window.localStorage.setItem('nexusvita_health_profile', JSON.stringify(profile))
        window.localStorage.setItem('nexusvita_daily_state', JSON.stringify(daily))

        if (question.id === 'primaryGoal' || question.id === 'planLevel') {
          const existing =
            window.localStorage.getItem('nexusvita_plan_settings') || '{}'
          const parsed = JSON.parse(existing)
          const normalizedLevel =
            question.id === 'planLevel'
              ? single
              : (parsed.planLevel as string | undefined)

          window.localStorage.setItem(
            'nexusvita_plan_settings',
            JSON.stringify({
              ...parsed,
              primaryGoal:
                question.id === 'primaryGoal' ? single : parsed.primaryGoal,
              planLevel: normalizedLevel,
            })
          )
        }
      } catch {
        // игнорируем ошибки парсинга
      }
    }
  }

  const handleOptionClick = (option: string, questionType: string) => {
    if (questionType === 'multiselect') {
      setSelectedOptions(prev => 
        prev.includes(option) 
          ? prev.filter(o => o !== option)
          : [...prev, option]
      )
    } else {
      handleAnswerSubmit(option, questionType)
    }
  }

  const handleAnswerSubmit = (answer: string, questionType?: string) => {
    const question = activeQuestions[currentQuestion]
    if (!question) return
    
    const finalAnswer =
      questionType === 'multiselect' && selectedOptions.length > 0
        ? selectedOptions.join(', ')
        : answer

    if (!finalAnswer.trim() && (!questionType || questionType !== 'multiselect')) return
    if (questionType === 'multiselect' && selectedOptions.length === 0) return

    // Отмечаем вопрос как пройденный
    setAnsweredQuestionIds((prev) => new Set([...prev, question.id]))

    // Обновляем демо-форму и профиль/состояние
    if (questionType === 'multiselect') {
      applyAnswerToFormData(question, selectedOptions)
    } else {
      applyAnswerToFormData(question, finalAnswer)
    }

    const newUserMessage: ChatMessage = {
      sender: 'user',
      text: finalAnswer,
      type: questionType || question.type,
    }
    setChatMessages((prev) => [...prev, newUserMessage])
    setChatInput('')
    setSelectedOptions([])

    // Пересчитываем активные вопросы (убираем уже отвеченные)
    const remainingQuestions = getAllQuestionsFromContexts()
    const totalQuestions = questions.length
    const answeredCount = answeredQuestionIds.size + 1
    const progress = (answeredCount / totalQuestions) * 100
    setFormProgress(progress)

    setTimeout(() => {
      // Обновляем список посещённых контекстов
      const activeContext = context || 'general'
      setVisitedContexts((prev) => {
        const updated = new Set(prev)
        if (updated.size === 0) updated.add('general')
        updated.add(activeContext)
        return updated
      })
      
      // Собираем все ID вопросов из всех посещённых контекстов + текущего
      const allIds = new Set<string>()
      const activeCtx = context || 'general'
      const currentIds = contextQuestionMap[activeCtx] || contextQuestionMap.general
      currentIds.forEach((id) => allIds.add(id))
      visitedContexts.forEach((ctx) => {
        const ids = contextQuestionMap[ctx] || contextQuestionMap.general
        ids.forEach((id) => allIds.add(id))
      })
      
      // Фильтруем вопросы, которые ещё не были заданы
      const nextRemaining = questions.filter(
        (q) => allIds.has(q.id) && !answeredQuestionIds.has(q.id) && q.id !== question.id
      )
      
      if (nextRemaining.length > 0) {
        const nextQuestion = nextRemaining[0]
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: nextQuestion.text,
            type: nextQuestion.type,
            options: nextQuestion.options,
          },
        ])
        setCurrentQuestion(0)
      } else {
        // Все вопросы из всех контекстов пройдены
        setChatMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: 'Отлично! Мы собрали всю информацию. Генерирую ваш персональный план...',
          },
        ])

        // Генерируем и сохраняем демо-план
        const formData = demoStorage.getFormData()
        const personalized = generatePersonalizedPlan(formData)
        const user =
          demoStorage.getUser() ||
          demoStorage.createUser({
            email: 'demo@nexusvita.app',
            username: 'demo_user',
            password: 'demo',
          })

        demoStorage.savePlan({
          id: `plan_${Date.now()}`,
          userId: user.id,
          level:
            formData.planLevel === 'Интенсивный'
              ? 'hard'
              : formData.planLevel === 'Мягкий'
                ? 'soft'
                : 'medium',
          recommendations: personalized.recommendations,
          schedule: personalized.schedule,
          specialists: personalized.specialists?.map((s) => ({
            name: s.name,
            role: s.role,
            specialization: s.specialization,
          })),
          createdAt: new Date().toISOString(),
        })

        setTimeout(() => {
          onComplete()
        }, 1800)
      }
    }, 800)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    handleAnswerSubmit(chatInput.trim())
  }

  useEffect(() => {
    if (!isOpen) return

    const activeContext = context || 'general'
    
    // Добавляем текущий контекст в посещённые (если его ещё нет)
    setVisitedContexts((prev) => {
      const updated = new Set(prev)
      if (updated.size === 0) {
        // При первом запуске добавляем 'general'
        updated.add('general')
      }
      updated.add(activeContext)
      return updated
    })

    // Пересчитываем оставшиеся вопросы после обновления контекстов
    const remaining = getAllQuestionsFromContexts()
    
    // Если это первый запуск или нет сообщений, задаём первый вопрос
    if (chatMessages.length === 0 && remaining.length > 0) {
      const first = remaining[0]
      setChatMessages([
        {
          sender: 'ai',
          text: first.text,
          type: first.type,
          options: first.options,
        },
      ])
      setCurrentQuestion(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, context])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-4 right-4 w-full sm:w-96 h-[500px] sm:h-[600px] z-50"
      >
        <NeumorphicCard className="h-full flex flex-col">
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-warmGray-300/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-warmBlue-600" />
              <h3 className="font-semibold text-sm sm:text-base text-warmGraphite-800">ИИ-помощник</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChatMinimized(!chatMinimized)}
                className="p-1 hover:bg-warmGray-200 rounded transition-colors"
              >
                {chatMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-warmGray-200 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!chatMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                {chatMessages.length === 0 && (
                  <div className="text-center text-warmGraphite-600 py-6 sm:py-8">
                    <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 text-warmBlue-400" />
                    <p className="text-sm sm:text-base">Привет! Я помогу вам создать персональный план.</p>
                    <p className="text-xs sm:text-sm mt-2">Давайте начнем с нескольких вопросов.</p>
                  </div>
                )}
                {chatMessages.map((msg, index) => {
                  const isLastAiMessage = msg.sender === 'ai' && index === chatMessages.length - 1
                  const showButtons = isLastAiMessage && (msg.type === 'select' || msg.type === 'multiselect') && msg.options
                  
                  return (
                    <div key={index}>
                      <div
                        className={cn(
                          'flex',
                          msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 text-sm sm:text-base',
                            msg.sender === 'user'
                              ? 'bg-warmBlue-500 text-white'
                              : 'bg-warmGray-200 text-warmGraphite-800'
                          )}
                        >
                          <p>{msg.text}</p>
                        </div>
                      </div>
                      {showButtons && (
                        <div className="mt-2 sm:mt-3 space-y-2">
                          {msg.options?.map((option) => {
                            const isSelected = selectedOptions.includes(option)
                            return (
                              <button
                                key={option}
                                onClick={() => handleOptionClick(option, msg.type || '')}
                                className={cn(
                                  'w-full text-left rounded-2xl px-3 sm:px-4 py-2 sm:py-3 transition-all text-sm sm:text-base',
                                  msg.type === 'multiselect'
                                    ? isSelected
                                      ? 'bg-warmBlue-500 text-white border-2 border-warmGraphite-700'
                                      : 'bg-warmBeige-50 text-warmGraphite-800 border-2 border-warmGraphite-300 hover:border-warmGraphite-500'
                                    : 'bg-warmBeige-50 text-warmGraphite-800 border-2 border-warmGraphite-300 hover:border-warmGraphite-500 hover:bg-warmBlue-50'
                                )}
                              >
                                {msg.type === 'multiselect' && (
                                  <span className="mr-2">{isSelected ? '✓' : '○'}</span>
                                )}
                                {option}
                              </button>
                            )
                          })}
                          {msg.type === 'multiselect' && selectedOptions.length > 0 && (
                            <button
                              onClick={() => handleAnswerSubmit('', 'multiselect')}
                              className="w-full rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-warmBlue-500 text-white font-semibold hover:bg-warmBlue-600 transition-colors text-sm sm:text-base"
                            >
                              Подтвердить ({selectedOptions.length})
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
                {currentQuestion < questions.length && (
                  <div className="mt-3 sm:mt-4">
                    <NeumorphicProgress value={formProgress} className="mb-2" />
                    <p className="text-xs text-warmGraphite-500 text-center">
                      Вопрос {currentQuestion + 1} из {questions.length}
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleChatSubmit} className="p-3 sm:p-4 border-t border-warmGray-300/50">
                <div className="flex gap-2">
                  <NeumorphicInput
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Введите ответ..."
                    className="flex-1 text-sm sm:text-base"
                  />
                  <NeumorphicButton primary type="submit" className="px-3 sm:px-4">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                  </NeumorphicButton>
                </div>
              </form>
            </>
          )}
        </NeumorphicCard>
      </motion.div>
    </AnimatePresence>
  )
}
