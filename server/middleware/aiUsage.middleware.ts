import { Request, Response, NextFunction } from 'express';

interface UsageRecord {
  count: number;
  lastResetDay: string;
  minuteRequests: number;
  lastMinuteReset: number;
}

const memoryUsageStore = new Map<string, UsageRecord>();

// Configurable limits
const MAX_REQUESTS_PER_MINUTE = 20;
const MAX_REQUESTS_PER_DAY = 150;
const MAX_PAYLOAD_BYTES = 500 * 1024; // 500KB

/**
 * Middleware enforcing per-user rate limits, daily quotas, and request size checks.
 * Associates usage with req.authUid (authenticated User ID).
 */
export function aiRateLimiter(req: Request, res: Response, next: NextFunction) {
  const userId = req.authUid || 'guest_user';
  const now = Date.now();
  const today = new Date().toISOString().split('T')[0];

  // 1. Request payload size check
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return res.status(413).json({
      success: false,
      error: 'Request payload exceeds 500KB size limit.',
    });
  }

  // 2. Retrieve or initialize user usage stats
  let record = memoryUsageStore.get(userId);
  if (!record) {
    record = {
      count: 0,
      lastResetDay: today,
      minuteRequests: 0,
      lastMinuteReset: now,
    };
    memoryUsageStore.set(userId, record);
  }

  // Reset minute window
  if (now - record.lastMinuteReset > 60000) {
    record.minuteRequests = 0;
    record.lastMinuteReset = now;
  }

  // Reset daily window
  if (record.lastResetDay !== today) {
    record.count = 0;
    record.lastResetDay = today;
  }

  // Check limits
  if (record.minuteRequests >= MAX_REQUESTS_PER_MINUTE) {
    return res.status(429).json({
      success: false,
      error: 'Too many AI requests this minute. Please wait a few seconds.',
      retryAfterSeconds: Math.ceil((60000 - (now - record.lastMinuteReset)) / 1000),
    });
  }

  if (record.count >= MAX_REQUESTS_PER_DAY && userId !== 'system_admin') {
    return res.status(429).json({
      success: false,
      error: `Daily AI quota of ${MAX_REQUESTS_PER_DAY} operations reached. Quota resets at midnight UTC.`,
    });
  }

  // Increment counters
  record.minuteRequests++;
  record.count++;

  // Attach usage metadata to request
  (req as any).aiUsage = {
    userId,
    dailyCount: record.count,
    dailyRemaining: Math.max(0, MAX_REQUESTS_PER_DAY - record.count),
  };

  next();
}
