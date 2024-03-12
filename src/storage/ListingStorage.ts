import redis, { RedisClientType } from "redis";

// such a painful type
type Redis = RedisClientType<redis.RedisModules, redis.RedisFunctions, redis.RedisScripts>;

export class ListingStorage {
  constructor(private readonly redisUrl: string) {}

  private client: Redis | undefined;

  async getClient(): Promise<Redis> {
    if (!this.client) {
      this.client = await redis.createClient({url: this.redisUrl })
      .on("error", err => console.error("Redis client had error", err))
      .connect(); 
    }

    return this.client!;
  }
}
