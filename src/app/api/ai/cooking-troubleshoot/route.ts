import { NextRequest } from 'next/server';
import { GeminiCookingService } from '../../../../../server/services/geminiCookingService.ts';
import { requireAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    await requireAuthUid(req);
    const body = await req.json();
    const { problem, recipeContext, currentStep } = body;
    if (!problem) {
      return jsonResponse({ success: false, error: 'Problem description required' }, 400);
    }
    const result = await GeminiCookingService.troubleshootCooking(problem, recipeContext, currentStep);
    return jsonResponse({ success: true, ...result });
  } catch (err: any) {
    return errorResponse(err, 'Failed to troubleshoot cooking');
  }
}
