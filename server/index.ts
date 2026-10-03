import fs from 'fs';
import path from 'path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createApp } from './app.ts';
import { config } from './config/env.ts';

export async function startServer() {
  const app = createApp();

  if (config.isProduction) {
    // In production, serve optimized built assets
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    // In development, hook Vite dev server middleware
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback to transform and serve index.html for all non-API GET requests
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      // Skip API routes if any slip through
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`  MealAI Server v1.0.0`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  Local URL:   http://localhost:${config.port}`);
    console.log(`  Network:     http://0.0.0.0:${config.port}`);
    console.log(`  Gemini AI:   ${config.hasGeminiKey ? 'Active (API Key loaded)' : 'Fallback Mode (Offline/Heuristic)'}`);
    console.log(`===============================================`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('\n[MealAI Server] Gracefully shutting down...');
    server.close(() => {
      console.log('[MealAI Server] Closed remaining connections.');
      process.exit(0);
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  return server;
}
