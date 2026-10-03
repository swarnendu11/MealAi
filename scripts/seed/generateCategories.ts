/**
 * Category & Taxonomy Generation System for MealAI
 * Generates comprehensive taxonomies across 35+ cuisines, 12 meal types,
 * 12 dietary categories, 12 cooking methods, and 12 appliances.
 */

export interface TaxonomyEntry {
  id: string;
  name: string;
  slug: string;
  category: 'cuisine' | 'mealType' | 'dietaryTag' | 'cookingMethod' | 'appliance';
  description?: string;
  region?: string;
  icon?: string;
}

export const CUISINE_TAXONOMY: TaxonomyEntry[] = [
  // Indian & Regional
  { id: 'indian', name: 'Indian', slug: 'indian', category: 'cuisine', region: 'South Asia', description: 'Vibrant spice blends, aromatic gravies, dals, and flatbreads' },
  { id: 'north-indian', name: 'North Indian', slug: 'north-indian', category: 'cuisine', region: 'India', description: 'Rich gravies, paneer, tandoori preparations, and naan' },
  { id: 'south-indian', name: 'South Indian', slug: 'south-indian', category: 'cuisine', region: 'India', description: 'Fermented dosas, idlis, sambar, coconut-tempered curries' },
  { id: 'punjabi', name: 'Punjabi', slug: 'punjabi', category: 'cuisine', region: 'India', description: 'Robust butter curries, dal makhani, chole, and parathas' },
  { id: 'bengali', name: 'Bengali', slug: 'bengali', category: 'cuisine', region: 'India', description: 'Mustard oil, panch phoron, fish kalia, and delicate sweets' },
  { id: 'gujarati', name: 'Gujarati', slug: 'gujarati', category: 'cuisine', region: 'India', description: 'Sweet-savory balancing, thepla, dhokla, and shaak' },
  { id: 'rajasthani', name: 'Rajasthani', slug: 'rajasthani', category: 'cuisine', region: 'India', description: 'Gatte ki sabzi, dal baati churma, red mathania chili spices' },
  { id: 'maharashtrian', name: 'Maharashtrian', slug: 'maharashtrian', category: 'cuisine', region: 'India', description: 'Poha, misal pav, goda masala, and coconut-peanut gravies' },
  { id: 'kerala', name: 'Kerala', slug: 'kerala', category: 'cuisine', region: 'India', description: 'Coconut milk, curry leaves, Malabar parotta, and pepper stews' },
  { id: 'tamil', name: 'Tamil', slug: 'tamil', category: 'cuisine', region: 'India', description: 'Chettinad pepper spices, rasam, kootu, and tamarind kuzhambu' },
  { id: 'hyderabadi', name: 'Hyderabadi', slug: 'hyderabadi', category: 'cuisine', region: 'India', description: 'Dum biryani, mirchi ka salan, and royal saffron seasonings' },
  { id: 'goan', name: 'Goan', slug: 'goan', category: 'cuisine', region: 'India', description: 'Kokum, vinegar-tangy vindaloo, xacuti, and coastal seafood' },
  { id: 'indo-chinese', name: 'Indo-Chinese', slug: 'indo-chinese', category: 'cuisine', region: 'India', description: 'Hakka noodles, chilli paneer, and garlic-soy sizzlers' },

  // East & Southeast Asian
  { id: 'chinese', name: 'Chinese', slug: 'chinese', category: 'cuisine', region: 'East Asia', description: 'Wok hei stir-fries, dim sum, braises, and savory broths' },
  { id: 'sichuan', name: 'Sichuan', slug: 'sichuan', category: 'cuisine', region: 'China', description: 'Mala numbing Sichuan peppercorns, chili oil, and mapo tofu' },
  { id: 'cantonese', name: 'Cantonese', slug: 'cantonese', category: 'cuisine', region: 'China', description: 'Delicate steamed dim sum, ginger-scallion seasonings, roasts' },
  { id: 'japanese', name: 'Japanese', slug: 'japanese', category: 'cuisine', region: 'East Asia', description: 'Umami dashi, sushi, ramen, teriyaki, and tempura' },
  { id: 'korean', name: 'Korean', slug: 'korean', category: 'cuisine', region: 'East Asia', description: 'Gochujang fermented chili, kimchi, bibimbap, and bulgogi' },
  { id: 'thai', name: 'Thai', slug: 'thai', category: 'cuisine', region: 'Southeast Asia', description: 'Lemongrass, galangal, kaffir lime, coconut milk curries, pad thai' },
  { id: 'vietnamese', name: 'Vietnamese', slug: 'vietnamese', category: 'cuisine', region: 'Southeast Asia', description: 'Herb-rich pho, crispy banh mi, vermicelli bowls, nuoc cham' },
  { id: 'filipino', name: 'Filipino', slug: 'filipino', category: 'cuisine', region: 'Southeast Asia', description: 'Vinegar-soy adobo, tamarind sinigang, and garlic fried rice' },
  { id: 'indonesian', name: 'Indonesian', slug: 'indonesian', category: 'cuisine', region: 'Southeast Asia', description: 'Kecap manis, rendang beef, satay with peanut sauce, nasi goreng' },
  { id: 'malaysian', name: 'Malaysian', slug: 'malaysian', category: 'cuisine', region: 'Southeast Asia', description: 'Roti canai, laksa noodle soup, sambal, and coconut rice' },

  // European & Mediterranean
  { id: 'italian', name: 'Italian', slug: 'italian', category: 'cuisine', region: 'Southern Europe', description: 'Artisanal pasta, wood-fired pizza, extra virgin olive oil, herbs' },
  { id: 'french', name: 'French', slug: 'french', category: 'cuisine', region: 'Western Europe', description: 'Velvety sauces, butter emulsions, braises, and bistro classics' },
  { id: 'spanish', name: 'Spanish', slug: 'spanish', category: 'cuisine', region: 'Southern Europe', description: 'Smoked paprika, saffron paella, gambas al ajillo, and tapas' },
  { id: 'greek', name: 'Greek', slug: 'greek', category: 'cuisine', region: 'Southern Europe', description: 'Feta cheese, kalamata olives, oregano, souvlaki, and tzatziki' },
  { id: 'mediterranean', name: 'Mediterranean', slug: 'mediterranean', category: 'cuisine', region: 'Mediterranean Basin', description: 'Sun-drenched vegetables, olive oil, citrus, fresh seafood, herbs' },

  // Middle Eastern & African
  { id: 'middle-eastern', name: 'Middle Eastern', slug: 'middle-eastern', category: 'cuisine', region: 'Middle East', description: 'Za\'atar, tahini, shawarma, creamy hummus, and sumac salads' },
  { id: 'lebanese', name: 'Lebanese', slug: 'lebanese', category: 'cuisine', region: 'Middle East', description: 'Tabbouleh, fattoush, toum garlic whip, and spiced kofta' },
  { id: 'turkish', name: 'Turkish', slug: 'turkish', category: 'cuisine', region: 'Middle East', description: 'Charred kebabs, pide flatbreads, shakshuka, and yogurt sauces' },
  { id: 'persian', name: 'Persian', slug: 'persian', category: 'cuisine', region: 'Middle East', description: 'Saffron tahdig, barberries, pomegranate-walnut fesenjan' },
  { id: 'moroccan', name: 'Moroccan', slug: 'moroccan', category: 'cuisine', region: 'North Africa', description: 'Slow-simmered tagines, preserved lemons, couscous, and harissa' },
  { id: 'ethiopian', name: 'Ethiopian', slug: 'ethiopian', category: 'cuisine', region: 'East Africa', description: 'Spongy injera flatbread, spicy berbere wats, and split-pea stews' },

  // Americas
  { id: 'mexican', name: 'Mexican', slug: 'mexican', category: 'cuisine', region: 'North America', description: 'Charred chipotles, fresh limes, tacos, mole, and handmade salsa' },
  { id: 'american', name: 'American', slug: 'american', category: 'cuisine', region: 'North America', description: 'Homestyle roasts, burgers, fresh seasonal bowls, and comfort fare' },
  { id: 'southern-american', name: 'Southern American', slug: 'southern-american', category: 'cuisine', region: 'North America', description: 'Buttermilk biscuits, barbecue glaze, greens, and skillet cornbread' },
  { id: 'tex-mex', name: 'Tex-Mex', slug: 'tex-mex', category: 'cuisine', region: 'North America', description: 'Sizzling fajitas, melted queso, enchiladas, and cilantro lime rice' },
  { id: 'caribbean', name: 'Caribbean', slug: 'caribbean', category: 'cuisine', region: 'Caribbean', description: 'Allspice jerk seasoning, scotch bonnet peppers, plantains, rice & peas' },
  { id: 'brazilian', name: 'Brazilian', slug: 'brazilian', category: 'cuisine', region: 'South America', description: 'Feijoada black bean stew, moqueca coconut seafood, and cassava' },
];

