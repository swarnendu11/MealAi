'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext.tsx';
import {
  Recipe,
  WeeklyMealPlan,
  PantryItem,
  GroceryItem,
  PlannedMealItem,
  CatalogIngredient,
  TaxonomyItem,
  RecipeFilterOptions,
  normalizeRecipeData,
} from '../types/index.ts';
import {
  saveRecipeToFirestore,
  getUserRecipes,
  toggleRecipeFavorite,
  deleteRecipeFromFirestore,
  saveMealPlanToFirestore,
  getUserMealPlans,
  getUserPantry,
  savePantryItem,
  deletePantryItem as fbDeletePantry,
  updatePantryItemInFirestore,
  getUserGroceryItems,
  saveGroceryItem,
  toggleGroceryChecked,
  deleteGroceryItem as fbDeleteGrocery,
  updateGroceryItemInFirestore,
  getCatalogRecipes,
  getCatalogIngredients,
  getCatalogTaxonomies,
  seedCatalogDatabaseIfEmpty,
  calculateRecipePantryMatch,
} from '../lib/db.ts';
import { getAuthHeaders } from '../lib/api.ts';

// Initial starter pantry items for new users/guests
const DEFAULT_PANTRY: PantryItem[] = [
  { id: 'p_1', userId: 'default', name: 'Olive Oil', category: 'Pantry Staples', quantity: '500ml', unit: 'ml' },
  { id: 'p_2', userId: 'default', name: 'Garlic', category: 'Produce', quantity: '1 bulb', unit: 'head' },
  { id: 'p_3', userId: 'default', name: 'Basmati Rice', category: 'Grains & Pasta', quantity: '1 kg', unit: 'kg' },
  { id: 'p_4', userId: 'default', name: 'Eggs', category: 'Dairy & Eggs', quantity: '6', unit: 'count' },
  { id: 'p_5', userId: 'default', name: 'Chicken Breast', category: 'Meat & Seafood', quantity: '2 portions', unit: 'portions' },
  { id: 'p_6', userId: 'default', name: 'Tomatoes', category: 'Produce', quantity: '4', unit: 'count' },
  { id: 'p_7', userId: 'default', name: 'Red Onion', category: 'Produce', quantity: '2', unit: 'count' },
  { id: 'p_8', userId: 'default', name: 'Soy Sauce', category: 'Condiments', quantity: '250ml', unit: 'ml' },
];

