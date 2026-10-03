import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/gemini.service.ts';
import { GeminiCookingService } from '../services/geminiCookingService.ts';
import {
  GenerateRecipeRequestSchema,
  GeneratePlanRequestSchema,
  RecipeSchema,
} from '../../src/types/index.ts';
import { z } from 'zod';

const ModifyRecipeSchema = z.object({
  existingRecipe: RecipeSchema,
  modificationRequest: z.string().min(1, 'Modification instruction is required'),
  pantryItems: z.array(z.string()).optional(),
});

export class AIController {
  public static async generateRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedInput = GenerateRecipeRequestSchema.parse(req.body);
      const recipe = await GeminiService.generateRecipe(validatedInput, req.authUid);
      return res.json({ success: true, recipe });
    } catch (err) {
      next(err);
    }
  }

  public static async modifyRecipe(req: Request, res: Response, next: NextFunction) {
    try {
      const { existingRecipe, modificationRequest, pantryItems } = ModifyRecipeSchema.parse(req.body);
      const recipe = await GeminiCookingService.modifyRecipe(existingRecipe, modificationRequest, pantryItems || []);
      return res.json({ success: true, recipe });
    } catch (err) {
      next(err);
    }
  }

  public static async generatePlan(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedInput = GeneratePlanRequestSchema.parse(req.body);
      const plan = await GeminiService.generateWeeklyPlan(validatedInput, req.authUid);
      return res.json({ success: true, plan });
    } catch (err) {
      next(err);
    }
  }

  public static async analyzeImage(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageBase64, mimeType } = req.body;
      if (!imageBase64) {
        return res.status(400).json({ success: false, error: 'No image provided' });
      }
      const data = await GeminiService.analyzeIngredientsImage(imageBase64, mimeType);
      return res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  }

  public static async substituteIngredient(req: Request, res: Response, next: NextFunction) {
    try {
      const { ingredient, recipeContext, dietaryRestriction } = req.body;
      if (!ingredient) {
        return res.status(400).json({ success: false, error: 'Ingredient required' });
      }
      const data = await GeminiCookingService.substituteIngredient(ingredient, recipeContext, dietaryRestriction);
      return res.json({ success: true, ...data });
    } catch (err) {
      next(err);
    }
  }

  public static async surpriseMe(req: Request, res: Response, next: NextFunction) {
    try {
      const dietary = req.body.dietary || 'balanced';
      const recipe = await GeminiService.surpriseMe(dietary, req.authUid);
      return res.json({ success: true, recipe });
    } catch (err) {
      next(err);
    }
  }

  public static async regenerateMeal(req: Request, res: Response, next: NextFunction) {
    try {
      const meal = await GeminiService.regenerateMeal(req.body);
      return res.json({ success: true, meal });
    } catch (err) {
      next(err);
    }
  }

  public static async consolidateGroceries(req: Request, res: Response, next: NextFunction) {
    try {
      const { rawIngredients, pantryItems } = req.body;
      if (!Array.isArray(rawIngredients) || rawIngredients.length === 0) {
        return res.status(400).json({ success: false, error: 'No ingredients provided' });
      }
      const items = await GeminiService.consolidateGroceries(rawIngredients, pantryItems || []);
      return res.json({ success: true, items });
    } catch (err) {
      next(err);
    }
  }

  public static async cookingAssistant(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipe, question, history, currentStepIndex, pantryItems, userPreferences } = req.body;
      if (!recipe || !question) {
        return res.status(400).json({ success: false, error: 'Recipe and question are required' });
      }
      const answer = await GeminiCookingService.chatCookingAssistant({
        recipe,
        question,
        history,
        currentStepIndex,
        pantryItems,
        userPreferences,
      });
      return res.json({ success: true, answer });
    } catch (err) {
      next(err);
    }
  }

  public static async cookingAssistantStream(req: Request, res: Response, next: NextFunction) {
    try {
      const { recipe, question, history, currentStepIndex, pantryItems, userPreferences } = req.body;
      if (!recipe || !question) {
        return res.status(400).json({ success: false, error: 'Recipe and question are required' });
      }

      // Configure SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      if (typeof (res as any).flushHeaders === 'function') {
        (res as any).flushHeaders();
      }

      const controller = new AbortController();
      req.on('close', () => {
        controller.abort();
      });

      for await (const chunk of GeminiCookingService.chatCookingAssistantStream(
        { recipe, question, history, currentStepIndex, pantryItems, userPreferences },
        controller.signal
      )) {
        res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
      }

      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    } catch (err) {
      next(err);
    }
  }

  public static async cookingTroubleshoot(req: Request, res: Response, next: NextFunction) {
    try {
      const { problem, recipeContext, currentStep } = req.body;
      if (!problem) {
        return res.status(400).json({ success: false, error: 'Problem description required' });
      }
      const result = await GeminiCookingService.troubleshootCooking(problem, recipeContext, currentStep);
      return res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  public static async naturalLanguageSearch(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ success: false, error: 'Query string required' });
      }
      const result = await GeminiCookingService.parseNaturalLanguageSearch(query);
      return res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }
}
