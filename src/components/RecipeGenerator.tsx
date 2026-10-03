import React, { useState, useRef } from 'react';
import {
  Camera,
  Plus,
  X,
  Play,
  Heart,
  ShoppingCart,
  Check,
  RefreshCw,
  ArrowRight,
  AlertCircle,
  Package,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { Recipe } from '../types/index.ts';
import { getAuthHeaders } from '../lib/api.ts';

interface RecipeGeneratorProps {
  initialIngredients?: string[];
  onOpenCooking: (recipe: Recipe) => void;
  onOpenSubstitution: (ingredientName: string, recipeTitle: string) => void;
}

const MOODS = ['Spicy', 'Comforting', 'Fresh', 'Crispy', 'Creamy', 'Light', 'Hearty'];

const CUISINES = [
  'Any cuisine',
  'Italian',
  'Mexican',
  'Indian',
  'Japanese',
  'Thai',
  'Mediterranean',
  'American',
  'Korean',
  'Middle Eastern',
  'French',
  'Spanish',
];

const DIETS = [
  'Standard diet',
  'High-protein',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Keto / Low-Carb',
  'Gluten-Free',
  'Dairy-Free',
];

const APPLIANCES = ['Stovetop', 'Air Fryer', 'Oven', 'Instant Pot', 'Grill', 'Blender'];

export const RecipeGenerator: React.FC<RecipeGeneratorProps> = ({
  initialIngredients,
  onOpenCooking,
  onOpenSubstitution,
}) => {
  const { user, profile, openAuthModal } = useAuth();
  const { pantry, saveRecipe, toggleFavorite, addRecipeIngredientsToGrocery } = useMeal();

  // 1. Left Column: Ingredients
  const [ingredients, setIngredients] = useState<string[]>(
    initialIngredients && initialIngredients.length > 0
      ? initialIngredients
      : ['Chicken', 'Rice', 'Garlic', 'Onion']
  );
  const [newIngredient, setNewIngredient] = useState('');
  const [showPantryPicker, setShowPantryPicker] = useState(false);
  const [imageAnalyzing, setImageAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 2. Middle Column: Mood & Flavor
  const [selectedMood, setSelectedMood] = useState<string>('Comforting');
  const [cuisine, setCuisine] = useState<string>('Any cuisine');
  const [diet, setDiet] = useState<string>(profile?.dietaryPreferences?.[0] || 'Standard diet');

  // 3. Right Column: Kitchen & Time
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>(['Stovetop', 'Air Fryer']);
  const [maxCookingTime, setMaxCookingTime] = useState<number>(30);
  const [householdSize, setHouseholdSize] = useState<number>(profile?.householdSize || 2);
  const [mealType, setMealType] = useState<string>('Dinner');

  // Generation & Output State
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [modifying, setModifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addedGroceryNotice, setAddedGroceryNotice] = useState<number | null>(null);

  // Add / Remove ingredient
  const handleAddIngredient = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    if (!ingredients.map(i => i.toLowerCase()).includes(clean.toLowerCase())) {
      setIngredients([...ingredients, clean]);
    }
    setNewIngredient('');
  };

  const handleRemoveIngredient = (name: string) => {
    setIngredients(ingredients.filter(i => i !== name));
  };

  const toggleAppliance = (app: string) => {
    if (selectedAppliances.includes(app)) {
      setSelectedAppliances(selectedAppliances.filter(a => a !== app));
    } else {
      setSelectedAppliances([...selectedAppliances, app]);
    }
  };

  // Image Upload Scan
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageAnalyzing(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const authHeaders = await getAuthHeaders();
        const res = await fetch('/api/ai/analyze-ingredients-image', {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            imageBase64: base64Data,
            mimeType: file.type || 'image/jpeg',
          }),
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.detectedIngredients)) {
          const names = data.detectedIngredients.map((d: any) => d.name);
          const merged = Array.from(new Set([...ingredients, ...names]));
          setIngredients(merged);
        } else {
          setError('Could not identify ingredients in this photo. Please try another shot.');
        }
      } catch (err: any) {
        console.error('Image analysis error:', err);
        setError('Failed to scan photo. Please try adding manually.');
      } finally {
        setImageAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Generate recipe
  const handleCreateMeal = async () => {
    if (ingredients.length === 0) {
      setError('Please provide at least one ingredient.');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedRecipe(null);
    setAddedGroceryNotice(null);

    try {
      const pantryNames = pantry.map(p => p.name);
      const authHeaders = await getAuthHeaders();
      const res = await fetch('/api/ai/generate-recipe', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          ingredients,
          cuisine: cuisine === 'Any cuisine' ? undefined : cuisine,
          diet: diet === 'Standard diet' ? undefined : diet,
          mealType: mealType.toLowerCase(),
          maxCookingTime,
          difficulty: 'easy',
          appliances: selectedAppliances,
          notes: `Mood: ${selectedMood}`,
          householdSize,
          calories: profile?.calorieGoal ? Math.round(profile.calorieGoal / 3) : undefined,
          protein: profile?.proteinGoal ? Math.round(profile.proteinGoal / 3) : undefined,
          pantryItems: pantryNames,
        }),
      });

      if (res.status === 401) {
        openAuthModal('signin');
        throw new Error('Please sign in or create an account to generate custom AI recipes.');
      }

      const data = await res.json();
      if (data.success && data.recipe) {
        setGeneratedRecipe(data.recipe);
        await saveRecipe(data.recipe);
      } else {
        throw new Error(data.error || 'Failed to craft recipe.');
      }
    } catch (err: any) {
      console.error('Recipe generation error:', err);
      setError(err?.message || 'Failed to create recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // One-click AI modifications
  const handleModifyRecipe = async (instruction: string) => {
    if (!generatedRecipe) return;
    setModifying(true);
    setError(null);

    try {
      const authHeaders = await getAuthHeaders();
      const res = await fetch('/api/ai/modify-recipe', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          existingRecipe: generatedRecipe,
          modificationRequest: instruction,
        }),
      });

      const data = await res.json();
      if (data.success && data.recipe) {
        setGeneratedRecipe(data.recipe);
        await saveRecipe(data.recipe);
      } else {
        throw new Error(data.error || 'Could not adapt recipe');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to adapt recipe.');
    } finally {
      setModifying(false);
    }
  };

  const handleAddMissingToGrocery = async () => {
    if (!generatedRecipe) return;
    const added = await addRecipeIngredientsToGrocery(generatedRecipe);
    setAddedGroceryNotice(added);
    setTimeout(() => setAddedGroceryNotice(null), 4000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Studio Header */}
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#8C827A]">
          Cooking Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] tracking-tight">
          Create something delicious
        </h1>
        <p className="text-sm text-[#57534E]">
          Combine your available ingredients with your mood, time, and kitchen gear.
        </p>
      </div>

      {error && (
        <div className="max-w-5xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 3-COLUMN STUDIO LAYOUT */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl border border-[#EAE3D7] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#EAE3D7]">
          {/* COLUMN 1: WHAT DO YOU HAVE? */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C827A]">
                  Step 1
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1C1917]">What do you have?</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPantryPicker(!showPantryPicker)}
                  className="p-1.5 rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                  title="Import from Pantry"
                >
                  <Package className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageAnalyzing}
                  className="p-1.5 rounded-lg text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors"
                  title="Scan Fridge / Ingredients Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Pantry Picker inline drawer */}
            {showPantryPicker && (
              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C827A]">
                  <span>From your pantry:</span>
                  <button
                    onClick={() => {
                      const names = pantry.map(p => p.name);
                      setIngredients(Array.from(new Set([...ingredients, ...names])));
                      setShowPantryPicker(false);
                    }}
                    className="text-[#224827] hover:underline"
                  >
                    Add all
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                  {pantry.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleAddIngredient(item.name)}
                      disabled={ingredients.includes(item.name)}
                      className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                        ingredients.includes(item.name)
                          ? 'bg-[#EAE3D7] text-[#8C827A] border-transparent'
                          : 'bg-white text-[#1C1917] border-[#D8D0C5] hover:border-[#224827]'
                      }`}
                    >
                      + {item.name}
                    </button>
                  ))}
                  {pantry.length === 0 && (
                    <span className="text-[11px] text-[#A89F91]">Pantry is empty.</span>
                  )}
                </div>
              </div>
            )}

            {/* Active Ingredients List */}
            <div className="space-y-2 min-h-[140px]">
              <div className="flex flex-wrap gap-2">
                {ingredients.map(ing => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E0D8CB] text-xs font-medium text-[#1C1917]"
                  >
                    <span>{ing}</span>
                    <button
                      onClick={() => handleRemoveIngredient(ing)}
                      className="text-[#8C827A] hover:text-rose-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Add Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddIngredient(newIngredient);
                }}
                className="pt-2"
              >
                <div className="flex items-center gap-2 border-b border-[#D8D0C5] py-1.5">
                  <Plus className="w-3.5 h-3.5 text-[#8C827A]" />
                  <input
                    type="text"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add ingredient..."
                    className="w-full bg-transparent text-xs text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden font-medium"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* COLUMN 2: WHAT SOUNDS GOOD? */}
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C827A]">
                Step 2
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">What sounds good?</h3>
            </div>

            {/* Mood Chips */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                Flavor Profile
              </label>
              <div className="flex flex-wrap gap-1.5">
                {MOODS.map(mood => {
                  const isSelected = selectedMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[#1C1917] text-white'
                          : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cuisine Select */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                Cuisine Style
              </label>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
              >
                {CUISINES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Dietary Focus */}
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                Dietary Preference
              </label>
              <select
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
              >
                {DIETS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* COLUMN 3: YOUR KITCHEN & TIME */}
          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C827A]">
                Step 3
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1C1917]">Your kitchen</h3>
            </div>

            {/* Appliances */}
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                Appliances
              </label>
              <div className="flex flex-wrap gap-1.5">
                {APPLIANCES.map(app => {
                  const active = selectedAppliances.includes(app);
                  return (
                    <button
                      key={app}
                      onClick={() => toggleAppliance(app)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        active
                          ? 'bg-[#224827] text-white'
                          : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
                      }`}
                    >
                      {app}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Cooking Time & Servings */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                  Max Time
                </label>
                <select
                  value={maxCookingTime}
                  onChange={(e) => setMaxCookingTime(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
                >
                  <option value={15}>Under 15 min</option>
                  <option value={30}>30 min max</option>
                  <option value={45}>45 min max</option>
                  <option value={60}>60 min max</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                  Servings
                </label>
                <select
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full text-xs font-medium bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
                >
                  <option value={1}>1 person</option>
                  <option value={2}>2 servings</option>
                  <option value={4}>4 servings</option>
                  <option value={6}>6+ family</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="px-6 sm:px-8 py-5 bg-[#FAF7F2] border-t border-[#EAE3D7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#78716C]">
            <span>Using </span>
            <strong className="text-[#1C1917] font-semibold">{ingredients.length} ingredients</strong>
            <span> · {maxCookingTime} min · {householdSize} servings</span>
          </div>

          <button
            onClick={handleCreateMeal}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white font-semibold text-sm transition-all shadow-xs hover:shadow-md active:scale-98 flex items-center justify-center gap-2 group disabled:opacity-70"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>Create my meal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* LIVE GENERATING STATE (No fake progress bars or percentages) */}
      {loading && (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white border border-[#EAE3D7] shadow-sm text-center space-y-6 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#EAE3D7] flex items-center justify-center mx-auto text-[#224827]">
            <RefreshCw className="w-5 h-5 animate-spin" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1C1917]">
              Cooking up your idea...
            </h3>
            <p className="text-xs text-[#78716C]">
              Your dinner is taking shape with proper culinary technique.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-[#57534E] font-medium pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#224827] animate-pulse" />
              Matching your ingredients
            </span>
            <span className="hidden sm:inline text-[#D8D0C5]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-pulse" />
              Balancing the flavors
            </span>
            <span className="hidden sm:inline text-[#D8D0C5]">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#224827] animate-pulse" />
              Building the recipe
            </span>
          </div>
        </div>
      )}

      {/* GENERATED RECIPE RESULT (Smooth Editorial Arrival) */}
      {generatedRecipe && !loading && (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#EAE3D7] shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Image & Kicker */}
          <div className="relative aspect-16/9 sm:aspect-21/9 overflow-hidden bg-[#EFE8DC]">
            <img
              src={
                generatedRecipe.imageUrl ||
                'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85'
              }
              alt={generatedRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#E2ECD8]">
                {generatedRecipe.cuisine || 'Chef Creation'} · {generatedRecipe.mealTypes?.[0] || 'Dinner'}
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mt-1">
                {generatedRecipe.title}
              </h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Metadata & Actions row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3D7] pb-6">
              <div className="flex items-center gap-3 text-xs text-[#57534E]">
                <span>{generatedRecipe.totalTime || 30} min</span>
                <span aria-hidden="true">·</span>
                <span>{generatedRecipe.difficulty || 'Easy'}</span>
                <span aria-hidden="true">·</span>
                <span>{generatedRecipe.servings || 2} servings</span>
                <span aria-hidden="true">·</span>
                <span>{generatedRecipe.calories || 520} kcal</span>
                <span aria-hidden="true">·</span>
                <span>{generatedRecipe.protein || 35}g protein</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenCooking(generatedRecipe)}
                  className="px-5 py-2.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white font-medium text-xs tracking-wide transition-all shadow-2xs hover:shadow-xs active:scale-98 flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start cooking</span>
                </button>

                <button
                  onClick={() => toggleFavorite(generatedRecipe.id)}
                  className={`p-2.5 rounded-full border transition-colors ${
                    generatedRecipe.isFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-white border-[#D8D0C5] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                  title="Save recipe"
                >
                  <Heart className={`w-4 h-4 ${generatedRecipe.isFavorite ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={handleAddMissingToGrocery}
                  className="p-2.5 rounded-full bg-white border border-[#D8D0C5] text-[#57534E] hover:text-[#1C1917] transition-colors"
                  title="Add to grocery list"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>

            {addedGroceryNotice !== null && (
              <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D7] text-xs text-[#224827] font-medium flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Added {addedGroceryNotice} ingredients to your grocery list.</span>
              </div>
            )}

            {/* Description */}
            <p className="text-sm sm:text-base text-[#44403C] leading-relaxed">
              {generatedRecipe.description}
            </p>

            {/* One-Click Chef Adaptations (Subtle and non-intrusive) */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] space-y-2">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8C827A]">
                Adapt this dish
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Make it healthier',
                  'Make it spicier',
                  'Make it faster',
                  'Make it vegetarian',
                  'Reduce calories',
                  'Make it kid-friendly',
                ].map((action) => (
                  <button
                    key={action}
                    onClick={() => handleModifyRecipe(action)}
                    disabled={modifying}
                    className="px-3 py-1.5 rounded-full bg-white text-xs text-[#44403C] hover:text-[#1C1917] border border-[#D8D0C5] hover:border-[#224827] transition-all disabled:opacity-50"
                  >
                    {action}
                  </button>
                ))}
              </div>
              {modifying && (
                <p className="text-[11px] text-[#224827] font-medium flex items-center gap-1.5 pt-1">
                  <RefreshCw className="w-3 h-3 animate-spin" />
                  <span>Adapting recipe...</span>
                </p>
              )}
            </div>

            {/* Ingredients & Instructions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
              {/* Ingredients (5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#1C1917] border-b border-[#EAE3D7] pb-2">
                  Ingredients
                </h3>
                <ul className="space-y-2 text-xs">
                  {generatedRecipe.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="flex items-center justify-between py-1.5 border-b border-[#F0EBE1] text-[#44403C]"
                    >
                      <span className="font-medium">
                        {ing.amount} {ing.unit} {ing.name}
                      </span>
                      <button
                        onClick={() => onOpenSubstitution(ing.name, generatedRecipe.title)}
                        className="text-[11px] text-[#8C827A] hover:text-[#224827] underline"
                      >
                        Substitute
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions (7 cols) */}
              <div className="md:col-span-7 space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#1C1917] border-b border-[#EAE3D7] pb-2">
                  Instructions
                </h3>
                <ol className="space-y-4">
                  {generatedRecipe.instructions.map((inst) => (
                    <li key={inst.step} className="flex gap-3.5 text-xs text-[#44403C]">
                      <span className="font-serif text-base font-bold text-[#C85A32] shrink-0">
                        {String(inst.step).padStart(2, '0')}
                      </span>
                      <div className="space-y-0.5">
                        {inst.title && (
                          <h4 className="font-semibold text-[#1C1917]">{inst.title}</h4>
                        )}
                        <p className="leading-relaxed">{inst.instruction}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Chef's Notes */}
            {generatedRecipe.tips && generatedRecipe.tips.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F6F1E9] border border-[#EAE3D7] space-y-1.5">
                <h4 className="font-serif text-sm font-bold text-[#1C1917]">Chef's notes</h4>
                <ul className="list-disc list-inside text-xs text-[#57534E] space-y-1">
                  {generatedRecipe.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
