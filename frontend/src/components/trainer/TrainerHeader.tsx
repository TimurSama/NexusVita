'use client'

interface Trainer {
  id: string
  firstName: string
  lastName?: string
  bio?: string
  specialties: string[]
  followersCount: number
  subscribersCount: number
}

interface TrainerHeaderProps {
  trainer: Trainer
  isFollowing: boolean
  isSubscribed: boolean
  onFollow: () => void
  onSubscribe: () => void
}

export default function TrainerHeader({
  trainer,
  isFollowing,
  isSubscribed,
  onFollow,
  onSubscribe,
}: TrainerHeaderProps) {
  return (
    <div className="card mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">
            {trainer.firstName} {trainer.lastName}
          </h1>
          <div className="text-ink-600 mb-2">
            {trainer.specialties.join(' • ')}
          </div>
          {trainer.bio && (
            <p className="text-ink-700 mb-4">{trainer.bio}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onFollow}
            className={isFollowing ? 'button-secondary' : 'button-primary'}
          >
            {isFollowing ? '✓ Отслеживаю' : 'Отслеживать'}
          </button>
          <button
            onClick={onSubscribe}
            className={isSubscribed ? 'button-primary' : 'button-secondary'}
          >
            {isSubscribed ? '✓ Подписан' : 'Подписаться'}
          </button>
        </div>
      </div>
    </div>
  )
}

