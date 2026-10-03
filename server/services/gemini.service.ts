import { getGeminiClient, GEMINI_MODEL } from '../config/gemini.ts';
import {
  GenerateRecipeRequest,
  GeneratePlanRequest,
  Recipe,
  WeeklyMealPlan,
  RecipeSchema,
  WeeklyMealPlanSchema,
} from '../../src/types/index.ts';
import { selectImageForRecipe } from './image.service.ts';
import { FallbackService } from './fallback.service.ts';

export class GeminiService {
  /**
   * Helper to strip markdown fences (e.g. ```json ... ```) and safely parse JSON
   */
  private static parseJsonSafely(raw: string): any {
    if (!raw) return {};
    let cleaned = raw.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.substring(7);
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.substring(3);
    }
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.substring(0, cleaned.length - 3);
    }
    cleaned = cleaned.trim();
    return JSON.parse(cleaned);
  }

  /**
   * 1. Generate Custom Recipe
   */
  public static async generateRecipe(
    input: GenerateRecipeRequest,
    userId: string = 'guest_user'
  ): Promise<Recipe> {
    const ai = getGeminiClient();
    if (!ai) {
      console.warn('[GeminiService] No GEMINI_API_KEY detected. Using high-fidelity FallbackService.');
      return FallbackService.generateFallbackRecipe(input, userId);
    }

    const prompt = `
You are MealAI's world-class master chef and nutritionist.
The user wants to generate a complete, mouthwatering, practical recipe matching these specific criteria:

Available / Requested Ingredients: ${input.ingredients.join(', ')}
${input.pantryItems.length ? `Additional User Pantry Items available if helpful: ${input.pantryItems.join(', ')}` : ''}
Cuisine Preference: ${input.cuisine || 'Any'}
Dietary Preference: ${input.diet || 'No preference'}
Meal Type: ${input.mealType}
Maximum Cooking Time: ${input.maxCookingTime} minutes
Difficulty Target: ${input.difficulty}
Kitchen Appliances Available: ${input.appliances.length ? input.appliances.join(', ') : 'Standard stovetop & oven'}
Spiciness Level: ${input.spiciness || 'Mild'}
Target Servings: ${input.householdSize || 2}
Target Calories per serving: ${input.calories ? `${input.calories} kcal` : 'Sensible balanced'}
Target Protein per serving: ${input.protein ? `${input.protein}g` : 'Sensible balanced'}
Additional Notes / Requests: ${input.notes || 'None'}

RULES:
1. Prioritize the user's primary ingredients. You may include common household staples (oil, salt, pepper, garlic, butter, water).
2. The total time MUST NOT exceed ${input.maxCookingTime} minutes.
3. If an appliance like "Air Fryer" or "Instant Pot" was chosen, tailor the instructions to utilize it prominently.
4. Each instruction step must have a clear description. If a step involves waiting or cooking for a set time, include "timerMinutes" as a positive integer.
5. Return ONLY a valid JSON object matching the exact structure below.

Return this JSON format:
{
  "title": "Dish name",
  "description": "Appetizing 2-3 sentence culinary summary describing flavors, texture, and aroma.",
  "cuisine": "e.g. Italian, Indian, Mediterranean, American, etc.",
  "mealType": "breakfast" | "lunch" | "dinner" | "snack" | "dessert",
  "dietary": ["High-Protein", "Gluten-Free", etc.],
  "prepTime": 10,
  "cookTime": 15,
  "totalTime": 25,
  "servings": 2,
  "calories": 480,
  "protein": 34,
  "carbs": 42,
  "fat": 16,
  "fiber": 6,
  "difficulty": "beginner" | "easy" | "intermediate" | "advanced",
  "appliances": ["Air Fryer"],
  "ingredients": [
    {
      "name": "Chicken Breast",
      "amount": "2",
      "unit": "medium breasts (approx 400g)",
      "category": "Meat & Seafood",
      "note": "diced into bite-sized cubes"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "Season and Prep",
      "instruction": "Toss diced chicken with olive oil, paprika, garlic powder, salt, and black pepper until evenly coated.",
      "timerMinutes": null,
      "tip": "Pat meat dry with paper towel first for crispier texture."
    }
  ],
  "tips": [
    "Serve alongside steamed basmati rice or a crisp green salad."
  ]
}
`;

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const parsedData = this.parseJsonSafely(response.text || '{}');

      // Calculate matched & missing ingredients
      const inputNames = input.ingredients.map(i => i.toLowerCase().trim());
      let matchedCount = 0;
      let missingCount = 0;

      if (Array.isArray(parsedData.ingredients)) {
        parsedData.ingredients.forEach((ing: { name: string }) => {
          const ingName = (ing.name || '').toLowerCase();
          const isMatched = inputNames.some(inp => ingName.includes(inp) || inp.includes(ingName));
          if (isMatched) {
            matchedCount++;
          } else {
            missingCount++;
          }
        });
      }

      const recipeId = 'rec_' + Math.random().toString(36).substring(2, 11);
      const selectedImage = selectImageForRecipe(
        parsedData.title || '',
        parsedData.cuisine || '',
        parsedData.mealType || input.mealType,
        input.ingredients
      );

      const recipeRecord = {
        id: recipeId,
        userId,
        title: parsedData.title || 'Personalized AI Creation',
        description: parsedData.description || 'A delicious dish crafted specifically for your kitchen.',
        cuisine: parsedData.cuisine || input.cuisine || 'Fusion',
        mealType: parsedData.mealType || input.mealType || 'dinner',
        dietary: Array.isArray(parsedData.dietary) ? parsedData.dietary : [],
        prepTime: Number(parsedData.prepTime) || 10,
        cookTime: Number(parsedData.cookTime) || 15,
        totalTime: Number(parsedData.totalTime) || (Number(parsedData.prepTime) || 10) + (Number(parsedData.cookTime) || 15),
        servings: Number(parsedData.servings) || input.householdSize || 2,
        calories: Math.round(Number(parsedData.calories) || 450),
        protein: Math.round(Number(parsedData.protein) || 25),
        carbs: Math.round(Number(parsedData.carbs) || 35),
        fat: Math.round(Number(parsedData.fat) || 15),
        fiber: Math.round(Number(parsedData.fiber) || 4),
        difficulty: parsedData.difficulty || input.difficulty || 'easy',
        appliances: Array.isArray(parsedData.appliances) ? parsedData.appliances : input.appliances,
        ingredients: Array.isArray(parsedData.ingredients) ? parsedData.ingredients : [],
        instructions: Array.isArray(parsedData.instructions) ? parsedData.instructions : [],
        tips: Array.isArray(parsedData.tips) ? parsedData.tips : [],
        imageUrl: selectedImage,
        isFavorite: false,
        source: 'ai_generated',
        matchedPantryCount: matchedCount,
        missingIngredientsCount: missingCount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return RecipeSchema.parse(recipeRecord);
    } catch (error) {
      console.error('[GeminiService] Error generating recipe:', error);
      return FallbackService.generateFallbackRecipe(input, userId);
    }
  }

  /**
   * 2. Modify Existing Recipe (Fixes missing endpoint requested by frontend)
   */
  public static async modifyRecipe(
    existingRecipe: Recipe,
    modificationRequest: string
  ): Promise<Recipe> {
    const ai = getGeminiClient();
    if (!ai) {
      // Offline fallback: adjust title and notes
      return {
        ...existingRecipe,
        title: `${existingRecipe.title} (${modificationRequest})`,
        tips: [...existingRecipe.tips, `Modified according to preference: ${modificationRequest}`],
        updatedAt: new Date().toISOString(),
      };
    }

    const prompt = `
You are MealAI's master culinary recipe adaptor.
The user wants to adapt the following existing recipe:
Title: "${existingRecipe.title}"
Current Ingredients: ${existingRecipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}
Current Instructions: ${existingRecipe.instructions.map(i => i.instruction).join(' ')}

Modification Request: "${modificationRequest}"

Tasks:
1. Update ingredients and quantities accordingly (e.g. make it spicy, cut calories in half, make it vegan/vegetarian, swap for air fryer, keto adaptation, etc.).
2. Update cooking steps, timings, temperatures, and tips to reflect the modification accurately.
3. Recalculate estimated nutritional values (calories, protein, carbs, fat, fiber).
4. Return ONLY a valid JSON object matching the full recipe schema format.
`;

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.6,
        },
      });

      const parsed = this.parseJsonSafely(response.text || '{}');
      const updatedRecipe: Recipe = {
        ...existingRecipe,
        ...parsed,
        id: existingRecipe.id,
        imageUrl: existingRecipe.imageUrl,
        updatedAt: new Date().toISOString(),
      };

      return RecipeSchema.parse(updatedRecipe);
    } catch (error) {
      console.error('[GeminiService] Error modifying recipe:', error);
      return {
        ...existingRecipe,
        title: `${existingRecipe.title} (${modificationRequest})`,
        tips: [...existingRecipe.tips, `Modified for: ${modificationRequest}`],
        updatedAt: new Date().toISOString(),
      };
    }
  }

  /**
   * 3. Generate Weekly Meal Plan
   */
  public static async generateWeeklyPlan(
    input: GeneratePlanRequest,
    userId: string = 'guest_user'
  ): Promise<WeeklyMealPlan> {
    const ai = getGeminiClient();
    if (!ai) {
      console.warn('[GeminiService] No GEMINI_API_KEY. Using FallbackService meal plan.');
      return FallbackService.generateFallbackMealPlan(input, userId);
    }

    const prompt = `
You are MealAI's nutrition architect. Generate a cohesive, mouthwatering 7-day weekly meal plan.
User Profile & Constraints:
- Dietary Preferences: ${input.dietaryPreferences.length ? input.dietaryPreferences.join(', ') : 'None'}
- Allergies / Dislikes: ${input.allergies.length ? input.allergies.join(', ') : 'None'}
- Favorite Cuisines: ${input.favoriteCuisines.length ? input.favoriteCuisines.join(', ') : 'Diverse'}
- Daily Calorie Target: Approx ${input.calorieGoal} kcal
- Daily Protein Target: Approx ${input.proteinGoal}g protein
- Household Size: ${input.householdSize} people
- Cooking Skill Level: ${input.skillLevel}
- Available Appliances: ${input.appliances.length ? input.appliances.join(', ') : 'Standard kitchen'}
- Available Pantry Ingredients: ${input.pantryItems.slice(0, 10).join(', ') || 'Standard pantry'}
- Week Start Date: ${input.weekStartDate}

Generate an organized plan for each of the 7 days:
Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.

For each day, provide:
- Breakfast, Lunch, Dinner, Snack with calories, protein (g), and timeMinutes.
Return ONLY valid JSON matching this schema:
{
  "title": "7-Day Personalized Meal Plan",
  "days": {
    "monday": {
      "dayOfWeek": "Monday",
      "date": "${input.weekStartDate}",
      "breakfast": { "title": "Dish", "description": "Desc", "calories": 400, "protein": 25, "timeMinutes": 10, "mealType": "breakfast", "cuisine": "American", "ingredientsSummary": ["eggs"] },
      "lunch": { "title": "Dish", "description": "Desc", "calories": 500, "protein": 35, "timeMinutes": 15, "mealType": "lunch", "cuisine": "Mediterranean", "ingredientsSummary": ["chicken"] },
      "dinner": { "title": "Dish", "description": "Desc", "calories": 600, "protein": 40, "timeMinutes": 25, "mealType": "dinner", "cuisine": "Italian", "ingredientsSummary": ["salmon"] },
      "snack": { "title": "Dish", "description": "Desc", "calories": 200, "protein": 10, "timeMinutes": 5, "mealType": "snack", "cuisine": "American", "ingredientsSummary": ["apple"] },
      "totalCalories": 1700,
      "totalProtein": 110
    }
  }
}
`;

    try {
      const response = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const parsedData = this.parseJsonSafely(response.text || '{}');
      const planId = 'plan_' + Math.random().toString(36).substring(2, 11);
      const days = parsedData.days || {};

      Object.keys(days).forEach(dayKey => {
        const day = days[dayKey];
        ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mealType => {
          if (day[mealType]) {
            day[mealType].imageUrl = selectImageForRecipe(
              day[mealType].title || '',
              day[mealType].cuisine || '',
              mealType,
              day[mealType].ingredientsSummary || []
            );
          }
        });
        const cals = (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.dinner?.calories || 0) + (day.snack?.calories || 0);
        const prot = (day.breakfast?.protein || 0) + (day.lunch?.protein || 0) + (day.dinner?.protein || 0) + (day.snack?.protein || 0);
        day.totalCalories = cals;
        day.totalProtein = prot;
      });

      const mealPlanRecord = {
        id: planId,
        userId,
        title: parsedData.title || '7-Day Personalized Meal Plan',
        weekStartDate: input.weekStartDate,
        days,
        targetCalories: input.calorieGoal || 2000,
        targetProtein: input.proteinGoal || 90,
        dietaryTags: input.dietaryPreferences,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return WeeklyMealPlanSchema.parse(mealPlanRecord);
    } catch (error) {
      console.error('[GeminiService] Error generating meal plan:', error);
      return FallbackService.generateFallbackMealPlan(input, userId);
    }
  }

  /**
   * 4. Multimodal Image Analysis (Detect Kitchen Ingredients from Photo)
   */
  public static async analyzeIngredientsImage(imageBase64: string, mimeType: string = 'image/jpeg') {
    const ai = getGeminiClient();
    if (!ai) {
      return {
        detectedIngredients: [
          { name: 'Fresh Produce', category: 'Produce', estimatedQuantity: 'Variety', freshness: 'fresh' },
          { name: 'Pantry Staples', category: 'Pantry', estimatedQuantity: 'Assorted', freshness: 'good' },
        ],
        culinarySuggestions: ['Fresh Garden Stir Fry', 'Wholesome Medley Bowl'],
      };
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9.+]+;base64,/, '');
    const imagePart = {
      inlineData: {
        mimeType,
        data: cleanBase64,
      },
    };

    const promptPart = {
      text: `
Examine this photo. You are MealAI's computer vision food expert.
Detect all visible kitchen ingredients, fresh produce, vegetables, meats, dairy, eggs, condiments, grains, canned items, or herbs in this photo.
Return ONLY a valid JSON object in this format:
{
  "detectedIngredients": [
    {
      "name": "Tomatoes",
      "category": "Produce",
      "estimatedQuantity": "4 medium",
      "freshness": "fresh"
    }
  ],
  "culinarySuggestions": [
    "Shakshuka with eggs and tomatoes"
  ]
}
`,
    };

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: { parts: [imagePart, promptPart] },
      config: { responseMimeType: 'application/json' },
    });

    return this.parseJsonSafely(response.text || '{}');
  }

  /**
   * 5. Ingredient Substitution
   */
  public static async substituteIngredient(
    ingredient: string,
    recipeContext?: string,
    dietaryRestriction?: string
  ) {
    const ai = getGeminiClient();
    if (!ai) {
      return {
        ingredient,
        substitutions: [
          {
            name: `Standard 1:1 culinary alternative for ${ingredient}`,
            ratio: '1:1 ratio',
            flavorImpact: 'Preserves the core texture and balance',
            bestFor: 'cooking and baking',
          },
        ],
        chefNote: 'Season gently to taste when swapping staples.',
      };
    }

    const prompt = `
The user is cooking ${recipeContext ? `"${recipeContext}"` : 'a dish'} and is missing or cannot eat "${ingredient}".
${dietaryRestriction ? `Dietary restriction: ${dietaryRestriction}` : ''}
Provide 3 practical culinary substitutions with exact ratios, how it affects flavor/texture, and tips.

Return JSON:
{
  "ingredient": "${ingredient}",
  "substitutions": [
    {
      "name": "Alternative ingredient",
      "ratio": "e.g. 1:1 replacement",
      "flavorImpact": "Description of taste change",
      "bestFor": "baking, sautéing, sauces, etc."
    }
  ],
  "chefNote": "Brief culinary wisdom"
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    return this.parseJsonSafely(response.text || '{}');
  }

  /**
   * 6. Surprise Me Recipe
   */
  public static async surpriseMe(dietary: string = 'balanced', userId: string = 'guest_user'): Promise<Recipe> {
    const cuisines = ['Italian', 'Mexican', 'Japanese', 'Thai', 'Indian', 'Mediterranean', 'French', 'Korean', 'Spanish'];
    const randomCuisine = cuisines[Math.floor(Math.random() * cuisines.length)];

    return this.generateRecipe(
      {
        ingredients: ['Chef Choice Fresh Ingredients'],
        pantryItems: ['Olive Oil', 'Garlic', 'Sea Salt'],
        cuisine: randomCuisine,
        diet: dietary,
        mealType: 'dinner',
        maxCookingTime: 30,
        difficulty: 'easy',
        appliances: ['Stovetop'],
        householdSize: 2,
        spiciness: 'Mild',
      },
      userId
    );
  }

  /**
   * 7. Regenerate Single Planned Meal
   */
  public static async regenerateMeal(params: {
    mealType: string;
    dayOfWeek: string;
    currentTitle?: string;
    dietaryPreferences?: string[];
    allergies?: string[];
    calorieGoal?: number;
    proteinGoal?: number;
    pantryItems?: string[];
    cuisines?: string[];
  }) {
    const ai = getGeminiClient();
    const targetCals = params.calorieGoal ? Math.round(params.calorieGoal / 3) : 500;
    const targetProt = params.proteinGoal ? Math.round(params.proteinGoal / 3) : 30;

    if (!ai) {
      const title = `Chef's Fresh ${params.dayOfWeek} ${params.mealType}`;
      return {
        title,
        description: 'A vibrant alternative meal crafted to hit your nutritional goals.',
        calories: targetCals,
        protein: targetProt,
        timeMinutes: 20,
        mealType: params.mealType,
        cuisine: params.cuisines?.[0] || 'Mediterranean',
        ingredientsSummary: ['Fresh Vegetables', 'Olive Oil', 'Protein of choice', 'Herbs'],
        imageUrl: selectImageForRecipe(title, 'Mediterranean', params.mealType, []),
        recipeId: 'rec_gen_' + Math.random().toString(36).substring(2, 9),
      };
    }

    const prompt = `
You are MealAI's meal planning expert.
The user wants to replace/regenerate their ${params.dayOfWeek} ${params.mealType}.
Current dish to replace: "${params.currentTitle || 'Current meal'}"
Requirements:
- Meal Type: ${params.mealType}
- Target Calories: ~${targetCals} kcal
- Target Protein: ~${targetProt}g
- Dietary Preferences: ${Array.isArray(params.dietaryPreferences) ? params.dietaryPreferences.join(', ') : 'None'}
- Allergies / Dislikes: ${Array.isArray(params.allergies) ? params.allergies.join(', ') : 'None'}
- Preferred Cuisines: ${Array.isArray(params.cuisines) ? params.cuisines.join(', ') : 'Diverse'}
- Available Pantry Items: ${Array.isArray(params.pantryItems) ? params.pantryItems.slice(0, 10).join(', ') : 'None'}

Generate a completely different, fresh, delicious meal to replace it.
Return ONLY valid JSON:
{
  "title": "Dish name",
  "description": "Appetizing 1-2 sentence description",
  "calories": ${targetCals},
  "protein": ${targetProt},
  "timeMinutes": 20,
  "mealType": "${params.mealType}",
  "cuisine": "e.g. Mediterranean, Mexican, Asian, etc.",
  "ingredientsSummary": ["Ingredient 1", "Ingredient 2", "Ingredient 3", "Ingredient 4"]
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    const imageUrl = selectImageForRecipe(
      parsed.title || '',
      parsed.cuisine || 'Fusion',
      params.mealType,
      parsed.ingredientsSummary || []
    );

    return {
      ...parsed,
      recipeId: 'rec_gen_' + Math.random().toString(36).substring(2, 9),
      imageUrl,
    };
  }

  /**
   * 8. Consolidate Weekly Grocery List
   */
  public static async consolidateGroceries(rawIngredients: string[], pantryItems: string[] = []) {
    const ai = getGeminiClient();
    if (!ai || rawIngredients.length === 0) {
      // Basic grouping fallback
      return rawIngredients.slice(0, 15).map(item => ({
        name: item,
        quantity: 'As needed',
        category: 'Produce',
      }));
    }

    const prompt = `
