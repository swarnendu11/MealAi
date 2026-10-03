import React, { useState } from 'react';
import {
  RefreshCw,
  Play,
  ShoppingCart,
  Check,
  Plus,
  ArrowRight,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe, PlannedMealItem, normalizeRecipeData } from '../types/index.ts';
import { getAuthHeaders } from '../lib/api.ts';

interface MealPlannerViewProps {
  onOpenCooking: (recipe: Recipe) => void;
  onNavigateToGroceries: () => void;
  onSelectRecipe?: (recipe: Recipe) => void;
}

export const MealPlannerView: React.FC<MealPlannerViewProps> = ({
  onOpenCooking,
  onNavigateToGroceries,
  onSelectRecipe,
}) => {
  const { user, profile, openAuthModal } = useAuth();
  const {
    currentPlan,
    setCurrentPlan,
    pantry,
    recipes,
    addWeekToGroceryList,
    regenerateSingleMeal,
  } = useMeal();

  const [loading, setLoading] = useState(false);
  const [groceryNotice, setGroceryNotice] = useState<string | null>(null);
  const [regeneratingSlot, setRegeneratingSlot] = useState<string | null>(null);
  const [mobileActiveDay, setMobileActiveDay] = useState<string>('monday');

  const daysList = [
    { key: 'monday', label: 'MON', full: 'Monday' },
    { key: 'tuesday', label: 'TUE', full: 'Tuesday' },
    { key: 'wednesday', label: 'WED', full: 'Wednesday' },
    { key: 'thursday', label: 'THU', full: 'Thursday' },
    { key: 'friday', label: 'FRI', full: 'Friday' },
    { key: 'saturday', label: 'SAT', full: 'Saturday' },
    { key: 'sunday', label: 'SUN', full: 'Sunday' },
  ];

  // Calculate formatted date range (e.g. October 5 – October 11)
  const getWeekRangeString = () => {
    const now = new Date();
    const start = new Date(now);
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);

    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
    const startDay = start.getDate();
    const endDay = end.getDate();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} – ${endDay}`;
    }
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}`;
  };

  const handleGeneratePlan = async () => {
    setLoading(true);
    setGroceryNotice(null);
    try {
      const today = new Date().toISOString().split('T')[0];
      const pantryNames = pantry.map((p) => p.name);
      const authHeaders = await getAuthHeaders();

      const res = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          dietaryPreferences: profile?.dietaryPreferences || [],
          allergies: profile?.allergies || [],
          favoriteCuisines: profile?.favoriteCuisines || ['Italian', 'Mexican', 'Asian', 'Mediterranean'],
          calorieGoal: profile?.calorieGoal || 2000,
          proteinGoal: profile?.proteinGoal || 90,
          householdSize: profile?.householdSize || 2,
          skillLevel: profile?.skillLevel || 'easy',
          appliances: profile?.preferredAppliances || ['Air Fryer', 'Stovetop', 'Oven'],
          dailyBudget: profile?.dailyBudget || 30,
          pantryItems: pantryNames,
          weekStartDate: today,
        }),
      });

      if (res.status === 401) {
        openAuthModal('signin');
        throw new Error('Please sign in or create an account to generate personalized meal plans.');
      }

      const data = await res.json();
      if (data.success && data.plan) {
        await setCurrentPlan(data.plan);
      } else {
        throw new Error(data.error || 'Failed to craft weekly schedule');
      }
    } catch (e) {
      console.error('Plan generation error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWeekGroceries = async () => {
    if (!currentPlan) return;
    const count = await addWeekToGroceryList(currentPlan);
    setGroceryNotice(`Added ${count} missing ingredients to your grocery list.`);
    setTimeout(() => setGroceryNotice(null), 4000);
  };

  const handleSlotClick = (mealItem: PlannedMealItem) => {
    if (!onSelectRecipe) return;
    const found = recipes.find(r => r.id === mealItem.recipeId || r.title === mealItem.title);
    if (found) {
      onSelectRecipe(found);
    } else {
      onSelectRecipe(
        normalizeRecipeData({
          id: mealItem.recipeId || `rec_${Math.random()}`,
          title: mealItem.title,
          description: `Planned for your weekly menu.`,
          cuisine: mealItem.cuisine || 'International',
          prepTimeMinutes: 15,
          cookTimeMinutes: mealItem.timeMinutes || 20,
          totalTimeMinutes: (mealItem.timeMinutes || 20) + 15,
          calories: mealItem.calories,
          proteinGrams: mealItem.protein,
          carbohydratesGrams: 40,
          fatGrams: 15,
          imageUrl: mealItem.imageUrl,
          ingredients: mealItem.ingredientsSummary
            ? mealItem.ingredientsSummary.map((name) => ({
                name,
                amount: '1',
                unit: 'serving',
                category: 'Pantry',
              }))
            : [],
          instructions: [
            { step: 1, instruction: 'Prepare fresh ingredients.' },
            { step: 2, instruction: 'Cook over medium heat until tender and fragrant.' },
          ],
        })
      );
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* 1. Header with Week Range & Action */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#EAE3D7] pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
            Your week
          </h1>
          <p className="text-sm text-[#57534E] mt-0.5">
            {getWeekRangeString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {currentPlan && (
            <button
              onClick={handleAddWeekGroceries}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F3ECE0] text-[#1C1917] border border-[#D8D0C5] text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#8C827A]" />
              <span>Export grocery list</span>
            </button>
          )}

          <button
            onClick={handleGeneratePlan}
            disabled={loading}
            className="px-6 py-2.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs hover:shadow-xs active:scale-98 flex items-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-white" />
            ) : null}
            <span>{currentPlan ? 'Regenerate week' : 'Generate week'}</span>
          </button>
        </div>
      </div>

      {groceryNotice && (
        <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] text-xs text-[#224827] font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>{groceryNotice}</span>
          </div>
          <button
            onClick={onNavigateToGroceries}
            className="underline font-semibold hover:text-[#1E3D20]"
          >
            View list →
          </button>
        </div>
      )}

      {/* 2. DESKTOP 7-COLUMN PLANNING BOARD */}
      <div className="hidden lg:grid grid-cols-7 gap-4">
        {daysList.map(({ key, label, full }) => {
          const dayData = currentPlan?.days?.[key];
          return (
            <div
              key={key}
              className="bg-white rounded-2xl border border-[#EAE3D7] p-4 flex flex-col justify-between space-y-4 shadow-xs"
            >
              {/* Day Header */}
              <div className="border-b border-[#F0EBE1] pb-3 text-center">
                <span className="text-xs uppercase tracking-widest font-bold text-[#8C827A]">
                  {label}
                </span>
                <p className="font-serif text-sm font-semibold text-[#1C1917] mt-0.5">
                  {full}
                </p>
              </div>

              {/* Breakfast, Lunch, Dinner Slots */}
              <div className="space-y-3 flex-1">
                {/* Breakfast */}
                <div
                  onClick={() => dayData?.breakfast && handleSlotClick(dayData.breakfast)}
                  className="group/slot p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200/80 cursor-pointer transition-colors shadow-2xs"
                >
                  <span className="block text-[11px] uppercase tracking-wider font-bold text-amber-800">
                    Breakfast
                  </span>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    {dayData?.breakfast?.imageUrl && (
                      <img
                        src={dayData.breakfast.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <p className="font-serif text-sm font-bold text-[#1C1917] line-clamp-2 leading-snug group-hover/slot:text-amber-900">
                      {dayData?.breakfast?.title || 'Overnight oats'}
                    </p>
                  </div>
                </div>

                {/* Lunch */}
                <div
                  onClick={() => dayData?.lunch && handleSlotClick(dayData.lunch)}
                  className="group/slot p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200/80 cursor-pointer transition-colors shadow-2xs"
                >
                  <span className="block text-[11px] uppercase tracking-wider font-bold text-emerald-800">
                    Lunch
                  </span>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    {dayData?.lunch?.imageUrl && (
                      <img
                        src={dayData.lunch.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <p className="font-serif text-sm font-bold text-[#1C1917] line-clamp-2 leading-snug group-hover/slot:text-emerald-900">
                      {dayData?.lunch?.title || 'Mediterranean bowl'}
                    </p>
                  </div>
                </div>

                {/* Dinner */}
                <div
                  onClick={() => dayData?.dinner && handleSlotClick(dayData.dinner)}
                  className="group/slot p-3 rounded-xl bg-orange-50/60 hover:bg-orange-100/80 border border-orange-200/80 cursor-pointer transition-colors shadow-2xs"
                >
                  <span className="block text-[11px] uppercase tracking-wider font-bold text-[#C85A32]">
                    Dinner
                  </span>
                  <div className="flex items-center gap-2.5 mt-1.5">
                    {dayData?.dinner?.imageUrl && (
                      <img
                        src={dayData.dinner.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                    )}
                    <p className="font-serif text-sm font-bold text-[#1C1917] line-clamp-2 leading-snug group-hover/slot:text-[#C85A32]">
                      {dayData?.dinner?.title || 'Thai basil chicken'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Day footer macro summary */}
              <div className="pt-3 border-t border-[#F0EBE1] text-xs text-[#8C827A] flex items-center justify-between">
                <span>{dayData?.totalCalories || 1850} kcal</span>
                <span>{dayData?.totalProtein || 88}g P</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MOBILE VERTICAL TIMELINE (Intuitive swipe / day selector) */}
      <div className="lg:hidden space-y-6">
        {/* Day Selector Pill Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
          {daysList.map(({ key, label }) => {
            const isSelected = mobileActiveDay === key;
            return (
              <button
                key={key}
                onClick={() => setMobileActiveDay(key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#EAE3D7]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Selected Day Timeline Cards */}
        {(() => {
          const dayData = currentPlan?.days?.[mobileActiveDay];
          const fullLabel = daysList.find(d => d.key === mobileActiveDay)?.full;
          return (
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3D7] shadow-xs space-y-5">
              <div className="flex items-baseline justify-between border-b border-[#F0EBE1] pb-3">
                <h3 className="font-serif text-xl font-bold text-[#1C1917]">{fullLabel}</h3>
                <span className="text-xs text-[#8C827A]">
                  {dayData?.totalCalories || 1850} kcal · {dayData?.totalProtein || 88}g protein
                </span>
              </div>

              <div className="space-y-4">
                {/* Breakfast */}
                <div
                  onClick={() => dayData?.breakfast && handleSlotClick(dayData.breakfast)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/90 cursor-pointer shadow-2xs"
                >
                  <img
                    src={
                      dayData?.breakfast?.imageUrl ||
                      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
                    }
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-amber-800">Breakfast</span>
                    <h4 className="font-serif text-sm font-bold text-[#1C1917] truncate">
                      {dayData?.breakfast?.title || 'Fluffy Berry Pancakes'}
                    </h4>
                    <p className="text-[11px] text-amber-900/70 mt-0.5">
                      {dayData?.breakfast?.calories || 420} kcal
                    </p>
                  </div>
                </div>

                {/* Lunch */}
                <div
                  onClick={() => dayData?.lunch && handleSlotClick(dayData.lunch)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/90 cursor-pointer shadow-2xs"
                >
                  <img
                    src={
                      dayData?.lunch?.imageUrl ||
                      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80'
                    }
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">Lunch</span>
                    <h4 className="font-serif text-sm font-bold text-[#1C1917] truncate">
                      {dayData?.lunch?.title || 'Garlic Scallion Noodles'}
                    </h4>
                    <p className="text-[11px] text-emerald-900/70 mt-0.5">
                      {dayData?.lunch?.calories || 520} kcal
                    </p>
                  </div>
                </div>

                {/* Dinner */}
                <div
                  onClick={() => dayData?.dinner && handleSlotClick(dayData.dinner)}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-orange-50/70 border border-orange-200/90 cursor-pointer shadow-2xs"
                >
                  <img
                    src={
                      dayData?.dinner?.imageUrl ||
                      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80'
                    }
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#C85A32]">Dinner</span>
                    <h4 className="font-serif text-sm font-bold text-[#1C1917] truncate">
                      {dayData?.dinner?.title || 'Crispy Chili Chicken'}
                    </h4>
                    <p className="text-[11px] text-orange-900/70 mt-0.5">
                      {dayData?.dinner?.calories || 580} kcal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
