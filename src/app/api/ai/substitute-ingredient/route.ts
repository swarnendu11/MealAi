import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { ingredient, recipeContext, dietaryRestriction } = body;
    if (!ingredient) {
      return jsonResponse({ success: false, error: 'Ingredient required' }, 400);
    }
    const data = await GeminiCookingService.substituteIngredient(ingredient, recipeContext, dietaryRestriction);
    return jsonResponse({ success: true, ...data });
  } catch (err: any) {
    return errorResponse(err, 'Failed to substitute ingredient');
  }
}
