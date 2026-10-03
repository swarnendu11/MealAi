import { NextRequest } from 'next/server';
import { CatalogService } from '../../../../../../server/services/catalog.service.ts';
import { jsonResponse, errorResponse } from '../../../../../lib/api-helper.ts';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipe = CatalogService.getRecipeById(id);
    if (!recipe) {
      return jsonResponse({ success: false, error: 'Recipe not found' }, 404);
    }
    return jsonResponse({ success: true, recipe });
  } catch (err: any) {
    return errorResponse(err, 'Failed to retrieve recipe');
  }
}
