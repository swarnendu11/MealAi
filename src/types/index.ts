import { z } from 'zod';

// Ingredient within a recipe
export const RecipeIngredientSchema = z.object({
  name: z.string().min(1),
  amount: z.string(),
  unit: z.string().optional().default(''),
  category: z.string().optional().default('Pantry'),
  note: z.string().optional(),
});
export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;

// Instruction step within a recipe
export const RecipeInstructionSchema = z.object({
  step: z.number().int().positive(),
  title: z.string().optional(),
  instruction: z.string().min(1),
  timerMinutes: z.number().optional().nullable(),
  tip: z.string().optional(),
});
export type RecipeInstruction = z.infer<typeof RecipeInstructionSchema>;

// Recipe substitution mapping
export const RecipeSubstitutionSchema = z.object({
  originalIngredient: z.string(),
  substituteIngredient: z.string(),
  ratio: z.string().optional().default('1:1'),
  notes: z.string().optional(),
});
export type RecipeSubstitution = z.infer<typeof RecipeSubstitutionSchema>;

// Full canonical Recipe schema
export const RecipeSchema = z.object({
  id: z.string(),
  userId: z.string().optional().default('system'),
  title: z.string().min(1).max(200),
  slug: z.string().optional(),
  description: z.string().max(2000),
  cuisine: z.string().max(80),
  region: z.string().optional(),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert', 'brunch', 'appetizer', 'drink']).optional().default('dinner'),
  mealTypes: z.array(z.string()).optional().default([]),
  difficulty: z.enum(['beginner', 'easy', 'intermediate', 'advanced']).default('easy'),
  
  // Timing
  prepTime: z.number().int().nonnegative().default(10),
  cookTime: z.number().int().nonnegative().default(20),
  totalTime: z.number().int().nonnegative().default(30),
  prepTimeMinutes: z.number().int().nonnegative().optional(),
  cookTimeMinutes: z.number().int().nonnegative().optional(),
  totalTimeMinutes: z.number().int().nonnegative().optional(),
  servings: z.number().int().positive().default(2),

  // Nutrition
  calories: z.number().int().nonnegative().default(450),
  protein: z.number().nonnegative().default(25),
  carbs: z.number().nonnegative().default(40),
  fat: z.number().nonnegative().default(15),
  fiber: z.number().nonnegative().optional(),
  proteinGrams: z.number().nonnegative().optional(),
  carbohydratesGrams: z.number().nonnegative().optional(),
  fatGrams: z.number().nonnegative().optional(),
  fiberGrams: z.number().nonnegative().optional(),

  // Taxonomy & Tags
  dietary: z.array(z.string()).default([]),
  dietaryTags: z.array(z.string()).optional().default([]),
  allergens: z.array(z.string()).optional().default([]),
  appliances: z.array(z.string()).default([]),
  applianceTags: z.array(z.string()).optional().default([]),
  cookingMethods: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([]),

  // Content
  ingredients: z.array(RecipeIngredientSchema),
  instructions: z.array(RecipeInstructionSchema),
  tips: z.array(z.string()).optional().default([]),
  substitutions: z.array(RecipeSubstitutionSchema).optional().default([]),
  imageUrl: z.string().optional().default(''),

  // Metadata & flags
  isFavorite: z.boolean().default(false),
  isPublic: z.boolean().default(true),
  source: z.string().default('catalog'),
  sourceType: z.enum(['seed', 'generated', 'user']).optional().default('seed'),
  searchableText: z.string().optional().default(''),
  matchedPantryCount: z.number().optional(),
  missingIngredientsCount: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type Recipe = z.infer<typeof RecipeSchema>;

// Helper to normalize and synchronize dual fields in Recipe
export function normalizeRecipeData(data: Partial<Recipe>): Recipe {
  const prep = data.prepTimeMinutes ?? data.prepTime ?? 10;
  const cook = data.cookTimeMinutes ?? data.cookTime ?? 20;
  const total = data.totalTimeMinutes ?? data.totalTime ?? (prep + cook);
  const prot = data.proteinGrams ?? data.protein ?? 20;
  const carb = data.carbohydratesGrams ?? data.carbs ?? 35;
  const fat = data.fatGrams ?? data.fat ?? 12;
  const fib = data.fiberGrams ?? data.fiber ?? 4;
  const mTypes = data.mealTypes && data.mealTypes.length > 0 ? data.mealTypes : [data.mealType || 'dinner'];
  const dTags = data.dietaryTags && data.dietaryTags.length > 0 ? data.dietaryTags : (data.dietary || []);
  const aTags = data.applianceTags && data.applianceTags.length > 0 ? data.applianceTags : (data.appliances || []);

  const title = data.title || 'Untitled Recipe';
  const slug = data.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const searchable = data.searchableText || [
    title,
    data.description || '',
    data.cuisine || '',
    data.region || '',
    ...mTypes,
    ...dTags,
    ...aTags,
    ...(data.cookingMethods || []),
    ...(data.tags || []),
    ...(data.ingredients?.map(i => i.name) || []),
  ].join(' ').toLowerCase();

  return {
    id: data.id || `rec_${Math.random().toString(36).substring(2, 10)}`,
    userId: data.userId || 'system',
    title,
    slug,
    description: data.description || '',
    cuisine: data.cuisine || 'International',
    region: data.region || '',
    mealType: (data.mealType as any) || (mTypes[0]?.toLowerCase() as any) || 'dinner',
    mealTypes: mTypes,
    difficulty: data.difficulty || 'easy',
    prepTime: prep,
    cookTime: cook,
    totalTime: total,
    prepTimeMinutes: prep,
    cookTimeMinutes: cook,
    totalTimeMinutes: total,
    servings: data.servings || 2,
    calories: data.calories || 450,
    protein: prot,
    carbs: carb,
    fat: fat,
    fiber: fib,
    proteinGrams: prot,
    carbohydratesGrams: carb,
    fatGrams: fat,
    fiberGrams: fib,
    dietary: dTags,
    dietaryTags: dTags,
    allergens: data.allergens || [],
    appliances: aTags,
    applianceTags: aTags,
    cookingMethods: data.cookingMethods || ['Sauté'],
    tags: data.tags || [],
    ingredients: data.ingredients || [],
    instructions: data.instructions || [],
    tips: data.tips || [],
    substitutions: data.substitutions || [],
    imageUrl: data.imageUrl || '',
    isFavorite: Boolean(data.isFavorite),
    isPublic: data.isPublic ?? true,
    source: data.source || 'catalog',
    sourceType: data.sourceType || 'seed',
    searchableText: searchable,
    matchedPantryCount: data.matchedPantryCount,
    missingIngredientsCount: data.missingIngredientsCount,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

// Normalized Ingredient Schema
export const CatalogIngredientSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  aliases: z.array(z.string()).default([]),
  category: z.enum([
    'produce',
    'protein',
    'dairy',
    'grain',
    'legume',
    'spice',
    'herb',
    'pantry',
    'oil',
    'sauce',
    'beverage',
    'other',
  ]),
  commonUnits: z.array(z.string()).default([]),
  dietaryTags: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  substitutions: z.array(z.string()).default([]),
  searchableText: z.string().default(''),
});
export type CatalogIngredient = z.infer<typeof CatalogIngredientSchema>;

// Taxonomy Schema (Cuisines, Categories, DietaryTags, Appliances)
export const TaxonomyItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  slug: z.string(),
  description: z.string().optional().default(''),
  recipeCount: z.number().int().nonnegative().optional(),
  icon: z.string().optional(),
});
export type TaxonomyItem = z.infer<typeof TaxonomyItemSchema>;

