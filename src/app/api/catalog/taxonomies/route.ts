import { NextResponse } from 'next/server';
import { CatalogService } from '../../../../../server/services/catalog.service.ts';
import { jsonResponse, errorResponse } from '../../../../lib/api-helper.ts';

export async function GET() {
  try {
    const taxonomies = CatalogService.getTaxonomies();
    return jsonResponse({ success: true, ...taxonomies });
  } catch (err: any) {
    return errorResponse(err, 'Failed to retrieve taxonomies');
  }
}
