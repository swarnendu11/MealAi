import { Request, Response, NextFunction } from 'express';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    // Only log API routes to keep console clean
    if (originalUrl.startsWith('/api')) {
      const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
      const reset = '\x1b[0m';
      console.log(`[API] ${method} ${originalUrl} ${color}${status}${reset} - ${duration}ms`);
    }
  });

  next();
}
