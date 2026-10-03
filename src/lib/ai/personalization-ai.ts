import { ai, GEMINI_MODEL } from './gemini.ts';
import { Recipe, UserProfile, PantryItem, RecipeFilterOptions } from '../../types/index.ts';

export interface ParsedSearchFilters {
  queryKeywords: string[];
  cuisine?: string;
  mealType?: string;
  dietaryTag?: string;
  appliance?: string;
  cookingMethod?: string;
  difficulty?: string;
  maxTimeMinutes?: number;
  minProteinGrams?: number;
  maxCalories?: number;
}

/**
 * Natural language recipe search query parser.
 * Converts conversational requests into structured filter parameters for database queries.
 */
export async function parseNaturalLanguageSearch(userQuery: string): Promise<ParsedSearchFilters> {
  const prompt = `
You are MealAI's search query compiler.
A home cook searched for: "${userQuery}"

Extract structured search filter parameters matching standard culinary categories.
DO NOT generate any recipes. Extract only filters.

Schema:
{
  "queryKeywords": ["keywords", "to", "search"],
  "cuisine": "Italian | Mexican | Japanese | Indian | Mediterranean | Thai | American | Chinese | Korean | Middle Eastern | French | Greek | Spanish | null",
  "mealType": "breakfast | lunch | dinner | snack | dessert | appetizer | null",
  "dietaryTag": "High-Protein | Vegetarian | Vegan | Gluten-Free | Dairy-Free | Keto | Low-Carb | Pescatarian | null",
  "appliance": "Air Fryer | Stovetop | Oven | Instant Pot | Slow Cooker | Blender | Grill | null",
  "cookingMethod": "Air fry | Sauté | Bake | Roast | Grill | Pressure cook | Slow cook | null",
  "difficulty": "beginner | easy | intermediate | advanced | null",
  "maxTimeMinutes": null or number,
  "minProteinGrams": null or number,
  "maxCalories": null or number
}
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      queryKeywords: Array.isArray(parsed.queryKeywords) ? parsed.queryKeywords : [userQuery],
      cuisine: parsed.cuisine || undefined,
      mealType: parsed.mealType || undefined,
      dietaryTag: parsed.dietaryTag || undefined,
      appliance: parsed.appliance || undefined,
      cookingMethod: parsed.cookingMethod || undefined,
      difficulty: parsed.difficulty || undefined,
      maxTimeMinutes: typeof parsed.maxTimeMinutes === 'number' ? parsed.maxTimeMinutes : undefined,
      minProteinGrams: typeof parsed.minProteinGrams === 'number' ? parsed.minProteinGrams : undefined,
      maxCalories: typeof parsed.maxCalories === 'number' ? parsed.maxCalories : undefined,
    };
  } catch (err) {
    console.error('NLP search parsing error, using raw query:', err);
    return { queryKeywords: [userQuery] };
  }
}

/**
 * Personalized recipe recommendations based on user history, favorites, and pantry
 */
export async function getPersonalizedRecommendations(params: {
  profile?: UserProfile | null;
  favorites: Recipe[];
  pantry: PantryItem[];
  savedRecipes: Recipe[];
}): Promise<{
  headline: string;
  rationale: string;
  suggestedTags: string[];
  preferredCuisines: string[];
}> {
  const favoriteTitles = params.favorites.map(f => `${f.title} (${f.cuisine})`).slice(0, 5);
  const pantryNames = params.pantry.map(p => p.name).slice(0, 8);

  const prompt = `
Analyze this home cook's culinary habits and generate a concise personal profile insight:
User Dietary Preferences: ${(params.profile?.dietaryPreferences || []).join(', ') || 'General'}
Skill Level: ${params.profile?.skillLevel || 'Easy'}
Favorite Dishes: ${favoriteTitles.join(', ') || 'No favorites yet'}
Pantry Essentials: ${pantryNames.join(', ') || 'General pantry'}

Generate a short, friendly recommendation banner.
Return ONLY JSON:
{
  "headline": "e.g. High-Protein Mediterranean Dinners",
  "rationale": "e.g. Because you love quick chicken dishes and keep fresh olive oil and garlic on hand...",
  "suggestedTags": ["High-Protein", "Under 30 Mins", "Mediterranean"],
  "preferredCuisines": ["Mediterranean", "American"]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });
    const parsed = JSON.parse(response.text || '{}');
    return {
      headline: parsed.headline || 'Recommended for Your Kitchen',
      rationale: parsed.rationale || 'Tailored recipes matching your ingredients and cooking style.',
      suggestedTags: Array.isArray(parsed.suggestedTags) ? parsed.suggestedTags : ['Quick', 'Healthy'],
      preferredCuisines: Array.isArray(parsed.preferredCuisines) ? parsed.preferredCuisines : ['Mediterranean'],
    };
  } catch (err) {
    return {
      headline: 'Fresh Culinary Suggestions',
      rationale: 'Curated dishes based on your preferred flavors and kitchen pantry.',
      suggestedTags: ['High-Protein', 'Quick'],
      preferredCuisines: ['Mediterranean'],
    };
  }
}
