import { z } from 'zod';
import { ai, GEMINI_MODEL, logAIUsage, AIUsageRecord } from './gemini.ts';
import { WeeklyMealPlan, DayPlan, PlannedMealItem, WeeklyMealPlanSchema } from '../../types/index.ts';

export interface MealPlanGenerationParams {
  dietaryPreferences?: string[];
  allergies?: string[];
  favoriteCuisines?: string[];
  calorieGoal?: number;
  proteinGoal?: number;
  householdSize?: number;
  skillLevel?: string;
  appliances?: string[];
  dailyBudget?: number;
  pantryItems?: string[];
  weekStartDate: string;
  userId?: string;
  generationId?: string;
}

export interface MealPlanStreamUpdate {
  stage: 'starting' | 'generating_days' | 'validating' | 'ready';
  currentDay?: string;
  completedDays: string[];
  planPartial?: Partial<WeeklyMealPlan>;
  planComplete?: WeeklyMealPlan;
  error?: string;
}

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

export async function streamMealPlanGeneration(
  params: MealPlanGenerationParams,
  onEvent: (event: MealPlanStreamUpdate) => void,
  abortSignal?: AbortSignal
): Promise<WeeklyMealPlan> {
  const startTime = Date.now();
  const generationId = params.generationId || `plan_gen_${Math.random().toString(36).substring(2, 9)}`;

  const usageRecord: AIUsageRecord = {
    id: generationId,
    userId: params.userId || 'guest_user',
    type: 'meal-plan',
    createdAt: new Date().toISOString(),
    status: 'started',
    model: GEMINI_MODEL,
  };
  logAIUsage(usageRecord);

  const completedDays: string[] = [];

  onEvent({
    stage: 'starting',
    completedDays: [],
  });

  const prompt = `
You are MealAI's master nutrition architect.
Create a cohesive, varied 7-day weekly meal plan satisfying these user parameters:
- Dietary Preferences: ${(params.dietaryPreferences || []).join(', ') || 'None'}
- Allergies / Dislikes: ${(params.allergies || []).join(', ') || 'None'}
- Preferred Cuisines: ${(params.favoriteCuisines || []).join(', ') || 'Diverse'}
- Daily Calories: Approx ${params.calorieGoal || 2000} kcal
- Daily Protein: Approx ${params.proteinGoal || 90}g
- Servings per meal: ${params.householdSize || 2}
- Appliances Available: ${(params.appliances || []).join(', ') || 'Standard stovetop and oven'}
- Available Pantry Ingredients to emphasize: ${(params.pantryItems || []).slice(0, 8).join(', ') || 'Standard staples'}
- Start Date: ${params.weekStartDate}

For each day (Monday through Sunday):
Provide Breakfast, Lunch, Dinner, and Snack.
Include accurate calories, protein (g), timeMinutes, and ingredientsSummary.

Return ONLY a valid JSON object in this format:
{
  "title": "7-Day Personalized Meal Plan",
  "days": {
    "monday": {
      "dayOfWeek": "Monday",
      "date": "${params.weekStartDate}",
      "breakfast": {
        "title": "Dish name",
        "description": "Appetizing description",
        "calories": 400,
        "protein": 25,
        "timeMinutes": 10,
        "mealType": "breakfast",
        "cuisine": "American",
        "ingredientsSummary": ["Greek yogurt", "berries", "honey"]
      },
      "lunch": {
        "title": "Dish name",
        "description": "Appetizing description",
        "calories": 550,
        "protein": 38,
        "timeMinutes": 20,
        "mealType": "lunch",
        "cuisine": "Mediterranean",
        "ingredientsSummary": ["Chicken breast", "quinoa", "cucumber"]
      },
      "dinner": {
        "title": "Dish name",
        "description": "Appetizing description",
        "calories": 650,
        "protein": 44,
        "timeMinutes": 25,
        "mealType": "dinner",
        "cuisine": "Italian",
        "ingredientsSummary": ["Salmon", "asparagus", "potatoes"]
      },
      "snack": {
        "title": "Dish name",
        "description": "Appetizing description",
        "calories": 200,
        "protein": 10,
        "timeMinutes": 5,
        "mealType": "snack",
        "cuisine": "American",
        "ingredientsSummary": ["Almonds", "apple"]
      },
      "totalCalories": 1800,
      "totalProtein": 117
    }
  }
}
`;

  try {
    if (abortSignal?.aborted) throw new Error('Generation cancelled by user');

    const stream = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    let accumulatedText = '';

    for await (const chunk of stream) {
      if (abortSignal?.aborted) throw new Error('Generation cancelled by user');
      accumulatedText += chunk.text || '';

      // Check which days have streamed in by detecting "dayOfWeek": "Tuesday", etc.
      for (const day of DAYS_OF_WEEK) {
        if (!completedDays.includes(day.label) && accumulatedText.includes(`"dayOfWeek": "${day.label}"`)) {
          // If the next day has started, the previous day is done
          const prevIdx = DAYS_OF_WEEK.findIndex(d => d.label === day.label) - 1;
          if (prevIdx >= 0) {
            const prevDayLabel = DAYS_OF_WEEK[prevIdx].label;
            if (!completedDays.includes(prevDayLabel)) {
              completedDays.push(prevDayLabel);
              onEvent({
                stage: 'generating_days',
                currentDay: day.label,
                completedDays: [...completedDays],
              });
            }
          }
        }
      }
    }

    onEvent({
      stage: 'validating',
      completedDays: DAYS_OF_WEEK.map(d => d.label),
    });

    let cleaned = accumulatedText.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
    const parsedData = JSON.parse(cleaned);

    const planId = `plan_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
    const fullPlan: WeeklyMealPlan = {
      id: planId,
      userId: params.userId || 'guest_user',
      title: parsedData.title || '7-Day Personalized Meal Plan',
      weekStartDate: params.weekStartDate,
      days: parsedData.days || {},
      targetCalories: params.calorieGoal || 2000,
      targetProtein: params.proteinGoal || 90,
      dietaryTags: params.dietaryPreferences || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const validated = WeeklyMealPlanSchema.parse(fullPlan);

    onEvent({
      stage: 'ready',
      completedDays: DAYS_OF_WEEK.map(d => d.label),
      planComplete: validated,
    });

    usageRecord.status = 'completed';
    usageRecord.latencyMs = Date.now() - startTime;
    logAIUsage(usageRecord);

    return validated;
  } catch (err: any) {
    usageRecord.status = abortSignal?.aborted ? 'cancelled' : 'failed';
    usageRecord.latencyMs = Date.now() - startTime;
    logAIUsage(usageRecord);
    throw err;
  }
}

// ---------------- SMART MEAL REPLACEMENT ----------------

export async function regenerateMealAlternative(params: {
  mealType: string;
  dayOfWeek: string;
  currentTitle?: string;
  dietaryPreferences?: string[];
  allergies?: string[];
  calorieGoal?: number;
  proteinGoal?: number;
  cuisines?: string[];
  pantryItems?: string[];
  recentMeals?: string[];
}): Promise<PlannedMealItem> {
  const targetCals = params.calorieGoal ? Math.round(params.calorieGoal / 3) : 500;
  const targetProt = params.proteinGoal ? Math.round(params.proteinGoal / 3) : 30;

  const prompt = `
You are MealAI's meal planning expert.
The user wants to replace their ${params.dayOfWeek} ${params.mealType}.
Current dish to replace: "${params.currentTitle || 'Current meal'}"
Recent other meals in the plan (DO NOT REPEAT): ${(params.recentMeals || []).slice(0, 10).join(', ') || 'None'}

Constraints:
- Meal Type: ${params.mealType}
- Target Calories: ~${targetCals} kcal
- Target Protein: ~${targetProt}g
- Dietary Preferences: ${(params.dietaryPreferences || []).join(', ') || 'None'}
- Allergies / Dislikes: ${(params.allergies || []).join(', ') || 'None'}
- Preferred Cuisines: ${(params.cuisines || []).join(', ') || 'Diverse'}
- Available Pantry Items: ${(params.pantryItems || []).slice(0, 8).join(', ') || 'None'}

Generate a completely different, fresh, mouthwatering dish alternative that fits these exact constraints.
Return ONLY a valid JSON object in this format:
{
  "title": "New Dish Name",
  "description": "Appetizing 1-2 sentence culinary description",
  "calories": ${targetCals},
  "protein": ${targetProt},
  "timeMinutes": 20,
  "mealType": "${params.mealType}",
  "cuisine": "Mediterranean",
  "ingredientsSummary": ["Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"]
}
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  const parsed = JSON.parse(response.text || '{}');
  return {
    recipeId: `rec_alt_${Date.now().toString(36)}`,
    title: parsed.title || 'Chef Alternative Creation',
    description: parsed.description || 'A delicious, balanced alternative for your day.',
    calories: Number(parsed.calories) || targetCals,
    protein: Number(parsed.protein) || targetProt,
    timeMinutes: Number(parsed.timeMinutes) || 20,
    mealType: (params.mealType as any) || 'dinner',
    cuisine: parsed.cuisine || 'International',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredientsSummary: Array.isArray(parsed.ingredientsSummary) ? parsed.ingredientsSummary : [],
  };
}
