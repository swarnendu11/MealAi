/**
 * Approved Food Safety Standards & Temperature Reference Data (USDA / FDA compliant)
 * Used by server-side cooking assistant and client UI to prevent hallucination of unsafe values.
 */

export interface FoodSafetyTemp {
  food: string;
  minInternalTempF: number;
  minInternalTempC: number;
  restTimeMinutes?: number;
  notes: string;
}

export const APPROVED_FOOD_SAFETY_TEMPS: FoodSafetyTemp[] = [
  {
    food: 'Poultry (Whole chicken, turkey, breasts, ground chicken/turkey, stuffing, leftovers)',
    minInternalTempF: 165,
    minInternalTempC: 74,
    notes: 'Must reach 165°F (74°C) measured in the thickest part without touching bone.',
  },
  {
    food: 'Ground Meats (Beef, pork, veal, lamb)',
    minInternalTempF: 160,
    minInternalTempC: 71,
    notes: 'Cook thoroughly until juices run clear; ground meats carry surface bacteria throughout.',
  },
  {
    food: 'Fresh Beef, Pork, Veal, Lamb (Steaks, chops, roasts)',
    minInternalTempF: 145,
    minInternalTempC: 63,
    restTimeMinutes: 3,
    notes: 'Must allow a mandatory 3-minute rest time after removing from heat source for safety and moisture retention.',
  },
  {
    food: 'Fish & Fin Shellfish',
    minInternalTempF: 145,
    minInternalTempC: 63,
    notes: 'Cook until flesh is opaque and flakes easily with a fork.',
  },
  {
    food: 'Shrimp, Lobster, Crab, Scallops',
    minInternalTempF: 145,
    minInternalTempC: 63,
    notes: 'Shellfish flesh becomes pearly and opaque; clams, mussels, oysters open shells when steamed.',
  },
  {
    food: 'Egg Dishes & Casseroles',
    minInternalTempF: 160,
    minInternalTempC: 71,
    notes: 'Cook until yolk and white are firm; egg bakes and quiches must reach 160°F (71°C).',
  },
  {
    food: 'Leftovers & Pre-cooked Foods (Reheating)',
    minInternalTempF: 165,
    minInternalTempC: 74,
    notes: 'Reheat all leftovers rapidly until steaming hot throughout (165°F / 74°C).',
  },
];

export const FOOD_SAFETY_RULES = {
  dangerZone: '40°F to 140°F (4°C to 60°C). Bacteria grow most rapidly in this range.',
  twoHourRule: 'Never leave cooked food or perishables at room temperature for more than 2 hours (1 hour if ambient temp exceeds 90°F / 32°C).',
  thawing: 'Safe thawing methods: 1) In refrigerator, 2) In cold water bath changed every 30 mins, 3) In microwave if cooked immediately. Never thaw on countertop.',
  cooling: 'Cool large pots of soup or stew in shallow containers before refrigerating to drop temperature below 40°F within 2 hours.',
  refrigerationLimit: 'Most cooked leftovers should be consumed within 3 to 4 days, or frozen at 0°F (-18°C) for up to 3 months.',
};