// Initial featured sample recipes
const RAW_FEATURED_RECIPES: Partial<Recipe>[] = [
  {
    id: 'rec_crispy_airfryer_chicken',
    userId: 'default',
    title: 'Crispy Garlic Herb Air-Fryer Chicken Bites',
    description: 'Tender chicken breast tossed in smoked paprika, garlic, and fresh herbs, air-fried to golden crispy perfection with vibrant roasted tomatoes and basmati rice.',
    cuisine: 'American',
    mealType: 'dinner',
    dietary: ['High-Protein', 'Gluten-Free', 'Quick'],
    prepTime: 10,
    cookTime: 12,
    totalTime: 22,
    servings: 2,
    calories: 460,
    protein: 42,
    carbs: 28,
    fat: 16,
    fiber: 4,
    difficulty: 'easy',
    appliances: ['Air Fryer'],
    ingredients: [
      { name: 'Chicken Breast', amount: '2', unit: 'breasts (400g)', category: 'Meat & Seafood', note: 'cubed' },
      { name: 'Garlic', amount: '3', unit: 'cloves', category: 'Produce', note: 'minced' },
      { name: 'Olive Oil', amount: '1', unit: 'tbsp', category: 'Pantry Staples' },
      { name: 'Cherry Tomatoes', amount: '1', unit: 'cup', category: 'Produce' },
      { name: 'Smoked Paprika', amount: '1', unit: 'tsp', category: 'Spices' },
      { name: 'Basmati Rice', amount: '1', unit: 'cup cooked', category: 'Grains & Pasta' },
    ],
    instructions: [
      { step: 1, title: 'Season Chicken', instruction: 'Toss diced chicken bites with olive oil, minced garlic, smoked paprika, salt, and freshly cracked black pepper.', timerMinutes: null, tip: 'Dry chicken with paper towel first.' },
      { step: 2, title: 'Air Fry', instruction: 'Preheat air fryer to 390°F (200°C). Place chicken bites in a single layer and cook for 12 minutes, shaking basket at minute 6.', timerMinutes: 12, tip: 'Add cherry tomatoes for the last 4 minutes.' },
      { step: 3, title: 'Plate & Garnish', instruction: 'Serve warm over steamed basmati rice with a squeeze of fresh lemon juice.', timerMinutes: null },
    ],
    tips: ['Works great with chicken thighs too for extra juiciness.', 'Great for meal prep lunches.'],
    imageUrl: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
    isFavorite: true,
    source: 'chef_pick',
    matchedPantryCount: 5,
    missingIngredientsCount: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec_shakshuka_eggs',
    userId: 'default',
    title: 'Silky Mediterranean Shakshuka',
    description: 'Gently poached organic eggs simmered in a spiced tomato, sweet pepper, and garlic reduction with crumbles of tangy feta and warm crusty bread.',
    cuisine: 'Mediterranean',
    mealType: 'breakfast',
    dietary: ['Vegetarian', 'High-Protein'],
    prepTime: 8,
    cookTime: 16,
    totalTime: 24,
    servings: 2,
    calories: 380,
    protein: 21,
    carbs: 26,
    fat: 20,
    fiber: 6,
    difficulty: 'easy',
    appliances: ['Stovetop'],
    ingredients: [
      { name: 'Eggs', amount: '4', unit: 'large', category: 'Dairy & Eggs' },
      { name: 'Tomatoes', amount: '4', unit: 'ripe', category: 'Produce', note: 'crushed' },
      { name: 'Red Onion', amount: '1', unit: 'medium', category: 'Produce', note: 'diced' },
      { name: 'Garlic', amount: '3', unit: 'cloves', category: 'Produce', note: 'sliced' },
      { name: 'Olive Oil', amount: '2', unit: 'tbsp', category: 'Pantry Staples' },
      { name: 'Ground Cumin & Paprika', amount: '1', unit: 'tsp each', category: 'Spices' },
    ],
    instructions: [
      { step: 1, title: 'Sauté Aromatics', instruction: 'Heat olive oil in a skillet over medium heat. Sauté onion and garlic until translucent and fragrant.', timerMinutes: 4 },
      { step: 2, title: 'Simmer Tomato Sauce', instruction: 'Add crushed tomatoes, cumin, and paprika. Simmer gently until thickened.', timerMinutes: 6 },
      { step: 3, title: 'Poach Eggs', instruction: 'Make 4 wells in the sauce. Crack an egg into each well. Cover skillet and cook until whites are set and yolks are still runny.', timerMinutes: 6, tip: 'Keep lid tightly closed to trap steam.' },
    ],
    tips: ['Garnish with fresh cilantro or parsley.', 'Serve straight from skillet.'],
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    isFavorite: false,
    source: 'chef_pick',
    matchedPantryCount: 5,
    missingIngredientsCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rec_asian_garlic_noodles',
    userId: 'default',
    title: '15-Minute Butter Garlic Scallion Noodles',
    description: 'Springy noodles tossed in browned garlic butter, dark soy reduction, chili crisp, and a shower of toasted sesame seeds.',
    cuisine: 'Asian',
    mealType: 'lunch',
    dietary: ['Vegetarian', 'Quick'],
    prepTime: 5,
    cookTime: 10,
    totalTime: 15,
    servings: 2,
    calories: 420,
    protein: 14,
    carbs: 58,
    fat: 16,
    fiber: 3,
    difficulty: 'beginner',
    appliances: ['Stovetop'],
    ingredients: [
      { name: 'Noodles or Pasta', amount: '200', unit: 'g', category: 'Grains & Pasta' },
      { name: 'Garlic', amount: '6', unit: 'cloves', category: 'Produce', note: 'finely minced' },
      { name: 'Butter', amount: '2', unit: 'tbsp', category: 'Dairy & Eggs' },
      { name: 'Soy Sauce', amount: '2', unit: 'tbsp', category: 'Condiments' },
      { name: 'Scallions / Green Onions', amount: '3', unit: 'stalks', category: 'Produce' },
    ],
    instructions: [
      { step: 1, title: 'Boil Noodles', instruction: 'Cook noodles in salted boiling water until al dente. Reserve 1/4 cup pasta water and drain.', timerMinutes: 6 },
      { step: 2, title: 'Brown Garlic', instruction: 'In a wok or skillet, melt butter over medium-low heat. Add garlic and cook gently until fragrant and light golden.', timerMinutes: 3 },
      { step: 3, title: 'Toss & Emulsify', instruction: 'Stir in soy sauce, reserved water, and cooked noodles. Toss vigorously for 1 minute until glazed.', timerMinutes: 1 },
    ],
    tips: ['Add a fried egg or shredded chicken on top for extra protein.'],
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    isFavorite: true,
    source: 'chef_pick',
    matchedPantryCount: 3,
    missingIngredientsCount: 2,
    createdAt: new Date().toISOString(),
  },
];

