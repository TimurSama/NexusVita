'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import NeumorphicCard from '@/components/ui/NeumorphicCard'
import NeumorphicButton from '@/components/ui/NeumorphicButton'
import NeumorphicInput from '@/components/ui/NeumorphicInput'
import NeumorphicBadge from '@/components/ui/NeumorphicBadge'
import { cn } from '@/lib/utils/cn'

const stories = [
  { name: 'Алина', role: 'Йога-тренер', status: 'Новая практика' },
  { name: 'Денис', role: 'Кардио', status: 'Забег 10 км' },
  { name: 'Мария', role: 'Нутрициолог', status: 'Разбор меню' },
  { name: 'Ольга', role: 'Психолог', status: 'Эфир сегодня' },
  { name: 'Иван', role: 'Реабилитолог', status: 'Новая программа' },
]

const posts = [
  {
    id: '1',
    author: 'Анна К.',
    role: 'Участник DAO',
    time: '2 часа назад',
    text: 'Наконец-то добрала норму сна 7.5 часов и заметила, как улучшилось восстановление после силовых.',
    tags: ['сон', 'восстановление', 'силовые'],
    stats: { likes: 42, comments: 8, saves: 12 },
    liked: false,
  },
  {
    id: '2',
    author: 'Нутрициолог Мария',
    role: 'Эксперт',
    time: 'Сегодня',
    text: 'Подготовила чек-лист по микронутриентам. Проверяем железо, D3, B12 и магний.',
    tags: ['нутрициология', 'анализы', 'микронутриенты'],
    stats: { likes: 118, comments: 24, saves: 56 },
    liked: true,
  },
  {
    id: '3',
    author: 'Тренер Алексей',
    role: 'Силовой тренинг',
    time: 'Вчера',
    text: 'Запустил новый курс по безопасной технике становой тяги. Старт через 5 дней.',
    tags: ['тренировки', 'техника', 'курс'],
    stats: { likes: 86, comments: 12, saves: 31 },
    liked: false,
  },
]

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
  const [likedPosts, setLikedPosts] = useState<Set<string>>(
    new Set(posts.filter((p) => p.liked).map((p) => p.id))
  )

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
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
              return (
                <NeumorphicCard
                  key={post.id}
                  className="p-4 sm:p-6 space-y-4 animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
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
                    <button className="flex items-center gap-2 text-sm text-warmGraphite-600 hover:text-warmBlue-600 font-medium transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span>{post.stats.comments}</span>
                    </button>
                    <button className="flex items-center gap-2 text-sm text-warmGraphite-600 hover:text-warmBlue-600 font-medium transition-colors">
                      <Share2 className="w-5 h-5" />
                      Поделиться
                    </button>
                    <button className="flex items-center gap-2 text-sm text-warmGraphite-600 hover:text-warmBlue-600 font-medium transition-colors ml-auto">
                      <Bookmark className="w-5 h-5" />
                      <span>{post.stats.saves}</span>
                    </button>
                  </div>
                </NeumorphicCard>
              )
            })}
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
