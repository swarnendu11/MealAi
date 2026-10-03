import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowRight,
  Clock,
  Flame,
  Plus,
  X,
  Compass,
  Calendar,
  Package,
  Heart,
  ChefHat,
  Sparkles,
  Check,
  Play,
  RotateCcw,
  SlidersHorizontal,
  Search,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe } from '../types/index.ts';
import { MealAILogo } from './MealAILogo.tsx';

interface LandingPageProps {
  onStartGenerate: (initialIngredients?: string[]) => void;
  onStartPlan: () => void;
  onExplore: () => void;
  onOpenPantry?: () => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

const CRAVINGS = [
  { id: 'Spicy', label: 'Spicy & Bold', icon: '🌶️', active: 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-md shadow-orange-500/25 border-transparent' },
  { id: 'Fresh', label: 'Fresh & Crisp', icon: '🥗', active: 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 border-transparent' },
  { id: 'Comforting', label: 'Warm & Comforting', icon: '🍲', active: 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-md shadow-amber-500/25 border-transparent' },
  { id: 'Quick', label: 'Fast & Easy', icon: '⚡', active: 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 border-transparent' },
  { id: 'High-Protein', label: 'High Protein', icon: '🥩', active: 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-md shadow-rose-500/25 border-transparent' },
];

const getIngredientColorStyle = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('chicken') || lower.includes('beef') || lower.includes('salmon') || lower.includes('pork') || lower.includes('meat') || lower.includes('fish') || lower.includes('egg')) {
    return 'bg-rose-50 text-rose-900 border-rose-200 hover:border-rose-400 hover:bg-rose-100';
  }
  if (lower.includes('rice') || lower.includes('pasta') || lower.includes('grain') || lower.includes('bread') || lower.includes('noodle') || lower.includes('oat')) {
    return 'bg-amber-50 text-amber-900 border-amber-200 hover:border-amber-400 hover:bg-amber-100';
  }
  if (lower.includes('garlic') || lower.includes('onion') || lower.includes('shallot') || lower.includes('ginger')) {
    return 'bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-400 hover:bg-purple-100';
  }
  if (lower.includes('tomato') || lower.includes('pepper') || lower.includes('chili') || lower.includes('carrot') || lower.includes('paprika')) {
    return 'bg-orange-50 text-orange-900 border-orange-200 hover:border-orange-400 hover:bg-orange-100';
  }
  return 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100';
};

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartGenerate,
  onStartPlan,
  onExplore,
  onOpenPantry,
  onSelectRecipe,
}) => {
  const { setShowAuthModal } = useAuth();
  const { catalogRecipes, pantry, currentPlan, recipes, startCooking, calculatePantryMatch } = useMeal();

  // 1. Dynamic Hero Recipe (live from catalog or recipes)
  const heroRecipe = useMemo<Recipe | null>(() => {
    if (catalogRecipes && catalogRecipes.length > 0) {
      const withImg = catalogRecipes.find(r => r.imageUrl && r.ingredients && r.ingredients.length > 0);
      if (withImg) return withImg;
      return catalogRecipes[0];
    }
    return recipes[0] || null;
  }, [catalogRecipes, recipes]);

  // 2. Real-time Pantry Ingredients (synced from user's live pantry)
  const [kitchenIngredients, setKitchenIngredients] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [selectedCraving, setSelectedCraving] = useState<string>('Spicy');

  // Synchronize kitchen ingredients with user's live pantry
  useEffect(() => {
    if (pantry && pantry.length > 0) {
      setKitchenIngredients(pantry.slice(0, 8).map(p => p.name));
    } else if (heroRecipe && heroRecipe.ingredients) {
      setKitchenIngredients(heroRecipe.ingredients.slice(0, 5).map(i => i.name));
    } else {
      setKitchenIngredients(['Chicken Breast', 'Garlic', 'Basmati Rice', 'Tomatoes']);
    }
  }, [pantry, heroRecipe]);

  const addIngredient = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    if (!kitchenIngredients.map(i => i.toLowerCase()).includes(clean.toLowerCase())) {
      setKitchenIngredients([...kitchenIngredients, clean]);
    }
    setInputVal('');
  };

  const removeIngredient = (name: string) => {
    setKitchenIngredients(kitchenIngredients.filter((i) => i !== name));
  };

  const handleCreateMeal = () => {
    onStartGenerate(kitchenIngredients);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onStartGenerate([searchVal.trim()]);
    } else {
      onExplore();
    }
  };

