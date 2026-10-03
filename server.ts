import { startServer } from './server/index.ts';

startServer().catch((err) => {
  console.error('[MealAI Server] Failed to start:', err);
  process.exit(1);
});
