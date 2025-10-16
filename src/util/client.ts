import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function initialRedisClient(): Promise<RedisClientType> {
    if (client) return client;

    client = createClient({
        url: 'redis://localhost:6379'
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