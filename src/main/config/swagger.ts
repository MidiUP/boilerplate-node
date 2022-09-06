import { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../infra/swagger/swagger.json';

export default (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
