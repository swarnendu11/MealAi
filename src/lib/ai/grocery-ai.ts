import { ai, GEMINI_MODEL } from './gemini.ts';

export interface ConsolidatedGroceryItem {
  name: string;
  quantity: string;
  category: 'Produce' | 'Protein' | 'Dairy' | 'Grains' | 'Pantry' | 'Frozen' | 'Other';
  note?: string;
}

/**
 * Deterministic ingredient combining:
 * Normalizes case and merges exact count duplicates before AI processing
 */
export function combineIngredientsDeterministically(items: { name: string; amount?: string; unit?: string }[]): Map<string, { totalAmount: number; unit: string; rawNames: string[] }> {
  const merged = new Map<string, { totalAmount: number; unit: string; rawNames: string[] }>();

  items.forEach(item => {
    const cleanName = item.name.trim().toLowerCase();
    const num = parseFloat(item.amount || '1') || 1;
    const unit = (item.unit || '').trim().toLowerCase();

    const key = `${cleanName}__${unit}`;
    const existing = merged.get(key);
    if (existing) {
      existing.totalAmount += num;
      existing.rawNames.push(item.name);
    } else {
      merged.set(key, { totalAmount: num, unit: item.unit || '', rawNames: [item.name] });
    }
  });

  return merged;
}

/**
 * Smart AI grocery list consolidation and aisle categorization
 */
export async function consolidateGroceryListWithAI(
  rawIngredients: string[],
  pantryItems: string[] = []
): Promise<ConsolidatedGroceryItem[]> {
  if (!rawIngredients.length) return [];

  const prompt = `
You are MealAI's smart grocery aggregator.
The user has generated a weekly meal plan with these required ingredients:
${rawIngredients.join('\n')}

${pantryItems.length ? `Items ALREADY IN USER PANTRY (exclude or flag): ${pantryItems.join(', ')}` : ''}

Task:
1. Combine duplicates where practical.
2. Estimate realistic supermarket shopping quantities.
3. Categorize each item into EXACTLY ONE standard supermarket aisle:
   - "Produce"
   - "Protein"
   - "Dairy"
   - "Grains"
   - "Pantry"
   - "Frozen"
   - "Other"

Return ONLY a valid JSON object in this format:
{
  "items": [
    {
      "name": "Chicken Breast",
      "quantity": "800g (approx 4 breasts)",
      "category": "Protein",
      "note": "Fresh"
    },
    {
      "name": "Yellow Onions",
      "quantity": "3 whole",
      "category": "Produce",
      "note": ""
    }
  ]
}
`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return Array.isArray(parsed.items) ? parsed.items : [];
  } catch (err) {
    console.error('AI grocery consolidation error, using fallback:', err);
    // Fallback: simple deterministic mapping
    return rawIngredients.map(ing => ({
      name: ing,
      quantity: '1',
      category: 'Pantry' as const,
    }));
  }
}
