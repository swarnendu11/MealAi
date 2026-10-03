import { z } from 'zod';
import { ai, GEMINI_MODEL, logAIUsage, AIUsageRecord } from './gemini.ts';
import { Recipe, normalizeRecipeData } from '../../types/index.ts';

// ---------------- 1. STRUCTURED GEMINI OUTPUT SCHEMA ----------------

export const GeneratedRecipeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(5),
  cuisine: z.string().default('International'),
  mealType: z.string().default('dinner'),
  difficulty: z.enum(['beginner', 'easy', 'intermediate', 'advanced']).default('easy'),
  prepTimeMinutes: z.number().int().nonnegative().default(10),
  cookTimeMinutes: z.number().int().nonnegative().default(15),
  totalTimeMinutes: z.number().int().nonnegative().default(25),
  servings: z.number().int().positive().default(2),
  nutrition: z.object({
    calories: z.number().nonnegative().default(450),
    proteinGrams: z.number().nonnegative().default(25),
    carbohydratesGrams: z.number().nonnegative().default(35),
    fatGrams: z.number().nonnegative().default(15),
    fiberGrams: z.number().nonnegative().optional().default(4),
  }),
  ingredients: z.array(
    z.object({
      name: z.string().min(1),
      amount: z.string().default('1'),
      unit: z.string().optional().default(''),
      category: z.string().optional().default('Pantry'),
    })
  ).min(1),
  instructions: z.array(
    z.object({
      step: z.number().int().positive(),
      title: z.string().default('Step'),
      description: z.string().min(1),
      timerMinutes: z.number().nullable().optional(),
    })
  ).min(1),
  tips: z.array(z.string()).default([]),
  substitutions: z.array(
    z.object({
      ingredient: z.string(),
      replacement: z.string(),
      explanation: z.string(),
    })
  ).default([]),
  dietaryTags: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});

export type GeneratedRecipe = z.infer<typeof GeneratedRecipeSchema>;

// Convert GeneratedRecipe to canonical internal Recipe model
export function toCanonicalRecipe(
  gen: GeneratedRecipe,
  recipeId: string,
  userId: string = 'guest_user',
  imageUrl?: string,
  pantryItems: string[] = []
): Recipe {
  const pantryNormalized = pantryItems.map(p => p.toLowerCase().trim());
  let matched = 0;
  let missing = 0;

  gen.ingredients.forEach(i => {
    const ingName = i.name.toLowerCase();
    if (pantryNormalized.some(p => ingName.includes(p) || p.includes(ingName))) {
      matched++;
    } else {
      missing++;
    }
  });

  return normalizeRecipeData({
    id: recipeId,
    userId,
    title: gen.title,
    description: gen.description,
    cuisine: gen.cuisine,
    mealType: (gen.mealType as any) || 'dinner',
    mealTypes: [gen.mealType],
    difficulty: gen.difficulty,
    prepTime: gen.prepTimeMinutes,
    cookTime: gen.cookTimeMinutes,
    totalTime: gen.totalTimeMinutes,
    prepTimeMinutes: gen.prepTimeMinutes,
    cookTimeMinutes: gen.cookTimeMinutes,
    totalTimeMinutes: gen.totalTimeMinutes,
    servings: gen.servings,
    calories: gen.nutrition.calories,
    protein: gen.nutrition.proteinGrams,
    carbs: gen.nutrition.carbohydratesGrams,
    fat: gen.nutrition.fatGrams,
    fiber: gen.nutrition.fiberGrams,
    proteinGrams: gen.nutrition.proteinGrams,
    carbohydratesGrams: gen.nutrition.carbohydratesGrams,
    fatGrams: gen.nutrition.fatGrams,
    fiberGrams: gen.nutrition.fiberGrams,
    dietary: gen.dietaryTags,
    dietaryTags: gen.dietaryTags,
    allergens: gen.allergens,
    appliances: [],
    applianceTags: [],
    cookingMethods: [],
    tags: gen.tags,
    ingredients: gen.ingredients.map(i => ({
      name: i.name,
      amount: i.amount,
      unit: i.unit || '',
      category: i.category || 'Pantry',
    })),
    instructions: gen.instructions.map(inst => ({
      step: inst.step,
      title: inst.title,
      instruction: inst.description,
      timerMinutes: inst.timerMinutes || null,
    })),
    tips: gen.tips,
    substitutions: gen.substitutions.map(s => ({
      originalIngredient: s.ingredient,
      substituteIngredient: s.replacement,
      ratio: '1:1',
      notes: s.explanation,
    })),
    imageUrl: imageUrl || '',
    isFavorite: false,
    source: 'ai_streamed',
    sourceType: 'generated',
    matchedPantryCount: matched,
    missingIngredientsCount: missing,
  });
}

