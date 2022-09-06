import winston from 'winston';
import { AbstractLogger } from '../interfaces/logger.interface';

export class Logger extends AbstractLogger {
  private readonly logger: winston.Logger;

  private readonly levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  private readonly colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  private readonly format = winston.format.combine(
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss:ms' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
      (info) =>
        `${info.timestamp}  [${this.name}]  ${info.level}:  ${info.message}`,
    ),
  );

  private readonly transports = [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ];

  constructor(readonly name: string) {
    super(name);
    winston.addColors(this.colors);
    this.logger = winston.createLogger({
      level: this.level(),
      levels: this.levels,
      format: this.format,
      transports: this.transports,
    });
  }

  private readonly level = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
  };

  info(message: string): void {
    this.logger.info(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  http(message: string): void {
    this.logger.http(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
