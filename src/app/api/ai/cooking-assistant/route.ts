import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { recipe, question, history, currentStepIndex, pantryItems, userPreferences } = body;
    if (!recipe || !question) {
      return jsonResponse({ success: false, error: 'Recipe and question are required' }, 400);
    }
    const answer = await GeminiCookingService.chatCookingAssistant({
      recipe,
      question,
      history,
      currentStepIndex,
      pantryItems,
      userPreferences,
    });
    return jsonResponse({ success: true, answer });
  } catch (err: any) {
    return errorResponse(err, 'Failed to get cooking assistant answer');
  }
}
