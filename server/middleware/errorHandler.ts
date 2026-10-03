import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[ServerError]', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: 'Invalid request data',
      details: err.issues.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500;
  const message = err.message || 'An internal server error occurred';

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
}
