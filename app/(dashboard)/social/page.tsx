'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Send,
  Image as ImageIcon,
  Video,
  BarChart3,
  Plus,
  X,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import NeumorphicSkeleton from '@/components/ui/NeumorphicSkeleton'
import { generateMockPosts, generateMockUsers, type MockPost, type MockUser } from '@/lib/mocks/data-generators'
import { cn } from '@/lib/utils/cn'

const stories = [
  { name: 'Алина', role: 'Йога-тренер', status: 'Новая практика' },
  { name: 'Денис', role: 'Кардио', status: 'Забег 10 км' },
  { name: 'Мария', role: 'Нутрициолог', status: 'Разбор меню' },
  { name: 'Ольга', role: 'Психолог', status: 'Эфир сегодня' },
  { name: 'Иван', role: 'Реабилитолог', status: 'Новая программа' },
]

interface Post extends MockPost {
  role: string
  time: string
  tags: string[]
  stats: { likes: number; comments: number; saves: number }
  liked: boolean
  comments?: Array<{ id: string; author: MockUser; text: string; time: string }>
}

const friendSuggestions = [
  { name: 'Ксения', focus: 'Пилатес', mutual: 4 },
  { name: 'Максим', focus: 'Биохакинг', mutual: 2 },
  { name: 'Екатерина', focus: 'Психология', mutual: 6 },
]

const subscriptions = [
  {
    name: 'Pro AI',
    price: '990 ₽/мес',
    desc: 'ИИ-коуч + аналитика',
    badge: 'Популярно',
  },
  {
    name: 'Team Health',
    price: '2 490 ₽/мес',
    desc: 'Семейный доступ + телемедицина',
  },
]

const groups = [
  { name: 'Утренний бег', members: 320, schedule: 'Пн/Ср/Пт 07:00' },
  { name: 'Осознанность', members: 210, schedule: 'Вт/Чт 20:00' },
  { name: 'Здоровая спина', members: 145, schedule: 'Сб 11:00' },
]

