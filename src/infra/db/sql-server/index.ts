import { DataSource } from 'typeorm';
import { Logger } from '../../logger';

const logger = new Logger('SQL SERVER');

const db = new DataSource({
  type: 'mssql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: 'dbo',
  entities: ['src/modules/**/*.model.ts'],
  synchronize: false,
  logging: false,
  options: { encrypt: false },
});

db.initialize()
  .then((db) => logger.info('database successfully connected'))
  .catch((err) => logger.error('database unavailable')); //TODO: implementar tratativa caso DB indisponível

export default db;