export const MEAL_TYPES_TAXONOMY: TaxonomyEntry[] = [
  { id: 'breakfast', name: 'Breakfast', slug: 'breakfast', category: 'mealType', description: 'Energizing morning meals, bowls, eggs, and pancakes' },
  { id: 'brunch', name: 'Brunch', slug: 'brunch', category: 'mealType', description: 'Leisurely mid-morning hearty savory and sweet favorites' },
  { id: 'lunch', name: 'Lunch', slug: 'lunch', category: 'mealType', description: 'Balanced bowls, sandwiches, salads, wraps, and quick plates' },
  { id: 'dinner', name: 'Dinner', slug: 'dinner', category: 'mealType', description: 'Hearty entrees, stews, skillet bakes, and nourishing mains' },
  { id: 'snack', name: 'Snack', slug: 'snack', category: 'mealType', description: 'Quick bites, protein dips, crispy chips, and midday pick-me-ups' },
  { id: 'dessert', name: 'Dessert', slug: 'dessert', category: 'mealType', description: 'Sweet treats, baked goods, puddings, and fruity parfaits' },
  { id: 'appetizer', name: 'Appetizer', slug: 'appetizer', category: 'mealType', description: 'Finger foods, skewers, bruschettas, and opening small plates' },
  { id: 'side', name: 'Side Dish', slug: 'side', category: 'mealType', description: 'Roasted vegetables, grains, seasoned potatoes, and salads' },
  { id: 'soup', name: 'Soup & Stew', slug: 'soup', category: 'mealType', description: 'Comforting warm broths, chowders, dals, and hearty stews' },
  { id: 'salad', name: 'Salad', slug: 'salad', category: 'mealType', description: 'Crisp leafy greens, grain bowls, and vinaigrette dressings' },
  { id: 'beverage', name: 'Beverage & Smoothie', slug: 'beverage', category: 'mealType', description: 'Smoothies, spiced teas, infused waters, and tonics' },
];

