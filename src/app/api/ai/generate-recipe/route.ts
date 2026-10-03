import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { GenerateRecipeRequestSchema } from '../../../../types/index.ts';
import { getAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = GenerateRecipeRequestSchema.parse(body);
    const authUid = await getAuthUid(req);
    const recipe = await GeminiService.generateRecipe(validatedInput, authUid);
    return jsonResponse({ success: true, recipe });
  } catch (err: any) {
    return errorResponse(err, 'Failed to generate recipe');
  }
}