const FEATURED_RECIPES: Recipe[] = RAW_FEATURED_RECIPES.map(r => normalizeRecipeData(r));

interface MealContextType {
  recipes: Recipe[];
  catalogRecipes: Recipe[];
  catalogIngredients: CatalogIngredient[];
  catalogTaxonomies: {
    cuisines: TaxonomyItem[];
    mealTypes: TaxonomyItem[];
    dietaryTags: TaxonomyItem[];
    appliances: TaxonomyItem[];
  };
  isSeeding: boolean;
  favorites: Recipe[];
  pantry: PantryItem[];
  groceryList: GroceryItem[];
  currentPlan: WeeklyMealPlan | null;
  activeCookingRecipe: Recipe | null;
  activeCookingStep: number;
  loadingData: boolean;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  deleteRecipe: (recipeId: string) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  addPantryItem: (item: Omit<PantryItem, 'id' | 'userId'>) => Promise<void>;
  updatePantryItem: (id: string, updates: Partial<PantryItem>) => Promise<void>;
  removePantryItem: (id: string) => Promise<void>;
  addGroceryItem: (item: Omit<GroceryItem, 'id' | 'userId'>) => Promise<void>;
  updateGroceryItem: (id: string, updates: Partial<GroceryItem>) => Promise<void>;
  toggleGroceryItem: (id: string) => Promise<void>;
  removeGroceryItem: (id: string) => Promise<void>;
  clearCheckedGroceryItems: () => Promise<void>;
  addRecipeIngredientsToGrocery: (recipe: Recipe) => Promise<number>;
  addWeekToGroceryList: (plan: WeeklyMealPlan) => Promise<number>;
  setCurrentPlan: (plan: WeeklyMealPlan) => Promise<void>;
  replaceMeal: (dayKey: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', meal: PlannedMealItem) => Promise<void>;
  removeMeal: (dayKey: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => Promise<void>;
  regenerateSingleMeal: (dayKey: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', currentMealTitle?: string) => Promise<PlannedMealItem>;
  startCooking: (recipe: Recipe, startStep?: number) => void;
  nextCookingStep: () => void;
  prevCookingStep: () => void;
  goToCookingStep: (step: number) => void;
  closeCooking: () => void;
  searchCatalog: (filters?: RecipeFilterOptions) => Promise<Recipe[]>;
  seedCatalog: () => Promise<void>;
  addToMealPlan: (dayKey: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe) => Promise<void>;
  calculatePantryMatch: (recipe: Recipe) => {
    matchPercentage: number;
    matchedIngredients: string[];
    missingIngredients: string[];
    matchedCount: number;
    missingCount: number;
  };
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>(FEATURED_RECIPES);
  const [pantry, setPantry] = useState<PantryItem[]>(DEFAULT_PANTRY);
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [currentPlan, setCurrentPlanState] = useState<WeeklyMealPlan | null>(null);
  const [activeCookingRecipe, setActiveCookingRecipe] = useState<Recipe | null>(null);
  const [activeCookingStep, setActiveCookingStep] = useState<number>(1);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  // Large Catalog & Taxonomy State
  const [catalogRecipes, setCatalogRecipes] = useState<Recipe[]>([]);
  const [catalogIngredients, setCatalogIngredients] = useState<CatalogIngredient[]>([]);
  const [catalogTaxonomies, setCatalogTaxonomies] = useState<{
    cuisines: TaxonomyItem[];
    mealTypes: TaxonomyItem[];
    dietaryTags: TaxonomyItem[];
    appliances: TaxonomyItem[];
  }>({ cuisines: [], mealTypes: [], dietaryTags: [], appliances: [] });
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Load catalog on boot
  useEffect(() => {
    let active = true;
    async function loadCatalog() {
      try {
        const [recs, ings, tax] = await Promise.all([
          getCatalogRecipes(),
          getCatalogIngredients(),
          getCatalogTaxonomies(),
        ]);
        if (active) {
          setCatalogRecipes(recs);
          setCatalogIngredients(ings);
          setCatalogTaxonomies(tax);
        }
      } catch (err) {
        console.warn('Error loading catalog data:', err);
      }
    }
    loadCatalog();
    return () => {
      active = false;
    };
  }, []);

  // Sync data when user logs in or changes
  useEffect(() => {
    let isMounted = true;
    const loadUserData = async () => {
      if (user) {
        setLoadingData(true);
        try {
          const [userRecs, userPantryItems, userGroceries, userPlans] = await Promise.all([
            getUserRecipes(user.uid).catch(() => []),
            getUserPantry(user.uid).catch(() => []),
            getUserGroceryItems(user.uid).catch(() => []),
            getUserMealPlans(user.uid).catch(() => []),
          ]);

          if (isMounted) {
            setRecipes([...FEATURED_RECIPES, ...userRecs]);
            if (userPantryItems && userPantryItems.length > 0) {
              setPantry(userPantryItems);
            } else {
              // Seed default pantry for user if empty
              const seeded = DEFAULT_PANTRY.map(item => ({ ...item, userId: user.uid }));
              setPantry(seeded);
              seeded.forEach(it => savePantryItem(it).catch(() => {}));
            }
            setGroceryList(userGroceries || []);
            if (userPlans && userPlans.length > 0) {
              setCurrentPlanState(userPlans[0]);
            }
          }
        } catch (e) {
          console.error('Error loading user data:', e);
        } finally {
          if (isMounted) setLoadingData(false);
        }
      } else {
        // Load from local storage for guest
        const localRecs = localStorage.getItem('mealai_saved_recipes');
        if (localRecs) {
          try {
            setRecipes([...FEATURED_RECIPES, ...JSON.parse(localRecs)]);
          } catch {}
        }
        const localPantry = localStorage.getItem('mealai_pantry');
        if (localPantry) {
          try {
            setPantry(JSON.parse(localPantry));
          } catch {}
        }
        const localGroceries = localStorage.getItem('mealai_grocery');
        if (localGroceries) {
          try {
            setGroceryList(JSON.parse(localGroceries));
          } catch {}
        }
        const localPlan = localStorage.getItem('mealai_current_plan');
        if (localPlan) {
          try {
            setCurrentPlanState(JSON.parse(localPlan));
          } catch {}
        }
      }
    };

    loadUserData();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Recipe actions
  const saveRecipe = async (recipe: Recipe) => {
    const updated = [recipe, ...recipes.filter(r => r.id !== recipe.id)];
    setRecipes(updated);

    if (user) {
      await saveRecipeToFirestore({ ...recipe, userId: user.uid });
    } else {
      localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter(r => r.source !== 'chef_pick')));
    }
  };

  const deleteRecipe = async (recipeId: string) => {
    const updated = recipes.filter(r => r.id !== recipeId);
    setRecipes(updated);
    if (user) {
      await deleteRecipeFromFirestore(recipeId);
    } else {
      localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter(r => r.source !== 'chef_pick')));
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    const newFav = !recipe.isFavorite;
    const updated = recipes.map(r => (r.id === recipeId ? { ...r, isFavorite: newFav } : r));
    setRecipes(updated);

    if (user) {
      await toggleRecipeFavorite(recipeId, newFav);
    } else {
      localStorage.setItem('mealai_saved_recipes', JSON.stringify(updated.filter(r => r.source !== 'chef_pick')));
    }
  };

  // Pantry actions
  const addPantryItem = async (itemData: Omit<PantryItem, 'id' | 'userId'>) => {
    const newItem: PantryItem = {
      ...itemData,
      id: 'pantry_' + Math.random().toString(36).substring(2, 9),
      userId: user ? user.uid : 'guest_user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newItem, ...pantry];
    setPantry(updated);

    if (user) {
      await savePantryItem(newItem);
    } else {
      localStorage.setItem('mealai_pantry', JSON.stringify(updated));
    }
  };

  const removePantryItem = async (id: string) => {
    const updated = pantry.filter(p => p.id !== id);
    setPantry(updated);

    if (user) {
      await fbDeletePantry(id);
    } else {
      localStorage.setItem('mealai_pantry', JSON.stringify(updated));
    }
  };

  const updatePantryItem = async (id: string, updates: Partial<PantryItem>) => {
    const updated = pantry.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p));
    setPantry(updated);
    if (user) {
      await updatePantryItemInFirestore(id, updates);
    } else {
      localStorage.setItem('mealai_pantry', JSON.stringify(updated));
    }
  };

  // Grocery actions
  const addGroceryItem = async (itemData: Omit<GroceryItem, 'id' | 'userId'>) => {
    const newItem: GroceryItem = {
      ...itemData,
      id: 'groc_' + Math.random().toString(36).substring(2, 9),
      userId: user ? user.uid : 'guest_user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newItem, ...groceryList];
    setGroceryList(updated);

    if (user) {
      await saveGroceryItem(newItem);
    } else {
      localStorage.setItem('mealai_grocery', JSON.stringify(updated));
    }
  };

  const updateGroceryItem = async (id: string, updates: Partial<GroceryItem>) => {
    const updated = groceryList.map(g => (g.id === id ? { ...g, ...updates, updatedAt: new Date().toISOString() } : g));
    setGroceryList(updated);
    if (user) {
      await updateGroceryItemInFirestore(id, updates);
    } else {
      localStorage.setItem('mealai_grocery', JSON.stringify(updated));
    }
  };

  const toggleGroceryItem = async (id: string) => {
    const item = groceryList.find(g => g.id === id);
    if (!item) return;
    const newChecked = !item.checked;
    const updated = groceryList.map(g => (g.id === id ? { ...g, checked: newChecked } : g));
    setGroceryList(updated);

    if (user) {
      await toggleGroceryChecked(id, newChecked);
    } else {
      localStorage.setItem('mealai_grocery', JSON.stringify(updated));
    }
  };

  const removeGroceryItem = async (id: string) => {
    const updated = groceryList.filter(g => g.id !== id);
    setGroceryList(updated);

    if (user) {
      await fbDeleteGrocery(id);
    } else {
      localStorage.setItem('mealai_grocery', JSON.stringify(updated));
    }
  };

  const clearCheckedGroceryItems = async () => {
    const toDelete = groceryList.filter(g => g.checked);
    const updated = groceryList.filter(g => !g.checked);
    setGroceryList(updated);

    if (user) {
      for (const item of toDelete) {
        await fbDeleteGrocery(item.id);
      }
    } else {
      localStorage.setItem('mealai_grocery', JSON.stringify(updated));
    }
  };

  const addRecipeIngredientsToGrocery = async (recipe: Recipe): Promise<number> => {
    const pantryNames = pantry.map(p => p.name.toLowerCase());
    let addedCount = 0;

    for (const ing of recipe.ingredients) {
      const isAlreadyInPantry = pantryNames.some(p => p.includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(p));
      if (!isAlreadyInPantry) {
        await addGroceryItem({
          name: ing.name,
          quantity: `${ing.amount} ${ing.unit || ''}`.trim(),
          category: ing.category || 'Produce',
          checked: false,
          recipeTitle: recipe.title,
        });
        addedCount++;
      }
    }
    return addedCount;
  };

  const addWeekToGroceryList = async (plan: WeeklyMealPlan): Promise<number> => {
    const rawList: string[] = [];
    const days = plan.days || {};

    Object.keys(days).forEach(dayKey => {
      const day = days[dayKey];
      ['breakfast', 'lunch', 'dinner', 'snack'].forEach(slot => {
        const meal = (day as any)[slot];
        if (meal && Array.isArray(meal.ingredientsSummary)) {
          meal.ingredientsSummary.forEach((ing: string) => {
            rawList.push(`${ing} (for ${day.dayOfWeek} ${slot}: ${meal.title})`);
          });
        }
      });
    });

    if (rawList.length === 0) return 0;

    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch('/api/ai/consolidate-groceries', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          rawIngredients: rawList,
          pantryItems: pantry.map(p => p.name),
        }),
      });
      const data = await res.json();