  // 3. Dynamic Real-time Recipe Matching based on currently selected ingredients
  const matchingRecipes = useMemo(() => {
    if (!kitchenIngredients || kitchenIngredients.length === 0) return [];
    const pool = catalogRecipes.length > 0 ? catalogRecipes : recipes;
    const lowerTerms = kitchenIngredients.map(k => k.toLowerCase());
    return pool.filter(r =>
      r.ingredients?.some(i => lowerTerms.some(term => i.name.toLowerCase().includes(term)))
    );
  }, [kitchenIngredients, catalogRecipes, recipes]);

  // 4. Dynamic Discovery Recipes (pulled live from catalog with images)
  const discoveryRecipes = useMemo(() => {
    const pool = catalogRecipes.length > 0 ? catalogRecipes : recipes;
    const withImages = pool.filter(r => r.imageUrl);
    if (withImages.length >= 4) {
      return withImages.slice(0, 4);
    }
    return pool.slice(0, 4);
  }, [catalogRecipes, recipes]);

  // 5. Dynamic Weekly Meal Plan (live from currentPlan, or generated from catalog recipes)
  const dynamicWeeklyDays = useMemo(() => {
    const daysConfig = [
      { key: 'monday', label: 'MON', bg: 'bg-gradient-to-b from-amber-50 to-white border-amber-300 shadow-amber-100/50', badge: 'bg-amber-500 text-white' },
      { key: 'tuesday', label: 'TUE', bg: 'bg-gradient-to-b from-emerald-50 to-white border-emerald-300 shadow-emerald-100/50', badge: 'bg-emerald-600 text-white' },
      { key: 'wednesday', label: 'WED', bg: 'bg-gradient-to-b from-sky-50 to-white border-sky-300 shadow-sky-100/50', badge: 'bg-sky-600 text-white' },
      { key: 'thursday', label: 'THU', bg: 'bg-gradient-to-b from-orange-50 to-white border-orange-300 shadow-orange-100/50', badge: 'bg-orange-600 text-white' },
      { key: 'friday', label: 'FRI', bg: 'bg-gradient-to-b from-purple-50 to-white border-purple-300 shadow-purple-100/50', badge: 'bg-purple-600 text-white' },
    ];

    const pool = catalogRecipes.length > 0 ? catalogRecipes : recipes;

    return daysConfig.map((day, idx) => {
      // Check if user has an existing live plan
      const planDay = currentPlan?.days?.[day.key as keyof typeof currentPlan.days];

      const breakfast = planDay?.breakfast?.title || pool[(idx * 3) % pool.length]?.title || 'Breakfast Bowl';
      const lunch = planDay?.lunch?.title || pool[(idx * 3 + 1) % pool.length]?.title || 'Chef Salad';
      const dinner = planDay?.dinner?.title || pool[(idx * 3 + 2) % pool.length]?.title || 'Dinner Entree';

      return {
        ...day,
        breakfast,
        lunch,
        dinner,
      };
    });
  }, [currentPlan, catalogRecipes, recipes]);

  // 6. Dynamic Cooking Mode Preview (uses real first instruction of hero recipe)
  const cookingStep = useMemo(() => {
    if (heroRecipe && heroRecipe.instructions && heroRecipe.instructions.length > 0) {
      const step = heroRecipe.instructions[0];
      return {
        stepNumber: step.step || 1,
        totalSteps: heroRecipe.instructions.length,
        instruction: step.instruction || 'Prep your ingredients and preheat your cookware.',
        recipeTitle: heroRecipe.title,
        timerMinutes: step.timerMinutes || 1,
      };
    }
    return {
      stepNumber: 1,
      totalSteps: 4,
      instruction: 'Add the minced garlic and sliced chili to the hot olive oil. Sauté for 30 seconds until intensely fragrant.',
      recipeTitle: 'Chef Recipe',
      timerMinutes: 1,
    };
  }, [heroRecipe]);

