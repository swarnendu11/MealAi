import { getGeminiClient, GEMINI_MODEL } from '../config/gemini.ts';
import { Recipe, RecipeSchema, normalizeRecipeData } from '../../src/types/index.ts';
import { APPROVED_FOOD_SAFETY_TEMPS, FOOD_SAFETY_RULES } from '../data/foodSafety.ts';
import { z } from 'zod';

export interface CookingAssistantMessage {
  role: 'user' | 'model';
  content: string;
}

export interface CookingAssistantRequest {
  recipe: Recipe;
  question: string;
  history?: CookingAssistantMessage[];
  currentStepIndex?: number | null;
  pantryItems?: string[];
  userPreferences?: {
    dietary?: string[];
    allergies?: string[];
  };
}

export interface SubstitutionResult {
  currentIngredient: string;
  substitutes: {
    name: string;
    ratio: string;
    notes: string;
    cookingImpact: string;
    flavorProfile: string;
    dietary: string[];
    allergens: string[];
    safetyWarning?: string;
  }[];
}

export interface TroubleshootingResult {
  problem: string;
  likelyCause: string;
  immediateFix: string;
  nextSteps: string;
  preventionTip: string;
}

export class GeminiCookingService {
  /**
   * Helper to strip markdown formatting fences and parse JSON safely
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
   * Builds rich structured context for MealAI Chef
   */
  private static buildCookingChefContext(req: CookingAssistantRequest): string {
    const { recipe, currentStepIndex, pantryItems, userPreferences } = req;
    const instructions = recipe.instructions || [];
    
    let stepFocusText = 'The cook is currently viewing the recipe overview.';
    if (typeof currentStepIndex === 'number' && currentStepIndex >= 0 && currentStepIndex < instructions.length) {
      const cur = instructions[currentStepIndex];
      const prev = currentStepIndex > 0 ? instructions[currentStepIndex - 1] : null;
      const next = currentStepIndex < instructions.length - 1 ? instructions[currentStepIndex + 1] : null;

      stepFocusText = `
CURRENT COOKING STEP CONTEXT:
- ACTIVE STEP: Step ${cur.step} of ${instructions.length}
  * Title: ${cur.title || 'Untitled Step'}
  * Instruction: "${cur.instruction}"
  * Timer: ${cur.timerMinutes ? `${cur.timerMinutes} minutes` : 'None'}
  * In-Step Tip: ${cur.tip || 'None'}
${prev ? `- PREVIOUS STEP (Step ${prev.step}): "${prev.instruction}"` : '- PREVIOUS STEP: None (This is the first step)'}
${next ? `- NEXT STEP (Step ${next.step}): "${next.instruction}"` : '- NEXT STEP: None (This is the final step)'}
`;
    }

    const foodSafetyReference = APPROVED_FOOD_SAFETY_TEMPS.map(
      t => `• ${t.food}: min ${t.minInternalTempF}°F (${t.minInternalTempC}°C)${t.restTimeMinutes ? ` with ${t.restTimeMinutes}-min rest` : ''} - ${t.notes}`
    ).join('\n');

    return `
You are "MealAI Chef", a world-class, Michelin-trained personal chef and culinary mentor.
You are helping a home cook cook this exact recipe right now:

RECIPE TITLE: "${recipe.title}"
CUISINE: ${recipe.cuisine} | REGION: ${recipe.region || 'Standard'}
SERVINGS: ${recipe.servings} | DIFFICULTY: ${recipe.difficulty}
PREP TIME: ${recipe.prepTime} mins | COOK TIME: ${recipe.cookTime} mins | TOTAL: ${recipe.totalTime} mins
DIETARY: ${(recipe.dietaryTags || recipe.dietary || []).join(', ') || 'None specified'}
ALLERGENS: ${(recipe.allergens || []).join(', ') || 'None specified'}
EQUIPMENT: ${(recipe.appliances || []).join(', ') || 'Standard cookware'}

INGREDIENTS:
${recipe.ingredients.map(i => `- ${i.amount} ${i.unit} ${i.name}${i.note ? ` (${i.note})` : ''}`).join('\n')}

ALL STEPS:
${instructions.map(i => `${i.step}. ${i.title ? `[${i.title}] ` : ''}${i.instruction}${i.timerMinutes ? ` (${i.timerMinutes} min timer)` : ''}`).join('\n')}

${stepFocusText}

${pantryItems && pantryItems.length ? `USER'S AVAILABLE PANTRY INGREDIENTS:\n${pantryItems.join(', ')}\n` : ''}
${userPreferences ? `USER PREFERENCES:\nDietary: ${userPreferences.dietary?.join(', ') || 'Standard'}, Allergies: ${userPreferences.allergies?.join(', ') || 'None'}\n` : ''}

STRICT FOOD SAFETY REFERENCE (USDA/FDA STANDARDS - NEVER HALLUCINATE DIFFERENT TEMPERATURES):
${foodSafetyReference}
Rules:
- Danger zone: ${FOOD_SAFETY_RULES.dangerZone}
- 2-hour rule: ${FOOD_SAFETY_RULES.twoHourRule}
- Leftovers: ${FOOD_SAFETY_RULES.refrigerationLimit}

GUIDELINES FOR YOUR RESPONSE:
1. Always maintain the persona of "MealAI Chef" — supportive, direct, encouraging, precise, and practical.
2. If the user asks about the current step (e.g. "Why do I do this now?", "How hot should the pan be?"), ground your answer specifically in Step ${typeof currentStepIndex === 'number' ? currentStepIndex + 1 : 1}.
3. For food safety (doneness of chicken, meat, fish, pork, eggs, cooling, reheating), give accurate, conservative USDA temperature advice. Clearly distinguish safety requirements from taste preferences.
4. For substitutions, suggest exact conversion ratios (e.g. 1 tbsp butter = 2 tsp olive oil) and note how texture or flavor will shift.
5. If the user reports an issue (e.g. "it's too salty", "my sauce is burning", "curry is too watery"), provide an immediate, calming fix first, then explain why it happened.
6. Use concise paragraphs or bullet points so it is easy to read on a mobile screen while hands are busy cooking.
`;
  }

  /**
   * 1. Streaming Cooking Assistant (Async generator for SSE)
   */
  public static async *chatCookingAssistantStream(
    req: CookingAssistantRequest,
    abortSignal?: AbortSignal
  ): AsyncGenerator<string, void, unknown> {
    const ai = getGeminiClient();
    if (!ai) {
      yield 'I am here to guide your cooking. Maintain moderate heat and check tenderness with a fork.';
      return;
    }

    const systemContext = this.buildCookingChefContext(req);
    const history = (req.history || []).map(h => ({
      role: h.role,
      parts: [{ text: h.content }],
    }));

    const contents = [
      { role: 'user', parts: [{ text: `SYSTEM CONTEXT & RECIPE DATA:\n${systemContext}` }] },
      { role: 'model', parts: [{ text: `Understood! I am MealAI Chef, ready to guide you through cooking "${req.recipe.title}". How can I help you?` }] },
      ...history.map(m => ({
        role: m.role,
        parts: m.parts,
      })),
      { role: 'user', parts: [{ text: req.question }] },
    ];

    try {
      const responseStream = await ai.models.generateContentStream({
        model: GEMINI_MODEL,
        contents,
        config: {
          temperature: 0.4,
          maxOutputTokens: 1000,
        },
      });

      for await (const chunk of responseStream) {
        if (abortSignal?.aborted) {
          break;
        }
        const text = chunk.text;
        if (text) {
          yield text;
        }
      }
    } catch (err: any) {
      if (abortSignal?.aborted) return;
      console.error('[GeminiCookingService] Stream error:', err);
      yield `\n[MealAI Chef]: I'm right here with you! If your heat is too high, lower it to medium-low while we adjust.`;
    }
  }

  /**
   * 2. Synchronous Cooking Assistant
   */
  public static async chatCookingAssistant(req: CookingAssistantRequest): Promise<string> {
    let fullText = '';
    for await (const chunk of this.chatCookingAssistantStream(req)) {
      fullText += chunk;
    }
    return fullText.trim();
  }

  /**
   * 3. AI Recipe Modification (Structured, returns validated Recipe)
   */
  public static async modifyRecipe(
    existingRecipe: Recipe,
    modificationInstruction: string,
    pantryItems: string[] = []
  ): Promise<Recipe> {
    const ai = getGeminiClient();
    if (!ai) {
      return {
        ...existingRecipe,
        id: `rec_mod_${Date.now()}`,
        title: `${existingRecipe.title} (Modified)`,
        description: `${existingRecipe.description} Adapted for: ${modificationInstruction}`,
        updatedAt: new Date().toISOString(),
      };
    }

    const prompt = `
You are MealAI's master culinary recipe architect.
Modify the following recipe according to the user's explicit instruction: "${modificationInstruction}".

${pantryItems.length ? `User's Available Pantry Items to utilize where possible: ${pantryItems.join(', ')}` : ''}

ORIGINAL RECIPE:
${JSON.stringify(existingRecipe, null, 2)}

REQUIREMENTS:
1. Preserve the core flavor soul and structure of the original dish while faithfully adapting it (e.g. if vegetarian, replace meat/fish with paneer, tofu, mushrooms, or legumes; if air fryer, adjust temperatures and timings).
2. Recalculate nutrition (calories, protein, carbs, fat, fiber) realistically.
3. Update ingredients with exact amounts, units, categories, and prep notes.
4. Update step-by-step instructions with realistic timerMinutes.
5. Return ONLY a valid JSON object matching the Recipe schema.

Return this JSON structure:
{
  "title": "Modified Title",
  "slug": "modified-title-slug",
  "description": "Appetizing description highlighting the modification.",
  "cuisine": "${existingRecipe.cuisine}",
  "region": "${existingRecipe.region || ''}",
  "mealType": "${existingRecipe.mealType}",
  "mealTypes": ${JSON.stringify(existingRecipe.mealTypes || [existingRecipe.mealType])},
  "difficulty": "${existingRecipe.difficulty}",
  "prepTime": 15,
  "cookTime": 25,
  "totalTime": 40,
  "servings": ${existingRecipe.servings},
  "calories": 450,
  "protein": 30,
  "carbs": 35,
  "fat": 15,
  "fiber": 6,
  "dietary": ["Vegetarian"],
  "dietaryTags": ["Vegetarian"],
  "allergens": [],
  "appliances": ["Stovetop"],
  "cookingMethods": ["Sauté", "Simmer"],
  "tags": ["modified", "dinner"],
  "ingredients": [
    { "name": "Item Name", "amount": "1", "unit": "cup", "category": "Produce", "note": "diced" }
  ],
  "instructions": [
    { "step": 1, "title": "Step Title", "instruction": "Clear instructions", "timerMinutes": 5, "tip": "Chef tip" }
  ],
  "tips": ["Chef tip 1", "Chef tip 2"],
  "substitutions": [
    { "originalIngredient": "Original", "substituteIngredient": "Substitute", "ratio": "1:1", "notes": "Taste notes" }
  ],
  "imageUrl": "${existingRecipe.imageUrl || ''}"
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    const validated = RecipeSchema.parse({
      ...parsed,
      id: `rec_mod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      userId: existingRecipe.userId || 'system',
      source: 'modified_recipe',
      sourceType: 'generated',
      isPublic: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return normalizeRecipeData(validated);
  }

  /**
   * 4. Dedicated Substitution Engine
   */
  public static async substituteIngredient(
    ingredientName: string,
    recipeContext?: string,
    dietaryRestriction?: string
  ): Promise<SubstitutionResult> {
    const ai = getGeminiClient();
    if (!ai) {
      return {
        currentIngredient: ingredientName,
        substitutes: [
          {
            name: 'Generic Pantry Alternative',
            ratio: '1:1',
            notes: 'Standard 1:1 substitute in equal volume.',
            cookingImpact: 'Minimal difference in texture.',
            flavorProfile: 'Neutral',
            dietary: ['Vegetarian'],
            allergens: [],
          },
        ],
      };
    }

    const prompt = `
You are MealAI's professional ingredient substitution scientist.
Find 3-4 top culinary substitutions for: "${ingredientName}".
${recipeContext ? `Recipe Context: "${recipeContext}"` : ''}
${dietaryRestriction ? `Dietary Restriction / Goal: "${dietaryRestriction}"` : ''}

RULES:
- Provide exact culinary ratios (e.g. "1 tbsp butter = 2 tsp olive oil" or "1 egg = 1/4 cup unsweetened applesauce").
- Explain the cooking impact (e.g., changes in browning, moisture, rise, or density).
- If allergy risk exists (e.g. nuts, dairy, soy, gluten), clearly state it.
- Never recommend unsafe substitutions (e.g. raw starch without cooking, or toxic wild mushrooms).

Return ONLY JSON:
{
  "currentIngredient": "${ingredientName}",
  "substitutes": [
    {
      "name": "Alternative Name",
      "ratio": "e.g. 1 tbsp to 1 tbsp (1:1)",
      "notes": "Culinary note explaining why this works",
      "cookingImpact": "Slightly crispier texture; browns faster",
      "flavorProfile": "Nutty, savory",
      "dietary": ["Vegan", "Dairy-Free"],
      "allergens": [],
      "safetyWarning": ""
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    return {
      currentIngredient: ingredientName,
      substitutes: parsed.substitutes || [],
    };
  }

  /**
   * 5. Cooking Troubleshooter (4-part structure)
   */
  public static async troubleshootCooking(
    problem: string,
    recipeContext?: string,
    currentStep?: string
  ): Promise<TroubleshootingResult> {
    const ai = getGeminiClient();
    if (!ai) {
      return {
        problem,
        likelyCause: 'Heat level too high or moisture evaporated too quickly.',
        immediateFix: 'Reduce burner to low and add 2 tablespoons of warm water or broth.',
        nextSteps: 'Stir continuously until consistency stabilizes.',
        preventionTip: 'Maintain medium-low heat and monitor pan moisture frequently.',
      };
    }

    const prompt = `
You are MealAI Chef's emergency kitchen troubleshooter.
A home cook is facing this immediate problem: "${problem}".
${recipeContext ? `Recipe: "${recipeContext}"` : ''}
${currentStep ? `Active Step: "${currentStep}"` : ''}

Provide structured, 4-part emergency culinary triage:
1. likelyCause: Why this happened.
2. immediateFix: What the cook can do RIGHT NOW in 30 seconds to rescue the dish.
3. nextSteps: How to proceed through the rest of the recipe safely.
4. preventionTip: What technique prevents this in future cooking.

Keep every answer concise, reassuring, practical, and food-safe.

Return JSON:
{
  "problem": "${problem}",
  "likelyCause": "...",
  "immediateFix": "...",
  "nextSteps": "...",
  "preventionTip": "..."
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    return {
      problem,
      likelyCause: parsed.likelyCause || 'Heat variance or moisture imbalance.',
      immediateFix: parsed.immediateFix || 'Lower heat immediately and add a splash of liquid or acid.',
      nextSteps: parsed.nextSteps || 'Taste and adjust seasonings gently before continuing.',
      preventionTip: parsed.preventionTip || 'Use a heavy-bottomed skillet and monitor temperatures closely.',
    };
  }

  /**
   * 6. Natural Language Search & Query Parsing
   */
  public static async parseNaturalLanguageSearch(query: string) {
    const ai = getGeminiClient();
    if (!ai) {
      return { query, parsedFilters: {} };
    }

    const prompt = `
Extract structured search parameters from this natural language recipe query: "${query}".
Output JSON:
{
  "cuisine": "e.g. Indian, Italian or null",
  "maxTotalTime": number or null,
  "dietaryTag": "e.g. Vegetarian, Vegan, High-Protein, Keto or null",
  "mealType": "e.g. dinner, breakfast, lunch or null",
  "keyIngredients": ["chicken", "curry"],
  "servings": number or null
}
`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = this.parseJsonSafely(response.text || '{}');
    return { query, parsedFilters: parsed };
  }
}