      let itemsToInsert = [];
      if (data.success && Array.isArray(data.items) && data.items.length > 0) {
        itemsToInsert = data.items;
      } else {
        // Fallback deduplication
        const unique = Array.from(new Set(rawList.map(r => r.split(' (for')[0].trim())));
        itemsToInsert = unique.map(name => ({
          name,
          quantity: '1 batch',
          category: 'Produce',
        }));
      }

      let added = 0;
      for (const item of itemsToInsert) {
        await addGroceryItem({
          name: item.name,
          quantity: item.quantity || '1',
          category: item.category || 'Produce',
          checked: false,
          recipeTitle: '7-Day Meal Plan',
        });
        added++;
      }
      return added;
    } catch (e) {
      console.error('Consolidate error:', e);
      return 0;
    }
  };

  const setCurrentPlan = async (plan: WeeklyMealPlan) => {
    setCurrentPlanState(plan);
    if (user) {
      await saveMealPlanToFirestore({ ...plan, userId: user.uid });
    } else {
      localStorage.setItem('mealai_current_plan', JSON.stringify(plan));
    }
  };

  const replaceMeal = async (
    dayKey: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    meal: PlannedMealItem
  ) => {
    if (!currentPlan) return;
    const days = { ...currentPlan.days };
    const day = { ...days[dayKey] };
    day[mealType] = meal;
    day.totalCalories = (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.dinner?.calories || 0) + (day.snack?.calories || 0);
    day.totalProtein = (day.breakfast?.protein || 0) + (day.lunch?.protein || 0) + (day.dinner?.protein || 0) + (day.snack?.protein || 0);
    days[dayKey] = day;

    const newPlan: WeeklyMealPlan = {
      ...currentPlan,
      days,
      updatedAt: new Date().toISOString(),
    };
    await setCurrentPlan(newPlan);
  };

  const removeMeal = async (
    dayKey: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  ) => {
    if (!currentPlan) return;
    const days = { ...currentPlan.days };
    const day = { ...days[dayKey] };
    delete day[mealType];
    day.totalCalories = (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.dinner?.calories || 0) + (day.snack?.calories || 0);
    day.totalProtein = (day.breakfast?.protein || 0) + (day.lunch?.protein || 0) + (day.dinner?.protein || 0) + (day.snack?.protein || 0);
    days[dayKey] = day;

    const newPlan: WeeklyMealPlan = {
      ...currentPlan,
      days,
      updatedAt: new Date().toISOString(),
    };
    await setCurrentPlan(newPlan);
  };

  const regenerateSingleMeal = async (
    dayKey: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    currentMealTitle?: string
  ): Promise<PlannedMealItem> => {
    const authHeaders = await getAuthHeaders();
    const res = await fetch('/api/ai/regenerate-meal', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        mealType,
        dayOfWeek: currentPlan?.days?.[dayKey]?.dayOfWeek || dayKey,
        currentTitle: currentMealTitle,
        dietaryPreferences: currentPlan?.dietaryTags || [],
        pantryItems: pantry.map(p => p.name),
        calorieGoal: currentPlan?.targetCalories,
        proteinGoal: currentPlan?.targetProtein,
      }),
    });
    const data = await res.json();
    if (!data.success || !data.meal) {
      throw new Error(data.error || 'Failed to regenerate meal');
    }
    await replaceMeal(dayKey, mealType, data.meal);
    return data.meal;
  };

  // Step-by-Step Cooking Mode
  const startCooking = (recipe: Recipe, startStep = 1) => {
    setActiveCookingRecipe(recipe);
    setActiveCookingStep(startStep);
  };

  const nextCookingStep = () => {
    if (!activeCookingRecipe) return;
    if (activeCookingStep < activeCookingRecipe.instructions.length) {
      setActiveCookingStep(prev => prev + 1);
    }
  };

  const prevCookingStep = () => {
    if (activeCookingStep > 1) {
      setActiveCookingStep(prev => prev - 1);
    }
  };

  const goToCookingStep = (step: number) => {
    if (!activeCookingRecipe) return;
    if (step >= 1 && step <= activeCookingRecipe.instructions.length) {
      setActiveCookingStep(step);
    }
  };

  const closeCooking = () => {
    setActiveCookingRecipe(null);
  };

  // Search & Filter Catalog
  const searchCatalog = async (filters?: RecipeFilterOptions): Promise<Recipe[]> => {
    const results = await getCatalogRecipes(filters);
    return results;
  };

  // Seed / Sync Catalog Database
  const seedCatalog = async (): Promise<void> => {
    setIsSeeding(true);
    try {
      await seedCatalogDatabaseIfEmpty();
      const [recs, ings, tax] = await Promise.all([
        getCatalogRecipes(),
        getCatalogIngredients(),
        getCatalogTaxonomies(),
      ]);
      setCatalogRecipes(recs);
      setCatalogIngredients(ings);
      setCatalogTaxonomies(tax);
    } finally {
      setIsSeeding(false);
    }
  };

  // Calculate Pantry Match for any recipe
  const calculatePantryMatch = (recipe: Recipe) => {
    const pantryNames = pantry.map(p => p.name);
    return calculateRecipePantryMatch(recipe, pantryNames);
  };

  // Direct "Add to Meal Plan" from Catalog or Detail view
  const addToMealPlan = async (
    dayKey: string,
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack',
    recipe: Recipe
  ) => {
    const plannedMeal: PlannedMealItem = {
      recipeId: recipe.id,
      title: recipe.title,
      description: recipe.description,
      calories: recipe.calories,
      protein: recipe.proteinGrams || recipe.protein,
      timeMinutes: recipe.totalTimeMinutes || recipe.totalTime,
      mealType: (mealType === 'snack' ? 'snack' : (recipe.mealType || 'dinner')) as any,
      cuisine: recipe.cuisine,
      imageUrl: recipe.imageUrl,
      ingredientsSummary: recipe.ingredients.map(i => i.name),
    };
    await replaceMeal(dayKey, mealType, plannedMeal);
  };

  const favorites = recipes.filter(r => r.isFavorite);

  return (
    <MealContext.Provider
      value={{
        recipes,
        catalogRecipes,
        catalogIngredients,
        catalogTaxonomies,
        isSeeding,
        favorites,
        pantry,
        groceryList,
        currentPlan,
        activeCookingRecipe,
        activeCookingStep,
        loadingData,
        saveRecipe,
        deleteRecipe,
        toggleFavorite,
        addPantryItem,
        updatePantryItem,
        removePantryItem,
        addGroceryItem,
        updateGroceryItem,
        toggleGroceryItem,
        removeGroceryItem,
        clearCheckedGroceryItems,
        addRecipeIngredientsToGrocery,
        addWeekToGroceryList,
        setCurrentPlan,
        replaceMeal,
        removeMeal,
        regenerateSingleMeal,
        startCooking,
        nextCookingStep,
        prevCookingStep,
        goToCookingStep,
        closeCooking,
        searchCatalog,
        seedCatalog,
        addToMealPlan,
        calculatePantryMatch,
      }}
    >
      {children}
    </MealContext.Provider>
  );
};

export const useMeal = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeal must be used within a MealProvider');
  }
  return context;
};