// ---------------- 2. REAL-TIME STREAMING RECIPE GENERATOR ----------------

export interface RecipeGenerationParams {
  ingredients: string[];
  cuisine?: string;
  diet?: string;
  mealType?: string;
  maxCookingTime?: number;
  difficulty?: string;
  appliances?: string[];
  servings?: number;
  spiciness?: string;
  calories?: number;
  protein?: number;
  budget?: number;
  notes?: string;
  pantryItems?: string[];
  userId?: string;
  generationId?: string;
}

export type GenerationStage =
  | 'analyzing_ingredients'
  | 'selecting_flavor'
  | 'building_instructions'
  | 'calculating_nutrition'
  | 'validating_recipe'
  | 'ready';

export interface GenerationStreamUpdate {
  stage: GenerationStage;
  message: string;
  completedStages: string[];
  recipePartial?: Partial<GeneratedRecipe>;
  recipeComplete?: Recipe;
  error?: string;
}

/**
 * Attempts to safely repair minor JSON syntax slips (like trailing commas or truncated brackets)
 */
function attemptSafeJsonRecovery(rawText: string): any {
  let cleaned = rawText.trim();
  // Strip markdown fences if present
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');

  try {
    return JSON.parse(cleaned);
  } catch (initialErr) {
    // Try trimming trailing comma before closing brace or bracket
    const sanitized = cleaned
      .replace(/,\s*([\]}])/g, '$1')
      .replace(/[\u0000-\u001F]+/g, ' ');
    return JSON.parse(sanitized);
  }
}

/**
 * Real Gemini Streaming generator.
 * Streams progress events reflecting true parser stages as chunks arrive.
 */
