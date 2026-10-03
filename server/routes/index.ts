import { Router } from 'express';
import { aiRouter } from './ai.routes.ts';
import { catalogRouter } from './catalog.routes.ts';
import { healthRouter } from './health.routes.ts';

export const apiRouter = Router();

apiRouter.use('/ai', aiRouter);
apiRouter.use('/catalog', catalogRouter);
apiRouter.use('/', healthRouter);