// Recipe Filtering & Searching Options
export interface RecipeFilterOptions {
  query?: string;
  cuisine?: string;
  mealType?: string;
  dietaryTag?: string;
  appliance?: string;
  cookingMethod?: string;
  difficulty?: string;
  maxTotalTime?: number;
  maxCalories?: number;
  minProtein?: number;
  pantryOnly?: boolean;
}

// User Profile Schema
export const UserProfileSchema = z.object({
  id: z.string(),
  uid: z.string().optional(),
  name: z.string().min(1).max(100),
  displayName: z.string().optional(),
  email: z.string().optional().default(''),
  phoneNumber: z.string().optional(),
  avatar: z.string().optional().default(''),
  photoURL: z.string().optional(),
  provider: z.string().optional().default('email'),
  dietaryPreferences: z.array(z.string()).default([]),
  allergies: z.array(z.string()).default([]),
  favoriteCuisines: z.array(z.string()).default([]),
  skillLevel: z.enum(['beginner', 'easy', 'intermediate', 'advanced']).default('easy'),
  householdSize: z.number().int().positive().default(2),
  preferredAppliances: z.array(z.string()).default([]),
  calorieGoal: z.number().int().positive().default(2000),
  proteinGoal: z.number().int().positive().default(100),
  dailyBudget: z.number().nonnegative().default(25),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type UserProfile = z.infer<typeof UserProfileSchema>;

// Pantry Item Schema
export const PantryItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1).max(100),
  category: z.string().max(50).default('Pantry Staples'),
  quantity: z.string().max(50).default('1'),
  unit: z.string().optional().default(''),
  expiryDate: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type PantryItem = z.infer<typeof PantryItemSchema>;

// Grocery Item Schema
export const GroceryItemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1).max(100),
  category: z.string().max(50).default('Produce'),
  quantity: z.string().max(50).default('1'),
  checked: z.boolean().default(false),
  recipeTitle: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type GroceryItem = z.infer<typeof GroceryItemSchema>;