  // Real Pantry Matching Staples Count for Hero Recipe
  const heroPantryMatch = useMemo(() => {
    if (!heroRecipe) return { matched: 3, total: 5 };
    const res = calculatePantryMatch(heroRecipe);
    return {
      matched: res.matchedCount || 0,
      total: heroRecipe.ingredients?.length || 5,
    };
  }, [heroRecipe, calculatePantryMatch]);

  return (
    <div className="pb-20 space-y-16 sm:space-y-24">
      {/* 1. CINEMATIC COLORFUL CULINARY HERO (100% REALTIME DYNAMIC) */}
      <section className="relative pt-4 sm:pt-10 lg:pt-14">
        {/* Ambient Warm Gradient Blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-rose-400/10 blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headline, Description & Realtime Search */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="space-y-4">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 text-[#123524] text-xs font-bold border border-emerald-300/60 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>
                  AI-Powered Culinary Studio · {catalogRecipes.length > 0 ? `${catalogRecipes.length.toLocaleString()}+ Live Recipes` : '10,000+ Live Recipes'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#191E1A] tracking-tight leading-[1.1]">
                Cook something <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D95F3F] via-[#E5832E] to-[#123524]">
                  worth remembering.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#525B55] leading-relaxed max-w-xl font-normal">
                Recipes, personalized meal plans, and an intelligent cooking companion designed for how you actually live and eat.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                onClick={onExplore}
                className="px-7 py-3.5 rounded-full bg-[#123524] hover:bg-[#1A4B34] text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-emerald-950/20 active:scale-98 cursor-pointer"
              >
                <span>Explore Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => (onOpenPantry ? onOpenPantry() : onExplore())}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF6F0] text-[#191E1A] font-bold text-sm border-2 border-[#E2D8C7] hover:border-[#D95F3F] transition-all shadow-2xs active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-[#D95F3F]" />
                <span>Pantry ({pantry.length} items)</span>
              </button>
            </div>

            {/* Quick Craving Search */}
            <div className="pt-2 space-y-3 max-w-lg">
              <span className="block text-xs font-bold uppercase tracking-wider text-[#6B756E]">
                What are you craving today?
              </span>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D95F3F]" />
                <input
                  type="text"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="e.g. Garlic Butter Salmon, Quick Curry, High-Protein..."
                  className="w-full pl-11 pr-24 py-3.5 rounded-2xl border-2 border-[#E2D8C7] bg-white text-sm text-[#191E1A] placeholder:text-[#9AA29D] font-medium shadow-sm focus:outline-hidden focus:border-[#D95F3F] transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D95F3F] to-[#E5832E] text-white font-bold text-xs hover:brightness-110 shadow-xs cursor-pointer"
                >
                  Find
                </button>
              </form>

              {/* Realtime Category tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '⚡ Quick Under 30m', query: 'Quick' },
                  { label: '🥗 High Protein', query: 'High-Protein' },
                  { label: '🌱 Vegetarian', query: 'Vegetarian' },
                  { label: '🍛 Indian Curries', query: 'Indian' },
                  { label: '🍕 Italian Pasta', query: 'Italian' },
                ].map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => onStartGenerate([tag.query])}
                    className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E2D8C7] text-[#47524B] hover:text-[#123524] hover:border-[#22C55E] hover:bg-emerald-50/50 transition-all shadow-2xs cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card (Dynamically driven by heroRecipe) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-5/4 group bg-[#EFE8DC] border-4 border-white">
              <img
                src={heroRecipe?.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'}
                alt={heroRecipe?.title || 'Featured Chef Recipe'}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Floating Live Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#123524]/90 backdrop-blur-md text-emerald-300 text-xs font-bold border border-emerald-500/40 shadow-md">
                ✨ Featured {heroRecipe?.cuisine || 'Chef'} Recipe
              </div>

              {/* Bottom Card Overlay with Realtime Recipe Metrics */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E2D8C7] shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-black text-[#D95F3F]">
                    {heroRecipe?.cuisine ? `${heroRecipe.cuisine.toUpperCase()} SPECIAL` : "TONIGHT'S INSPIRATION"}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                    {heroRecipe?.protein ? `${heroRecipe.protein}g Protein` : 'High Protein'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191E1A] mt-1.5 leading-snug">
                  {heroRecipe?.title || 'Crispy Chili Chicken with Garlic Rice'}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#525B55] mt-2 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D95F3F]" />
                    <span>{heroRecipe?.totalTime || (heroRecipe?.prepTime || 10) + (heroRecipe?.cookTime || 15)} min</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500" />
                    <span>{heroRecipe?.calories || 480} kcal</span>
                  </span>
                  <span>·</span>
                  <span>Serves {heroRecipe?.servings || 2}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (heroRecipe && onSelectRecipe) {
                        onSelectRecipe(heroRecipe);
                      } else if (heroRecipe) {
                        onStartGenerate(heroRecipe.ingredients?.map(i => i.name) || []);
                      }
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#123524] hover:bg-[#1A4B34] px-4 py-2 rounded-full transition-all shadow-xs cursor-pointer active:scale-98"
                  >
                    <span>View Recipe Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-[#6B756E] font-medium">
                    {heroPantryMatch.matched} of {heroPantryMatch.total} pantry staples
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. REAL-TIME STATS STRIP */}
      <section className="py-5 px-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-[#123524] to-[#1C3E2F] text-white shadow-lg border border-emerald-700/40">
        <div className="flex flex-wrap items-center justify-around gap-6">
          {[
            { icon: '🥘', title: `${catalogRecipes.length > 0 ? catalogRecipes.length.toLocaleString() : '1,000'}+ Tested Recipes`, desc: 'Live catalog across 13 global cuisines' },
            { icon: '🥗', title: `${currentPlan ? 'Active Weekly Plan' : 'Personalized Meal Plans'}`, desc: currentPlan ? 'Loaded and tailored to your household' : 'Diet, calorie & pantry tailored' },
            { icon: '🧄', title: `Pantry: ${pantry.length} Ingredients`, desc: 'Realtime zero food waste calculations' },
            { icon: '⏱️', title: 'Hands-Free Digital Chef', desc: 'Step-by-step guidance & live timers' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-white">{item.title}</p>
                <p className="text-xs text-[#B3C9BE]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE PANTRY STUDIO (REALTIME INVENTORY & LIVE RECIPE MATCHING) */}
      <section className="bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EB] to-[#F5EFE1] rounded-3xl p-6 sm:p-10 lg:p-12 border-2 border-[#E8DEC9] shadow-md">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-black text-[#D95F3F]">
              PANTRY INTELLIGENCE STUDIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191E1A]">
              What's in your kitchen right now?
            </h2>
            <p className="text-sm text-[#525B55] max-w-xl mx-auto">
              Add your fridge and cupboard ingredients. MealAI dynamically searches {catalogRecipes.length.toLocaleString()} recipes to find matches with zero food waste.
            </p>
          </div>

          {/* Ingredient chips & input container */}
          <div className="p-5 sm:p-7 rounded-2xl bg-white border border-[#E2D8C7] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {kitchenIngredients.map((ing, idx) => (
                <span
                  key={`${ing}_${idx}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border shadow-2xs transition-all ${getIngredientColorStyle(ing)}`}
                >
                  <span>{ing}</span>
                  <button
                    onClick={() => removeIngredient(ing)}
                    className="p-0.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                    title={`Remove ${ing}`}
                  >
                    <X className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                  </button>
                </span>
              ))}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addIngredient(inputVal);
                }}
                className="inline-flex items-center"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="+ Add ingredient"
                  className="text-xs font-bold bg-[#FAF6F0] border-2 border-dashed border-[#D2C5B0] hover:border-[#D95F3F] rounded-full px-4 py-2 focus:outline-hidden focus:border-[#D95F3F] focus:bg-white text-[#191E1A] placeholder:text-[#887F72] transition-all"
                />
              </form>
            </div>

            {/* Quick add suggestions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#F0EBE1] overflow-x-auto text-xs text-[#6B756E]">
              <span className="font-semibold shrink-0">Quick add:</span>
              {['Bell Pepper', 'Onion', 'Salmon', 'Pasta', 'Ginger', 'Spinach', 'Greek Yogurt', 'Avocado'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => addIngredient(item)}
                  className="px-2.5 py-1 rounded-md bg-[#FAF6F0] hover:bg-[#F2ECE0] text-[#191E1A] font-medium border border-[#E2D8C7] shrink-0 cursor-pointer transition-colors"
                >
                  + {item}
                </button>
              ))}
            </div>

            {/* Dynamic Realtime Feedback Banner */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs text-emerald-900">
              <span className="font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>
                  MealAI found <strong>{matchingRecipes.length} live recipes</strong> matching your current ingredients!
                </span>
              </span>
              {matchingRecipes.length > 0 && (
                <button
                  onClick={() => {
                    const topMatch = matchingRecipes[0];
                    if (topMatch && onSelectRecipe) onSelectRecipe(topMatch);
                    else handleCreateMeal();
                  }}
                  className="font-bold text-[#123524] underline hover:text-[#D95F3F] cursor-pointer"
                >
                  View top match ({matchingRecipes[0]?.title}) →
                </button>
              )}
            </div>
          </div>

          {/* Craving selector & action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
            <div>
              <span className="block text-xs uppercase tracking-wider font-bold text-[#6B756E] mb-2.5">
                What are you in the mood for?
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {CRAVINGS.map((craving) => {
                  const isSelected = selectedCraving === craving.id;
                  return (
                    <button
                      key={craving.id}
                      onClick={() => setSelectedCraving(craving.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? craving.active
                          : 'bg-white text-[#47524B] hover:text-[#191E1A] border border-[#E2D8C7] hover:border-amber-400 shadow-2xs'
                      }`}
                    >
                      <span>{craving.icon}</span>
                      <span>{craving.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleCreateMeal}
              className="sm:self-end px-8 py-4 rounded-full bg-gradient-to-r from-[#D95F3F] via-[#E5832E] to-[#F59E0B] hover:brightness-110 active:scale-98 text-white font-black text-sm transition-all shadow-lg shadow-orange-950/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Generate My Meal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WEEKLY MEAL PLANNER SHOWCASE (100% REALTIME DYNAMIC) */}
      <section className="space-y-8 bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#E2D8C7] shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-2">
          <span className="text-xs uppercase tracking-widest font-black text-[#D95F3F]">
            SEVEN-DAY RHYTHM
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191E1A]">
            Your entire week of delicious eating, solved.
          </h2>
          <p className="text-sm text-[#525B55]">
            Considers your dietary preferences, allergies, pantry inventory, cooking time, and household size.
          </p>
        </div>

        {/* 5-Column Preview Grid - dynamically populated with live recipes */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {dynamicWeeklyDays.map((item) => (
            <div
              key={item.key}
              onClick={onStartPlan}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 shadow-md hover:shadow-xl hover:-translate-y-1 min-w-[240px] sm:min-w-0 snap-center ${item.bg}`}
            >
              <span className={`text-[11px] uppercase tracking-widest font-black px-3 py-1 rounded-full inline-block shadow-2xs ${item.badge}`}>
                {item.label}
              </span>
              <div className="space-y-2 text-xs">
                <p className="text-[#333C36] truncate">
                  <strong className="text-amber-800 font-bold">B:</strong> {item.breakfast}
                </p>
                <p className="text-[#333C36] truncate">
                  <strong className="text-emerald-800 font-bold">L:</strong> {item.lunch}
                </p>
                <p className="text-[#333C36] truncate">
                  <strong className="text-[#D95F3F] font-bold">D:</strong> {item.dinner}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onStartPlan}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#123524] hover:text-[#D95F3F] transition-colors cursor-pointer"
          >
            <span>Plan My Week Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. DIGITAL SOUS CHEF (COOKING MODE PREVIEW - REALTIME RECIPE STEP) */}
      <section className="bg-gradient-to-br from-[#0B1E16] via-[#123524] to-[#1C4331] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient glow circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-widest font-black text-amber-400">
              HANDS-FREE COOKING COMPANION
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Cook with total confidence.
            </h3>
            <p className="text-base text-[#C2D8CD] leading-relaxed">
              Step-by-step guidance with built-in voice assistance, multi-dish timers, and instant ingredient substitutions right when you're at the stove.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (heroRecipe) startCooking(heroRecipe);
                }}
                className="px-6 py-3 rounded-full bg-[#E5A72E] hover:bg-[#F5B53D] text-[#0B1E16] font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try Cooking Mode</span>
              </button>
            </div>
          </div>

          {/* Interactive Cooking Step Mockup with Real Data */}
          <div className="lg:col-span-6 bg-black/40 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 shadow-xl space-y-5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-400 font-bold">
                STEP {cookingStep.stepNumber} OF {cookingStep.totalSteps}
              </span>
              <span className="text-[#A5BDB0] truncate max-w-[200px]">{cookingStep.recipeTitle}</span>
            </div>

            <p className="font-serif text-xl sm:text-2xl text-white font-normal leading-relaxed">
              "{cookingStep.instruction}"
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="font-mono text-2xl font-black text-amber-300 px-4 py-1.5 rounded-xl bg-amber-400/20 border border-amber-400/30">
                0{cookingStep.timerMinutes}:00
              </span>
              <button
                onClick={() => {
                  if (heroRecipe) startCooking(heroRecipe);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#0B1E16] font-black text-xs transition-colors cursor-pointer shadow-md"
              >
                Start Timer
              </button>
              <button
                onClick={() => {
                  if (heroRecipe) startCooking(heroRecipe);
                }}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer border border-white/15"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CURATED RECIPE DISCOVERY SHOWCASE (100% REALTIME DYNAMIC FROM CATALOG) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b-2 border-[#E2D8C7] pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest font-black text-[#D95F3F]">
              CHEF-TESTED FAVORITES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#191E1A] mt-1">
              Find your next favorite meal.
            </h2>
          </div>
          <button
            onClick={onExplore}
            className="text-xs font-bold text-[#123524] hover:text-[#D95F3F] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Explore all {catalogRecipes.length > 0 ? `${catalogRecipes.length.toLocaleString()}+` : ''} recipes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {discoveryRecipes.map((card, i) => (
            <div
              key={card.id || i}
              onClick={() => {
                if (onSelectRecipe) {
                  onSelectRecipe(card);
                } else {
                  onStartGenerate(card.ingredients?.map(ing => ing.name) || [card.title]);
                }
              }}
              className="group cursor-pointer space-y-3 min-w-[280px] sm:min-w-0 snap-start bg-white p-3.5 rounded-2xl border-2 border-[#E2D8C7] hover:border-[#D95F3F] transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#EFE8DC] relative">
                <img
                  src={card.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                />
                <span className="absolute top-2.5 left-2.5 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md bg-[#123524] text-white">
                  {card.dietary?.[0] || card.cuisine || 'Chef Pick'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[#6B756E] font-medium">
                  <span className="text-[#D95F3F] font-bold">{card.cuisine || 'Global'}</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{card.totalTime || (card.prepTime || 10) + (card.cookTime || 15)} min</span>
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#191E1A] group-hover:text-[#123524] transition-colors leading-snug line-clamp-1">
                  {card.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="rounded-3xl bg-gradient-to-br from-[#123524] via-[#1B4B34] to-[#C8522F] text-white p-10 sm:p-16 text-center space-y-6 shadow-2xl relative overflow-hidden border-2 border-emerald-500/30">
        <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-xl mx-auto space-y-3 relative z-10">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            So, what are we cooking tonight?
          </h2>
          <p className="text-sm sm:text-base text-[#D4E4D3] leading-relaxed">
            Give MealAI a few ingredients from your fridge and let it craft your next unforgettable meal.
          </p>
        </div>

        <div className="pt-2 relative z-10">
          <button
            onClick={() => onStartGenerate(kitchenIngredients)}
            className="px-9 py-4 rounded-full bg-white hover:bg-[#FAF6F0] text-[#123524] font-black text-sm transition-all shadow-xl active:scale-98 hover:shadow-2xl cursor-pointer"
          >
            Create My First Recipe →
          </button>
        </div>
      </section>
    </div>
  );
};
