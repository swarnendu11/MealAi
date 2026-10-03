import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const meal = await GeminiService.regenerateMeal(body);
    return jsonResponse({ success: true, meal });
  } catch (err: any) {
    return errorResponse(err, 'Failed to regenerate meal');
  }
}
