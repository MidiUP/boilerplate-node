import express, { Express } from 'express';
import setupMiddlewares from './middleware';
import setupRoutes from './routes';
import setupSwagger from './swagger';

export const setupApp = (): Express => {
  const app = express();
  setupMiddlewares(app);
  setupRoutes(app);
  setupSwagger(app);
  return app;
};