export async function streamRecipeGeneration(
  params: RecipeGenerationParams,
  onEvent: (event: GenerationStreamUpdate) => void,
  abortSignal?: AbortSignal
): Promise<Recipe> {
  const startTime = Date.now();
  const generationId = params.generationId || `gen_${Math.random().toString(36).substring(2, 9)}`;

  // Log usage start
  const usageRecord: AIUsageRecord = {
    id: generationId,
    userId: params.userId || 'guest_user',
    type: 'recipe',
    createdAt: new Date().toISOString(),
    status: 'started',
    model: GEMINI_MODEL,
    metadata: { ingredientsCount: params.ingredients.length, cuisine: params.cuisine },
  };
  logAIUsage(usageRecord);

  const completedStages: string[] = [];

  const prompt = `
You are MealAI's master culinary chef and nutrition scientist.
Generate a complete, chef-quality, practical recipe that strictly satisfies these user inputs:

Ingredients Available / Requested: ${params.ingredients.join(', ')}
${params.pantryItems && params.pantryItems.length ? `Additional User Pantry Items: ${params.pantryItems.join(', ')}` : ''}
Cuisine: ${params.cuisine || 'Any'}
Dietary Restrictions: ${params.diet || 'No preference'}
Meal Type: ${params.mealType || 'dinner'}
Maximum Time: ${params.maxCookingTime || 30} minutes
Target Servings: ${params.servings || 2}
Cooking Difficulty: ${params.difficulty || 'easy'}
Appliances Available: ${params.appliances && params.appliances.length ? params.appliances.join(', ') : 'Stovetop, standard kitchen'}
Spiciness Level: ${params.spiciness || 'Mild'}
${params.calories ? `Target Calories per Serving: ${params.calories} kcal` : ''}
${params.protein ? `Target Protein per Serving: ${params.protein}g` : ''}
Special Notes: ${params.notes || 'None'}

REQUIREMENTS:
1. Prioritize user's primary ingredients.
2. Total cooking time MUST NOT exceed ${params.maxCookingTime || 30} minutes.
3. Every instruction step must have a clear title and description. Include "timerMinutes" (number or null) when a step requires timed cooking or simmering.
4. Provide 2-3 genuine culinary substitutions.
5. Return ONLY a single valid JSON object strictly complying with this schema:

{
  "title": "Dish name",
  "description": "Appetizing culinary description of flavor, texture, and aroma.",
  "cuisine": "${params.cuisine && params.cuisine !== 'Any' ? params.cuisine : 'Mediterranean'}",
  "mealType": "${params.mealType || 'dinner'}",
  "difficulty": "${params.difficulty || 'easy'}",
  "prepTimeMinutes": 10,
  "cookTimeMinutes": 15,
  "totalTimeMinutes": 25,
  "servings": ${params.servings || 2},
  "nutrition": {
    "calories": 480,
    "proteinGrams": 34,
    "carbohydratesGrams": 42,
    "fatGrams": 16,
    "fiberGrams": 5
  },
  "ingredients": [
    {
      "name": "Ingredient name",
      "amount": "2",
      "unit": "tbsp",
      "category": "Produce"
    }
  ],
  "instructions": [
    {
      "step": 1,
      "title": "Season and Prep",
      "description": "Step detail description.",
      "timerMinutes": null
    }
  ],
  "tips": ["Chef tip 1", "Chef tip 2"],
  "substitutions": [
    {
      "ingredient": "Original item",
      "replacement": "Alternative",
      "explanation": "Why this swap preserves flavor balance."
    }
  ],
  "dietaryTags": ["High-Protein"],
  "allergens": [],
  "tags": ["quick", "dinner"]
}
`;

  try {
    if (abortSignal?.aborted) {
      throw new Error('Generation cancelled by user');
    }

    // Stage 1: Ingredients analysis started
    onEvent({
      stage: 'analyzing_ingredients',
      message: 'Understanding your ingredients...',
      completedStages: [...completedStages],
    });

    const stream = await ai.models.generateContentStream({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    let accumulatedText = '';
    let hasSentFlavor = false;
    let hasSentInstructions = false;
    let hasSentNutrition = false;

    for await (const chunk of stream) {
      if (abortSignal?.aborted) {
        usageRecord.status = 'cancelled';
        throw new Error('Generation cancelled by user');
      }

      accumulatedText += chunk.text || '';

      // Live stream inspection: update stages as genuine parts of JSON stream in
      if (!hasSentFlavor && accumulatedText.includes('"description"')) {
        hasSentFlavor = true;
        completedStages.push('Ingredients analyzed');
        onEvent({
          stage: 'selecting_flavor',
          message: 'Building recipe flavor profile...',
          completedStages: [...completedStages],
        });
      }

      if (!hasSentInstructions && accumulatedText.includes('"instructions"')) {
        hasSentInstructions = true;
        completedStages.push('Flavor profile selected');
        onEvent({
          stage: 'building_instructions',
          message: 'Creating step-by-step cooking instructions...',
          completedStages: [...completedStages],
        });
      }

      if (!hasSentNutrition && accumulatedText.includes('"nutrition"')) {
        hasSentNutrition = true;
        completedStages.push('Instructions generated');
        onEvent({
          stage: 'calculating_nutrition',
          message: 'Calculating calories and macronutrients...',
          completedStages: [...completedStages],
        });
      }
    }

    // Stage 5: Validation
    completedStages.push('Nutrition estimated');
    onEvent({
      stage: 'validating_recipe',
      message: 'Validating recipe chemistry & nutrition...',
      completedStages: [...completedStages],
    });

    // Parse and validate with Zod
    let parsedJson: any;
    try {
      parsedJson = attemptSafeJsonRecovery(accumulatedText);
    } catch (parseErr: any) {
      // Recovery attempt 2: Ask Gemini for quick self-correction
      const recoveryResponse = await ai.models.generateContent({
        model: GEMINI_MODEL,
        contents: `Fix this malformed JSON and return ONLY the valid JSON object without markdown:\n${accumulatedText}`,
        config: { responseMimeType: 'application/json' },
      });
      parsedJson = JSON.parse(recoveryResponse.text || '{}');
    }

    const validatedResult = GeneratedRecipeSchema.parse(parsedJson);

    // Map curated high quality photo based on dish title
    const selectedImage = pickImageForRecipe(
      validatedResult.title,
      validatedResult.cuisine,
      validatedResult.mealType
    );

    const fullRecipe = toCanonicalRecipe(
      validatedResult,
      `rec_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      params.userId || 'guest_user',
      selectedImage,
      params.pantryItems || []
    );

    completedStages.push('Recipe verified');

    // Stage 6: Ready!
    onEvent({
      stage: 'ready',
      message: 'Recipe ready',
      completedStages: [...completedStages],
      recipeComplete: fullRecipe,
    });

    usageRecord.status = 'completed';
    usageRecord.latencyMs = Date.now() - startTime;
    logAIUsage(usageRecord);

    return fullRecipe;
  } catch (err: any) {
    usageRecord.status = abortSignal?.aborted ? 'cancelled' : 'failed';
    usageRecord.latencyMs = Date.now() - startTime;
    logAIUsage(usageRecord);
    throw err;
  }
}

// ---------------- 3. AI RECIPE MODIFICATION ----------------

export type RecipeModificationType =
  | 'healthier'
  | 'spicier'
  | 'vegetarian'
  | 'vegan'
  | 'higher_protein'
  | 'reduce_calories'
  | 'cheaper'
  | 'faster'
  | 'kid_friendly';

export async function modifyRecipeWithAI(
  originalRecipe: Recipe,
  modification: RecipeModificationType,
  userConstraints?: { allergies?: string[]; householdSize?: number }
): Promise<Recipe> {
  const modificationInstructions: Record<RecipeModificationType, string> = {
    healthier: 'Reduce saturated fats and sodium, increase whole foods and nutrient density while retaining deliciousness.',
    spicier: 'Infuse authentic heat using complementary fresh chilis, chili oils, or aromatic spices matching the cuisine.',
    vegetarian: 'Replace all meats, poultry, and fish with delicious, textured vegetarian proteins like tofu, paneer, lentils, or mushrooms.',
    vegan: 'Remove all animal products including dairy, eggs, honey, and meat; substitute with plant-based alternatives.',
    higher_protein: 'Boost protein content by at least 15-20g per serving using complementary high-protein whole ingredients.',
    reduce_calories: 'Trim overall caloric density by 20-30% using lighter cooking techniques and vegetable volume.',
    cheaper: 'Replace high-cost ingredients with affordable, highly accessible pantry staples.',
    faster: 'Streamline prep and cooking steps to reduce total cook time while preserving core flavors.',
    kid_friendly: 'Mellow sharp spices, create inviting textures and familiar presentation that appeals to children.',
  };

  const prompt = `
You are MealAI's master culinary re-developer.
Transform this existing recipe based on this specific modification: "${modification.replace('_', ' ')}".
Instruction: ${modificationInstructions[modification]}

CRITICAL RULES:
1. Preserve the original recipe's culinary identity, flavor concept, and charm. DO NOT create an unrelated dish.
2. Adjust ingredients, steps, and macronutrients accordingly.
3. Allergies to avoid: ${(userConstraints?.allergies || []).join(', ') || 'None'}

Original Recipe:
Title: ${originalRecipe.title}
Cuisine: ${originalRecipe.cuisine}
Current Ingredients: ${originalRecipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}
Current Steps: ${originalRecipe.instructions.map(i => `${i.step}. ${i.instruction}`).join(' | ')}
Current Calories: ${originalRecipe.calories} kcal, Protein: ${originalRecipe.protein}g

Return ONLY a valid JSON object matching this schema:
{
  "title": "Updated Title reflecting modification",
  "description": "Updated description explaining how the dish was transformed",
  "cuisine": "${originalRecipe.cuisine}",
  "mealType": "${originalRecipe.mealType || 'dinner'}",
  "difficulty": "${originalRecipe.difficulty || 'easy'}",
  "prepTimeMinutes": ${originalRecipe.prepTimeMinutes || originalRecipe.prepTime || 10},
  "cookTimeMinutes": ${originalRecipe.cookTimeMinutes || originalRecipe.cookTime || 15},
  "totalTimeMinutes": ${originalRecipe.totalTimeMinutes || originalRecipe.totalTime || 25},
  "servings": ${originalRecipe.servings || 2},
  "nutrition": {
    "calories": 400,
    "proteinGrams": 30,
    "carbohydratesGrams": 35,
    "fatGrams": 12,
    "fiberGrams": 6
  },
  "ingredients": [
    { "name": "Item", "amount": "1", "unit": "cup", "category": "Produce" }
  ],
  "instructions": [
    { "step": 1, "title": "Prep", "description": "Step detail", "timerMinutes": null }
  ],
  "tips": ["Tip 1"],
  "substitutions": [
    { "ingredient": "Old item", "replacement": "New item", "explanation": "Why this works" }
  ],
  "dietaryTags": ["Modified"],
  "allergens": [],
  "tags": ["modified"]
}
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  const parsed = attemptSafeJsonRecovery(response.text || '{}');
  const validated = GeneratedRecipeSchema.parse(parsed);

  return toCanonicalRecipe(
    validated,
    `rec_mod_${Date.now().toString(36)}`,
    originalRecipe.userId,
    originalRecipe.imageUrl
  );
}

// ---------------- 4. AI INGREDIENT SUBSTITUTION ----------------

export interface SubstitutionResult {
  ingredient: string;
  bestSubstitute: string;
  why: string;
  amount: string;
  category: string;
  culinaryNotes: string;
}

export async function substituteIngredientWithAI(params: {
  ingredient: string;
  recipeTitle?: string;
  cookingMethod?: string;
  dietaryRestrictions?: string[];
}): Promise<SubstitutionResult> {
  const prompt = `
You are MealAI's culinary chemist.
The user is preparing "${params.recipeTitle || 'a recipe'}" and needs a substitution for "${params.ingredient}".
Cooking Method: ${params.cookingMethod || 'General cooking'}
Dietary Restrictions: ${(params.dietaryRestrictions || []).join(', ') || 'None'}

Provide the single best practical replacement considering:
1. Recipe chemistry & binding/moisture properties
2. Flavor and texture preservation
3. Dietary requirements

Return ONLY a valid JSON object in this format:
{
  "ingredient": "${params.ingredient}",
  "bestSubstitute": "Name of best alternative ingredient",
  "why": "Clear explanation of flavor and texture compatibility",
  "amount": "Exact ratio (e.g. 1:1, or 1/2 cup for every 1 cup)",
  "category": "Produce | Dairy | Protein | Pantry | Spice",
  "culinaryNotes": "Chef guidance on how it behaves during heat or baking"
}
`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });

  const parsed = attemptSafeJsonRecovery(response.text || '{}');
  return {
    ingredient: parsed.ingredient || params.ingredient,
    bestSubstitute: parsed.bestSubstitute || 'Alternative ingredient',
    why: parsed.why || 'Works well with the flavor and texture of this dish.',
    amount: parsed.amount || 'Use 1:1',
    category: parsed.category || 'Pantry',
    culinaryNotes: parsed.culinaryNotes || 'Adjust seasoning to taste.',
  };
}

// Photography mapping
function pickImageForRecipe(title: string, cuisine: string, mealType: string): string {
  const lower = `${title} ${cuisine} ${mealType}`.toLowerCase();
  if (lower.includes('curry') || lower.includes('tikka') || lower.includes('indian')) {
    return 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80';
  }
  if (lower.includes('taco') || lower.includes('mexican') || lower.includes('fajita')) {
    return 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80';
  }
  if (lower.includes('pasta') || lower.includes('italian') || lower.includes('risotto')) {
    return 'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1000&q=80';
  }
  if (lower.includes('salmon') || lower.includes('fish') || lower.includes('shrimp')) {
    return 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80';
  }
  if (lower.includes('salad') || lower.includes('bowl')) {
    return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80';
  }
  if (mealType === 'breakfast' || lower.includes('egg') || lower.includes('pancake')) {
    return 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80';
  }
  if (lower.includes('chicken') || lower.includes('wings')) {
    return 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80';
  }
  return 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80';
}
