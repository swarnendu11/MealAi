import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { query } = body;
    if (!query) {
      return jsonResponse({ success: false, error: 'Query string required' }, 400);
    }
    const result = await GeminiCookingService.parseNaturalLanguageSearch(query);
    return jsonResponse({ success: true, ...result });
  } catch (err: any) {
    return errorResponse(err, 'Failed to parse natural language search');
  }
}
