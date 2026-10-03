import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { RecipeSchema } from '../../../../types/index.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';
import { z } from 'zod';

const ModifyRecipeSchema = z.object({
  existingRecipe: RecipeSchema,
  modificationRequest: z.string().min(1, 'Modification instruction is required'),
  pantryItems: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { existingRecipe, modificationRequest, pantryItems } = ModifyRecipeSchema.parse(body);
    const recipe = await GeminiCookingService.modifyRecipe(existingRecipe, modificationRequest, pantryItems || []);
    return jsonResponse({ success: true, recipe });
  } catch (err: any) {
    return errorResponse(err, 'Failed to modify recipe');
  }
}
