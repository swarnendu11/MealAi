import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Circle,
  X,
  ShoppingCart,
} from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { GroceryItem } from '../types/index.ts';

const GROUPS = ['Produce', 'Protein', 'Dairy', 'Pantry', 'Spices'];

export const GroceryListView: React.FC = () => {
  const {
    groceryList,
    addGroceryItem,
    toggleGroceryItem,
    removeGroceryItem,
    clearCheckedGroceryItems,
  } = useMeal();

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [category, setCategory] = useState('Produce');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addGroceryItem({
      name: name.trim(),
      quantity: quantity.trim() || '1',
      category,
      checked: false,
    });

    setName('');
    setQuantity('1');
  };

  const checkedCount = groceryList.filter((g) => g.checked).length;
  const totalCount = groceryList.length;

  const grouped = GROUPS.reduce((acc, grp) => {
    const items = groceryList.filter(item => {
      const c = item.category?.toLowerCase() || '';
      const g = grp.toLowerCase();
      if (g === 'spices') {
        return c.includes('spice') || c.includes('herb') || c.includes('seasoning');
      }
      if (g === 'pantry') {
        return c.includes('pantry') || c.includes('grain') || c.includes('sauce') || c.includes('oil');
      }
      return c.includes(g);
    });
    if (items.length > 0) acc[grp] = items;
    return acc;
  }, {} as Record<string, GroceryItem[]>);

  // Catch any items that didn't match the 5 main groups
  const uncategorized = groceryList.filter(item => {
    const c = item.category?.toLowerCase() || '';
    return !GROUPS.some(g => c.includes(g.toLowerCase()) || (g === 'Pantry' && (c.includes('grain') || c.includes('sauce'))));
  });
  if (uncategorized.length > 0) {
    grouped['Other Essentials'] = uncategorized;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      {/* 1. Header with Progress */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#EAE3D7] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
            Your shopping list
          </h1>
          <p className="text-sm text-[#57534E] mt-0.5">
            {checkedCount} of {totalCount} items completed
          </p>
        </div>

        {checkedCount > 0 && (
          <button
            onClick={() => clearCheckedGroceryItems()}
            className="text-xs font-semibold text-[#8C827A] hover:text-rose-600 transition-colors"
          >
            Clear completed ({checkedCount})
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="w-full bg-[#EAE3D7] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#224827] h-full transition-all duration-300"
            style={{ width: `${(checkedCount / totalCount) * 100}%` }}
          />
        </div>
      )}

      {/* Quick Add Bar */}
      <form
        onSubmit={handleAdd}
        className="p-3 bg-white rounded-2xl border border-[#EAE3D7] shadow-2xs flex flex-wrap sm:flex-nowrap items-center gap-2"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add grocery item (e.g. Greek yogurt, Fresh dill)..."
          className="flex-1 bg-transparent px-3 py-1.5 text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden font-medium min-w-[180px]"
        />

        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Qty"
          className="w-16 bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-2 py-1.5 text-xs text-[#1C1917] text-center focus:outline-hidden"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-1.5 text-xs text-[#1C1917] focus:outline-hidden"
        >
          {GROUPS.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold tracking-wide transition-all shrink-0"
        >
          + Add
        </button>
      </form>

      {/* Grouped Checklist */}
      <div className="space-y-8">
        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([groupTitle, items]) => (
            <div key={groupTitle} className="bg-white rounded-3xl p-6 border border-[#EAE3D7] shadow-2xs space-y-3">
              <h3 className="text-xs uppercase tracking-widest font-bold text-[#8C827A] border-b border-[#F0EBE1] pb-2">
                {groupTitle}
              </h3>

              <ul className="divide-y divide-[#F5EFE6]">
                {items.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => toggleGroceryItem(item.id)}
                    className="py-3 px-2 rounded-xl flex items-center justify-between cursor-pointer group hover:bg-[#FAF7F2] transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                          item.checked
                            ? 'bg-[#224827] border-[#224827] text-white'
                            : 'border-[#D8D0C5] bg-white group-hover:border-[#224827]'
                        }`}
                      >
                        {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span
                        className={`text-sm transition-all ${
                          item.checked
                            ? 'line-through text-[#A89F91]'
                            : 'text-[#1C1917] font-medium'
                        }`}
                      >
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-[#78716C] font-mono">{item.quantity}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeGroceryItem(item.id);
                        }}
                        className="text-[#D8D0C5] hover:text-rose-600 p-1 transition-colors"
                        title="Delete item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl p-12 border border-[#EAE3D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EAE3D7] text-[#224827] flex items-center justify-center mx-auto">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1C1917]">Your list is clear</h3>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              Plan your weekly meals or add missing recipe ingredients in one click to populate your list.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
