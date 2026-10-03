import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { rawIngredients, pantryItems } = body;
    if (!Array.isArray(rawIngredients) || rawIngredients.length === 0) {
      return jsonResponse({ success: false, error: 'No ingredients provided' }, 400);
    }
    const items = await GeminiService.consolidateGroceries(rawIngredients, pantryItems || []);
    return jsonResponse({ success: true, items });
  } catch (err: any) {
    return errorResponse(err, 'Failed to consolidate groceries');
  }
}
