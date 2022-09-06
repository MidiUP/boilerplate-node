import { IDbCache } from '../interfaces/dbCache.interface';
import Ioredis from 'ioredis';
import 'dotenv/config';

export class Redis implements IDbCache {
  private readonly connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PORT,
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

  async setData(key: string, data: any): Promise<void> {
    try {
      const dataString = JSON.stringify(data);
      await this.client.set(key, dataString);
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
