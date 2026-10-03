import { Recipe, GenerateRecipeRequest, WeeklyMealPlan, GeneratePlanRequest, normalizeRecipeData } from '../../src/types/index.ts';
import { selectImageForRecipe } from './image.service.ts';

export class FallbackService {
  public static generateFallbackRecipe(input: GenerateRecipeRequest, userId: string = 'guest_user'): Recipe {
    const mainIng = input.ingredients[0] || 'Herb Garden Vegetables';
    const cuisine = input.cuisine && input.cuisine !== 'Any' ? input.cuisine : 'Mediterranean';
    const mealType = input.mealType || 'dinner';
    const title = `${cuisine} Style ${mainIng} Skillet`;

    const prep = 10;
    const cook = Math.min(input.maxCookingTime - prep, 20);
    const recipeId = 'rec_fb_' + Math.random().toString(36).substring(2, 10);
    const imageUrl = selectImageForRecipe(title, cuisine, mealType, input.ingredients);

    return normalizeRecipeData({
      id: recipeId,
      userId,
      title,
      description: `A fragrant, golden ${cuisine.toLowerCase()} skillet dish featuring tender ${mainIng.toLowerCase()} simmered with aromatic garlic, olive oil, and herbs.`,
      cuisine,
      mealType,
      dietary: input.diet && input.diet !== 'No preference' ? [input.diet] : ['High-Protein', 'Balanced'],
      prepTime: prep,
      cookTime: cook,
      totalTime: prep + cook,
      servings: input.householdSize || 2,
      calories: input.calories || 480,
      protein: input.protein || 34,
      carbs: 38,
      fat: 16,
      fiber: 6,
      difficulty: input.difficulty || 'easy',
      appliances: input.appliances.length ? input.appliances : ['Stovetop'],
      ingredients: [
        {
          name: mainIng,
          amount: '400',
          unit: 'g',
          category: 'Produce',
          note: 'freshly prepared',
        },
        ...input.ingredients.slice(1).map(ing => ({
          name: ing,
          amount: '1',
          unit: 'cup',
          category: 'Produce',
          note: 'chopped',
        })),
        {
          name: 'Extra Virgin Olive Oil',
          amount: '2',
          unit: 'tbsp',
          category: 'Pantry',
          note: 'for searing',
        },
        {
          name: 'Garlic',
          amount: '3',
          unit: 'cloves',
          category: 'Produce',
          note: 'minced',
        },
        {
          name: 'Sea Salt & Cracked Black Pepper',
          amount: '1/2',
          unit: 'tsp',
          category: 'Pantry',
          note: 'to taste',
        },
      ],
      instructions: [
        {
          step: 1,
          title: 'Prep Ingredients',
          instruction: `Rinse and dice ${mainIng} into uniform pieces. Mince garlic and gather spices.`,
          timerMinutes: null,
          tip: 'Uniform cuts ensure even cooking throughout.',
        },
        {
          step: 2,
          title: 'Sear & Sauté',
          instruction: `Heat olive oil in a heavy skillet over medium-high heat. Add garlic and ${mainIng}, stirring for 6-8 minutes until golden and fragrant.`,
          timerMinutes: 8,
          tip: 'Listen for a gentle sizzle to know the pan is at proper temperature.',
        },
        {
          step: 3,
          title: 'Simmer and Finish',
          instruction: 'Lower heat to medium-low, season generously with salt and pepper, and finish with a squeeze of fresh lemon juice or herbs.',
          timerMinutes: 5,
          tip: 'Let rest for 2 minutes before serving.',
        },
      ],
      tips: [
        'Serve with warm crusty bread, steamed grains, or a fresh side salad.',
        'Store leftovers in an airtight container for up to 3 days.',
      ],
      imageUrl,
      isFavorite: false,
      source: 'ai_generated',
      matchedPantryCount: input.ingredients.length,
      missingIngredientsCount: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  public static generateFallbackMealPlan(input: GeneratePlanRequest, userId: string = 'guest_user'): WeeklyMealPlan {
    const planId = 'plan_fb_' + Math.random().toString(36).substring(2, 10);
    const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const days: Record<string, any> = {};

    dayNames.forEach((day, index) => {
      const capDay = day.charAt(0).toUpperCase() + day.slice(1);
      const bCals = 380;
      const lCals = 520;
      const dCals = 610;
      const sCals = 190;

      days[day] = {
        dayOfWeek: capDay,
        date: input.weekStartDate,
        breakfast: {
          title: `Artisanal Morning Scramble & Avocado Toast (${capDay})`,
          description: 'Fluffy organic eggs with avocado on toasted sourdough.',
          calories: bCals,
          protein: 24,
          timeMinutes: 10,
          mealType: 'breakfast',
          cuisine: 'American',
          ingredientsSummary: ['Eggs', 'Sourdough bread', 'Avocado', 'Olive oil'],
          imageUrl: selectImageForRecipe('Eggs breakfast', 'American', 'breakfast', []),
        },
        lunch: {
          title: `Mediterranean Harvest Grain Bowl (${capDay})`,
          description: 'Quinoa with roasted vegetables, chickpeas, and lemon tahini drizzle.',
          calories: lCals,
          protein: 28,
          timeMinutes: 15,
          mealType: 'lunch',
          cuisine: 'Mediterranean',
          ingredientsSummary: ['Quinoa', 'Chickpeas', 'Cucumber', 'Tahini', 'Lemon'],
          imageUrl: selectImageForRecipe('Mediterranean bowl', 'Mediterranean', 'lunch', []),
        },
        dinner: {
          title: `Pan-Seared Lemon Herb Salmon with Greens (${capDay})`,
          description: 'Golden seared salmon over sautéed garlic greens and roasted potatoes.',
          calories: dCals,
          protein: 42,
          timeMinutes: 25,
          mealType: 'dinner',
          cuisine: 'Mediterranean',
          ingredientsSummary: ['Salmon', 'Baby potatoes', 'Asparagus', 'Garlic', 'Lemon'],
          imageUrl: selectImageForRecipe('Salmon dinner', 'Mediterranean', 'dinner', []),
        },
        snack: {
          title: 'Greek Yogurt with Toasted Almonds & Honey',
          description: 'Creamy high-protein snack with gentle sweetness.',
          calories: sCals,
          protein: 15,
          timeMinutes: 2,
          mealType: 'snack',
          cuisine: 'Greek',
          ingredientsSummary: ['Greek yogurt', 'Almonds', 'Honey'],
          imageUrl: selectImageForRecipe('Yogurt snack', 'American', 'snack', []),
        },
        totalCalories: bCals + lCals + dCals + sCals,
        totalProtein: 24 + 28 + 42 + 15,
      };
    });

    return {
      id: planId,
      userId,
      title: '7-Day Balanced Culinary Plan',
      weekStartDate: input.weekStartDate,
      days,
      targetCalories: input.calorieGoal || 2000,
      targetProtein: input.proteinGoal || 90,
      dietaryTags: input.dietaryPreferences || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}
