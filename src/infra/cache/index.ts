import { IDbCache } from '../interfaces/db-cache.interface';
import Ioredis from 'ioredis';
import { Logger } from '../logger';
import { CacheUnavailableError } from '../../common/errors/cache-unavailable.error';

export class Cache implements IDbCache {
  private readonly connection = {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  };
  private readonly timeReconnection = Number(
    process.env.REDIS_TIME_RECONNECTION,
  );
  private readonly logger = new Logger(Cache.name);
  private client = new Ioredis(this.connection);

  private readonly MESSAGE_ERROR_UNAVAILABILITY = 'Redis Unavailable';

  constructor() {
    this.configRedisConnections(this.client);
  }

  async getDataByKey(key: string): Promise<any> {
    try {
      const data = await this.client.get(key, (err, result) => {
        if (err) {
          return err;
        }
        return result;
      });
      return JSON.parse(data);
    } catch (err) {
      this.logger.error(err);
      return null;
    }
  }

  async setData(
    key: string,
    data: any,
    expirationSeconds: number,
  ): Promise<void | Error> {
    try {
      const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
      await this.client.set(
        key,
        dataString,
        'EX',
        expirationSeconds,
        (err, result) => {
          if (err) {
            return err;
          }
          return result;
        },
      );
      return;
    } catch (err) {
      this.logger.error(err);
      return new CacheUnavailableError(this.MESSAGE_ERROR_UNAVAILABILITY);
    }
  }

  async clearCacheByKey(key: string): Promise<void | Error> {
    try {
      await this.client.del(key);
      return;
    } catch (err) {
      this.logger.error(err);
      return new CacheUnavailableError(this.MESSAGE_ERROR_UNAVAILABILITY);
    }
  }

  configRedisConnections(redis: Ioredis): void {
    redis.on('ready', (stream) => {
      this.logger.info('Redis successfully connected');
    });

    redis.on('error', (err) => {
      this.logger.error(this.MESSAGE_ERROR_UNAVAILABILITY);
      redis.disconnect();
    });

    redis.on('end', () => {
      setTimeout(() => {
        this.client = new Ioredis(this.connection);
        this.configRedisConnections(this.client);
      }, this.timeReconnection);
    });
  }
}