export default function SocialPage() {
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set())
  const [commentTexts, setCommentTexts] = useState<Record<string, string>>({})
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts()
      }
    })
    if (node) observerRef.current.observe(node)
  }, [isLoading, hasMore])

  const mockUsers = generateMockUsers(20)
  const mockPosts = generateMockPosts(50, mockUsers)

  useEffect(() => {
    // Инициализация постов
    const initialPosts: Post[] = mockPosts.slice(0, 10).map((mp, i) => ({
      ...mp,
      role: i % 3 === 0 ? 'Эксперт' : i % 3 === 1 ? 'Участник DAO' : 'Специалист',
      time: i < 3 ? (i === 0 ? 'Сегодня' : i === 1 ? '2 часа назад' : 'Вчера') : `${i} дней назад`,
      tags: ['здоровье', 'тренировки', 'питание'].slice(0, Math.floor(Math.random() * 3) + 1),
      stats: {
        likes: Math.floor(Math.random() * 100) + 20,
        comments: Math.floor(Math.random() * 30) + 5,
        saves: Math.floor(Math.random() * 20) + 5,
      },
      liked: Math.random() > 0.7,
      comments: Array.from({ length: Math.floor(Math.random() * 5) }).map((_, ci) => ({
        id: `comment-${i}-${ci}`,
        author: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        text: `Отличный пост! ${ci === 0 ? 'Полностью согласен.' : 'Интересная информация.'}`,
        time: `${ci} часов назад`,
      })),
    }))
    setPosts(initialPosts)
    setIsLoading(false)
    setLikedPosts(new Set(initialPosts.filter((p) => p.liked).map((p) => p.id)))
  }, [])

  const loadMorePosts = () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    setTimeout(() => {
      const newPosts: Post[] = mockPosts.slice(posts.length, posts.length + 10).map((mp, i) => ({
        ...mp,
        role: i % 3 === 0 ? 'Эксперт' : i % 3 === 1 ? 'Участник DAO' : 'Специалист',
        time: `${posts.length + i} дней назад`,
        tags: ['здоровье', 'тренировки', 'питание'].slice(0, Math.floor(Math.random() * 3) + 1),
        stats: {
          likes: Math.floor(Math.random() * 100) + 20,
          comments: Math.floor(Math.random() * 30) + 5,
          saves: Math.floor(Math.random() * 20) + 5,
        },
        liked: false,
        comments: [],
      }))
      setPosts((prev) => [...prev, ...newPosts])
      setIsLoading(false)
      if (posts.length + newPosts.length >= mockPosts.length) {
        setHasMore(false)
      }
    }, 500)
  }

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? { ...p, stats: { ...p.stats, likes: p.stats.likes - 1 } } : p
          )
        )
      } else {
        newSet.add(postId)
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? { ...p, stats: { ...p.stats, likes: p.stats.likes + 1 } } : p
          )
        )
      }
      return newSet
    })
  }

  const handleSave = (postId: string) => {
    setSavedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? { ...p, stats: { ...p.stats, saves: p.stats.saves - 1 } } : p
          )
        )
      } else {
        newSet.add(postId)
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? { ...p, stats: { ...p.stats, saves: p.stats.saves + 1 } } : p
          )
        )
      }
      return newSet
    })
  }

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const handleAddComment = (postId: string) => {
    const commentText = commentTexts[postId]?.trim()
    if (!commentText) return

    const newComment = {
      id: `comment-${postId}-${Date.now()}`,
      author: mockUsers[0],
      text: commentText,
      time: 'только что',
    }

    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...(p.comments || []), newComment],
              stats: { ...p.stats, comments: p.stats.comments + 1 },
            }
          : p
      )
    )
    setCommentTexts((prev) => ({ ...prev, [postId]: '' }))
  }

  return (
    <div className="min-h-screen bg-warmGray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fadeIn">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-warmGraphite-800">
              Социальная лента
            </h1>
            <p className="text-base sm:text-lg text-warmGraphite-600 mt-2">
              Истории, прогресс, мероприятия и подписки на специалистов.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <NeumorphicButton primary>Создать пост</NeumorphicButton>
            <NeumorphicButton>Мои подписки</NeumorphicButton>
          </div>
        </header>

        {/* Истории */}
        <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-warmGraphite-800">
              Истории дня
            </h2>
            <button className="text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
              Добавить историю
            </button>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4 overflow-x-auto pb-2">
            {stories.map((story, index) => (
              <NeumorphicCard
                key={story.name}
                soft
                className={cn(
                  'w-28 sm:w-36 p-3 text-center cursor-pointer',
                  'hover:scale-110 transition-all duration-300',
                  'animate-fadeIn'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full neumorphic-card-soft flex items-center justify-center text-base sm:text-lg font-bold text-warmGraphite-700 mb-2">
                  {story.name[0]}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-warmGraphite-800">
                  {story.name}
                </div>
                <div className="text-xs text-warmGray-600">{story.role}</div>
                <div className="text-xs text-warmBlue-600 mt-1 font-medium">
                  {story.status}
                </div>
              </NeumorphicCard>
            ))}
          </div>
        </NeumorphicCard>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4 sm:gap-6">
          {/* Основная лента */}
          <div className="space-y-4 sm:space-y-6">
            {/* Создание поста */}
            <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full neumorphic-card-soft flex items-center justify-center text-base sm:text-lg font-bold text-warmGraphite-700 flex-shrink-0">
                  Я
                </div>
                <div className="flex-1">
                  <NeumorphicInput
                    placeholder="Поделиться прогрессом, анализами или идеей..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex flex-wrap gap-2">
                    <NeumorphicButton className="text-xs sm:text-sm px-3 py-1.5">
                      <ImageIcon className="w-4 h-4 mr-1.5" />
                      Фото
                    </NeumorphicButton>
                    <NeumorphicButton className="text-xs sm:text-sm px-3 py-1.5">
                      <Video className="w-4 h-4 mr-1.5" />
                      Видео
                    </NeumorphicButton>
                    <NeumorphicButton className="text-xs sm:text-sm px-3 py-1.5">
                      <BarChart3 className="w-4 h-4 mr-1.5" />
                      Метрики
                    </NeumorphicButton>
                    <NeumorphicButton
                      primary
                      className="text-xs sm:text-sm px-3 py-1.5 ml-auto"
                      disabled={!postText.trim()}
                    >
                      <Send className="w-4 h-4 mr-1.5" />
                      Опубликовать
                    </NeumorphicButton>
                  </div>
                </div>
              </div>
            </NeumorphicCard>

            {/* Посты */}
            {posts.map((post, index) => {
              const isLiked = likedPosts.has(post.id)
              const isSaved = savedPosts.has(post.id)
              const showComments = expandedComments.has(post.id)
              const isLastPost = index === posts.length - 1

              return (
                <motion.div
                  key={post.id}
                  ref={isLastPost ? lastPostElementRef : null}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <NeumorphicCard className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-semibold text-warmGraphite-800">
                        {post.author}
                      </div>
                      <div className="text-xs text-warmGray-600">
                        {post.role} · {post.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <NeumorphicButton className="text-xs sm:text-sm px-3 py-1.5">
                        Подписаться
                      </NeumorphicButton>
                      <button className="p-2 rounded-lg hover:bg-warmGray-200/50 transition-colors">
                        <MoreHorizontal className="w-4 h-4 text-warmGraphite-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-warmGraphite-700 leading-relaxed">
                    {post.text}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <NeumorphicBadge
                        key={tag}
                        variant="info"
                        size="sm"
                        className="cursor-pointer hover:scale-105 transition-transform"
                      >
                        #{tag}
                      </NeumorphicBadge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 pt-3 border-t border-warmGray-300/50">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={cn(
                        'flex items-center gap-2 text-sm font-medium transition-all',
                        isLiked
                          ? 'text-warmRed-600 hover:text-warmRed-700'
                          : 'text-warmGraphite-600 hover:text-warmRed-600'
                      )}
                    >
                      <Heart
                        className={cn(
                          'w-5 h-5 transition-all',
                          isLiked && 'fill-warmRed-600 scale-110'
                        )}
                      />
                      <span>{post.stats.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-2 text-sm text-warmGraphite-600 hover:text-warmBlue-600 font-medium transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-warmGraphite-600 hover:text-warmBlue-600 font-medium transition-colors">
                      <Share2 className="w-5 h-5" />
                      Поделиться
                    </button>
                    <button
                      onClick={() => handleSave(post.id)}
                      className={cn(
                        'flex items-center gap-2 text-sm font-medium transition-colors ml-auto',
                        isSaved
                          ? 'text-warmBlue-600'
                          : 'text-warmGraphite-600 hover:text-warmBlue-600'
                      )}
                    >
                      <Bookmark className={cn('w-5 h-5', isSaved && 'fill-warmBlue-600')} />
                      <span>{post.stats.saves}</span>
                    </button>
                  </div>

                  {/* Комментарии */}
                  <AnimatePresence>
                    {showComments && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-warmGray-300/50 space-y-3">
                          {post.comments && post.comments.length > 0 && (
                            <div className="space-y-3">
                              {post.comments.map((comment) => (
                                <NeumorphicCard key={comment.id} soft className="p-3">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full neumorphic-card-soft flex items-center justify-center text-sm font-bold text-warmGraphite-700 flex-shrink-0">
                                      {comment.author.name[0]}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-semibold text-warmGraphite-800">
                                          {comment.author.name}
                                        </span>
                                        <span className="text-xs text-warmGray-600">{comment.time}</span>
                                      </div>
                                      <p className="text-sm text-warmGraphite-700">{comment.text}</p>
                                    </div>
                                  </div>
                                </NeumorphicCard>
                              ))}
                            </div>
                          )}

                          {/* Форма добавления комментария */}
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full neumorphic-card-soft flex items-center justify-center text-sm font-bold text-warmGraphite-700 flex-shrink-0">
                              Я
                            </div>
                            <NeumorphicInput
                              placeholder="Написать комментарий..."
                              value={commentTexts[post.id] || ''}
                              onChange={(e) =>
                                setCommentTexts((prev) => ({ ...prev, [post.id]: e.target.value }))
                              }
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              className="flex-1"
                            />
                            <NeumorphicButton
                              onClick={() => handleAddComment(post.id)}
                              disabled={!commentTexts[post.id]?.trim()}
                              className="p-2"
                            >
                              <Send className="w-4 h-4" />
                            </NeumorphicButton>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NeumorphicCard>
                </motion.div>
              )
            })}

            {/* Индикатор загрузки */}
            {isLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <NeumorphicSkeleton key={i} variant="card" />
                ))}
              </div>
            )}

            {!hasMore && posts.length > 0 && (
              <div className="text-center text-sm text-warmGraphite-600 py-4">
                Все посты загружены
              </div>
            )}
          </div>

          {/* Сайдбар */}
          <aside className="space-y-4 sm:space-y-6">
            {/* Рекомендации друзей */}
            <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-3">
                Рекомендации друзей
              </h3>
              <div className="space-y-3">
                {friendSuggestions.map((friend, index) => (
                  <NeumorphicCard
                    key={friend.name}
                    soft
                    className="p-3 flex items-center justify-between hover:scale-[1.02] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                  >
                    <div>
                      <div className="font-semibold text-warmGraphite-800 text-sm">
                        {friend.name}
                      </div>
                      <div className="text-xs text-warmGray-600">
                        {friend.focus} · общих друзей {friend.mutual}
                      </div>
                    </div>
                    <NeumorphicButton className="text-xs px-3 py-1">
                      Добавить
                    </NeumorphicButton>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>

            {/* Подписки */}
            <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-3">
                Подписки и абонементы
              </h3>
              <div className="space-y-3">
                {subscriptions.map((sub, index) => (
                  <NeumorphicCard
                    key={sub.name}
                    soft
                    className="p-4 hover:scale-[1.02] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-warmGraphite-800 text-sm">
                        {sub.name}
                      </div>
                      {sub.badge && (
                        <NeumorphicBadge variant="warning" size="sm">
                          {sub.badge}
                        </NeumorphicBadge>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm text-warmGraphite-600 mb-2">
                      {sub.desc}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-warmGraphite-800 mb-3">
                      {sub.price}
                    </div>
                    <NeumorphicButton primary className="w-full text-sm">
                      Подключить
                    </NeumorphicButton>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>

            {/* Группы */}
            <NeumorphicCard className="p-4 sm:p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-base sm:text-lg font-semibold text-warmGraphite-800 mb-3">
                Групповые занятия
              </h3>
              <div className="space-y-3">
                {groups.map((group, index) => (
                  <NeumorphicCard
                    key={group.name}
                    soft
                    className="p-3 hover:scale-[1.02] transition-transform animate-fadeIn"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <div className="font-semibold text-warmGraphite-800 text-sm mb-1">
                      {group.name}
                    </div>
                    <div className="text-xs text-warmGray-600 mb-1">
                      {group.members} участников
                    </div>
                    <div className="text-xs text-warmGraphite-700 mb-2">
                      {group.schedule}
                    </div>
                    <button className="text-xs sm:text-sm text-warmBlue-600 hover:text-warmBlue-700 font-medium transition-colors">
                      Присоединиться →
                    </button>
                  </NeumorphicCard>
                ))}
              </div>
            </NeumorphicCard>
          </aside>
        </div>
      </div>
    </div>
  )
}
