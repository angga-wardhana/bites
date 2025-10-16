import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;
const REDIS_URL = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT} `;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

export async function initialRedisClient(): Promise<RedisClientType> {
    if (client) return client;

    client = createClient({
        url: REDIS_URL,
        password: REDIS_PASSWORD,
    });

    client.on('error', (err) => console.error('Redis Client Error', err));

    await client.connect();
    console.log('Connected to Redis');

    return client;
}

export function getRedisClient(): RedisClientType {
    if (!client) {
        throw new Error("Redis client is not initialized. Call initialRedisClient() first.");
    }
    return client;
}