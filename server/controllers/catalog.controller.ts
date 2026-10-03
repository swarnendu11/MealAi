import { Request, Response, NextFunction } from 'express';
import { CatalogService } from '../services/catalog.service.ts';

export class CatalogController {
  public static getRecipes(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        search,
        cuisine,
        mealType,
        dietary,
        appliance,
        cookingMethod,
        difficulty,
        maxTime,
        pantry,
      } = req.query;

      const result = CatalogService.getRecipes({
        search: typeof search === 'string' ? search : undefined,
        cuisine: typeof cuisine === 'string' ? cuisine : undefined,
        mealType: typeof mealType === 'string' ? mealType : undefined,
        dietary: typeof dietary === 'string' ? dietary : undefined,
        appliance: typeof appliance === 'string' ? appliance : undefined,
        cookingMethod: typeof cookingMethod === 'string' ? cookingMethod : undefined,
        difficulty: typeof difficulty === 'string' ? difficulty : undefined,
        maxTime: maxTime ? Number(maxTime) : undefined,
        pantry: typeof pantry === 'string' ? pantry : undefined,
      });

      return res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  public static getRecipeById(req: Request, res: Response, next: NextFunction) {
    try {
      const recipe = CatalogService.getRecipeById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ success: false, error: 'Recipe not found' });
      }
      return res.json({ success: true, recipe });
    } catch (err) {
      next(err);
    }
  }

  public static getIngredients(req: Request, res: Response, next: NextFunction) {
    try {
      const { search, category } = req.query;
      const result = CatalogService.getIngredients(
        typeof search === 'string' ? search : undefined,
        typeof category === 'string' ? category : undefined
      );
      return res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }

  public static getTaxonomies(_req: Request, res: Response, next: NextFunction) {
    try {
      const taxonomies = CatalogService.getTaxonomies();
      return res.json({ success: true, ...taxonomies });
    } catch (err) {
      next(err);
    }
  }
}