export const DIETARY_TAXONOMY: TaxonomyEntry[] = [
  { id: 'vegetarian', name: 'Vegetarian', slug: 'vegetarian', category: 'dietaryTag', description: 'Plant-forward dishes without meat or fish' },
  { id: 'vegan', name: 'Vegan', slug: 'vegan', category: 'dietaryTag', description: 'Entirely plant-based without meat, dairy, eggs, or honey' },
  { id: 'pescatarian', name: 'Pescatarian', slug: 'pescatarian', category: 'dietaryTag', description: 'Plant-forward diet including seafood and shellfish' },
  { id: 'gluten-free', name: 'Gluten-Free', slug: 'gluten-free', category: 'dietaryTag', description: 'Naturally gluten-free or made with certified GF grains' },
  { id: 'dairy-free', name: 'Dairy-Free', slug: 'dairy-free', category: 'dietaryTag', description: 'Free of milk, cheese, butter, and dairy products' },
  { id: 'high-protein', name: 'High Protein', slug: 'high-protein', category: 'dietaryTag', description: 'Provides 30g+ protein per serving for muscle recovery' },
  { id: 'keto', name: 'Keto / Low-Carb', slug: 'keto', category: 'dietaryTag', description: 'High in healthy fats, very low in net carbohydrates' },
  { id: 'paleo', name: 'Paleo', slug: 'paleo', category: 'dietaryTag', description: 'Whole unprocessed foods, lean meats, nuts, seeds, produce' },
  { id: 'low-calorie', name: 'Low Calorie', slug: 'low-calorie', category: 'dietaryTag', description: 'Under 450 calories per serving while maximizing satiety' },
  { id: 'nut-free', name: 'Nut-Free', slug: 'nut-free', category: 'dietaryTag', description: 'Free of peanuts, tree nuts, and nut oils' },
  { id: 'egg-free', name: 'Egg-Free', slug: 'egg-free', category: 'dietaryTag', description: 'Prepared without whole eggs, whites, or yolks' },
];

