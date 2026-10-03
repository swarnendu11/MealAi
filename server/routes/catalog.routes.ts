import { Router } from 'express';
import { CatalogController } from '../controllers/catalog.controller.ts';

export const catalogRouter = Router();

catalogRouter.get('/recipes', CatalogController.getRecipes);
catalogRouter.get('/recipes/:id', CatalogController.getRecipeById);
catalogRouter.get('/ingredients', CatalogController.getIngredients);
catalogRouter.get('/taxonomies', CatalogController.getTaxonomies);
