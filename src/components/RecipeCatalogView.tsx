import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Clock,
  Heart,
  Play,
  ArrowRight,
  Sparkles,
  Calendar,
  ShoppingCart,
  Check,
  Package,
} from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe } from '../types/index.ts';

interface RecipeCatalogViewProps {
  onOpenRecipe: (recipe: Recipe) => void;
  onStartCooking: (recipe: Recipe) => void;
  onOpenPlanner?: () => void;
}

export const RecipeCatalogView: React.FC<RecipeCatalogViewProps> = ({
  onOpenRecipe,
  onStartCooking,
  onOpenPlanner,
}) => {
  const {
    catalogRecipes,
    pantry,
    toggleFavorite,
    addToMealPlan,
    addRecipeIngredientsToGrocery,
  } = useMeal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedDiet, setSelectedDiet] = useState<string>('All');
  const [visibleLimit, setVisibleLimit] = useState<number>(24);
  const [planningRecipe, setPlanningRecipe] = useState<Recipe | null>(null);
  const [planDay, setPlanDay] = useState('monday');
  const [planSlot, setPlanSlot] = useState<'breakfast' | 'lunch' | 'dinner'>('dinner');
  const [notice, setNotice] = useState<string | null>(null);

  // Reset pagination when search or filters change
  useEffect(() => {
    setVisibleLimit(24);
  }, [searchQuery, selectedCuisine, selectedDiet]);

  const cuisineDetails = [
    { name: 'All', icon: '🍽️', color: 'bg-white text-[#57534E] border-[#E8E1D5] hover:bg-[#FAF7F2]', active: 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs' },
    { name: 'Italian', icon: '🍕', color: 'bg-rose-50/70 text-rose-900 border-rose-200/80 hover:bg-rose-100', active: 'bg-rose-600 text-white border-rose-600 shadow-xs' },
    { name: 'Mexican', icon: '🌮', color: 'bg-orange-50/70 text-orange-900 border-orange-200/80 hover:bg-orange-100', active: 'bg-orange-600 text-white border-orange-600 shadow-xs' },
    { name: 'Indian', icon: '🍛', color: 'bg-amber-50/70 text-amber-900 border-amber-200/80 hover:bg-amber-100', active: 'bg-amber-600 text-white border-amber-600 shadow-xs' },
    { name: 'Japanese', icon: '🍱', color: 'bg-purple-50/70 text-purple-900 border-purple-200/80 hover:bg-purple-100', active: 'bg-purple-600 text-white border-purple-600 shadow-xs' },
    { name: 'Thai', icon: '🍜', color: 'bg-emerald-50/70 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100', active: 'bg-emerald-600 text-white border-emerald-600 shadow-xs' },
    { name: 'Mediterranean', icon: '🫒', color: 'bg-sky-50/70 text-sky-900 border-sky-200/80 hover:bg-sky-100', active: 'bg-sky-600 text-white border-sky-600 shadow-xs' },
    { name: 'Spanish', icon: '🥘', color: 'bg-red-50/70 text-red-900 border-red-200/80 hover:bg-red-100', active: 'bg-red-600 text-white border-red-600 shadow-xs' },
    { name: 'Middle Eastern', icon: '🥙', color: 'bg-yellow-50/70 text-yellow-900 border-yellow-200/80 hover:bg-yellow-100', active: 'bg-yellow-600 text-white border-yellow-600 shadow-xs' },
    { name: 'French', icon: '🥖', color: 'bg-indigo-50/70 text-indigo-900 border-indigo-200/80 hover:bg-indigo-100', active: 'bg-indigo-600 text-white border-indigo-600 shadow-xs' },
  ];

  const cuisinesList = [
    'All',
    'Italian',
    'Mexican',
    'Indian',
    'Japanese',
    'Thai',
    'Mediterranean',
    'Spanish',
    'Middle Eastern',
    'French',
  ];

  const dietsList = ['All', 'High Protein', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Dairy-Free'];

  // Check if filtering is active
  const isFiltering = searchQuery.trim() !== '' || selectedCuisine !== 'All' || selectedDiet !== 'All';

  // Filtered recipes
  const filteredRecipes = useMemo(() => {
    let list = [...catalogRecipes];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.cuisine?.toLowerCase().includes(q) ||
        r.region?.toLowerCase().includes(q) ||
        r.ingredients?.some(i => i.name.toLowerCase().includes(q)) ||
        r.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    if (selectedCuisine !== 'All') {
      list = list.filter(r => r.cuisine?.toLowerCase() === selectedCuisine.toLowerCase());
    }

    if (selectedDiet !== 'All') {
      list = list.filter(r =>
        r.dietaryTags?.some(d => d.toLowerCase().includes(selectedDiet.toLowerCase())) ||
        (r.dietary && r.dietary.some(d => d.toLowerCase().includes(selectedDiet.toLowerCase())))
      );
    }

    return list;
  }, [catalogRecipes, searchQuery, selectedCuisine, selectedDiet]);

  // Paginated slice for smooth rendering
  const displayedFilteredRecipes = useMemo(() => {
    return filteredRecipes.slice(0, visibleLimit);
  }, [filteredRecipes, visibleLimit]);

  // Curated collections for the Discover view
  const whatsCooking = catalogRecipes.slice(0, 2);
  const under30Minutes = catalogRecipes.filter(r => (r.totalTime || r.totalTimeMinutes || 30) <= 30).slice(0, 6);
  const highProtein = catalogRecipes.filter(r => (r.protein || r.proteinGrams || 0) >= 30).slice(0, 4);
  const weekendCooking = catalogRecipes.filter(r => (r.totalTime || r.totalTimeMinutes || 30) > 30).slice(0, 3);

  // Pantry matching
  const pantryNames = pantry.map(p => p.name.toLowerCase());
  const pantryPersonalized = catalogRecipes.filter(r =>
    r.ingredients?.some(i => pantryNames.some(p => i.name.toLowerCase().includes(p)))
  ).slice(0, 4);

  const handleAddToPlan = async (recipe: Recipe) => {
    await addToMealPlan(planDay, planSlot, recipe);
    setNotice(`Added ${recipe.title} to ${planDay} ${planSlot}.`);
    setPlanningRecipe(null);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Header with Search Bar */}
      <div className="space-y-6 border-b border-[#EAE3D7] pb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
              Culinary Discoveries
            </h1>
            <p className="text-sm text-[#57534E] mt-0.5">
              Explore {catalogRecipes.length > 0 ? `${catalogRecipes.length.toLocaleString()}+` : 'thousands of'} chef-tested recipes, including over 1,000 authentic Indian regional dishes.
            </p>
          </div>
        </div>

        {/* Search Bar & Clean Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, techniques..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="py-2 px-3 rounded-full bg-white border border-[#E8E1D5] text-xs font-medium text-[#1C1917] focus:outline-hidden"
            >
              {cuisinesList.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Cuisines' : c}</option>
              ))}
            </select>

            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="py-2 px-3 rounded-full bg-white border border-[#E8E1D5] text-xs font-medium text-[#1C1917] focus:outline-hidden"
            >
              {dietsList.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Diets' : d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Horizontal scrollable colorful cuisine strip */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar -mx-1 px-1">
          {cuisineDetails.map((c) => {
            const isSelected = selectedCuisine.toLowerCase() === c.name.toLowerCase();
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedCuisine(isSelected && c.name !== 'All' ? 'All' : c.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 border active:scale-95 cursor-pointer ${
                  isSelected ? c.active : c.color
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {notice && (
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-xs text-[#224827] font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{notice}</span>
          </div>
          {onOpenPlanner && (
            <button onClick={onOpenPlanner} className="underline font-semibold hover:text-[#1E3D20]">
              View schedule →
            </button>
          )}
        </div>
      )}

      {/* 2. IF FILTERING ACTIVE: SHOW FILTER RESULTS */}
      {isFiltering ? (
        <div className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#EAE3D7] pb-3">
            <h3 className="font-serif text-xl font-bold text-[#1C1917]">
              Search Results ({filteredRecipes.length})
            </h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCuisine('All');
                setSelectedDiet('All');
              }}
              className="text-xs text-[#8C827A] hover:text-[#1C1917]"
            >
              Reset filters
            </button>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedFilteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onOpenRecipe(recipe)}
                    className="group cursor-pointer space-y-3"
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
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#57534E] hover:text-rose-600 transition-colors shadow-2xs"
                      >
                        <Heart className={`w-3.5 h-3.5 ${recipe.isFavorite ? 'text-rose-600 fill-current' : ''}`} />
                      </button>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#78716C]">
                        <span>{recipe.totalTime || 25} min</span>
                        <span aria-hidden="true">·</span>
                        <span>{recipe.cuisine || 'International'}</span>
                        <span aria-hidden="true">·</span>
                        <span>{recipe.difficulty || 'Easy'}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5 line-clamp-2">
                        {recipe.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination / Load More Controls for large datasets */}
              {visibleLimit < filteredRecipes.length && (
                <div className="pt-6 pb-2 flex flex-col items-center justify-center gap-3 border-t border-[#EAE3D7]">
                  <p className="text-xs text-[#78716C]">
                    Showing <span className="font-semibold text-[#1C1917]">{Math.min(visibleLimit, filteredRecipes.length)}</span> of <span className="font-semibold text-[#1C1917]">{filteredRecipes.length.toLocaleString()}</span> recipes
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setVisibleLimit(prev => prev + 24)}
                      className="px-6 py-2.5 rounded-full bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#2C2724] active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      Load More Recipes ({Math.min(24, filteredRecipes.length - visibleLimit)})
                    </button>
                    {filteredRecipes.length - visibleLimit > 24 && (
                      <button
                        type="button"
                        onClick={() => setVisibleLimit(filteredRecipes.length)}
                        className="px-5 py-2.5 rounded-full bg-white border border-[#E8E1D5] text-[#1C1917] text-xs font-semibold hover:bg-[#FAF7F2] active:scale-95 transition-all cursor-pointer"
                      >
                        Show All ({filteredRecipes.length.toLocaleString()})
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="font-serif text-lg text-[#1C1917]">No recipes found</p>
              <p className="text-xs text-[#78716C]">
                Try adjusting your search terms or resetting cuisine and diet filters.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* 3. DEFAULT: CURATED EDITORIAL DISCOVERY SECTIONS */
        <div className="space-y-16">
          {/* SECTION A: What's Cooking (Large Feature Cards) */}
          <section className="space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
              Editor's Table
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] -mt-4">
              What's cooking
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whatsCooking.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onOpenRecipe(recipe)}
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-white border border-[#EAE3D7] shadow-xs hover:shadow-md transition-all"
                >
                  <div className="aspect-16/10 overflow-hidden relative bg-[#EFE8DC]">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-xs text-white text-[11px] font-semibold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-[#78716C] uppercase tracking-wider">
                      <span>{recipe.cuisine}</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipe.totalTime || 30} min</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipe.calories || 500} kcal</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors leading-snug">
                      {recipe.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION B: Under 30 Minutes (Horizontal Carousel) */}
          <section className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-[#EAE3D7] pb-3">
              <div>
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                  Fast &amp; Fresh
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                  Under 30 minutes
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {under30Minutes.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onOpenRecipe(recipe)}
                  className="group cursor-pointer space-y-2.5"
                >
                  <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#78716C]">
                      <span>{recipe.totalTime || 20} min</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipe.cuisine}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                      {recipe.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION C: High Protein (Editorial Grid) */}
          <section className="space-y-6">
            <div className="border-b border-[#EAE3D7] pb-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                Nourishing Power
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                High protein
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {highProtein.map((recipe) => (
                <div
                  key={recipe.id}
                  onClick={() => onOpenRecipe(recipe)}
                  className="group cursor-pointer space-y-2.5"
                >
                  <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-[#1C1917]/75 backdrop-blur-xs text-white text-[10px] font-semibold">
                      {recipe.protein || 35}g protein
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#78716C]">
                      <span>{recipe.totalTime || 25} min</span>
                      <span aria-hidden="true">·</span>
                      <span>{recipe.calories || 480} kcal</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                      {recipe.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION D: From Around the World (Cuisine exploration) */}
          <section className="space-y-6">
            <div className="border-b border-[#EAE3D7] pb-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                Global Traditions
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                From around the world
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { name: 'Italian', flag: '🇮🇹', count: 'Pastas & Risottos' },
                { name: 'Indian', flag: '🇮🇳', count: '1,150+ Curries & Biryanis' },
                { name: 'Japanese', flag: '🇯🇵', count: 'Bowls & Glazes' },
                { name: 'Mexican', flag: '🇲🇽', count: 'Tacos & Salsas' },
                { name: 'Mediterranean', flag: '🇬🇷', count: 'Grain & Fish' },
                { name: 'Thai', flag: '🇹🇭', count: 'Curries & Noodles' },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCuisine(c.name)}
                  className="p-4 rounded-2xl bg-white border border-[#EAE3D7] hover:border-[#224827] hover:shadow-xs transition-all text-left group"
                >
                  <span className="text-2xl block mb-2">{c.flag}</span>
                  <h4 className="font-serif text-sm font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors">
                    {c.name}
                  </h4>
                  <p className="text-[10px] text-[#8C827A] mt-0.5">{c.count}</p>
                </button>
              ))}
            </div>
          </section>

          {/* SECTION E: From Your Pantry */}
          {pantryPersonalized.length > 0 && (
            <section className="space-y-6">
              <div className="border-b border-[#EAE3D7] pb-3">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
                  Custom to your Kitchen
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] mt-0.5">
                  Matches your pantry
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {pantryPersonalized.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => onOpenRecipe(recipe)}
                    className="group cursor-pointer space-y-2.5"
                  >
                    <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                      <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#78716C]">
                        <span>{recipe.totalTime || 25} min</span>
                        <span aria-hidden="true">·</span>
                        <span>{recipe.cuisine}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                        {recipe.title}
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
  );
};