export const COOKING_METHODS_TAXONOMY: TaxonomyEntry[] = [
  { id: 'stir-fry', name: 'Stir-Fry & Wok', slug: 'stir-fry', category: 'cookingMethod', description: 'Quick high-heat tossing preserving crisp texture' },
  { id: 'roasting', name: 'Roasting & Baking', slug: 'roasting', category: 'cookingMethod', description: 'Oven caramelization for deep savory depth' },
  { id: 'air-frying', name: 'Air-Frying', slug: 'air-frying', category: 'cookingMethod', description: 'Convection crisping with minimal added oil' },
  { id: 'simmering', name: 'Simmering & Stewing', slug: 'simmering', category: 'cookingMethod', description: 'Gentle low-heat melding of spices and aromatics' },
  { id: 'grilling', name: 'Grilling & Charring', slug: 'grilling', category: 'cookingMethod', description: 'Direct heat smoky char and grill marks' },
  { id: 'steaming', name: 'Steaming', slug: 'steaming', category: 'cookingMethod', description: 'Clean moisture cooking preserving vibrant nutrients' },
  { id: 'pan-searing', name: 'Pan-Searing', slug: 'pan-searing', category: 'cookingMethod', description: 'Golden brown crust on skillet or cast iron' },
  { id: 'pressure-cooking', name: 'Pressure Cooking', slug: 'pressure-cooking', category: 'cookingMethod', description: 'Rapid tenderization of legumes, grains, and meats' },
  { id: 'slow-cooking', name: 'Slow Cooking', slug: 'slow-cooking', category: 'cookingMethod', description: 'Low and slow braising developing rich layered sauce' },
  { id: 'raw-prep', name: 'No-Cook / Fresh', slug: 'raw-prep', category: 'cookingMethod', description: 'Fresh chopping, tossing, dressing, or blending' },
];

export const APPLIANCES_TAXONOMY: TaxonomyEntry[] = [
  { id: 'stovetop', name: 'Stovetop / Skillet', slug: 'stovetop', category: 'appliance', description: 'Standard burners, frying pans, and saucepans' },
  { id: 'oven', name: 'Oven', slug: 'oven', category: 'appliance', description: 'Conventional baking and roasting' },
  { id: 'air-fryer', name: 'Air Fryer', slug: 'air-fryer', category: 'appliance', description: 'Countertop high-velocity hot air convection' },
  { id: 'instant-pot', name: 'Instant Pot / Pressure Cooker', slug: 'instant-pot', category: 'appliance', description: 'Programmable high-pressure cooking' },
  { id: 'slow-cooker', name: 'Slow Cooker / Crockpot', slug: 'slow-cooker', category: 'appliance', description: 'Gentle all-day unattended low heat' },
  { id: 'blender', name: 'Blender / Food Processor', slug: 'blender', category: 'appliance', description: 'Pureeing, emulsifying sauces, and pulsing' },
  { id: 'grill', name: 'Outdoor Grill / Griddle', slug: 'grill', category: 'appliance', description: 'Gas, charcoal, or cast iron griddle' },
  { id: 'microwave', name: 'Microwave', slug: 'microwave', category: 'appliance', description: 'Fast steaming, melting, and reheating' },
  { id: 'rice-cooker', name: 'Rice Cooker', slug: 'rice-cooker', category: 'appliance', description: 'Precision grain steaming and one-pot pilafs' },
  { id: 'toaster-oven', name: 'Toaster Oven', slug: 'toaster-oven', category: 'appliance', description: 'Compact broiler and quick crisper' },
];

export function getAllTaxonomies(): Record<string, TaxonomyEntry[]> {
  return {
    cuisines: CUISINE_TAXONOMY,
    mealTypes: MEAL_TYPES_TAXONOMY,
    dietaryTags: DIETARY_TAXONOMY,
    cookingMethods: COOKING_METHODS_TAXONOMY,
    appliances: APPLIANCES_TAXONOMY,
  };
}
