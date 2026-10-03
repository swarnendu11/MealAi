import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { imageBase64, mimeType } = body;
    if (!imageBase64) {
      return jsonResponse({ success: false, error: 'No image provided' }, 400);
    }
    const data = await GeminiService.analyzeIngredientsImage(imageBase64, mimeType);
    return jsonResponse({ success: true, ...data });
  } catch (err: any) {
    return errorResponse(err, 'Failed to analyze image');
  }
}
