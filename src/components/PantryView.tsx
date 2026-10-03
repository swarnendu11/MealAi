import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Search,
  X,
  Play,
  ArrowRight,
  AlertCircle,
  Calendar,
  Package,
} from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { PantryItem, Recipe } from '../types/index.ts';

interface PantryViewProps {
  onGenerateFromPantry: (selectedNames: string[]) => void;
  onOpenRecipe?: (recipe: Recipe) => void;
}

export const PantryView: React.FC<PantryViewProps> = ({
  onGenerateFromPantry,
  onOpenRecipe,
}) => {
  const { pantry, addPantryItem, removePantryItem, recipes, catalogRecipes } = useMeal();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Produce');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('pcs');
  const [useSoon, setUseSoon] = useState(false);

  const categories = ['Produce', 'Proteins', 'Dairy & Eggs', 'Grains & Pasta', 'Pantry & Spices'];

  const filterItems = pantry.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(i => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filterItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filterItems.map(i => i.name));
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addPantryItem({
      name: name.trim(),
      category,
      quantity: `${quantity} ${unit}`.trim(),
      unit,
      expiryDate: useSoon ? new Date(Date.now() + 86400000 * 2).toISOString() : undefined,
    });

    setName('');
    setQuantity('1');
    setUseSoon(false);
    setShowAddModal(false);
  };

  // Pantry matching logic: which recipes can we make?
  const allAvailableRecipes = [...recipes, ...catalogRecipes];
  const uniqueRecipes = Array.from(new Map(allAvailableRecipes.map(r => [r.id, r])).values());
  const pantryNames = pantry.map(p => p.name.toLowerCase());

  const matchingRecipes = uniqueRecipes.map(recipe => {
    const totalIngredients = recipe.ingredients.length || 1;
    const matchCount = recipe.ingredients.filter(ing =>
      pantryNames.some(p => ing.name.toLowerCase().includes(p) || p.includes(ing.name.toLowerCase()))
    ).length;
    const percentage = Math.round((matchCount / totalIngredients) * 100);
    return { recipe, matchCount, percentage };
  })
  .filter(m => m.matchCount > 0)
  .sort((a, b) => b.percentage - a.percentage)
  .slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. KITCHEN INVENTORY HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#EAE3D7] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
            What's in your kitchen?
          </h1>
          <p className="text-sm text-[#57534E] mt-0.5">
            {pantry.length} pantry items tracked · Ready for matching
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedItems.length > 0 && (
            <button
              onClick={() => onGenerateFromPantry(selectedItems)}
              className="px-5 py-2.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center gap-2"
            >
              <span>Cook with {selectedItems.length} selected</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F3ECE0] text-[#1C1917] border border-[#D8D0C5] text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#224827]" />
            <span>Add ingredient</span>
          </button>
        </div>
      </div>

      {/* 2. INGREDIENT INVENTORY CATEGORY GROUPS */}
      <div className="space-y-8">
        <div className="flex items-center justify-between text-xs text-[#78716C]">
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C827A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search kitchen items..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#E8E1D5] text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden"
            />
          </div>

          <button
            onClick={handleSelectAll}
            className="text-xs font-medium text-[#224827] hover:underline"
          >
            {selectedItems.length === filterItems.length ? 'Deselect all' : 'Select all'}
          </button>
        </div>

        {/* Category Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {categories.map((cat) => {
            const itemsInCat = filterItems.filter(
              item => item.category?.toLowerCase() === cat.toLowerCase() ||
                (cat === 'Pantry & Spices' && (item.category === 'Spices' || item.category === 'Pantry Staples'))
            );

            if (itemsInCat.length === 0 && searchQuery) return null;

            return (
              <div key={cat} className="bg-white rounded-3xl p-6 border border-[#EAE3D7] shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-2.5">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-[#8C827A]">
                    {cat}
                  </h3>
                  <span className="text-[11px] text-[#A89F91] font-medium">
                    {itemsInCat.length} items
                  </span>
                </div>

                {itemsInCat.length > 0 ? (
                  <ul className="divide-y divide-[#F5EFE6]">
                    {itemsInCat.map((item) => {
                      const isSelected = selectedItems.includes(item.name);
                      const isExpiringSoon = item.expiryDate && new Date(item.expiryDate).getTime() - Date.now() < 86400000 * 3;

                      return (
                        <li
                          key={item.id}
                          onClick={() => toggleSelect(item.name)}
                          className={`py-2.5 px-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected ? 'bg-[#FAF7F2]' : 'hover:bg-[#FCFAF7]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelect(item.name)}
                              className="rounded border-[#D8D0C5] text-[#224827] focus:ring-0 cursor-pointer"
                            />
                            <span className={`text-sm ${isSelected ? 'font-bold text-[#1C1917]' : 'text-[#44403C]'}`}>
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 text-xs">
                            {isExpiringSoon && (
                              <span className="text-[10px] uppercase font-bold text-[#C85A32] bg-amber-50 px-2 py-0.5 rounded-md">
                                Use soon
                              </span>
                            )}
                            <span className="text-[#78716C] font-medium min-w-[50px] text-right">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePantryItem(item.id);
                              }}
                              className="text-[#A89F91] hover:text-rose-600 p-1"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-xs text-[#A89F91] py-4 text-center italic">
                    No items in {cat.toLowerCase()}.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. WHAT CAN I MAKE? (Pantry Matching Section) */}
      <section className="space-y-6 pt-6 border-t border-[#EAE3D7]">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
              Pantry Harmony
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] mt-0.5">
              What can I make?
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C]">
              Ranked recipes matching ingredients currently resting in your kitchen.
            </p>
          </div>

          <button
            onClick={() => onGenerateFromPantry(pantry.map(p => p.name))}
            className="text-xs font-semibold text-[#224827] hover:underline flex items-center gap-1.5"
          >
            <span>Create new custom recipe from all pantry items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {matchingRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {matchingRecipes.map(({ recipe, matchCount, percentage }) => (
              <div
                key={recipe.id}
                onClick={() => onOpenRecipe && onOpenRecipe(recipe)}
                className="group cursor-pointer space-y-2.5"
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
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-[#1C1917]/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wider">
                    {percentage}% Pantry Match
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-xs text-[#78716C]">
                    <span>{recipe.totalTime || 25} min</span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.cuisine || 'Dinner'}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1C1917] group-hover:text-[#224827] transition-colors mt-0.5">
                    {recipe.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-white border border-[#EAE3D7] text-center space-y-2">
            <p className="font-serif text-base text-[#1C1917]">No recipes matched yet.</p>
            <p className="text-xs text-[#78716C]">
              Add a few staples like garlic, pasta, chicken, or olive oil to see matches.
            </p>
          </div>
        )}
      </section>

      {/* Add Item Modal */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Add ingredient to pantry"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-[#EAE3D7] shadow-xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Add to kitchen</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#8C827A] hover:text-[#1C1917]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Cherry Tomatoes, Jasmine Rice"
                  className="w-full text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
                  >
                    <option value="Produce">Produce</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
                    <option value="Grains & Pasta">Grains &amp; Pasta</option>
                    <option value="Pantry & Spices">Pantry &amp; Spices</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                    Quantity
                  </label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-16 text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-2 py-2 text-[#1C1917] focus:outline-hidden"
                    />
                    <input
                      type="text"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="pcs/g"
                      className="flex-1 text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-2 py-2 text-[#1C1917] focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="useSoonCheck"
                  checked={useSoon}
                  onChange={(e) => setUseSoon(e.target.checked)}
                  className="rounded border-[#D8D0C5] text-[#224827] focus:ring-0"
                />
                <label htmlFor="useSoonCheck" className="text-xs text-[#57534E] cursor-pointer">
                  Mark as "Use soon" (expiring shortly)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full text-xs text-[#57534E] hover:bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold"
                >
                  Save ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
