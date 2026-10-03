import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Flame, ArrowRight, Sparkles } from 'lucide-react';
import { Recipe } from '../types/index.ts';
import { useMeal } from '../context/MealContext.tsx';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onSearchQuery?: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'Quick dinners',
  'High-protein meals',
  'Bengali vegetarian',
  'Air fryer recipes',
  'Date night pasta',
  'Mediterranean salmon',
  'Under 20 minutes',
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectRecipe,
  onSearchQuery,
}) => {
  const { catalogRecipes, recipes } = useMeal();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter recipes based on query
  const allAvailable = [...catalogRecipes, ...recipes];
  // Deduplicate by id
  const uniqueRecipes = Array.from(new Map(allAvailable.map(r => [r.id, r])).values());

  const searchResults = query.trim()
    ? uniqueRecipes.filter((r) => {
        const q = query.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.cuisine?.toLowerCase().includes(q) ||
          r.dietaryTags?.some(d => d.toLowerCase().includes(q)) ||
          r.ingredients?.some(i => i.name.toLowerCase().includes(q))
        );
      }).slice(0, 6)
    : [];

  const handleSelectPopular = (term: string) => {
    setQuery(term);
  };

  const handleSelect = (recipe: Recipe) => {
    onSelectRecipe(recipe);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search recipes"
      className="fixed inset-0 z-50 bg-[#1C1917]/70 backdrop-blur-sm flex flex-col justify-start pt-16 sm:pt-24 px-4 sm:px-6 transition-all duration-300"
    >
      <div
        className="w-full max-w-3xl mx-auto bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#EBE4D8] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-5 border-b border-[#EBE4D8]">
          <Search className="w-5 h-5 text-[#8C827A] mr-3.5 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
            placeholder="What are you craving?"
            className="w-full bg-transparent text-lg sm:text-xl text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden font-medium"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#8C827A] hover:text-[#1C1917] hover:bg-[#EBE4D8]/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs uppercase tracking-wider font-semibold text-[#8C827A] hover:text-[#1C1917] px-2 py-1 rounded-md"
            >
              ESC
            </button>
          )}
        </div>

        {/* Suggestions / Results container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {!query ? (
            <div>
              <p className="text-xs uppercase tracking-wider text-[#8C827A] font-semibold mb-3">
                Suggested Cravings
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelectPopular(item)}
                    className="px-3.5 py-2 text-xs font-medium text-[#44403C] bg-white hover:bg-[#F3ECE0] rounded-xl border border-[#EBE4D8] transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-[#8C827A] font-semibold">
                Recipes ({searchResults.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => handleSelect(recipe)}
                    className="group flex items-center gap-3.5 p-3 rounded-2xl bg-white hover:bg-[#F7F3EC] border border-[#EBE4D8] cursor-pointer transition-all hover:shadow-xs"
                  >
                    <img
                      src={
                        recipe.imageUrl ||
                        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={recipe.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-[#8C827A] uppercase tracking-wide">
                        {recipe.cuisine || 'Editorial'}
                      </p>
                      <h4 className="font-serif text-sm font-bold text-[#1C1917] truncate group-hover:text-[#224827] transition-colors">
                        {recipe.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#78716C] mt-0.5">
                        <span>{recipe.totalTime || recipe.totalTimeMinutes || 25} min</span>
                        <span>·</span>
                        <span>{recipe.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="font-serif text-lg text-[#1C1917]">No recipes matched "{query}"</p>
              <p className="text-xs text-[#78716C] mt-1">
                Try searching for ingredients, cuisines like Italian or Indian, or cooking times.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
