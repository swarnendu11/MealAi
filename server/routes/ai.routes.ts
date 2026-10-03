import { Router } from 'express';
import { AIController } from '../controllers/ai.controller.ts';
import { requireAuth } from '../middleware/auth.middleware.ts';
import { aiRateLimiter } from '../middleware/aiUsage.middleware.ts';

export const aiRouter = Router();

// Protect AI generation routes and attach rate limiter
aiRouter.use(requireAuth);
aiRouter.use(aiRateLimiter);

// Recipe generation & modification
aiRouter.post('/generate-recipe', AIController.generateRecipe);
aiRouter.post('/modify-recipe', AIController.modifyRecipe);
aiRouter.post('/surprise-me', AIController.surpriseMe);

// Weekly meal plan generation & modification
aiRouter.post('/generate-plan', AIController.generatePlan);
aiRouter.post('/regenerate-meal', AIController.regenerateMeal);

// Vision & multimodal
aiRouter.post('/analyze-ingredients-image', AIController.analyzeImage);

// Culinary intelligence & cooking assistant
aiRouter.post('/substitute-ingredient', AIController.substituteIngredient);
aiRouter.post('/consolidate-groceries', AIController.consolidateGroceries);
aiRouter.post('/cooking-assistant', AIController.cookingAssistant);
aiRouter.post('/cooking-assistant-stream', AIController.cookingAssistantStream);
aiRouter.post('/cooking-troubleshoot', AIController.cookingTroubleshoot);
aiRouter.post('/natural-language-search', AIController.naturalLanguageSearch);
