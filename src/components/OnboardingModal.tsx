import React, { useState } from 'react';
import { X, Check, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIETS = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Keto / Low-Carb',
  'High-Protein',
  'Paleo',
];

const CUISINES = [
  'Italian',
  'Mexican',
  'Indian',
  'Japanese',
  'Thai',
  'Mediterranean',
  'Spanish',
  'Middle Eastern',
  'French',
  'Korean',
];

const APPLIANCES = ['Stovetop', 'Air Fryer', 'Oven', 'Instant Pot', 'Grill', 'Blender'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { user, profile, updateProfile } = useAuth();
  const { favorites, recipes } = useMeal();

  const [dietary, setDietary] = useState<string[]>(profile?.dietaryPreferences || []);
  const [cuisines, setCuisines] = useState<string[]>(
    profile?.favoriteCuisines || ['Italian', 'Mexican', 'Asian']
  );
  const [skillLevel, setSkillLevel] = useState<'beginner' | 'easy' | 'intermediate' | 'advanced'>(
    profile?.skillLevel || 'easy'
  );
  const [appliances, setAppliances] = useState<string[]>(
    profile?.preferredAppliances || ['Stovetop', 'Air Fryer', 'Oven']
  );
  const [householdSize, setHouseholdSize] = useState<number>(profile?.householdSize || 2);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const toggleArrayItem = (list: string[], setList: (l: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({
        dietaryPreferences: dietary,
        favoriteCuisines: cuisines,
        skillLevel,
        preferredAppliances: appliances,
        householdSize,
      });
      onClose();
    } catch (e) {
      console.error('Failed to update profile preferences:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Kitchen profile"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/70 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-[#EAE3D7] shadow-2xl space-y-8 my-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
              Kitchen Profile
            </h2>
            <p className="text-xs text-[#78716C] mt-0.5">
              Personalized for {profile?.name || user?.email || 'you'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#8C827A] hover:text-[#1C1917]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECTION 1: YOUR PREFERENCES */}
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C827A] block">
            Your Preferences
          </span>

          {/* Diet */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917]">Diet &amp; Nutrition</label>
            <div className="flex flex-wrap gap-1.5">
              {DIETS.map(d => {
                const active = dietary.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleArrayItem(dietary, setDietary, d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorite Cuisines */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917]">Favorite Cuisines</label>
            <div className="flex flex-wrap gap-1.5">
              {CUISINES.map(c => {
                const active = cuisines.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleArrayItem(cuisines, setCuisines, c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#224827] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cooking Skill & Household Size */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Cooking Skill</label>
              <select
                value={skillLevel}
                onChange={(e) => setSkillLevel(e.target.value as any)}
                className="w-full text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
              >
                <option value="beginner">Beginner cook</option>
                <option value="easy">Easy &amp; Everyday</option>
                <option value="intermediate">Confident cook</option>
                <option value="advanced">Advanced chef</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#1C1917]">Household Size</label>
              <select
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full text-xs bg-[#FAF7F2] border border-[#E8E1D5] rounded-xl px-3 py-2 text-[#1C1917] focus:outline-hidden"
              >
                <option value={1}>1 person</option>
                <option value={2}>2 people</option>
                <option value={4}>4 people</option>
                <option value={6}>6+ family</option>
              </select>
            </div>
          </div>

          {/* Appliances */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917]">Available Appliances</label>
            <div className="flex flex-wrap gap-1.5">
              {APPLIANCES.map(app => {
                const active = appliances.includes(app);
                return (
                  <button
                    key={app}
                    type="button"
                    onClick={() => toggleArrayItem(appliances, setAppliances, app)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active
                        ? 'bg-[#1C1917] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] text-[#57534E] hover:text-[#1C1917] border border-[#E8E1D5]'
                    }`}
                  >
                    {app}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 2: YOUR COOKING HISTORY */}
        <div className="pt-4 border-t border-[#F0EBE1] space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#8C827A] block">
            Your Cooking History
          </span>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7]">
              <span className="font-serif text-xl font-bold text-[#1C1917] block">
                {recipes.length}
              </span>
              <span className="text-[11px] text-[#78716C]">Recipes Crafted</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7]">
              <span className="font-serif text-xl font-bold text-[#1C1917] block">
                {favorites.length}
              </span>
              <span className="text-[11px] text-[#78716C]">Recipes Saved</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7]">
              <span className="font-serif text-xl font-bold text-[#1C1917] block">
                {cuisines.length}
              </span>
              <span className="text-[11px] text-[#78716C]">Cuisines Loved</span>
            </div>
          </div>
        </div>

        {/* Action Save Button */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs text-[#57534E] hover:bg-[#FAF7F2]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-[#224827] hover:bg-[#1E3D20] text-white text-xs font-semibold tracking-wide transition-all shadow-2xs"
          >
            {saving ? 'Saving...' : 'Save preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};
