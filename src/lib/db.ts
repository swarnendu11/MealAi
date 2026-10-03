/**
 * Local Data Storage Layer
 * High-performance, persistent browser local storage and in-memory caches.
 */

import {
  UserProfile,
  Recipe,
  WeeklyMealPlan,
  PantryItem,
  GroceryItem,
  CatalogIngredient,
  TaxonomyItem,
  RecipeFilterOptions,
  normalizeRecipeData,
} from '../types/index.ts';

import {
  SEED_RECIPES,
  SEED_INGREDIENTS,
  SEED_CUISINES,
  SEED_MEAL_TYPES,
  SEED_DIETARY_TAGS,
  SEED_APPLIANCES,
} from '../data/seedCatalog.ts';

// ---------------- LOCAL STORAGE HELPERS ----------------

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.warn(`[Local DB] Failed to parse localStorage item "${key}":`, e);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[Local DB] Failed to save localStorage item "${key}":`, e);
  }
}

// ---------------- COMPATIBILITY TYPES & OBJECTS ----------------

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo?: any;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
  };
  console.error('[Local DB Error]:', errInfo);
  throw new Error(JSON.stringify(errInfo));
}

// Compatibility mocks for modules expecting app / auth / db / storage objects
export const app: any = { name: 'mealai-local', options: {} };
export const auth: any = { currentUser: null };
export const db: any = { type: 'local-db' };
export const storage: any = { type: 'local-storage' };
export const googleProvider: any = {};

export const getApp = () => app;
export const getAuth = () => auth;
export const getFirestore = () => db;
export const getStorage = () => storage;

export type AppInstance = any;
export type Auth = any;
export type Firestore = any;
export type StorageInstance = any;

export async function testConnection(): Promise<{ firestore: boolean; auth: boolean }> {
  return { firestore: true, auth: true };
}

// ---------------- USER PROFILE SERVICES ----------------

const STORAGE_USERS_KEY = 'mealai_local_user_profiles';

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const profiles = getStorageItem<Record<string, UserProfile>>(STORAGE_USERS_KEY, {});
  return profiles[userId] || null;
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  const profiles = getStorageItem<Record<string, UserProfile>>(STORAGE_USERS_KEY, {});
  profiles[profile.id] = {
    ...profile,
    updatedAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_USERS_KEY, profiles);
}

// ---------------- RECIPE SERVICES ----------------

const STORAGE_RECIPES_KEY = 'mealai_local_recipes';

export async function saveRecipeToFirestore(recipe: Recipe): Promise<void> {
  const recipes = getStorageItem<Record<string, Recipe>>(STORAGE_RECIPES_KEY, {});
  recipes[recipe.id] = {
    ...recipe,
    updatedAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_RECIPES_KEY, recipes);

}

const STORAGE_GENERATED_RECIPES_KEY = 'mealai_local_generated_recipes';

export async function saveGeneratedRecipeToFirestore(userId: string, recipe: Recipe): Promise<void> {
  const allGen = getStorageItem<Record<string, Recipe>>(STORAGE_GENERATED_RECIPES_KEY, {});
  allGen[recipe.id] = {
    ...recipe,
    userId,
    updatedAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_GENERATED_RECIPES_KEY, allGen);

}

export async function getUserGeneratedRecipes(userId: string): Promise<Recipe[]> {
  const allGen = getStorageItem<Record<string, Recipe>>(STORAGE_GENERATED_RECIPES_KEY, {});
  return Object.values(allGen).filter(r => r.userId === userId);
}

// ---------------- COOKING CHAT HISTORY SERVICES ----------------

export interface StoredCookingChat {
  id: string;
  recipeId: string;
  title: string;
  messages: { role: string; content: string; timestamp?: string }[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_COOKING_CHATS_KEY = 'mealai_local_cooking_chats';

export async function saveCookingChat(
  userId: string,
  chat: { id: string; recipeId: string; title: string; messages: any[] }
): Promise<void> {
  const stored: StoredCookingChat = {
    ...chat,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const allChats = getStorageItem<Record<string, StoredCookingChat>>(STORAGE_COOKING_CHATS_KEY, {});
  allChats[chat.id] = stored;
  setStorageItem(STORAGE_COOKING_CHATS_KEY, allChats);

}

export async function getUserCookingChats(userId: string, recipeId?: string): Promise<StoredCookingChat[]> {
  const allChats = getStorageItem<Record<string, StoredCookingChat>>(STORAGE_COOKING_CHATS_KEY, {});
  const list = Object.values(allChats);
  return recipeId ? list.filter(c => c.recipeId === recipeId) : list;
}

export async function deleteCookingChat(userId: string, chatId: string): Promise<void> {
  const allChats = getStorageItem<Record<string, StoredCookingChat>>(STORAGE_COOKING_CHATS_KEY, {});
  delete allChats[chatId];
  setStorageItem(STORAGE_COOKING_CHATS_KEY, allChats);

}

// ---------------- IMAGE UPLOAD SERVICES ----------------

export async function uploadImageToFirebaseStorage(
  userId: string,
  file: Blob | File,
  filename: string = `upload_${Date.now()}.jpg`
): Promise<string> {
  // Convert file/blob to data URL (local-only)
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export async function getUserRecipes(userId: string): Promise<Recipe[]> {
  const recipes = getStorageItem<Record<string, Recipe>>(STORAGE_RECIPES_KEY, {});
  return Object.values(recipes).filter((r) => r.userId === userId);
}

export async function toggleRecipeFavorite(recipeId: string, isFavorite: boolean): Promise<void> {
  const recipes = getStorageItem<Record<string, Recipe>>(STORAGE_RECIPES_KEY, {});
  if (recipes[recipeId]) {
    recipes[recipeId] = {
      ...recipes[recipeId],
      isFavorite,
      updatedAt: new Date().toISOString(),
    };
    setStorageItem(STORAGE_RECIPES_KEY, recipes);
  }
}

export async function deleteRecipeFromFirestore(recipeId: string): Promise<void> {
  const recipes = getStorageItem<Record<string, Recipe>>(STORAGE_RECIPES_KEY, {});
  delete recipes[recipeId];
  setStorageItem(STORAGE_RECIPES_KEY, recipes);
}

// ---------------- MEAL PLAN SERVICES ----------------

const STORAGE_MEAL_PLANS_KEY = 'mealai_local_meal_plans';

export async function saveMealPlanToFirestore(plan: WeeklyMealPlan): Promise<void> {
  const plans = getStorageItem<Record<string, WeeklyMealPlan>>(STORAGE_MEAL_PLANS_KEY, {});
  plans[plan.id] = {
    ...plan,
    updatedAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_MEAL_PLANS_KEY, plans);
}

export async function getUserMealPlans(userId: string): Promise<WeeklyMealPlan[]> {
  const plans = getStorageItem<Record<string, WeeklyMealPlan>>(STORAGE_MEAL_PLANS_KEY, {});
  return Object.values(plans).filter((p) => p.userId === userId);
}

// ---------------- PANTRY SERVICES ----------------

const STORAGE_PANTRY_KEY = 'mealai_local_pantry';

export async function getUserPantry(userId: string): Promise<PantryItem[]> {
  const allPantry = getStorageItem<Record<string, PantryItem>>(STORAGE_PANTRY_KEY, {});
  return Object.values(allPantry).filter((p) => p.userId === userId || p.userId === 'default');
}

export async function savePantryItem(item: PantryItem): Promise<void> {
  const allPantry = getStorageItem<Record<string, PantryItem>>(STORAGE_PANTRY_KEY, {});
  allPantry[item.id] = item;
  setStorageItem(STORAGE_PANTRY_KEY, allPantry);
}

export async function deletePantryItem(itemId: string): Promise<void> {
  const allPantry = getStorageItem<Record<string, PantryItem>>(STORAGE_PANTRY_KEY, {});
  delete allPantry[itemId];
  setStorageItem(STORAGE_PANTRY_KEY, allPantry);
}

export async function updatePantryItemInFirestore(itemId: string, updates: Partial<PantryItem>): Promise<void> {
  const allPantry = getStorageItem<Record<string, PantryItem>>(STORAGE_PANTRY_KEY, {});
  if (allPantry[itemId]) {
    allPantry[itemId] = { ...allPantry[itemId], ...updates };
    setStorageItem(STORAGE_PANTRY_KEY, allPantry);
  }
}

// ---------------- GROCERY SERVICES ----------------

const STORAGE_GROCERY_KEY = 'mealai_local_grocery';

export async function getUserGroceryItems(userId: string): Promise<GroceryItem[]> {
  const allGrocery = getStorageItem<Record<string, GroceryItem>>(STORAGE_GROCERY_KEY, {});
  return Object.values(allGrocery).filter((g) => g.userId === userId || g.userId === 'default');
}

export async function saveGroceryItem(item: GroceryItem): Promise<void> {
  const allGrocery = getStorageItem<Record<string, GroceryItem>>(STORAGE_GROCERY_KEY, {});
  allGrocery[item.id] = item;
  setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
}

export async function toggleGroceryChecked(itemId: string, checked: boolean): Promise<void> {
  const allGrocery = getStorageItem<Record<string, GroceryItem>>(STORAGE_GROCERY_KEY, {});
  if (allGrocery[itemId]) {
    allGrocery[itemId] = { ...allGrocery[itemId], checked, updatedAt: new Date().toISOString() };
    setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
  }
}

export async function deleteGroceryItem(itemId: string): Promise<void> {
  const allGrocery = getStorageItem<Record<string, GroceryItem>>(STORAGE_GROCERY_KEY, {});
  delete allGrocery[itemId];
  setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
}

export async function updateGroceryItemInFirestore(itemId: string, updates: Partial<GroceryItem>): Promise<void> {
  const allGrocery = getStorageItem<Record<string, GroceryItem>>(STORAGE_GROCERY_KEY, {});
  if (allGrocery[itemId]) {
    allGrocery[itemId] = { ...allGrocery[itemId], ...updates, updatedAt: new Date().toISOString() };
    setStorageItem(STORAGE_GROCERY_KEY, allGrocery);
  }
}

// ---------------- FAVORITES SERVICES ----------------

export interface FavoriteRecord {
  id: string;
  userId: string;
  recipeId: string;
  recipeTitle: string;
  recipeImage?: string;
  createdAt: string;
}

const STORAGE_FAVORITES_KEY = 'mealai_local_favorites';

export async function getUserFavorites(userId: string): Promise<FavoriteRecord[]> {
  const allFavorites = getStorageItem<Record<string, FavoriteRecord>>(STORAGE_FAVORITES_KEY, {});
  return Object.values(allFavorites).filter((f) => f.userId === userId);
}

export async function addFavoriteToFirestore(userId: string, recipe: Recipe): Promise<void> {
  const favId = `${userId}_${recipe.id}`;
  const allFavorites = getStorageItem<Record<string, FavoriteRecord>>(STORAGE_FAVORITES_KEY, {});
  allFavorites[favId] = {
    id: favId,
    userId,
    recipeId: recipe.id,
    recipeTitle: recipe.title,
    recipeImage: recipe.imageUrl,
    createdAt: new Date().toISOString(),
  };
  setStorageItem(STORAGE_FAVORITES_KEY, allFavorites);
}

export async function removeFavoriteFromFirestore(userId: string, recipeId: string): Promise<void> {
  const favId = `${userId}_${recipeId}`;
  const allFavorites = getStorageItem<Record<string, FavoriteRecord>>(STORAGE_FAVORITES_KEY, {});
  delete allFavorites[favId];
  setStorageItem(STORAGE_FAVORITES_KEY, allFavorites);
}

// ---------------- AI USAGE & GENERATION HISTORY ----------------

export interface AIHistoryRecord {
  id: string;
  userId: string;
  prompt: string;
  recipeTitle: string;
  cuisine?: string;
  createdAt: string;
}

const STORAGE_AI_HISTORY_KEY = 'mealai_local_ai_history';

export async function getUserAIHistory(userId: string): Promise<AIHistoryRecord[]> {
  const history = getStorageItem<Record<string, AIHistoryRecord>>(STORAGE_AI_HISTORY_KEY, {});
  return Object.values(history).filter((h) => h.userId === userId);
}

export async function saveAIHistoryRecord(record: AIHistoryRecord): Promise<void> {
  const history = getStorageItem<Record<string, AIHistoryRecord>>(STORAGE_AI_HISTORY_KEY, {});
  history[record.id] = record;
  setStorageItem(STORAGE_AI_HISTORY_KEY, history);
}

// ---------------- RECIPE & INGREDIENT CATALOG SERVICES ----------------

let catalogCache: Recipe[] | null = null;
let catalogLoadingPromise: Promise<Recipe[]> | null = null;
let ingredientsCache: CatalogIngredient[] | null = null;

export async function loadFullCatalog(): Promise<Recipe[]> {
  if (catalogCache) return catalogCache;
  if (!catalogLoadingPromise) {
    catalogLoadingPromise = (async () => {
      try {
        const indianModule = await import('../data/indianRecipes.json');
        const indianRaw = (indianModule.default || indianModule) as Recipe[];
        const normalizedIndian = indianRaw.map((r) => normalizeRecipeData(r));
        catalogCache = [...SEED_RECIPES, ...normalizedIndian];
      } catch (err) {
        console.warn('Could not load Indian recipes dataset:', err);
        catalogCache = [...SEED_RECIPES];
      }
      return catalogCache;
    })();
  }
  return catalogLoadingPromise;
}

export async function getCatalogRecipes(filters?: RecipeFilterOptions): Promise<Recipe[]> {
  const allRecipes = await loadFullCatalog();
  let results = [...allRecipes];

  if (filters) {
    if (filters.query && filters.query.trim()) {
      const qTokens = filters.query.toLowerCase().trim().split(/\s+/);
      results = results.filter((recipe) => {
        const searchable = (recipe.searchableText || `${recipe.title} ${recipe.cuisine} ${recipe.description}`).toLowerCase();
        return qTokens.every((token) => searchable.includes(token));
      });
    }

    if (filters.cuisine && filters.cuisine !== 'All') {
      const target = filters.cuisine.toLowerCase();
      results = results.filter((r) => r.cuisine.toLowerCase() === target);
    }

    if (filters.mealType && filters.mealType !== 'All') {
      const target = filters.mealType.toLowerCase();
      results = results.filter((r) =>
        (r.mealTypes && r.mealTypes.some((m) => m.toLowerCase() === target)) ||
        (r.mealType && r.mealType.toLowerCase() === target)
      );
    }

    if (filters.dietaryTag && filters.dietaryTag !== 'All') {
      const target = filters.dietaryTag.toLowerCase();
      results = results.filter((r) =>
        (r.dietaryTags && r.dietaryTags.some((d) => d.toLowerCase() === target)) ||
        (r.dietary && r.dietary.some((d) => d.toLowerCase() === target))
      );
    }

    if (filters.appliance && filters.appliance !== 'All') {
      const target = filters.appliance.toLowerCase();
      results = results.filter((r) =>
        (r.applianceTags && r.applianceTags.some((a) => a.toLowerCase().includes(target))) ||
        (r.appliances && r.appliances.some((a) => a.toLowerCase().includes(target)))
      );
    }

    if (filters.cookingMethod && filters.cookingMethod !== 'All') {
      const target = filters.cookingMethod.toLowerCase();
      results = results.filter((r) =>
        r.cookingMethods && r.cookingMethods.some((m) => m.toLowerCase().includes(target))
      );
    }

    if (filters.difficulty && filters.difficulty !== 'All') {
      results = results.filter((r) => r.difficulty.toLowerCase() === filters.difficulty?.toLowerCase());
    }

    if (filters.maxTotalTime) {
      results = results.filter((r) => (r.totalTimeMinutes || r.totalTime) <= filters.maxTotalTime!);
    }

    if (filters.maxCalories) {
      results = results.filter((r) => r.calories <= filters.maxCalories!);
    }

    if (filters.minProtein) {
      results = results.filter((r) => (r.proteinGrams || r.protein) >= filters.minProtein!);
    }
  }

  return results;
}

export interface PaginatedResult<T> {
  items: T[];
  lastVisible: any;
  hasMore: boolean;
}

export async function getCatalogRecipesPaginated(
  pageSize: number = 12,
  lastIndex?: number | null
): Promise<PaginatedResult<Recipe>> {
  const allRecipes = await getCatalogRecipes();
  const start = lastIndex ? lastIndex : 0;
  const items = allRecipes.slice(start, start + pageSize);
  const nextIndex = start + items.length;

  return {
    items,
    lastVisible: nextIndex < allRecipes.length ? nextIndex : null,
    hasMore: nextIndex < allRecipes.length,
  };
}

export async function getCatalogRecipeById(recipeId: string): Promise<Recipe | null> {
  const all = await getCatalogRecipes();
  return all.find((r) => r.id === recipeId) || null;
}

export async function getCatalogRecipeBySlug(slug: string): Promise<Recipe | null> {
  const all = await getCatalogRecipes();
  return all.find((r) => r.slug === slug) || null;
}

export async function getCatalogIngredients(): Promise<CatalogIngredient[]> {
  if (!ingredientsCache) {
    ingredientsCache = [...SEED_INGREDIENTS];
  }
  return ingredientsCache;
}

export async function getCatalogTaxonomies(): Promise<{
  cuisines: TaxonomyItem[];
  mealTypes: TaxonomyItem[];
  dietaryTags: TaxonomyItem[];
  appliances: TaxonomyItem[];
}> {
  return {
    cuisines: SEED_CUISINES,
    mealTypes: SEED_MEAL_TYPES,
    dietaryTags: SEED_DIETARY_TAGS,
    appliances: SEED_APPLIANCES,
  };
}

export async function seedCatalogDatabaseIfEmpty(): Promise<{ recipesCount: number; ingredientsCount: number }> {
  const all = await loadFullCatalog();
  ingredientsCache = [...SEED_INGREDIENTS];
  return { recipesCount: all.length, ingredientsCount: SEED_INGREDIENTS.length };
}

export function calculateRecipePantryMatch(
  recipe: Recipe,
  pantryItemNames: string[]
): {
  matchedCount: number;
  missingCount: number;
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
} {
  const pantryNormalized = pantryItemNames.map((p) => p.toLowerCase().trim()).filter(Boolean);
  const matched: string[] = [];
  const missing: string[] = [];

  recipe.ingredients.forEach((ing) => {
    const ingName = ing.name.toLowerCase();
    const isFound = pantryNormalized.some((p) => ingName.includes(p) || p.includes(ingName));
    if (isFound) {
      matched.push(ing.name);
    } else {
      missing.push(ing.name);
    }
  });

  const total = recipe.ingredients.length || 1;
  const matchPercentage = Math.round((matched.length / total) * 100);

  return {
    matchedCount: matched.length,
    missingCount: missing.length,
    matchPercentage,
    matchedIngredients: matched,
    missingIngredients: missing,
  };
}

export async function uploadRecipeOrUserImage(
  _storagePath: string,
  file: Blob | Uint8Array | ArrayBuffer,
  _contentType?: string
): Promise<string> {
  if (file instanceof Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  return '';
}
