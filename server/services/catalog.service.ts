import {
  SEED_RECIPES,
  SEED_INGREDIENTS,
  SEED_CUISINES,
  SEED_MEAL_TYPES,
  SEED_DIETARY_TAGS,
  SEED_APPLIANCES,
} from '../../src/data/seedCatalog.ts';
import { Recipe } from '../../src/types/index.ts';

export interface CatalogQueryFilters {
  search?: string;
  cuisine?: string;
  mealType?: string;
  dietary?: string;
  appliance?: string;
  cookingMethod?: string;
  difficulty?: string;
  maxTime?: number;
  pantry?: string;
}

export class CatalogService {
  public static getRecipes(filters: CatalogQueryFilters = {}): { count: number; recipes: Recipe[] } {
    let results = [...SEED_RECIPES];

    if (filters.search && filters.search.trim()) {
      const tokens = filters.search.toLowerCase().trim().split(/\s+/);
      results = results.filter(r => {
        const text = (r.searchableText || `${r.title} ${r.cuisine} ${r.description}`).toLowerCase();
        return tokens.every(token => text.includes(token));
      });
    }

    if (filters.cuisine && filters.cuisine !== 'All') {
      results = results.filter(r => r.cuisine.toLowerCase() === filters.cuisine?.toLowerCase());
    }

    if (filters.mealType && filters.mealType !== 'All') {
      const target = filters.mealType.toLowerCase();
      results = results.filter(r =>
        (r.mealTypes && r.mealTypes.some(m => m.toLowerCase() === target)) ||
        (r.mealType && r.mealType.toLowerCase() === target)
      );
    }

    if (filters.dietary && filters.dietary !== 'All') {
      const target = filters.dietary.toLowerCase();
      results = results.filter(r =>
        (r.dietaryTags && r.dietaryTags.some(d => d.toLowerCase() === target)) ||
        (r.dietary && r.dietary.some(d => d.toLowerCase() === target))
      );
    }

    if (filters.appliance && filters.appliance !== 'All') {
      const target = filters.appliance.toLowerCase();
      results = results.filter(r =>
        (r.applianceTags && r.applianceTags.some(a => a.toLowerCase().includes(target))) ||
        (r.appliances && r.appliances.some(a => a.toLowerCase().includes(target)))
      );
    }

    if (filters.cookingMethod && filters.cookingMethod !== 'All') {
      const target = filters.cookingMethod.toLowerCase();
      results = results.filter(r =>
        r.cookingMethods && r.cookingMethods.some(m => m.toLowerCase() === target)
      );
    }

    if (filters.difficulty && filters.difficulty !== 'All') {
      results = results.filter(r => r.difficulty.toLowerCase() === filters.difficulty?.toLowerCase());
    }

    if (filters.maxTime && !isNaN(filters.maxTime) && filters.maxTime > 0) {
      results = results.filter(r => (r.totalTimeMinutes || r.totalTime) <= filters.maxTime!);
    }

    // Pantry Matching calculation
    if (filters.pantry && filters.pantry.trim()) {
      const pantryItems = filters.pantry.split(',').map(s => s.trim().toLowerCase());
      results = results.map(r => {
        let matched = 0;
        let missing = 0;
        r.ingredients.forEach(ing => {
          const ingName = ing.name.toLowerCase();
          if (pantryItems.some(p => ingName.includes(p) || p.includes(ingName))) {
            matched++;
          } else {
            missing++;
          }
        });
        return {
          ...r,
          matchedPantryCount: matched,
          missingIngredientsCount: missing,
        };
      });
      results.sort((a, b) => (b.matchedPantryCount || 0) - (a.matchedPantryCount || 0));
    }

    return { count: results.length, recipes: results };
  }

  public static getRecipeById(id: string): Recipe | null {
    return SEED_RECIPES.find(r => r.id === id || r.slug === id) || null;
  }

  public static getIngredients(search?: string, category?: string) {
    let results = [...SEED_INGREDIENTS];

    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.aliases.some(a => a.toLowerCase().includes(q)) ||
        i.searchableText.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'all') {
      results = results.filter(i => i.category.toLowerCase() === category.toLowerCase());
    }

    return { count: results.length, ingredients: results };
  }

  public static getTaxonomies() {
    return {
      cuisines: SEED_CUISINES,
      mealTypes: SEED_MEAL_TYPES,
      dietaryTags: SEED_DIETARY_TAGS,
      appliances: SEED_APPLIANCES,
    };
  }
}
