/**
 * Batch Importer & Seed Runner for MealAI
 * Integrates generateCategories, generateIngredients, and generateRecipes.
 * Can be executed via `npx tsx scripts/seed/importRecipes.ts` or imported into the backend.
 */

import { getAllTaxonomies } from './generateCategories.ts';
import { generateNormalizedIngredients } from './generateIngredients.ts';
import { generateSeedRecipes } from './generateRecipes.ts';

export interface ImportStats {
  cuisinesCount: number;
  mealTypesCount: number;
  dietaryTagsCount: number;
  cookingMethodsCount: number;
  appliancesCount: number;
  ingredientsCount: number;
  recipesCount: number;
}

export async function runCatalogSeedPipeline(recipeTarget: number = 100): Promise<ImportStats> {
  console.log('🚀 Starting MealAI Seed & Catalog Pipeline...');

  // 1. Generate taxonomies
  const taxonomies = getAllTaxonomies();
  console.log(`✓ Loaded Taxonomies: ${taxonomies.cuisines.length} cuisines, ${taxonomies.mealTypes.length} meal types, ${taxonomies.dietaryTags.length} dietary tags`);

  // 2. Generate normalized ingredients
  const ingredients = generateNormalizedIngredients();
  console.log(`✓ Normalized Ingredients Generated: ${ingredients.length} items`);

  // 3. Generate recipes
  const recipes = generateSeedRecipes(recipeTarget);
  console.log(`✓ Procedural Seed Recipes Generated: ${recipes.length} structured recipes`);

  const stats: ImportStats = {
    cuisinesCount: taxonomies.cuisines.length,
    mealTypesCount: taxonomies.mealTypes.length,
    dietaryTagsCount: taxonomies.dietaryTags.length,
    cookingMethodsCount: taxonomies.cookingMethods.length,
    appliancesCount: taxonomies.appliances.length,
    ingredientsCount: ingredients.length,
    recipesCount: recipes.length,
  };

  console.log('🎉 Seed pipeline preparation complete:', stats);
  return stats;
}

// Auto-run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCatalogSeedPipeline(100)
    .then((stats) => {
      console.log('Done!', stats);
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seed import error:', err);
      process.exit(1);
    });
}
