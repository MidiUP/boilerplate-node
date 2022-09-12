import { IDbCache } from '../interfaces/db-cache.interface';
import Ioredis from 'ioredis';

export class Cache implements IDbCache {
  private readonly connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  };
  private readonly client = new Ioredis(this.connection);

  async getDataByKey(key: string): Promise<any> {
    try {
      const data = await this.client.get(key);
      return JSON.parse(data);
    } catch (err) {
      throw err;
    }
  }

  async setData(
    key: string,
    data: any,
    expirationSeconds: number,
  ): Promise<void> {
    try {
      const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
      await this.client.set(key, dataString, 'EX', expirationSeconds);
      return;
    } catch (err) {
      throw err;
    }
  }

  async clearCacheByKey(key: string): Promise<void> {
    try {
      await this.client.del(key);
      return;
    } catch (err) {
      throw err;
    }
  }
}