You are MealAI's smart grocery aggregator.
Combine duplicates and categorize each ingredient for a shopping trip:
${rawIngredients.join('\n')}

${pantryItems.length > 0 ? `Already in Pantry:\n${pantryItems.join(', ')}` : ''}

Categories allowed: "Produce", "Protein", "Dairy", "Grains", "Pantry", "Frozen", "Other".
Return JSON:
{
  "consolidatedItems": [
    { "name": "Item Name", "quantity": "e.g. 500g", "category": "Produce" }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    return parsed.consolidatedItems || [];
  }

  /**
   * 9. Live Cooking Assistant
   */
  public static async askCookingAssistant(
    recipe: Recipe,
    question: string,
    currentStepIndex?: number
  ): Promise<string> {
    const ai = getGeminiClient();
    if (!ai) {
      return 'For best results, maintain gentle heat and check for visual cues like golden searing.';
    }

    const currentStep = typeof currentStepIndex === 'number' && recipe.instructions[currentStepIndex]
      ? recipe.instructions[currentStepIndex]
      : null;

    const prompt = `
You are MealAI's live cooking assistant speaking to a home cook currently preparing: "${recipe.title}".
Ingredients: ${recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}
${currentStep ? `User is on Step ${currentStep.step}: "${currentStep.title}" - ${currentStep.instruction}` : ''}

Home Cook's Question: "${question}"
Provide direct, encouraging, sensory advice in 2-3 sentences.
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { temperature: 0.5 },
    });

    return response.text?.trim() || 'Keep your temperature moderate and test with a fork for tenderness.';
  }
}
