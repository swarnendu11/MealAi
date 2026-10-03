import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { getAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const dietary = body?.dietary || 'balanced';
    const authUid = await getAuthUid(req);
    const recipe = await GeminiService.surpriseMe(dietary, authUid);
    return jsonResponse({ success: true, recipe });
  } catch (err: any) {
    return errorResponse(err, 'Failed to generate surprise recipe');
  }
}
