import React, { useState } from 'react';
import {
  Heart,
  Search,
  Trash2,
  Play,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe } from '../types/index.ts';

interface FavoritesViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenCooking: (recipe: Recipe) => void;
  onNavigateToDiscover?: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  onSelectRecipe,
  onOpenCooking,
  onNavigateToDiscover,
}) => {
  const { recipes, favorites, toggleFavorite, deleteRecipe } = useMeal();
  const [tab, setTab] = useState<'favorites' | 'all'>('favorites');
  const [search, setSearch] = useState('');

  const sourceList = tab === 'favorites' ? favorites : recipes;

  const filtered = sourceList.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.cuisine?.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Cookbook Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#EAE3D7] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
            Your cookbook
          </h1>
          <p className="text-sm text-[#57534E] mt-0.5">
            {favorites.length} saved recipes you love to return to.
          </p>
        </div>

        {/* View toggle & search */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-white rounded-full border border-[#E8E1D5]">
            <button
              onClick={() => setTab('favorites')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tab === 'favorites'
                  ? 'bg-[#1C1917] text-white shadow-2xs'
                  : 'text-[#6B655F] hover:text-[#1C1917]'
              }`}
            >
              Favorites ({favorites.length})
            </button>

            <button
              onClick={() => setTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                tab === 'all'
                  ? 'bg-[#1C1917] text-white shadow-2xs'
                  : 'text-[#6B655F] hover:text-[#1C1917]'
              }`}
            >
              All Created ({recipes.length})
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C827A]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter your cookbook..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden"
        />
      </div>

      {/* Editorial Cookbook Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="group cursor-pointer space-y-3"
            >
              <div className="aspect-4/3 rounded-2xl overflow-hidden bg-[#EFE8DC] relative">
                <img
                  src={
                    recipe.imageUrl ||
                    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
                  }
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                />

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.id);
                    }}
                    className="p-2 rounded-full bg-white/90 text-rose-600 hover:scale-110 transition-all shadow-2xs"
                    title="Remove from favorites"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-[#78716C]">
                  <span>{recipe.totalTime || recipe.totalTimeMinutes || 25} min</span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.cuisine || 'Dinner'}</span>
                  <span aria-hidden="true">·</span>
                  <span>{recipe.calories || 500} kcal</span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5 leading-snug">
                  {recipe.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 sm:p-16 border border-[#EAE3D7] text-center space-y-3 max-w-xl mx-auto shadow-2xs">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EAE3D7] text-[#224827] flex items-center justify-center mx-auto">
            <BookOpen className="w-5 h-5" />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
            Your cookbook is waiting.
          </h3>

          <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed max-w-sm mx-auto">
            Save recipes you want to make again or craft custom creations in the studio.
          </p>

          <div className="pt-2">
            <button
              onClick={onNavigateToDiscover}
              className="px-6 py-2.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold transition-all shadow-2xs"
            >
              Discover recipes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
