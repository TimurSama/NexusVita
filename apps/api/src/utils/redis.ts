import Redis from 'ioredis';
import { logger } from './logger.js';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryDelayOnFailover: 100,
  enableReadyCheck: true,
  lazyConnect: true,
});

redis.on('connect', () => {
  logger.info('Redis connected');
});

redis.on('error', (err) => {
  logger.error('Redis error:', err);
});

redis.on('close', () => {
  logger.info('Redis connection closed');
});

// Cache helpers
export const cacheHelpers = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Cache get error:', error);
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await redis.setex(key, ttlSeconds, serialized);
      } else {
        await redis.set(key, serialized);
      }
    } catch (error) {
      logger.error('Cache set error:', error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      logger.error('Cache del error:', error);
    }
  },

  async delPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error) {
      logger.error('Cache delPattern error:', error);
    }
  },
};

// Session store helpers
export const sessionStore = {
  async setSession(userId: string, sessionData: unknown, ttlSeconds = 86400 * 7): Promise<void> {
    await cacheHelpers.set(`session:${userId}`, sessionData, ttlSeconds);
  },

  async getSession<T>(userId: string): Promise<T | null> {
    return cacheHelpers.get<T>(`session:${userId}`);
  },

  async deleteSession(userId: string): Promise<void> {
    await cacheHelpers.del(`session:${userId}`);
  },
};



