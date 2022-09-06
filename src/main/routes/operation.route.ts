import { Logger } from '../../infra/logger';
import { Request, Response, Router } from 'express';

export default (route: Router): void => {
  route.get('/v1/operation', async (req: Request, res: Response) => {
    const logger = new Logger('OpereationController');
    logger.error('test error');
    logger.debug('test debug');
    logger.info('test info');
    logger.warn('test warn');
    logger.http('test http');
    res.status(200).json({ ok: true });
  });
};
