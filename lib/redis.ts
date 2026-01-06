import Redis from 'ioredis';

const getRedisClient = () => {
    if (process.env.REDIS_URL) {
        return new Redis(process.env.REDIS_URL);
    }
    throw new Error("REDIS_URL is not defined");
    };

    // Global variable to hold the client in development to prevent hot-reload duplicates
    const globalForRedis = global as unknown as { redis: Redis | undefined };

    export const redis = globalForRedis.redis ?? getRedisClient();

    if (process.env.NODE_ENV !== 'production') {
    globalForRedis.redis = redis;
}