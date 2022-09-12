import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export class BadRequestError extends Error {
  constructor(readonly message: string, readonly data: object = {}) {
    super(`Bad Request: ${message}`);
    this.name = 'Bad Request';
  }
  public toJSON(): IClientErrorJson {
    return {
      message: this.message,
      data: this.data,
      status: 400,
    };
  }
}
