import { Request, Response, NextFunction } from 'express';

const ipRequests = new Map<string, number[]>();

export function rateLimiter(limit = 60, windowMs = 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Only apply rate limiting to AI endpoints
    if (!req.originalUrl.startsWith('/api/ai')) {
      return next();
    }

    const ip = req.ip || req.socket.remoteAddress || 'unknown-client';
    const now = Date.now();
    const timestamps = (ipRequests.get(ip) || []).filter(t => now - t < windowMs);

    if (timestamps.length >= limit) {
      res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
      return res.status(429).json({
        success: false,
        error: 'Too many culinary requests. Please wait a moment before trying again.',
      });
    }

    timestamps.push(now);
    ipRequests.set(ip, timestamps);
    res.setHeader('X-RateLimit-Limit', limit);
    res.setHeader('X-RateLimit-Remaining', limit - timestamps.length);

    next();
  };
}
