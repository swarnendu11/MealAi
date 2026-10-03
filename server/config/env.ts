import dotenv from 'dotenv';
import path from 'path';

// Load .env.local first (if present), then .env as fallback
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), quiet: true });
dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet: true });


export interface ServerConfig {
  port: number;
  nodeEnv: string;
  isProduction: boolean;
  appUrl: string;
  geminiApiKey: string;
  hasGeminiKey: boolean;
}

export const config: ServerConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
};
