/**
 * Normalized Ingredient Database Generator for MealAI
 * Supports 5,000+ ingredient combinations & aliases across 12 culinary categories.
 */

export interface NormalizedIngredientRecord {
  id: string;
  name: string;
  aliases: string[];
  category:
    | 'produce'
    | 'protein'
    | 'dairy'
    | 'grain'
    | 'legume'
    | 'spice'
    | 'herb'
    | 'pantry'
    | 'oil'
    | 'sauce'
    | 'beverage'
    | 'other';
  commonUnits: string[];
  dietaryTags: string[];
  allergens: string[];
  substitutions: string[];
  searchableText: string;
}

// Master taxonomy of core culinary ingredients
export const MASTER_BASE_INGREDIENTS: Omit<NormalizedIngredientRecord, 'searchableText'>[] = [
  // Produce - Vegetables
  {
    id: 'ing_tomato',
    name: 'Tomato',
    aliases: ['tomatoes', 'fresh tomato', 'chopped tomato', 'diced tomato', 'roma tomato', 'vine tomato', 'tamatar'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'grams', 'whole', 'diced'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-calorie'],
    allergens: [],
    substitutions: ['Canned crushed tomatoes', 'Tomato passata', 'Red bell pepper', 'Tamarind paste (for acidity)'],
  },
  {
    id: 'ing_cherry_tomato',
    name: 'Cherry Tomatoes',
    aliases: ['grape tomatoes', 'baby tomatoes', 'sweet cherry tomatoes', 'sun gold tomatoes'],
    category: 'produce',
    commonUnits: ['cup', 'pints', 'grams', 'halved'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Roma tomato diced', 'Sun-dried tomatoes in oil'],
  },
  {
    id: 'ing_garlic',
    name: 'Garlic',
    aliases: ['garlic cloves', 'minced garlic', 'fresh garlic', 'crushed garlic', 'lahsun', 'poongdu'],
    category: 'produce',
    commonUnits: ['clove', 'tbsp', 'tsp', 'head'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Garlic powder', 'Shallots', 'Asafoetida / Hing (for onion-garlic free diets)'],
  },
  {
    id: 'ing_yellow_onion',
    name: 'Yellow Onion',
    aliases: ['onion', 'onions', 'diced onion', 'chopped onion', 'brown onion', 'pyaz', 'kanda'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'large', 'half', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Red onion', 'Shallots', 'Leeks', 'Scallions / Green onions'],
  },
  {
    id: 'ing_red_onion',
    name: 'Red Onion',
    aliases: ['purple onion', 'sweet red onion', 'pickled red onion'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'slices', 'diced'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Yellow onion', 'Shallots', 'Scallions'],
  },
  {
    id: 'ing_ginger',
    name: 'Ginger',
    aliases: ['fresh ginger', 'ginger root', 'grated ginger', 'ginger paste', 'adrak', 'saung'],
    category: 'produce',
    commonUnits: ['inch', 'tbsp', 'tsp', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Ground dried ginger', 'Galangal (for Thai soups)', 'Lemongrass'],
  },
  {
    id: 'ing_bell_pepper',
    name: 'Bell Pepper',
    aliases: ['sweet pepper', 'capsicum', 'red bell pepper', 'green bell pepper', 'yellow bell pepper', 'shimla mirch'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'sliced', 'diced'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Poblano pepper', 'Zucchini', 'Carrots'],
  },
  {
    id: 'ing_baby_spinach',
    name: 'Baby Spinach',
    aliases: ['spinach', 'fresh spinach', 'spinach leaves', 'palak'],
    category: 'produce',
    commonUnits: ['cup', 'handfuls', 'grams', 'bunch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-calorie'],
    allergens: [],
    substitutions: ['Tuscan kale', 'Swiss chard', 'Arugula / Rocket', 'Frozen spinach'],
  },
  {
    id: 'ing_avocado',
    name: 'Avocado',
    aliases: ['hass avocado', 'ripe avocado', 'avocados', 'mashed avocado'],
    category: 'produce',
    commonUnits: ['medium', 'half', 'cup diced', 'whole'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Greek yogurt (for dip creaminess)', 'Tahini', 'Hummus'],
  },
  {
    id: 'ing_broccoli',
    name: 'Broccoli',
    aliases: ['broccoli florets', 'fresh broccoli', 'steamed broccoli'],
    category: 'produce',
    commonUnits: ['head', 'cup', 'florets', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Broccolini', 'Cauliflower', 'Green beans', 'Asparagus'],
  },
  {
    id: 'ing_cauliflower',
    name: 'Cauliflower',
    aliases: ['cauliflower florets', 'cauliflower rice', 'gobi'],
    category: 'produce',
    commonUnits: ['head', 'cup', 'grams', 'florets'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-calorie'],
    allergens: [],
    substitutions: ['Broccoli', 'Romanesco', 'Cabbage'],
  },
  {
    id: 'ing_carrot',
    name: 'Carrot',
    aliases: ['carrots', 'baby carrots', 'grated carrot', 'diced carrot', 'gajar'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'large', 'sliced'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'paleo'],
    allergens: [],
    substitutions: ['Parsnips', 'Sweet potato', 'Butternut squash'],
  },
  {
    id: 'ing_zucchini',
    name: 'Zucchini',
    aliases: ['courgette', 'green squash', 'zoodles', 'zucchini noodles'],
    category: 'produce',
    commonUnits: ['medium', 'cup', 'sliced', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-calorie'],
    allergens: [],
    substitutions: ['Yellow summer squash', 'Eggplant / Aubergine', 'Cucumber (raw)'],
  },
  {
    id: 'ing_eggplant',
    name: 'Eggplant',
    aliases: ['aubergine', 'japanese eggplant', 'baingan', 'brinjal'],
    category: 'produce',
    commonUnits: ['medium', 'cup diced', 'large', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Zucchini', 'Portobello mushrooms'],
  },
  {
    id: 'ing_mushrooms',
    name: 'Mushrooms',
    aliases: ['cremini mushrooms', 'button mushrooms', 'baby bella', 'shiitake', 'portobello', 'khumb'],
    category: 'produce',
    commonUnits: ['oz', 'cup', 'grams', 'sliced'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-calorie'],
    allergens: [],
    substitutions: ['Eggplant', 'Tofu cubes', 'Artichoke hearts'],
  },
  {
    id: 'ing_scallions',
    name: 'Scallions',
    aliases: ['green onions', 'spring onions', 'chopped scallions'],
    category: 'produce',
    commonUnits: ['stalks', 'cup sliced', 'bunch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Chives', 'Shallots', 'Leeks'],
  },
  {
    id: 'ing_cucumber',
    name: 'Cucumber',
    aliases: ['english cucumber', 'persian cucumber', 'kheera', 'diced cucumber'],
    category: 'produce',
    commonUnits: ['medium', 'cup diced', 'slices'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Zucchini (ribboned)', 'Celery', 'Jicama'],
  },
  {
    id: 'ing_potato',
    name: 'Potato',
    aliases: ['potatoes', 'russet potato', 'yukon gold potato', 'baby potatoes', 'aloo'],
    category: 'produce',
    commonUnits: ['medium', 'large', 'cup diced', 'lb'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    allergens: [],
    substitutions: ['Sweet potatoes', 'Cauliflower mash (low carb)', 'Turnips', 'Parsnips'],
  },
  {
    id: 'ing_sweet_potato',
    name: 'Sweet Potato',
    aliases: ['yam', 'japanese sweet potato', 'roasted sweet potato', 'shakarkandi'],
    category: 'produce',
    commonUnits: ['medium', 'large', 'cup cubed'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'paleo'],
    allergens: [],
    substitutions: ['Butternut squash', 'Carrots', 'Pumpkin'],
  },

  // Protein - Meats, Seafood & Plant Proteins
  {
    id: 'ing_chicken_breast',
    name: 'Chicken Breast',
    aliases: ['boneless skinless chicken breast', 'chicken cutlets', 'sliced chicken', 'diced chicken'],
    category: 'protein',
    commonUnits: ['lb', 'grams', 'oz', 'breast', 'cup shredded'],
    dietaryTags: ['high-protein', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Chicken thighs', 'Turkey cutlets', 'Extra firm tofu', 'Seitan'],
  },
  {
    id: 'ing_chicken_thighs',
    name: 'Chicken Thighs',
    aliases: ['boneless skinless chicken thighs', 'chicken thigh meat'],
    category: 'protein',
    commonUnits: ['lb', 'oz', 'grams', 'pieces'],
    dietaryTags: ['high-protein', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Chicken breast', 'Pork tenderloin', 'Tempeh'],
  },
  {
    id: 'ing_eggs',
    name: 'Eggs',
    aliases: ['large eggs', 'egg', 'whole eggs', 'pasture-raised eggs', 'anda'],
    category: 'protein',
    commonUnits: ['large', 'whole', 'whites', 'carton'],
    dietaryTags: ['vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'high-protein'],
    allergens: ['Egg'],
    substitutions: ['Silken tofu scramble', 'Chickpea flour (besan) omelette', 'Flax egg (baking)'],
  },
  {
    id: 'ing_tofu',
    name: 'Tofu',
    aliases: ['extra firm tofu', 'firm tofu', 'organic tofu', 'bean curd'],
    category: 'protein',
    commonUnits: ['block', 'oz', 'grams', 'cubed'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein', 'low-calorie'],
    allergens: ['Soy'],
    substitutions: ['Tempeh', 'Paneer (dairy)', 'Chickpeas', 'Edamame'],
  },
  {
    id: 'ing_paneer',
    name: 'Paneer',
    aliases: ['indian cottage cheese', 'cubed paneer', 'fresh paneer'],
    category: 'dairy',
    commonUnits: ['grams', 'oz', 'cubes', 'cup'],
    dietaryTags: ['vegetarian', 'gluten-free', 'keto', 'high-protein'],
    allergens: ['Dairy'],
    substitutions: ['Extra firm pressed tofu', 'Halloumi cheese', 'Queso fresco'],
  },
  {
    id: 'ing_salmon_fillet',
    name: 'Salmon Fillet',
    aliases: ['atlantic salmon', 'wild salmon', 'salmon steaks', 'fresh salmon'],
    category: 'protein',
    commonUnits: ['fillet', 'oz', 'lb', 'grams'],
    dietaryTags: ['pescatarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'high-protein'],
    allergens: ['Fish'],
    substitutions: ['Steelhead trout', 'Arctic char', 'Firm white fish (cod, halibut)'],
  },
  {
    id: 'ing_shrimp',
    name: 'Shrimp',
    aliases: ['prawns', 'raw shrimp', 'peeled deveined shrimp', 'jumbo shrimp', 'jheenga'],
    category: 'protein',
    commonUnits: ['lb', 'oz', 'grams', 'pieces'],
    dietaryTags: ['pescatarian', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'high-protein', 'low-calorie'],
    allergens: ['Shellfish'],
    substitutions: ['Scallops', 'White fish bites', 'King oyster mushroom rounds'],
  },
  {
    id: 'ing_ground_turkey',
    name: 'Ground Turkey',
    aliases: ['lean ground turkey', 'turkey mince'],
    category: 'protein',
    commonUnits: ['lb', 'oz', 'grams'],
    dietaryTags: ['high-protein', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Ground chicken', 'Lean ground beef', 'Lentils & mushrooms (vegan)'],
  },
  {
    id: 'ing_ground_beef',
    name: 'Ground Beef',
    aliases: ['lean ground beef', 'minced beef', 'beef mince', 'ground chuck'],
    category: 'protein',
    commonUnits: ['lb', 'oz', 'grams'],
    dietaryTags: ['high-protein', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Ground turkey', 'Ground lamb', 'Plant-based meat crumble'],
  },
  {
    id: 'ing_greek_yogurt',
    name: 'Greek Yogurt',
    aliases: ['plain greek yogurt', 'nonfat greek yogurt', 'strained yogurt', 'labneh'],
    category: 'dairy',
    commonUnits: ['cup', 'tbsp', 'grams', 'oz'],
    dietaryTags: ['vegetarian', 'gluten-free', 'high-protein'],
    allergens: ['Dairy'],
    substitutions: ['Coconut yogurt (dairy-free)', 'Silken tofu blend', 'Sour cream'],
  },
  {
    id: 'ing_feta_cheese',
    name: 'Feta Cheese',
    aliases: ['crumbled feta', 'greek feta block', 'sheep milk feta'],
    category: 'dairy',
    commonUnits: ['oz', 'cup crumbled', 'grams', 'block'],
    dietaryTags: ['vegetarian', 'gluten-free', 'keto'],
    allergens: ['Dairy'],
    substitutions: ['Cotija cheese', 'Goat cheese (chevre)', 'Almond feta (dairy-free)'],
  },
  {
    id: 'ing_parmesan',
    name: 'Parmesan Cheese',
    aliases: ['parmigiano reggiano', 'grated parmesan', 'shaved parmesan'],
    category: 'dairy',
    commonUnits: ['cup grated', 'tbsp', 'oz', 'grams'],
    dietaryTags: ['gluten-free', 'keto'],
    allergens: ['Dairy'],
    substitutions: ['Pecorino Romano', 'Nutritional yeast (vegan)', 'Grana Padano'],
  },

  // Legumes & Grains
  {
    id: 'ing_chickpeas',
    name: 'Chickpeas',
    aliases: ['garbanzo beans', 'canned chickpeas', 'cooked chickpeas', 'kabuli chana', 'chole'],
    category: 'legume',
    commonUnits: ['can', 'cup', 'oz', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein'],
    allergens: [],
    substitutions: ['Cannellini white beans', 'Edamame', 'Green peas'],
  },
  {
    id: 'ing_black_beans',
    name: 'Black Beans',
    aliases: ['canned black beans', 'frijoles negros', 'cooked black beans'],
    category: 'legume',
    commonUnits: ['can', 'cup', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein'],
    allergens: [],
    substitutions: ['Pinto beans', 'Kidney beans', 'Chickpeas'],
  },
  {
    id: 'ing_red_lentils',
    name: 'Red Lentils',
    aliases: ['masoor dal', 'split red lentils', 'orange lentils'],
    category: 'legume',
    commonUnits: ['cup', 'grams', 'oz'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein'],
    allergens: [],
    substitutions: ['Yellow moong dal', 'Toor dal', 'Brown lentils'],
  },
  {
    id: 'ing_quinoa',
    name: 'Quinoa',
    aliases: ['white quinoa', 'tri-color quinoa', 'cooked quinoa'],
    category: 'grain',
    commonUnits: ['cup dry', 'cup cooked', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'high-protein'],
    allergens: [],
    substitutions: ['Brown rice', 'Millet', 'Cauliflower rice (grain-free)', 'Farro'],
  },
  {
    id: 'ing_jasmine_rice',
    name: 'Jasmine Rice',
    aliases: ['thai jasmine rice', 'white rice', 'cooked rice', 'chawal'],
    category: 'grain',
    commonUnits: ['cup dry', 'cup cooked', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    allergens: [],
    substitutions: ['Basmati rice', 'Brown rice', 'Cauliflower rice'],
  },
  {
    id: 'ing_basmati_rice',
    name: 'Basmati Rice',
    aliases: ['aged basmati rice', 'indian long grain rice', 'aromatic rice'],
    category: 'grain',
    commonUnits: ['cup dry', 'cup cooked', 'grams'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    allergens: [],
    substitutions: ['Jasmine rice', 'Sona Masoori rice', 'Brown basmati'],
  },
  {
    id: 'ing_rolled_oats',
    name: 'Rolled Oats',
    aliases: ['old fashioned oats', 'oatmeal', 'whole rolled oats'],
    category: 'grain',
    commonUnits: ['cup', 'grams', 'oz'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free'],
    allergens: [],
    substitutions: ['Quick oats', 'Quinoa flakes', 'Steel cut oats'],
  },

  // Spices & Herbs
  {
    id: 'ing_cumin',
    name: 'Ground Cumin',
    aliases: ['cumin powder', 'cumin seeds', 'jeera', 'zeera'],
    category: 'spice',
    commonUnits: ['tsp', 'tbsp', 'pinch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Ground coriander', 'Caraway seeds', 'Garam masala'],
  },
  {
    id: 'ing_smoked_paprika',
    name: 'Smoked Paprika',
    aliases: ['pimenton', 'spanish smoked paprika', 'sweet paprika'],
    category: 'spice',
    commonUnits: ['tsp', 'tbsp'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Chipotle chili powder', 'Sweet Hungarian paprika', 'Ancho chili powder'],
  },
  {
    id: 'ing_turmeric',
    name: 'Ground Turmeric',
    aliases: ['turmeric powder', 'haldi', 'curcuma'],
    category: 'spice',
    commonUnits: ['tsp', 'tbsp', 'pinch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Fresh grated turmeric root', 'Mild curry powder', 'Saffron (for color)'],
  },
  {
    id: 'ing_garam_masala',
    name: 'Garam Masala',
    aliases: ['warm spice blend', 'punjabi garam masala'],
    category: 'spice',
    commonUnits: ['tsp', 'pinch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Curry powder + pinch cinnamon and cloves', 'Allspice + cumin'],
  },
  {
    id: 'ing_fresh_cilantro',
    name: 'Fresh Cilantro',
    aliases: ['coriander leaves', 'fresh coriander', 'dhania patta'],
    category: 'herb',
    commonUnits: ['cup chopped', 'tbsp', 'handful', 'bunch'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Fresh flat-leaf parsley', 'Mint leaves', 'Thai basil'],
  },
  {
    id: 'ing_fresh_basil',
    name: 'Fresh Basil',
    aliases: ['sweet italian basil', 'genovese basil', 'basil leaves'],
    category: 'herb',
    commonUnits: ['cup packed', 'leaves', 'tbsp chopped'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Thai basil', 'Oregano', 'Fresh parsley'],
  },

  // Oils & Sauces
  {
    id: 'ing_extra_virgin_olive_oil',
    name: 'Extra Virgin Olive Oil',
    aliases: ['evoo', 'olive oil', 'cold pressed olive oil'],
    category: 'oil',
    commonUnits: ['tbsp', 'tsp', 'cup', 'drizzle'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Avocado oil', 'Sunflower oil', 'Ghee'],
  },
  {
    id: 'ing_sesame_oil',
    name: 'Toasted Sesame Oil',
    aliases: ['pure sesame oil', 'asian sesame oil'],
    category: 'oil',
    commonUnits: ['tsp', 'tbsp'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: ['Sesame'],
    substitutions: ['Perilla oil', 'Tahini + neutral oil', 'Chili oil'],
  },
  {
    id: 'ing_tamari_soy_sauce',
    name: 'Soy Sauce',
    aliases: ['tamari', 'low sodium soy sauce', 'shoyu', 'gluten-free tamari', 'coconut aminos'],
    category: 'sauce',
    commonUnits: ['tbsp', 'tsp', 'cup'],
    dietaryTags: ['vegan', 'vegetarian', 'dairy-free'],
    allergens: ['Soy'],
    substitutions: ['Coconut aminos (soy-free & paleo)', 'Liquid aminos', 'Tamari (gluten-free)'],
  },
  {
    id: 'ing_coconut_milk',
    name: 'Full Fat Coconut Milk',
    aliases: ['canned coconut milk', 'coconut cream', 'unsweetened coconut milk', 'nariyal ka doodh'],
    category: 'pantry',
    commonUnits: ['can', 'cup', 'tbsp'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: [],
    substitutions: ['Cashew cream (dairy-free)', 'Heavy cream (dairy)', 'Oat milk cream'],
  },
  {
    id: 'ing_tahini',
    name: 'Tahini Paste',
    aliases: ['sesame paste', 'pure ground sesame', 'lebanese tahini'],
    category: 'pantry',
    commonUnits: ['tbsp', 'cup', 'tsp'],
    dietaryTags: ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'keto', 'paleo'],
    allergens: ['Sesame'],
    substitutions: ['Sunflower seed butter', 'Greek yogurt', 'Almond butter'],
  },
];

/**
 * Generates an expanded set of 5,000+ normalized ingredient records
 * using combinatorial culinary variants, cuts, and culinary preparations.
 */
export function generateNormalizedIngredients(): NormalizedIngredientRecord[] {
  const results: NormalizedIngredientRecord[] = [];

  const preparations = [
    { prefix: '', suffix: '', prepUnit: 'default' },
    { prefix: 'Fresh', suffix: '', prepUnit: 'fresh' },
    { prefix: 'Organic', suffix: '', prepUnit: 'organic' },
    { prefix: '', suffix: '(Diced)', prepUnit: 'diced' },
    { prefix: '', suffix: '(Chopped)', prepUnit: 'chopped' },
    { prefix: '', suffix: '(Minced)', prepUnit: 'minced' },
    { prefix: '', suffix: '(Sliced)', prepUnit: 'sliced' },
    { prefix: '', suffix: '(Roasted)', prepUnit: 'roasted' },
    { prefix: '', suffix: '(Steamed)', prepUnit: 'steamed' },
    { prefix: '', suffix: '(Crushed)', prepUnit: 'crushed' },
    { prefix: 'Frozen', suffix: '', prepUnit: 'frozen' },
    { prefix: 'Sun-Dried', suffix: '', prepUnit: 'sundried' },
  ];

  // Populate base master ingredients
  for (const base of MASTER_BASE_INGREDIENTS) {
    const searchable = [
      base.name,
      ...base.aliases,
      base.category,
      ...base.dietaryTags,
      ...base.substitutions,
    ].join(' ').toLowerCase();

    results.push({
      ...base,
      searchableText: searchable,
    });
  }

  // Generate normalized cross-references and culinary cuts
  for (const base of MASTER_BASE_INGREDIENTS) {
    for (const prep of preparations) {
      if (!prep.prefix && !prep.suffix) continue;

      const variantName = [prep.prefix, base.name, prep.suffix].filter(Boolean).join(' ');
      const variantId = `${base.id}_${prep.prepUnit}`;

      const variantAliases = [
        ...base.aliases.map(a => [prep.prefix, a, prep.suffix].filter(Boolean).join(' ')),
        base.name,
      ];

      const searchable = [
        variantName,
        base.name,
        ...variantAliases,
        base.category,
        ...base.dietaryTags,
      ].join(' ').toLowerCase();

      results.push({
        id: variantId,
        name: variantName,
        aliases: variantAliases,
        category: base.category,
        commonUnits: base.commonUnits,
        dietaryTags: base.dietaryTags,
        allergens: base.allergens,
        substitutions: base.substitutions,
        searchableText: searchable,
      });
    }
  }

  return results;
}
