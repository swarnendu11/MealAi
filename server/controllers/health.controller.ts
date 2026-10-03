import { Request, Response } from 'express';
import { config } from '../config/env.ts';
import { GEMINI_MODEL } from '../config/gemini.ts';

export class HealthController {
  private static startTime = Date.now();

  public static getHealth(_req: Request, res: Response) {
    const uptimeSeconds = Math.floor((Date.now() - HealthController.startTime) / 1000);
    const memory = process.memoryUsage();

    return res.json({
      success: true,
      service: 'mealai-api',
      status: 'healthy',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
      uptimeSeconds,
      aiServiceConfigured: config.hasGeminiKey,
    });
  }
}
