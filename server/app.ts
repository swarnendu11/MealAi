import express, { Express } from 'express';
import { requestLogger } from './middleware/requestLogger.ts';
import { rateLimiter } from './middleware/rateLimiter.ts';
import { errorHandler } from './middleware/errorHandler.ts';
import { apiRouter } from './routes/index.ts';

export function createApp(): Express {
  const app = express();

  // Basic security and parsing
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // Middleware pipeline
  app.use(requestLogger);
  app.use(rateLimiter(60, 60 * 1000));

  // Mount API router (both /api and / to support direct serverless invocations and rewrites)
  app.use('/api', apiRouter);
  app.use('/', apiRouter);

  // Global error handler for all unhandled route errors
  app.use(errorHandler);

  return app;
}