// Scheduled Meal in Meal Plan
export const PlannedMealItemSchema = z.object({
  recipeId: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  calories: z.number().default(0),
  protein: z.number().default(0),
  timeMinutes: z.number().default(20),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  cuisine: z.string().optional(),
  imageUrl: z.string().optional(),
  ingredientsSummary: z.array(z.string()).optional().default([]),
});
export type PlannedMealItem = z.infer<typeof PlannedMealItemSchema>;

// Day plan
export const DayPlanSchema = z.object({
  date: z.string(), // YYYY-MM-DD
  dayOfWeek: z.string(), // Monday, Tuesday...
  breakfast: PlannedMealItemSchema.optional(),
  lunch: PlannedMealItemSchema.optional(),
  dinner: PlannedMealItemSchema.optional(),
  snack: PlannedMealItemSchema.optional(),
  totalCalories: z.number().default(0),
  totalProtein: z.number().default(0),
});
export type DayPlan = z.infer<typeof DayPlanSchema>;

// Weekly Meal Plan Schema
export const WeeklyMealPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string().default('Weekly Plan'),
  weekStartDate: z.string(),
  days: z.record(z.string(), DayPlanSchema), // keys like 'mon', 'tue', etc. or '2026-10-01'
  targetCalories: z.number().default(2000),
  targetProtein: z.number().default(100),
  dietaryTags: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type WeeklyMealPlan = z.infer<typeof WeeklyMealPlanSchema>;

// Recipe Generation Request Schema
export const GenerateRecipeRequestSchema = z.object({
  ingredients: z.array(z.string()).min(1, 'Please provide at least one ingredient'),
  cuisine: z.string().optional().default('Any'),
  diet: z.string().optional().default('No preference'),
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack', 'dessert']).optional().default('dinner'),
  maxCookingTime: z.number().optional().default(45),
  difficulty: z.enum(['beginner', 'easy', 'intermediate', 'advanced']).optional().default('easy'),
  appliances: z.array(z.string()).optional().default([]),
  calories: z.number().optional(),
  protein: z.number().optional(),
  budget: z.number().optional(),
  householdSize: z.number().optional().default(2),
  skillLevel: z.string().optional(),
  spiciness: z.string().optional().default('Mild'),
  notes: z.string().optional(),
  pantryItems: z.array(z.string()).optional().default([]),
});
export type GenerateRecipeRequest = z.infer<typeof GenerateRecipeRequestSchema>;

// Weekly Plan Generation Request Schema
export const GeneratePlanRequestSchema = z.object({
  dietaryPreferences: z.array(z.string()).optional().default([]),
  allergies: z.array(z.string()).optional().default([]),
  favoriteCuisines: z.array(z.string()).optional().default([]),
  calorieGoal: z.number().optional().default(2000),
  proteinGoal: z.number().optional().default(90),
  householdSize: z.number().optional().default(2),
  skillLevel: z.string().optional().default('easy'),
  appliances: z.array(z.string()).optional().default([]),
  dailyBudget: z.number().optional().default(30),
  pantryItems: z.array(z.string()).optional().default([]),
  weekStartDate: z.string(),
});
export type GeneratePlanRequest = z.infer<typeof GeneratePlanRequestSchema>;
