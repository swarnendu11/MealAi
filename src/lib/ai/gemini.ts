import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure official GoogleGenAI is initialized on the server with recommended User-Agent header
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export const GEMINI_MODEL = 'gemini-3.8-flash';

// AI Usage Record Schema
export interface AIUsageRecord {
  id: string;
  userId: string;
  type: 'recipe' | 'meal-plan' | 'modification' | 'assistant' | 'search' | 'substitution';
  createdAt: string;
  status: 'started' | 'completed' | 'failed' | 'cancelled';
  model?: string;
  latencyMs?: number;
  metadata?: Record<string, any>;
}

// In-memory rate limiting and usage tracking store
const recentRequestsMap = new Map<string, number[]>();
export const usageLogs: AIUsageRecord[] = [];

/**
 * Basic server-side protection against excessive rapid requests.
 * Allows up to 30 requests per minute per identifier.
 */
export function checkRateLimit(identifier: string = 'global', maxPerMinute = 30): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const timestamps = recentRequestsMap.get(identifier) || [];
  const validTimestamps = timestamps.filter(t => now - t < windowMs);

  if (validTimestamps.length >= maxPerMinute) {
    recentRequestsMap.set(identifier, validTimestamps);
    return { allowed: false, remaining: 0 };
  }

  validTimestamps.push(now);
  recentRequestsMap.set(identifier, validTimestamps);
  return { allowed: true, remaining: maxPerMinute - validTimestamps.length };
}

/**
 * Record an AI operation for usage metrics
 */
export function logAIUsage(record: AIUsageRecord) {
  usageLogs.unshift(record);
  if (usageLogs.length > 500) {
    usageLogs.length = 500;
  }
}
