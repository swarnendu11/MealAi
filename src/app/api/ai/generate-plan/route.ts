import { NextRequest } from 'next/server';
import { GeminiService } from '../../../../../server/services/gemini.service.ts';
import { GeneratePlanRequestSchema } from '../../../../types/index.ts';
import { getAuthUid, jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = GeneratePlanRequestSchema.parse(body);
    const authUid = await getAuthUid(req);
    const plan = await GeminiService.generateWeeklyPlan(validatedInput, authUid);
    return jsonResponse({ success: true, plan });
  } catch (err: any) {
    return errorResponse(err, 'Failed to generate meal plan');
  }
}
