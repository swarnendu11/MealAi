import { ai, GEMINI_MODEL } from './gemini.ts';
import { Recipe } from '../../types/index.ts';

export interface CookingAssistantParams {
  recipe: Recipe;
  currentStepIndex?: number;
  question: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}

export async function askCookingAssistant(params: {
  recipe: Recipe;
  currentStepIndex?: number;
  question: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
}): Promise<string> {
  const currentStep = typeof params.currentStepIndex === 'number' && params.recipe.instructions[params.currentStepIndex]
    ? params.recipe.instructions[params.currentStepIndex]
    : null;

  const previousStep = typeof params.currentStepIndex === 'number' && params.currentStepIndex > 0
    ? params.recipe.instructions[params.currentStepIndex - 1]
    : null;

  const nextStep = typeof params.currentStepIndex === 'number' && params.currentStepIndex < params.recipe.instructions.length - 1
    ? params.recipe.instructions[params.currentStepIndex + 1]
    : null;

  const systemContext = `
You are MealAI's live cooking assistant speaking to a home cook currently in the kitchen.
Current Dish: "${params.recipe.title}" (${params.recipe.cuisine}, ${params.recipe.servings} servings)
Ingredients: ${params.recipe.ingredients.map(i => `${i.amount} ${i.unit} ${i.name}`).join(', ')}

${currentStep ? `
USER IS CURRENTLY ON STEP ${currentStep.step}:
"${currentStep.title}": ${currentStep.instruction}
${currentStep.timerMinutes ? `Timer: ${currentStep.timerMinutes} minutes` : ''}

${previousStep ? `Previous Step ${previousStep.step}: ${previousStep.instruction}` : ''}
${nextStep ? `Upcoming Step ${nextStep.step}: ${nextStep.instruction}` : ''}
` : `
Full Instructions:
${params.recipe.instructions.map(i => `${i.step}. ${i.instruction}`).join('\n')}
`}

RULES:
1. Provide concise, direct, culinary-accurate guidance focused on the home cook's immediate question.
2. Give clear sensory cues (e.g. smell, color, sizzle sound, touch resistance).
3. Do not invent details not present in the recipe chemistry.
4. Keep answers under 3-4 sentences so the cook can read it quickly while handling hot pans.
`;

  const contents = [
    { role: 'user', parts: [{ text: `${systemContext}\n\nUser Question: ${params.question}` }] },
  ];

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.5,
      },
    });

    return response.text?.trim() || 'Keep heat balanced and adjust seasoning as desired.';
  } catch (err: any) {
    console.error('Cooking assistant error:', err);
    return 'For best results, maintain medium heat and test for doneness with a fork or thermometer.';
  }
}
