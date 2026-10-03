import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Package,
  Clock,
  Flame,
  Play,
  Heart,
  ArrowRight,
  Plus,
  Compass,
  Check,
  ChefHat,
  Dices,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe, normalizeRecipeData } from '../types/index.ts';
import { getAuthHeaders } from '../lib/api.ts';

interface DashboardViewProps {
  onNavigate: (tab: string, params?: any) => void;
  onSelectRecipe: (recipe: Recipe) => void;
  openOnboarding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onSelectRecipe,
  openOnboarding,
}) => {
  const { user, profile } = useAuth();
  const { recipes, catalogRecipes, favorites, pantry, currentPlan, startCooking, toggleFavorite } = useMeal();
  const [surpriseLoading, setSurpriseLoading] = useState(false);

  // Time-of-day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const userName = profile?.name?.split(' ')[0] || (user ? 'Chef' : 'Food Lover');

  // Tonight's Pick (curated or top featured recipe)
  const tonightPick: Recipe = recipes.find(r => r.id === 'rec_shakshuka_eggs') ||
    recipes[0] || normalizeRecipeData({
      id: 'rec_tonight_pick',
      title: 'Miso Garlic Chicken Bowl with Jasmine Rice',
      description: 'Pan-caramelized chicken glazed with savory white miso, sweet mirin, and charred scallions over fragrant rice.',
      cuisine: 'Japanese',
      mealTypes: ['Dinner'],
      mealType: 'dinner',
      difficulty: 'easy',
      prepTime: 10,
      cookTime: 20,
      totalTime: 30,
      servings: 2,
      calories: 520,
      protein: 48,
      carbs: 45,
      fat: 14,
      fiber: 4,
      dietary: ['High Protein', 'Dairy-Free'],
      dietaryTags: ['High Protein', 'Dairy-Free'],
      allergens: ['Soy'],
      appliances: ['Stovetop'],
      applianceTags: ['Stovetop'],
      cookingMethods: ['Pan-Searing'],
      ingredients: [
        { name: 'Chicken Thighs', amount: '400', unit: 'g', category: 'Protein' },
        { name: 'White Miso Paste', amount: '2', unit: 'tbsp', category: 'Pantry' },
        { name: 'Garlic Cloves', amount: '4', unit: 'cloves', category: 'Produce' },
        { name: 'Jasmine Rice', amount: '1', unit: 'cup', category: 'Grains' },
        { name: 'Scallions', amount: '3', unit: 'stalks', category: 'Produce' },
      ],
      instructions: [
        { step: 1, title: 'Prep', instruction: 'Whisk miso paste, mirin, and grated garlic in a bowl.' },
        { step: 2, title: 'Sear', instruction: 'Sear chicken until golden brown and crispy on both sides.' },
        { step: 3, title: 'Glaze', instruction: 'Pour over miso glaze and simmer until thick and caramelized.' },
      ],
      tips: ['Use chicken thighs for the juiciest results; sear skin-side down first.'],
      substitutions: [],
      tags: ['Dinner', 'Japanese', 'High Protein'],
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
      sourceType: 'seed',
      searchableText: 'miso garlic chicken bowl jasmine rice japanese high protein',
    });

  // Surprise recipe
  const handleSurpriseMe = async () => {
    setSurpriseLoading(true);
    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch('/api/ai/surprise-me', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          dietary: profile?.dietaryPreferences?.join(', ') || 'balanced',
        }),
      });
      const data = await res.json();
      if (data.success && data.recipe) {
        onSelectRecipe(data.recipe);
      } else {
        // Fallback to random catalog recipe
        const pool = catalogRecipes.length > 0 ? catalogRecipes : recipes;
        const randomPick = pool[Math.floor(Math.random() * pool.length)];
        if (randomPick) onSelectRecipe(randomPick);
      }
    } catch {
      const pool = catalogRecipes.length > 0 ? catalogRecipes : recipes;
      const randomPick = pool[Math.floor(Math.random() * pool.length)];
      if (randomPick) onSelectRecipe(randomPick);
    } finally {
      setSurpriseLoading(false);
    }
  };

  // 5-day week preview
  const weekDays = [
    { day: 'MON', label: 'Monday', meal: 'Shakshuka with Warm Pita', time: '24 min', icon: '🍳', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80', theme: 'border-amber-200/90 hover:border-amber-400 bg-gradient-to-b from-amber-50/50 to-white hover:shadow-amber-100', badge: 'bg-amber-100 text-amber-900' },
    { day: 'TUE', label: 'Tuesday', meal: 'Butter Garlic Scallion Noodles', time: '15 min', icon: '🍜', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80', theme: 'border-emerald-200/90 hover:border-emerald-400 bg-gradient-to-b from-emerald-50/50 to-white hover:shadow-emerald-100', badge: 'bg-emerald-100 text-emerald-900' },
    { day: 'WED', label: 'Wednesday', meal: 'Crispy Air-Fryer Chicken Bites', time: '22 min', icon: '🍗', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80', theme: 'border-sky-200/90 hover:border-sky-400 bg-gradient-to-b from-sky-50/50 to-white hover:shadow-sky-100', badge: 'bg-sky-100 text-sky-900' },
    { day: 'THU', label: 'Thursday', meal: 'Avocado Chickpea Power Bowl', time: '12 min', icon: '🥑', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80', theme: 'border-orange-200/90 hover:border-orange-400 bg-gradient-to-b from-orange-50/50 to-white hover:shadow-orange-100', badge: 'bg-orange-100 text-orange-900' },
    { day: 'FRI', label: 'Friday', meal: 'Sheet Pan Salmon with Asparagus', time: '20 min', icon: '🐟', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80', theme: 'border-purple-200/90 hover:border-purple-400 bg-gradient-to-b from-purple-50/50 to-white hover:shadow-purple-100', badge: 'bg-purple-100 text-purple-900' },
  ];

  // Pantry matching recipes (curated subset)
  const pantryNames = pantry.map(p => p.name.toLowerCase());
  const pantryMatchingRecipes = recipes.filter(r => {
    return r.ingredients.some(ing => pantryNames.some(p => ing.name.toLowerCase().includes(p)));
  }).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 1. PERSONAL KITCHEN HEADER */}
      <section className="pt-2 sm:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#EAE3D7] pb-6">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] tracking-tight">
              {getGreeting()}, {userName}.
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] mt-1 font-normal">
              What's cooking tonight?
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <button
              onClick={() => onNavigate('generate')}
              className="px-4 py-2 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs active:scale-98"
            >
              + Create recipe
            </button>
            <button
              onClick={handleSurpriseMe}
              disabled={surpriseLoading}
              className="px-4 py-2 rounded-full bg-white hover:bg-[#F3ECE0] text-[#1C1917] border border-[#D8D0C5] text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-98 disabled:opacity-60"
            >
              {surpriseLoading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8C827A]" />
              ) : (
                <Dices className="w-3.5 h-3.5 text-[#C85A32]" />
              )}
              <span>Surprise me</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. TONIGHT'S PICK (Large Interactive Editorial Feature) */}
      <section>
        <div className="relative rounded-3xl overflow-hidden bg-white border border-[#EAE3D7] shadow-sm grid grid-cols-1 lg:grid-cols-12 group">
          {/* Left / Top: Hero Dish Image */}
          <div className="lg:col-span-7 relative aspect-16/10 lg:aspect-auto overflow-hidden bg-[#EFE8DC]">
            <img
              src={tonightPick.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85'}
              alt={tonightPick.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-xs text-white text-[11px] uppercase tracking-wider font-semibold">
                Tonight's Pick
              </span>
            </div>
          </div>

          {/* Right / Bottom: Recipe Information & Action */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-[#78716C] uppercase tracking-wider">
                <span>{tonightPick.cuisine || 'Chef Special'}</span>
                <span aria-hidden="true">·</span>
                <span>Dinner</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight">
                {tonightPick.title}
              </h2>

              <p className="text-sm text-[#57534E] leading-relaxed line-clamp-3">
                {tonightPick.description}
              </p>

              {/* Colorful appetizing metadata badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-medium text-xs flex items-center gap-1">
                  <span>⏱️</span>
                  <span>{tonightPick.totalTime || 30} min</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200/80 font-medium text-xs flex items-center gap-1">
                  <span>🥩</span>
                  <span>{tonightPick.protein || 48}g protein</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-medium text-xs flex items-center gap-1">
                  <span>🔥</span>
                  <span>{tonightPick.calories || 520} kcal</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-200/80 font-medium text-xs">
                  {tonightPick.difficulty || 'Easy'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => startCooking(tonightPick)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-[#1B3E21] via-[#245229] to-[#C85A32] hover:shadow-lg hover:shadow-emerald-900/20 text-white font-medium text-xs tracking-wide transition-all shadow-xs active:scale-98 flex items-center gap-2 group/btn"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start cooking</span>
              </button>

              <button
                onClick={() => onSelectRecipe(tonightPick)}
                className="px-5 py-3 rounded-full bg-white hover:bg-[#F3ECE0] text-[#1C1917] border border-[#D8D0C5] font-medium text-xs transition-colors"
              >
                View recipe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. YOUR WEEK (Horizontal Meal Timeline) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
              Weekly Rhythm
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
              Your week
            </h3>
          </div>
          <button
            onClick={() => onNavigate('planner')}
            className="text-xs font-semibold text-[#224827] hover:underline flex items-center gap-1"
          >
            <span>Full schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5-Column Horizontal Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {weekDays.map((item) => (
            <div
              key={item.day}
              onClick={() => onNavigate('planner')}
              className={`group p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md hover:-translate-y-0.5 ${item.theme}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className={`text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-md ${item.badge}`}>
                    {item.day}
                  </span>
                  <span className="text-[11px] text-[#A89F91]">Dinner</span>
                </div>
                <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#FAF7F2] mb-2.5">
                  <img
                    src={item.image}
                    alt={item.meal}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors line-clamp-2">
                  {item.meal}
                </h4>
              </div>

              <div className="text-[11px] text-[#8C827A] pt-1 border-t border-[#F0EBE1] flex items-center justify-between">
                <span>{item.time}</span>
                <span className="text-base">{item.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FROM YOUR PANTRY */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
              Pantry Intelligence
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
              From your pantry
            </h3>
          </div>
          <button
            onClick={() => onNavigate('pantry')}
            className="text-xs font-semibold text-[#224827] hover:underline flex items-center gap-1"
          >
            <span>Manage pantry ({pantry.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pantry Quick Match List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pantryMatchingRecipes.length > 0 ? (
            pantryMatchingRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="group cursor-pointer space-y-2.5"
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                  <img
                    src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#1C1917]/75 backdrop-blur-xs text-white text-[10px] uppercase tracking-wider font-semibold">
                    Uses Pantry
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{recipe.totalTime || 20} min</span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.cuisine || 'Quick'}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                    {recipe.title}
                  </h4>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 p-8 rounded-2xl bg-white border border-[#EAE3D7] text-center space-y-2">
              <p className="font-serif text-base text-[#1C1917]">Your pantry is waiting.</p>
              <p className="text-xs text-[#78716C]">
                Add ingredients you have at home to see instant matching recipes.
              </p>
              <button
                onClick={() => onNavigate('pantry')}
                className="mt-2 px-4 py-2 rounded-full bg-[#224827] text-white text-xs font-semibold"
              >
                Open pantry
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 5. YOUR COOKBOOK (Saved Favorites Grid) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-3">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
              Personal Library
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
              Your cookbook
            </h3>
          </div>
          <button
            onClick={() => onNavigate('favorites')}
            className="text-xs font-semibold text-[#224827] hover:underline flex items-center gap-1"
          >
            <span>View all saved ({favorites.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favorites.slice(0, 4).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="group cursor-pointer space-y-2.5"
              >
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                  <img
                    src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-600 hover:scale-110 transition-all shadow-2xs"
                    title="Remove from saved"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{recipe.totalTime || 25} min</span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.calories} kcal</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                    {recipe.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#EAE3D7] text-center space-y-2">
            <p className="font-serif text-base text-[#1C1917]">Your cookbook is waiting.</p>
            <p className="text-xs text-[#78716C]">
              Save recipes you want to make again and build your culinary collection.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="mt-2 px-4 py-2 rounded-full bg-[#224827] text-white text-xs font-semibold"
            >
              Discover recipes
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
