import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export class CacheUnavailableError extends Error {
  constructor(readonly message: string, readonly data: object = {}) {
    super(`Cache Unavailable Error: ${message}`);
    this.name = 'Cache Unavailable';
  }
  public toJSON(): IClientErrorJson {
    return {
      message: this.message,
      data: this.data,
      status: 500,
    };
  }
}
