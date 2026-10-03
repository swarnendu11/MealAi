// High quality culinary photography mapped by keywords & cuisines
export const FOOD_IMAGES: Record<string, string[]> = {
  chicken: [
    'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=1000&q=80',
  ],
  pasta: [
    'https://images.unsplash.com/photo-1621996346565-e3d5d6281724?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1000&q=80',
  ],
  salad: [
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80',
  ],
  rice: [
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=1000&q=80',
  ],
  soup: [
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?auto=format&fit=crop&w=1000&q=80',
  ],
  fish: [
    'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1000&q=80',
  ],
  breakfast: [
    'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80',
  ],
  indian: [
    'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=80',
  ],
  mexican: [
    'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1000&q=80',
  ],
  asian: [
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80',
  ],
  mediterranean: [
    'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1505253758473-96b46d5f6983?auto=format&fit=crop&w=1000&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1000&q=80',
  ],
};

export function selectImageForRecipe(
  title: string,
  cuisine: string,
  mealType: string,
  ingredients: string[] = []
): string {
  const combined = `${title} ${cuisine} ${mealType} ${ingredients.join(' ')}`.toLowerCase();

  if (combined.includes('curry') || combined.includes('tikka') || combined.includes('biryani') || combined.includes('indian')) {
    return FOOD_IMAGES.indian[Math.floor(Math.random() * FOOD_IMAGES.indian.length)];
  }
  if (combined.includes('taco') || combined.includes('fajita') || combined.includes('burrito') || combined.includes('mexican') || combined.includes('salsa')) {
    return FOOD_IMAGES.mexican[Math.floor(Math.random() * FOOD_IMAGES.mexican.length)];
  }
  if (combined.includes('ramen') || combined.includes('noodle') || combined.includes('stir fry') || combined.includes('asian') || combined.includes('teriyaki')) {
    return FOOD_IMAGES.asian[Math.floor(Math.random() * FOOD_IMAGES.asian.length)];
  }
  if (combined.includes('pasta') || combined.includes('spaghetti') || combined.includes('lasagna') || combined.includes('penne') || combined.includes('italian')) {
    return FOOD_IMAGES.pasta[Math.floor(Math.random() * FOOD_IMAGES.pasta.length)];
  }
  if (mealType === 'breakfast' || combined.includes('pancake') || combined.includes('egg') || combined.includes('toast') || combined.includes('oat')) {
    return FOOD_IMAGES.breakfast[Math.floor(Math.random() * FOOD_IMAGES.breakfast.length)];
  }
  if (combined.includes('chicken') || combined.includes('poultry')) {
    return FOOD_IMAGES.chicken[Math.floor(Math.random() * FOOD_IMAGES.chicken.length)];
  }
  if (combined.includes('salmon') || combined.includes('shrimp') || combined.includes('fish') || combined.includes('seafood') || combined.includes('tuna')) {
    return FOOD_IMAGES.fish[Math.floor(Math.random() * FOOD_IMAGES.fish.length)];
  }
  if (combined.includes('salad') || combined.includes('bowl') || combined.includes('greens')) {
    return FOOD_IMAGES.salad[Math.floor(Math.random() * FOOD_IMAGES.salad.length)];
  }
  if (combined.includes('soup') || combined.includes('stew') || combined.includes('chili') || combined.includes('broth')) {
    return FOOD_IMAGES.soup[Math.floor(Math.random() * FOOD_IMAGES.soup.length)];
  }
  if (combined.includes('rice') || combined.includes('risotto')) {
    return FOOD_IMAGES.rice[Math.floor(Math.random() * FOOD_IMAGES.rice.length)];
  }
  if (combined.includes('mediterranean') || combined.includes('greek')) {
    return FOOD_IMAGES.mediterranean[Math.floor(Math.random() * FOOD_IMAGES.mediterranean.length)];
  }

  return FOOD_IMAGES.default[Math.floor(Math.random() * FOOD_IMAGES.default.length)];
}
