'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, Avatar, Badge, Button, Input } from '@/components/ui';
import { socialApi, Post } from '@/lib/api';

const filterOptions = [
  { id: 'all', label: 'Все', icon: '🌐' },
  { id: 'following', label: 'Подписки', icon: '👥' },
  { id: 'fitness', label: 'Фитнес', icon: '💪' },
  { id: 'nutrition', label: 'Питание', icon: '🥗' },
  { id: 'psychology', label: 'Психология', icon: '🧠' },
  { id: 'achievements', label: 'Достижения', icon: '🏆' },
];

const mockPosts: Post[] = [
  {
    id: '1',
    authorId: 'u1',
    content: 'Сегодня завершил 30-дневный челлендж! Прошёл 300 км за месяц 🏃‍♂️ Спасибо всем за поддержку! #MoveToEarn #NexusVita',
    images: [],
    likesCount: 234,
    commentsCount: 45,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    author: {
      id: 'u1',
      name: 'Алекс Петров',
      avatar: undefined,
    },
  },
  {
    id: '2',
    authorId: 'u2',
    content: 'Новый рецепт протеинового смузи для восстановления после тренировки! 🥤\n\nИнгредиенты:\n- Банан\n- Протеин\n- Миндальное молоко\n- Шпинат\n- Мёд\n\nПопробуйте и поделитесь результатами!',
    images: [],
    likesCount: 189,
    commentsCount: 32,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    author: {
      id: 'u2',
      name: 'Мария Козлова',
      avatar: undefined,
    },
  },
  {
    id: '3',
    authorId: 'u3',
    content: 'Получил NFT достижение "Марафонец" за прохождение 100 км! 🏅 Теперь это навсегда в блокчейне. Следующая цель - 500 км!',
    images: [],
    likesCount: 456,
    commentsCount: 78,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: {
      id: 'u3',
      name: 'Дмитрий Иванов',
      avatar: undefined,
    },
  },
  {
    id: '4',
    authorId: 'u4',
    content: 'Утренняя медитация помогла мне начать день с ясностью и энергией. Рекомендую попробовать 10-минутную практику каждое утро! 🧘‍♀️✨',
    images: [],
    likesCount: 123,
    commentsCount: 19,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    author: {
      id: 'u4',
      name: 'Елена Смирнова',
      avatar: undefined,
    },
  },
  {
    id: '5',
    authorId: 'u5',
    content: 'Новая программа тренировок "Сила и выносливость" уже доступна! 12 недель трансформации вашего тела. Первые 10 участников получают скидку 50%! 💪',
    images: [],
    likesCount: 567,
    commentsCount: 89,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    author: {
      id: 'u5',
      name: 'Анна Тренер',
      avatar: undefined,
    },
  },
];

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newPost, setNewPost] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (isLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      return next;
    });

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1 }
        : post
    ));

    try {
      if (isLiked) {
        await socialApi.unlikePost(postId);
      } else {
        await socialApi.likePost(postId);
      }
    } catch (error) {
      // Revert on error
      setLikedPosts(prev => {
        const next = new Set(prev);
        if (isLiked) {
          next.add(postId);
        } else {
          next.delete(postId);
        }
        return next;
      });
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1 }
          : post
      ));
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.trim()) return;

    setIsLoading(true);
    try {
      const response = await socialApi.createPost({ content: newPost });
      if (response.data) {
        setPosts(prev => [response.data!, ...prev]);
        setNewPost('');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'только что';
    if (minutes < 60) return `${minutes} мин.`;
    if (hours < 24) return `${hours} ч.`;
    if (days === 1) return 'вчера';
    if (days < 7) return `${days} дн.`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2">Лента новостей 📰</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Следите за активностью сообщества
          </p>
        </div>
      </div>

      {/* Create Post */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar name="Вы" size="md" />
            <div className="flex-1 space-y-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Что у вас на уме?"
                className="w-full min-h-[100px] px-4 py-3 bg-[var(--bg-tertiary)] border border-[var(--border-default)] rounded-xl resize-none focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                <Button onClick={handleCreatePost} disabled={!newPost.trim() || isLoading}>
                  {isLoading ? 'Публикация...' : 'Опубликовать'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              selectedFilter === filter.id
                ? 'bg-violet-500 text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <span>{filter.icon}</span>
            <span>{filter.label}</span>
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} hover>
            <CardContent className="p-6">
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <Avatar name={post.author.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{post.author.name}</span>
                    <Badge variant="default" size="sm">Тренер</Badge>
                    <span className="text-sm text-[var(--text-tertiary)]">
                      {formatTime(post.createdAt)}
                    </span>
                  </div>
                </div>
                <button className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4 rounded-xl overflow-hidden">
                  {post.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gradient-to-br from-violet-500 to-cyan-500 rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    likedPosts.has(post.id)
                      ? 'text-red-500'
                      : 'text-[var(--text-secondary)] hover:text-red-500'
                  }`}
                >
                  <svg className="w-5 h-5" fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="font-medium">{post.likesCount}</span>
                </button>

                <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-violet-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="font-medium">{post.commentsCount}</span>
                </button>

                <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-violet-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Поделиться</span>
                </button>

                <button className="ml-auto flex items-center gap-2 text-[var(--text-secondary)] hover:text-violet-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Сохранить</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-4">
        <Button variant="secondary">Загрузить ещё</Button>
      </div>
    </div>
  );
}



