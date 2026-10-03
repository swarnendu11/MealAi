import React, { useState, useMemo } from 'react';
import {
  X,
  Play,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  Clock,
  Sparkles,
  Users,
  Flame,
  ChefHat,
  Plus,
  Minus,
  RefreshCw,
  Package,
  ShieldCheck,
  Utensils,
  Lightbulb,
  Thermometer,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe, RecipeIngredient } from '../types/index.ts';
import { scaleIngredients } from '../lib/ingredientScaler.ts';
import { MealAIChefChat } from './MealAIChefChat.tsx';
import { APPROVED_FOOD_SAFETY_TEMPS } from '../data/foodSafety.ts';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onOpenCooking: (recipe: Recipe) => void;
  onOpenSubstitution: (ingredientName: string, recipeTitle: string) => void;
  onSelectRelatedRecipe?: (recipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  onClose,
  onOpenCooking,
  onOpenSubstitution,
  onSelectRelatedRecipe,
}) => {
  if (!recipe) return null;

  const {
    toggleFavorite,
    addRecipeIngredientsToGrocery,
    addGroceryItem,
    addPantryItem,
    pantry,
    catalogRecipes,
  } = useMeal();

  const [copied, setCopied] = useState(false);
  const [groceryNotice, setGroceryNotice] = useState<string | null>(null);
  const [targetServings, setTargetServings] = useState<number>(recipe.servings || 4);
  const [activeTab, setActiveTab] = useState<'recipe' | 'assistant'>('recipe');
  const [activeSingleTimer, setActiveSingleTimer] = useState<{ step: number; seconds: number } | null>(null);

  // Synchronize targetServings if recipe changes
  React.useEffect(() => {
    setTargetServings(recipe.servings || 4);
    setActiveSingleTimer(null);
  }, [recipe.id, recipe.servings]);

  // Scaled ingredients
  const scaledIngredients: RecipeIngredient[] = useMemo(() => {
    return scaleIngredients(recipe.ingredients || [], recipe.servings || 4, targetServings);
  }, [recipe.ingredients, recipe.servings, targetServings]);

  // Related recipes from same cuisine or region
  const relatedRecipes = useMemo(() => {
    return catalogRecipes
      .filter((r) => r.id !== recipe.id && (r.cuisine === recipe.cuisine || r.region === recipe.region))
      .slice(0, 3);
  }, [catalogRecipes, recipe.id, recipe.cuisine, recipe.region]);

  // Check which ingredients are already present in user's pantry
  const pantryNames = useMemo(() => {
    return pantry.map((p) => p.name.toLowerCase().trim());
  }, [pantry]);

  const handleShare = () => {
    navigator.clipboard.writeText(`${recipe.title} - Recipe on MealAI\n${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAllToGroceries = async () => {
    const scaledRecipe: Recipe = {
      ...recipe,
      servings: targetServings,
      ingredients: scaledIngredients,
    };
    const count = await addRecipeIngredientsToGrocery(scaledRecipe);
    setGroceryNotice(`Added ${count} items to grocery list.`);
    setTimeout(() => setGroceryNotice(null), 3500);
  };

  const handleAddSingleGrocery = async (ing: RecipeIngredient) => {
    await addGroceryItem({
      name: ing.name,
      category: ing.category || 'Produce',
      quantity: `${ing.amount} ${ing.unit}`.trim(),
      checked: false,
    });
    setGroceryNotice(`Added ${ing.name} to grocery list.`);
    setTimeout(() => setGroceryNotice(null), 3000);
  };

  const handleAddSinglePantry = async (ing: RecipeIngredient) => {
    await addPantryItem({
      name: ing.name,
      category: ing.category || 'Pantry Staples',
      quantity: `${ing.amount} ${ing.unit}`.trim(),
      unit: ing.unit || '',
    });
    setGroceryNotice(`Added ${ing.name} to pantry.`);
    setTimeout(() => setGroceryNotice(null), 3000);
  };

  // Safe internal cooking temp guideline for the protein if applicable
  const matchingSafetyTemp = useMemo(() => {
    const lower = `${recipe.title} ${recipe.ingredients.map((i) => i.name).join(' ')}`.toLowerCase();
    if (lower.includes('chicken') || lower.includes('poultry') || lower.includes('turkey')) {
      return APPROVED_FOOD_SAFETY_TEMPS.find((t) => t.food.includes('Poultry'));
    }
    if (lower.includes('fish') || lower.includes('salmon') || lower.includes('prawn') || lower.includes('shrimp')) {
      return APPROVED_FOOD_SAFETY_TEMPS.find((t) => t.food.includes('Fish'));
    }
    if (lower.includes('mutton') || lower.includes('lamb') || lower.includes('beef') || lower.includes('pork')) {
      return APPROVED_FOOD_SAFETY_TEMPS.find((t) => t.food.includes('Beef'));
    }
    return null;
  }, [recipe]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={recipe.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1C1917]/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full border border-[#EAE3D7] shadow-2xl overflow-hidden my-4 relative flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Floating Control Bar */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1C1917] shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            title="Share Recipe"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => toggleFavorite(recipe.id)}
            className={`p-2.5 rounded-full shadow-md backdrop-blur-xs transition-colors cursor-pointer ${
              recipe.isFavorite ? 'bg-rose-50 text-rose-600' : 'bg-white/90 hover:bg-white text-[#1C1917]'
            }`}
            title="Favorite"
          >
            <Heart className={`w-4 h-4 ${recipe.isFavorite ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#1C1917] shadow-md backdrop-blur-xs transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Main Body */}
        <div className="overflow-y-auto flex-1 pb-12">
          {/* 1. HERO SECTION */}
          <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-[#EFE8DC]">
            <img
              src={
                recipe.imageUrl ||
                'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'
              }
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 text-white space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider">
                  {recipe.cuisine} {recipe.region ? `· ${recipe.region}` : ''}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/80 backdrop-blur-md text-[11px] font-semibold capitalize">
                  {recipe.difficulty}
                </span>
                {recipe.mealType && (
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-[11px] font-semibold capitalize">
                    {recipe.mealType}
                  </span>
                )}
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-white drop-shadow-sm">
                {recipe.title}
              </h1>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[#EAE3D7] border-b border-[#EAE3D7] bg-[#FAF7F2] text-center py-4">
            <div className="p-2 space-y-0.5">
              <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">
                Total Time
              </span>
              <span className="font-serif text-lg font-bold text-[#1C1917]">
                {recipe.totalTime || 30} mins
              </span>
              <span className="text-[10px] text-[#A89F91] block">
                ({recipe.prepTime || 10} prep · {recipe.cookTime || 20} cook)
              </span>
            </div>

            <div className="p-2 space-y-0.5">
              <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">
                Calories
              </span>
              <span className="font-serif text-lg font-bold text-[#1C1917]">
                {recipe.calories || 450} kcal
              </span>
              <span className="text-[10px] text-[#A89F91] block">per serving</span>
            </div>

            <div className="p-2 space-y-0.5">
              <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">
                Protein
              </span>
              <span className="font-serif text-lg font-bold text-emerald-800">
                {recipe.protein || 25}g
              </span>
              <span className="text-[10px] text-[#A89F91] block">high nutrient density</span>
            </div>

            <div className="p-2 space-y-0.5">
              <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">
                Servings
              </span>
              <div className="flex items-center justify-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setTargetServings((s) => Math.max(1, s - 1))}
                  className="w-6 h-6 rounded-full bg-white border border-[#E8E1D5] hover:bg-[#EFE8DC] flex items-center justify-center text-[#1C1917] transition-all cursor-pointer"
                  title="Decrease Servings"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-serif text-lg font-bold text-[#1C1917] min-w-6">
                  {targetServings}
                </span>
                <button
                  type="button"
                  onClick={() => setTargetServings((s) => Math.min(24, s + 1))}
                  className="w-6 h-6 rounded-full bg-white border border-[#E8E1D5] hover:bg-[#EFE8DC] flex items-center justify-center text-[#1C1917] transition-all cursor-pointer"
                  title="Increase Servings"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Notification Toast */}
          {groceryNotice && (
            <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{groceryNotice}</span>
            </div>
          )}

          {/* Description & Action Bar */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm sm:text-base text-[#57534E] leading-relaxed">
              {recipe.description}
            </p>

            {/* Prominent Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-b border-[#EAE3D7] pb-6">
              <button
                type="button"
                onClick={() => onOpenCooking(recipe)}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#2C2724] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-amber-400" />
                <span>Start Step-by-Step Cooking</span>
              </button>

              <button
                type="button"
                onClick={handleAddAllToGroceries}
                className="px-5 py-3.5 rounded-full bg-white border border-[#E8E1D5] hover:bg-[#FAF7F2] text-[#1C1917] text-xs sm:text-sm font-semibold flex items-center gap-2 active:scale-95 transition-all cursor-pointer shadow-2xs"
              >
                <ShoppingCart className="w-4 h-4 text-[#78716C]" />
                <span>Add All to Grocery List</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'assistant' ? 'recipe' : 'assistant')}
                className="px-5 py-3.5 rounded-full bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-900 text-xs sm:text-sm font-semibold flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{activeTab === 'assistant' ? 'Show Recipe Details' : 'Ask MealAI Chef'}</span>
              </button>
            </div>

            {/* Dietary Tags & Allergens */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#8C827A] font-medium mr-1">Dietary:</span>
              {(recipe.dietaryTags || recipe.dietary || []).map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-medium"
                >
                  {d}
                </span>
              ))}
              {(recipe.allergens || []).length > 0 && (
                <>
                  <span className="text-[#8C827A] font-medium ml-3 mr-1">Allergens:</span>
                  {recipe.allergens?.map((a) => (
                    <span
                      key={a}
                      className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 font-medium"
                    >
                      {a}
                    </span>
                  ))}
                </>
              )}
            </div>

            {/* Food Safety Temp Alert if meat/seafood/poultry */}
            {matchingSafetyTemp && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs text-amber-900 flex items-start gap-3">
                <Thermometer className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-950">Food Safety Temperature Standard</h4>
                  <p className="mt-0.5 text-amber-800/90 leading-relaxed">
                    Ensure internal cooking temperature reaches at least{' '}
                    <span className="font-bold">
                      {matchingSafetyTemp.minInternalTempF}°F ({matchingSafetyTemp.minInternalTempC}°C)
                    </span>
                    {matchingSafetyTemp.restTimeMinutes ? ` with a ${matchingSafetyTemp.restTimeMinutes}-minute rest` : ''}.{' '}
                    {matchingSafetyTemp.notes}
                  </p>
                </div>
              </div>
            )}

            {/* VIEW MODE: MEALAI CHEF ASSISTANT or RECIPE INSTRUCTIONS */}
            {activeTab === 'assistant' ? (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-3">
                  <h3 className="font-serif text-xl font-bold text-[#1C1917] flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>MealAI Chef Cooking Companion</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('recipe')}
                    className="text-xs text-[#78716C] hover:text-[#1C1917] underline cursor-pointer"
                  >
                    Back to instructions
                  </button>
                </div>
                <MealAIChefChat recipe={recipe} />
              </div>
            ) : (
              <div className="space-y-12">
                {/* 2. INGREDIENTS SECTION WITH DYNAMIC SCALING & INTERACTIONS */}
                <section className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[#EAE3D7] pb-3">
                    <div>
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                        Ingredients
                      </h2>
                      <p className="text-xs text-[#78716C] mt-0.5">
                        Proportionally calculated for {targetServings} servings
                        {targetServings !== (recipe.servings || 4) ? ` (originally ${recipe.servings || 4})` : ''}
                      </p>
                    </div>

                    <button
                      onClick={handleAddAllToGroceries}
                      className="text-xs font-semibold text-[#1C1917] hover:text-[#224827] flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#78716C]" />
                      <span>Add all</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {scaledIngredients.map((ing, idx) => {
                      const inPantry = pantryNames.some((p) => ing.name.toLowerCase().includes(p));

                      return (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] flex items-start justify-between gap-3 group hover:border-[#D6CCC0] transition-colors"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex items-baseline gap-2">
                              <span className="font-bold text-sm text-[#1C1917] tabular-nums">
                                {ing.amount} {ing.unit}
                              </span>
                              <span className="text-sm text-[#1C1917] font-medium">
                                {ing.name}
                              </span>
                            </div>

                            {ing.note && (
                              <p className="text-xs text-[#78716C] italic">
                                {ing.note}
                              </p>
                            )}

                            {inPantry && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-semibold mt-0.5">
                                <Check className="w-3 h-3 text-emerald-600" />
                                Available in your pantry
                              </span>
                            )}
                          </div>

                          {/* Ingredient Quick Actions */}
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => onOpenSubstitution(ing.name, recipe.title)}
                              className="px-2 py-1 rounded-lg bg-white border border-[#E8E1D5] hover:bg-amber-50 hover:text-amber-900 text-[11px] font-semibold text-[#57534E] transition-colors cursor-pointer"
                              title="Find culinary substitutes"
                            >
                              Substitute
                            </button>

                            <button
                              type="button"
                              onClick={() => handleAddSingleGrocery(ing)}
                              className="p-1.5 rounded-lg bg-white border border-[#E8E1D5] hover:bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                              title="Add to grocery list"
                            >
                              <ShoppingCart className="w-3.5 h-3.5" />
                            </button>

                            {!inPantry && (
                              <button
                                type="button"
                                onClick={() => handleAddSinglePantry(ing)}
                                className="p-1.5 rounded-lg bg-white border border-[#E8E1D5] hover:bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] transition-colors cursor-pointer"
                                title="Add to my pantry"
                              >
                                <Package className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* 3. STEP-BY-STEP INSTRUCTIONS WITH TIMERS */}
                <section className="space-y-4">
                  <div className="flex items-baseline justify-between border-b border-[#EAE3D7] pb-3">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                      Instructions
                    </h2>
                    <span className="text-xs text-[#78716C]">
                      {recipe.instructions.length} sequential steps
                    </span>
                  </div>

                  <div className="space-y-4">
                    {recipe.instructions.map((ins, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-white border border-[#EAE3D7] shadow-xs space-y-3 relative hover:border-[#D6CCC0] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-[#1C1917] text-white font-bold text-xs flex items-center justify-center">
                              {ins.step}
                            </span>
                            {ins.title && (
                              <h3 className="font-serif text-base font-bold text-[#1C1917]">
                                {ins.title}
                              </h3>
                            )}
                          </div>

                          {ins.timerMinutes && (
                            <button
                              type="button"
                              onClick={() => {
                                onOpenCooking(recipe);
                              }}
                              className="px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>Start {ins.timerMinutes}:00 timer</span>
                            </button>
                          )}
                        </div>

                        <p className="text-sm text-[#44403C] leading-relaxed pl-10">
                          {ins.instruction}
                        </p>

                        {ins.tip && (
                          <div className="ml-10 p-3 rounded-xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900 flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>
                              <strong className="font-semibold">Chef's Technique:</strong> {ins.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* 4. NUTRITION BREAKDOWN */}
                <section className="space-y-4">
                  <div className="border-b border-[#EAE3D7] pb-3">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                      Nutritional Profile
                    </h2>
                    <p className="text-xs text-[#78716C] mt-0.5">Estimated macros per serving</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-center">
                      <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">Calories</span>
                      <span className="font-serif text-xl font-bold text-[#1C1917] mt-1 block">{recipe.calories || 450}</span>
                      <span className="text-[10px] text-[#A89F91]">kcal</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-center">
                      <span className="text-[11px] text-emerald-800 uppercase tracking-wider font-semibold block">Protein</span>
                      <span className="font-serif text-xl font-bold text-emerald-950 mt-1 block">{recipe.protein || 25}g</span>
                      <span className="text-[10px] text-emerald-700">Muscle recovery</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-center">
                      <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">Carbohydrates</span>
                      <span className="font-serif text-xl font-bold text-[#1C1917] mt-1 block">{recipe.carbs || 38}g</span>
                      <span className="text-[10px] text-[#A89F91]">Energy</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-center">
                      <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">Healthy Fats</span>
                      <span className="font-serif text-xl font-bold text-[#1C1917] mt-1 block">{recipe.fat || 15}g</span>
                      <span className="text-[10px] text-[#A89F91]">Satiety</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-center">
                      <span className="text-[11px] text-[#8C827A] uppercase tracking-wider font-semibold block">Fiber</span>
                      <span className="font-serif text-xl font-bold text-[#1C1917] mt-1 block">{recipe.fiber || 6}g</span>
                      <span className="text-[10px] text-[#A89F91]">Digestive health</span>
                    </div>
                  </div>
                </section>

                {/* 5. CHEF TIPS, STORAGE, REHEATING & SERVING SUGGESTIONS */}
                <section className="space-y-4">
                  <div className="border-b border-[#EAE3D7] pb-3">
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                      Chef Notes &amp; Preservation
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Cooking Tips */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] space-y-2">
                      <h4 className="font-serif text-sm font-bold text-[#1C1917] flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                        <span>Culinary Tips</span>
                      </h4>
                      <ul className="text-xs text-[#57534E] space-y-1.5 list-disc pl-4 leading-relaxed">
                        {(recipe.tips && recipe.tips.length ? recipe.tips : [
                          'Season in layers: add a pinch of salt at each stage rather than just at the very end.',
                          'Let proteins rest for 3 to 5 minutes after cooking to allow natural juices to redistribute evenly.',
                        ]).map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Storage & Reheating */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] space-y-2">
                      <h4 className="font-serif text-sm font-bold text-[#1C1917] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Storage &amp; Reheating</span>
                      </h4>
                      <div className="text-xs text-[#57534E] space-y-1.5 leading-relaxed">
                        <p>
                          <strong>Refrigerator:</strong> Store in an airtight glass container for up to 3 to 4 days.
                        </p>
                        <p>
                          <strong>Freezer:</strong> Freeze in sealed freezer-safe bags for up to 2-3 months. Thaw overnight in fridge.
                        </p>
                        <p>
                          <strong>Reheating:</strong> Reheat gently over medium heat on stovetop with 2 tbsp water or broth until piping hot (165°F / 74°C).
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 6. EMBEDDED MEALAI CHEF COMPANION PROMPT BOX */}
                <section className="p-6 rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-white to-amber-50/40 border border-[#EAE3D7] shadow-xs space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#1C1917]">
                          Have a question while cooking?
                        </h3>
                        <p className="text-xs text-[#78716C]">
                          MealAI Chef knows this exact recipe, techniques, and emergency fixes.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab('assistant')}
                      className="px-5 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#2C2724] active:scale-95 transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Chat with MealAI Chef</span>
                    </button>
                  </div>
                </section>

                {/* 7. RELATED RECIPES */}
                {relatedRecipes.length > 0 && (
                  <section className="space-y-4 pt-4 border-t border-[#EAE3D7]">
                    <div className="flex items-baseline justify-between">
                      <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917]">
                        You might also enjoy
                      </h2>
                      <span className="text-xs text-[#8C827A]">Similar flavor profile</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedRecipes.map((rel) => (
                        <div
                          key={rel.id}
                          onClick={() => {
                            if (onSelectRelatedRecipe) {
                              onSelectRelatedRecipe(rel);
                            }
                          }}
                          className="group cursor-pointer space-y-2 rounded-2xl p-2 hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#EAE3D7]"
                        >
                          <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#EFE8DC] relative">
                            <img
                              src={rel.imageUrl}
                              alt={rel.title}
                              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#1C1917]/75 backdrop-blur-xs text-white text-[10px] font-semibold">
                              {rel.totalTime || 30}m
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#78716C] uppercase font-semibold block">
                              {rel.cuisine}
                            </span>
                            <h4 className="font-serif text-sm font-bold text-[#1C1917] group-hover:text-[#224827] line-clamp-1">
                              {rel.title}
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
