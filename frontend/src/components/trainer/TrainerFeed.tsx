'use client'

import { useState, useEffect } from 'react'

interface Post {
  id: string
  type: 'PHOTO' | 'VIDEO' | 'TEXT' | 'ARTICLE'
  content: string
  media?: string[]
  category?: string
  likesCount: number
  commentsCount: number
  publishedAt: string
}

interface TrainerFeedProps {
  trainerId: string
}

export default function TrainerFeed({ trainerId }: TrainerFeedProps) {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // Моковые данные для демонстрации
    setPosts([
      {
        id: '1',
        type: 'PHOTO',
        content: 'Сегодня отличная тренировка в зале! Работали над спиной и ногами. 💪',
        media: ['/images/demo-workout.jpg'],
        category: 'personal',
        likesCount: 45,
        commentsCount: 8,
        publishedAt: new Date().toISOString(),
      },
      {
        id: '2',
        type: 'ARTICLE',
        content: 'Как правильно выполнять приседания: полное руководство для начинающих...',
        category: 'education',
        likesCount: 120,
        commentsCount: 25,
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        type: 'VIDEO',
        content: 'Новая программа тренировок для восстановления после травм колена',
        media: ['/videos/demo-recovery.mp4'],
        category: 'education',
        likesCount: 89,
        commentsCount: 15,
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
      },
    ])
  }, [trainerId])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Публикации</h2>
      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2 py-1 bg-ink-100 rounded">
              {post.category === 'education' ? 'Обучение' : 
               post.category === 'inspiration' ? 'Вдохновение' : 'Личное'}
            </span>
            <span className="text-xs text-ink-600">
              {new Date(post.publishedAt).toLocaleDateString('ru-RU')}
            </span>
          </div>
          
          {post.media && post.media.length > 0 && (
            <div className="mb-3 rounded overflow-hidden bg-ink-100 h-48 flex items-center justify-center">
              {post.type === 'VIDEO' ? '▶️ Видео' : '📷 Фото'}
            </div>
          )}
          
          <p className="mb-3">{post.content}</p>
          
          <div className="flex items-center gap-4 text-sm text-ink-600">
            <button className="hover:text-accent-turquoise">
              ❤️ {post.likesCount}
            </button>
            <button className="hover:text-accent-turquoise">
              💬 {post.commentsCount}
            </button>
            <button className="hover:text-accent-turquoise">
              🔄 Поделиться
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

