import { NextRequest } from 'next/server';
import { CatalogService } from '../../../../../server/services/catalog.service.ts';
import { jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const cuisine = searchParams.get('cuisine') || undefined;
    const mealType = searchParams.get('mealType') || undefined;
    const dietary = searchParams.get('dietary') || undefined;
    const appliance = searchParams.get('appliance') || undefined;
    const cookingMethod = searchParams.get('cookingMethod') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const maxTime = searchParams.get('maxTime') ? Number(searchParams.get('maxTime')) : undefined;
    const pantry = searchParams.get('pantry') || undefined;

    const result = CatalogService.getRecipes({
      search,
      cuisine,
      mealType,
      dietary,
      appliance,
      cookingMethod,
      difficulty,
      maxTime,
      pantry,
    });

    return jsonResponse({ success: true, ...result });
  } catch (err: any) {
    return errorResponse(err, 'Failed to retrieve catalog recipes');
  }
}
