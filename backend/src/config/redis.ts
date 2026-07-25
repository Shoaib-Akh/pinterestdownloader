import Redis from 'ioredis';
import { logger } from './logger.js';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

class MemoryCache {
  private store = new Map<string, { val: string; expireAt: number }>();

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expireAt) {
      this.store.delete(key);
      return null;
    }
    return item.val;
  }

  async setex(key: string, seconds: number, value: string): Promise<'OK'> {
    this.store.set(key, { val: value, expireAt: Date.now() + seconds * 1000 });
    return 'OK';
  }
}

let redisClient: Redis | MemoryCache;
let isRedisConnected = false;

try {
  const client = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    connectTimeout: 2000,
    lazyConnect: true,
  });

  client.on('connect', () => {
    isRedisConnected = true;
    logger.info('Connected to Redis server');
  });

  client.on('error', (err) => {
    if (isRedisConnected) {
      logger.warn(`Redis connection error: ${err.message}`);
    }
  });

  client.connect().catch(() => {
    logger.warn('Redis unavailable. Operating with in-memory cache fallback.');
  });

  redisClient = client;
} catch {
  logger.warn('Redis client initialization failed. Using memory cache fallback.');
  redisClient = new MemoryCache();
}

export async function getCache(key: string): Promise<string | null> {
  try {
    return await redisClient.get(key);
  } catch {
    return null;
  }
}

export async function setCache(key: string, ttlSeconds: number, value: string): Promise<void> {
  try {
    await redisClient.setex(key, ttlSeconds, value);
  } catch {
    // ignore cache write failure
  }
}
