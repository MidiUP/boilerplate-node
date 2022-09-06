export interface ILogger {
  readonly name: string;
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  http: (message: string) => void;
  debug: (message: string) => void;
}

export abstract class AbstractLogger {
  constructor(protected readonly name: string) {}
  abstract info(message: string): void;
  abstract error(message: string): void;
  abstract warn(message: string): void;
  abstract http(message: string): void;
  abstract debug(message: string): void;
}
