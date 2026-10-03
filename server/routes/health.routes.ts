import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.ts';

export const healthRouter = Router();

healthRouter.get('/health', HealthController.getHealth);
healthRouter.get('/status', HealthController.getHealth);
