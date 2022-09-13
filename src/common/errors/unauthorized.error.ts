import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export class UnauthorizedError extends Error {
  constructor(readonly message: string, readonly data: object = {}) {
    super(`Unauthorized: ${message}`);
    this.name = 'Unauthorized';
  }
  public toJSON(): IClientErrorJson {
    return {
      message: this.message,
      data: this.data,
    };
  }
}
