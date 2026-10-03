/**
 * Mathematical Ingredient Quantity Scaler
 * Accurately parses, scales, and formats ingredient amounts when servings change.
 */

import { RecipeIngredient } from '../types/index.ts';

// Common fractional lookup table
const FRACTIONS: [number, string][] = [
  [0.125, '1/8'],
  [0.25, '1/4'],
  [0.333, '1/3'],
  [0.375, '3/8'],
  [0.5, '1/2'],
  [0.625, '5/8'],
  [0.666, '2/3'],
  [0.75, '3/4'],
  [0.875, '7/8'],
];

/**
 * Parses numeric value from strings like "1.5", "1 1/2", "2-3", "500", "0.25"
 */
export function parseNumericAmount(amountStr: string): number | null {
  if (!amountStr) return null;
  const cleaned = amountStr.trim().toLowerCase();

  // If already a simple number
  const directNum = parseFloat(cleaned);
  if (!isNaN(directNum) && !cleaned.includes('/') && !cleaned.includes(' ') && !cleaned.includes('-')) {
    return directNum;
  }

  // Handle range like "2-3" -> take average
  if (cleaned.includes('-')) {
    const parts = cleaned.split('-').map(p => parseFloat(p.trim())).filter(n => !isNaN(n));
    if (parts.length === 2) {
      return (parts[0] + parts[1]) / 2;
    }
  }

  // Handle mixed fraction e.g. "1 1/2" or "2 1/4"
  if (cleaned.includes(' ') && cleaned.includes('/')) {
    const [wholePart, fracPart] = cleaned.split(' ');
    const whole = parseFloat(wholePart);
    if (!isNaN(whole) && fracPart.includes('/')) {
      const [num, den] = fracPart.split('/').map(p => parseFloat(p));
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return whole + (num / den);
      }
    }
  }

  // Handle pure fraction e.g. "1/2" or "3/4"
  if (cleaned.includes('/')) {
    const [num, den] = cleaned.split('/').map(p => parseFloat(p));
    if (!isNaN(num) && !isNaN(den) && den !== 0) {
      return num / den;
    }
  }

  return isNaN(directNum) ? null : directNum;
}

/**
 * Formats a scaled decimal number back into clean culinary notation
 */
export function formatScaledAmount(val: number): string {
  if (val <= 0) return '0';

  // For large quantities (e.g. grams/ml >= 10), round to integer
  if (val >= 10) {
    return Math.round(val).toString();
  }

  const whole = Math.floor(val);
  const remainder = val - whole;

  // Check if remainder is very close to zero
  if (remainder < 0.05) {
    return whole.toString();
  }
  // Check if remainder is close to 1
  if (remainder > 0.95) {
    return (whole + 1).toString();
  }

  // Match against standard fractions
  for (const [dec, frac] of FRACTIONS) {
    if (Math.abs(remainder - dec) < 0.06) {
      return whole > 0 ? `${whole} ${frac}` : frac;
    }
  }

  // Otherwise format to 1 decimal place max
  return val.toFixed(1).replace(/\.0$/, '');
}

/**
 * Scales an entire ingredient list by servings ratio
 */
export function scaleIngredients(
  ingredients: RecipeIngredient[],
  baseServings: number,
  targetServings: number
): RecipeIngredient[] {
  if (baseServings <= 0 || targetServings <= 0 || baseServings === targetServings) {
    return ingredients;
  }

  const factor = targetServings / baseServings;

  return ingredients.map((ing) => {
    const num = parseNumericAmount(ing.amount);
    if (num === null) {
      return ing;
    }

    const scaled = num * factor;
    return {
      ...ing,
      amount: formatScaledAmount(scaled),
    };
  });
}
