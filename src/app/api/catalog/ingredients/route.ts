import { NextRequest } from 'next/server';
import { CatalogService } from '../../../../../server/services/catalog.service.ts';
import { jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const result = CatalogService.getIngredients(search, category);
    return jsonResponse({ success: true, ...result });
  } catch (err: any) {
    return errorResponse(err, 'Failed to retrieve catalog ingredients');
  }
}
