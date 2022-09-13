import { IClientErrorJson } from '../interfaces/client-error-json.interface';

export class ServerError extends Error {
  constructor(readonly data: object = {}) {
    super(`Server Error: ${'Internal server error'}`);
    this.name = 'Server Error';
  }
  public toJSON(): IClientErrorJson {
    return {
      message: 'Internal server error',
      data: this.data,
    };
  }
}
