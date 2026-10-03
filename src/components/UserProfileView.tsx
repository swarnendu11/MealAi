import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  DollarSign,
  Flame,
  Activity,
  Sparkles,
  ChefHat,
  SlidersHorizontal,
  Save,
  RefreshCw,
  LogOut,
  Copy,
  Check,
  Lock,
  Utensils,
  Zap,
  BookOpen,
  Heart,
  Package,
  Layers,
  ArrowRight,
  Shield,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { getUserProfile } from '../lib/db.ts';
import { UserProfile } from '../types/index.ts';
import { MealAILogo } from './MealAILogo.tsx';

interface UserProfileViewProps {
  onNavigate?: (tab: string) => void;
}

const AVAILABLE_DIETARIES = [
  'High-Protein',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Low-Carb',
  'Mediterranean',
  'Paleo',
  'Halal',
  'Kosher',
  'Nut-Free',
  'Low-Sodium',
];

const AVAILABLE_ALLERGIES = [
  'Peanuts',
  'Tree Nuts',
  'Shellfish',
  'Fish',
  'Dairy / Lactose',
  'Eggs',
  'Soy',
  'Wheat / Gluten',
  'Sesame',
  'Sulfites',
  'Mustard',
];

const AVAILABLE_CUISINES = [
  'Italian',
  'Mexican',
  'Japanese',
  'Indian',
  'Mediterranean',
  'French',
  'Thai',
  'Korean',
  'American',
  'Vietnamese',
  'Middle Eastern',
  'Spanish',
  'Greek',
  'Chinese',
];

const AVAILABLE_APPLIANCES = [
  'Air Fryer',
  'Instant Pot / Pressure Cooker',
  'Oven',
  'Stovetop',
  'Blender',
  'Slow Cooker',
  'Cast Iron Skillet',
  'Grill',
  'Sous Vide',
  'Food Processor',
  'Toaster Oven',
];

const AVATAR_OPTIONS = [
  { id: 'chef-hat', icon: '👨‍🍳', label: 'Classic Chef' },
  { id: 'herb', icon: '🌿', label: 'Herb Whisperer' },
  { id: 'fire', icon: '🔥', label: 'Grill Master' },
  { id: 'baker', icon: '🥐', label: 'Artisan Baker' },
  { id: 'knife', icon: '🔪', label: 'Prep Expert' },
  { id: 'bowl', icon: '🥗', label: 'Bowl Crafter' },
  { id: 'taco', icon: '🌮', label: 'Street Foodie' },
  { id: 'avocado', icon: '🥑', label: 'Clean Eater' },
];

export const UserProfileView: React.FC<UserProfileViewProps> = ({ onNavigate }) => {
  const { user, profile, updateProfile, signOut, openAuthModal, guestUser, sendPasswordReset } = useAuth();
  const { favorites, pantry, currentPlan } = useMeal();

  // Local editable form state
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'dietary' | 'tastes' | 'goals' | 'security'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [customAllergyInput, setCustomAllergyInput] = useState('');
  const [copiedUid, setCopiedUid] = useState(false);
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  // Sync form with profile whenever profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.displayName || '',
        email: profile.email || user?.email || '',
        phoneNumber: profile.phoneNumber || user?.phoneNumber || '',
        avatar: profile.avatar || user?.photoURL || '',
        dietaryPreferences: profile.dietaryPreferences || [],
        allergies: profile.allergies || [],
        favoriteCuisines: profile.favoriteCuisines || [],
        skillLevel: profile.skillLevel || 'easy',
        householdSize: profile.householdSize || 2,
        preferredAppliances: profile.preferredAppliances || [],
        calorieGoal: profile.calorieGoal || 2000,
        proteinGoal: profile.proteinGoal || 100,
        dailyBudget: profile.dailyBudget || 25,
      });
    } else if (user) {
      setFormData({
        name: user.displayName || 'Chef',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        avatar: user.photoURL || '',
        dietaryPreferences: [],
        allergies: [],
        favoriteCuisines: ['Italian', 'Mexican'],
        skillLevel: 'easy',
        householdSize: 2,
        preferredAppliances: ['Stovetop', 'Oven'],
        calorieGoal: 2000,
        proteinGoal: 100,
        dailyBudget: 25,
      });
    }
  }, [profile, user]);

  const handleCopyUid = () => {
    if (user?.uid) {
      navigator.clipboard.writeText(user.uid);
      setCopiedUid(true);
      setTimeout(() => setCopiedUid(false), 2000);
    }
  };

  const handleRefreshProfile = async () => {
    if (!user) return;
    setIsRefreshing(true);
    try {
      const freshProf = await getUserProfile(user.uid);
      if (freshProf) {
        await updateProfile(freshProf);
      }
    } catch (e) {
      console.warn('Refresh profile error:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleToggleDietary = (item: string) => {
    const current = formData.dietaryPreferences || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    setFormData({ ...formData, dietaryPreferences: updated });
  };

  const handleToggleAllergy = (item: string) => {
    const current = formData.allergies || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    setFormData({ ...formData, allergies: updated });
  };

  const handleAddCustomAllergy = () => {
    const clean = customAllergyInput.trim();
    if (!clean) return;
    const current = formData.allergies || [];
    if (!current.includes(clean)) {
      setFormData({ ...formData, allergies: [...current, clean] });
    }
    setCustomAllergyInput('');
  };

  const handleToggleCuisine = (item: string) => {
    const current = formData.favoriteCuisines || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    setFormData({ ...formData, favoriteCuisines: updated });
  };

  const handleToggleAppliance = (item: string) => {
    const current = formData.preferredAppliances || [];
    const updated = current.includes(item)
      ? current.filter((x) => x !== item)
      : [...current, item];
    setFormData({ ...formData, preferredAppliances: updated });
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfile(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to save profile changes:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    setResetError(null);
    try {
      await sendPasswordReset(user.email);
      setPasswordResetSent(true);
      setTimeout(() => setPasswordResetSent(false), 6000);
    } catch (err: any) {
      setResetError(err?.message || 'Could not send password reset email.');
    }
  };

  // Planned meal count calculation
  const totalPlannedMeals = currentPlan?.days
    ? Object.values(currentPlan.days).reduce((acc: number, day) => {
        let count = 0;
        if (day?.breakfast) count++;
        if (day?.lunch) count++;
        if (day?.dinner) count++;
        if (day?.snack) count++;
        return acc + count;
      }, 0)
    : 0;

  // Account provider identification
  const currentProvider = user?.providerData?.[0]?.providerId || 'email';
  const isGoogleUser = currentProvider === 'google.com';
  const isPhoneUser = currentProvider === 'phone' || !!user?.phoneNumber;
  const isEmailUser = currentProvider === 'password';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
      {/* 1. Header & Hero Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1C3822] text-[#FAF7F2] p-6 sm:p-10 shadow-xl border border-emerald-900/40">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-[#245229] via-[#C85A32]/25 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-6">
            {/* User Avatar */}
            <div className="relative group shrink-0">
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl bg-gradient-to-br from-[#EAE3D7] to-[#D8D0C5] text-[#1C1917] font-serif font-bold text-2xl sm:text-3xl flex items-center justify-center shadow-lg border-2 border-white/30 overflow-hidden">
                {formData.avatar && formData.avatar.startsWith('http') ? (
                  <img
                    src={formData.avatar}
                    alt={formData.name || 'User avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : formData.avatar && formData.avatar.length <= 4 ? (
                  <span className="text-3xl">{formData.avatar}</span>
                ) : (
                  <span>
                    {(formData.name || user?.email || 'Chef').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {user && (
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1C3822] flex items-center justify-center text-white"
                  title="Verified Active Account"
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {formData.name || 'Chef Profile'}
                </h1>
                {user ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    <span>Verified Account</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-amber-950/80 text-amber-300 border border-amber-500/40">
                    <span>Guest Session</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#E8E1D5]/80">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>{user?.email || formData.email || 'No email attached'}</span>
                </span>

                {(user?.phoneNumber || formData.phoneNumber) && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{user?.phoneNumber || formData.phoneNumber}</span>
                  </span>
                )}

                {user?.metadata?.creationTime && (
                  <span className="flex items-center gap-1.5 hidden sm:inline-flex text-[#C8C2B8]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Member since{' '}
                      {new Date(user.metadata.creationTime).toLocaleDateString(undefined, {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </span>
                )}
              </div>

              {/* User UID snippet */}
              {user?.uid && (
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[11px] font-mono text-[#FAF7F2]/60 truncate max-w-xs sm:max-w-sm">
                    UID: {user.uid}
                  </span>
                  <button
                    onClick={handleCopyUid}
                    className="p-1 rounded hover:bg-white/10 text-[#FAF7F2]/70 hover:text-white transition-colors cursor-pointer"
                    title="Copy UID"
                  >
                    {copiedUid ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex flex-wrap items-center gap-2.5 sm:self-center">
            {user ? (
              <>
                <button
                  onClick={handleRefreshProfile}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer disabled:opacity-50"
                  title="Reload user profile"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-300' : ''}`}
                  />
                  <span>{isRefreshing ? 'Syncing...' : 'Sync Profile'}</span>
                </button>

                <button
                  onClick={() => signOut()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-200 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/40 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#1C1917] bg-[#FAF7F2] hover:bg-white transition-all shadow-md cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#224827]" />
                <span>Connect Account</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Kitchen Metrics & Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div
          onClick={() => onNavigate && onNavigate('favorites')}
          className="p-4 rounded-2xl bg-white border border-[#E8E1D5] hover:border-rose-300 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-rose-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
              Cookbook
            </span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-100 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              {favorites.length}
            </span>
            <span className="text-xs text-[#78716C]">recipes</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate && onNavigate('pantry')}
          className="p-4 rounded-2xl bg-white border border-[#E8E1D5] hover:border-emerald-300 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-emerald-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
              Pantry Items
            </span>
            <Package className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              {pantry.length}
            </span>
            <span className="text-xs text-[#78716C]">stocked</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate && onNavigate('planner')}
          className="p-4 rounded-2xl bg-white border border-[#E8E1D5] hover:border-blue-300 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
        >
          <div className="flex items-center justify-between text-blue-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
              Meal Plan
            </span>
            <Calendar className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              {totalPlannedMeals}
            </span>
            <span className="text-xs text-[#78716C]">meals scheduled</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] shadow-2xs">
          <div className="flex items-center justify-between text-amber-700 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
              Daily Target
            </span>
            <Flame className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-[#1C1917]">
              {formData.calorieGoal || 2000}
            </span>
            <span className="text-xs text-[#78716C]">
              kcal · {formData.proteinGoal || 100}g protein
            </span>
          </div>
        </div>
      </div>

      {/* Guest Notice (if not signed in) */}
      {!user && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <div className="space-y-0.5">
              <p className="font-semibold text-xs text-amber-950">
                You are currently customizing a local guest profile.
              </p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Connect or create an account to securely save your dietary preferences, pantry ingredients, and custom recipes.
              </p>
            </div>
          </div>
          <button
            onClick={() => openAuthModal('signup')}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#224827] hover:bg-[#1a391e] text-white text-xs font-semibold shadow-2xs cursor-pointer"
          >
            Sign up now
          </button>
        </div>
      )}

      {/* 3. Sub-Navigation Tabs */}
      <div className="flex border-b border-[#E8E1D5] gap-2 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`pb-3 px-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'profile'
              ? 'border-[#224827] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <User className="w-4 h-4 text-emerald-800" />
          <span>Identity & Household</span>
        </button>

        <button
          onClick={() => setActiveSubTab('dietary')}
          className={`pb-3 px-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'dietary'
              ? 'border-[#224827] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4 text-amber-700" />
          <span>Dietary & Allergies</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tastes')}
          className={`pb-3 px-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'tastes'
              ? 'border-[#224827] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <Utensils className="w-4 h-4 text-rose-700" />
          <span>Cuisines & Appliances</span>
        </button>

        <button
          onClick={() => setActiveSubTab('goals')}
          className={`pb-3 px-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'goals'
              ? 'border-[#224827] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <Activity className="w-4 h-4 text-blue-700" />
          <span>Nutrition & Budget</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`pb-3 px-3 text-xs uppercase tracking-wider font-bold transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'security'
              ? 'border-[#224827] text-[#1C1917]'
              : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
          }`}
        >
          <Shield className="w-4 h-4 text-purple-700" />
          <span>Account & Security</span>
        </button>
      </div>

      {/* 4. Form Content */}
      <form onSubmit={handleSaveAll} className="space-y-8">
        {/* SUBTAB 1: Profile & Identity */}
        {activeSubTab === 'profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
            <div className="border-b border-[#F0EBE1] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Personal & Kitchen Identity
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Manage how MealAI addresses you and adapts recipe portion sizes for your home.
              </p>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                Kitchen Avatar Icon
              </label>
              <div className="flex flex-wrap gap-2.5">
                {AVATAR_OPTIONS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: av.icon })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      formData.avatar === av.icon
                        ? 'bg-[#1C3822] text-white border-[#1C3822] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#1C1917] border-[#E8E1D5] hover:border-[#D8D0C5]'
                    }`}
                  >
                    <span className="text-lg">{av.icon}</span>
                    <span>{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Display Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                  Display Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Chef Alex"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/30 focus:border-[#224827]"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Email Address
                  </label>
                  {user?.emailVerified && (
                    <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={formData.email || ''}
                    disabled={!!user?.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] disabled:opacity-75 focus:outline-hidden focus:ring-2 focus:ring-[#224827]/30"
                  />
                </div>
                {user?.email && (
                  <p className="text-[10px] text-[#8C827A]">
                    Synchronized with your active account login.
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={formData.phoneNumber || ''}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/30 focus:border-[#224827]"
                  />
                </div>
              </div>

              {/* Household Size */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                  Household Size / Default Servings
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, householdSize: num })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        formData.householdSize === num
                          ? 'bg-[#224827] text-white border-[#224827] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#44403C] border-[#DDD5C7] hover:border-[#8C827A]'
                      }`}
                    >
                      {num}{num === 6 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skill Level */}
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                  Culinary Skill Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'beginner', title: 'Beginner', desc: 'Simple 3-5 steps, minimal prep' },
                    { id: 'easy', title: 'Home Cook', desc: 'Comfortable with everyday classics' },
                    { id: 'intermediate', title: 'Intermediate', desc: 'Sauces, searing & multi-timing' },
                    { id: 'advanced', title: 'Advanced', desc: 'Complex techniques & fine dining' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, skillLevel: lvl.id as any })}
                      className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                        formData.skillLevel === lvl.id
                          ? 'bg-[#FAF7F2] border-[#224827] ring-2 ring-[#224827]/20 shadow-xs'
                          : 'bg-white border-[#E8E1D5] hover:border-[#D8D0C5]'
                      }`}
                    >
                      <p className="font-bold text-xs text-[#1C1917]">{lvl.title}</p>
                      <p className="text-[11px] text-[#78716C] mt-1 leading-snug">{lvl.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: Dietary Preferences & Allergies */}
        {activeSubTab === 'dietary' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-8">
            <div className="border-b border-[#F0EBE1] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Dietary Preferences &amp; Food Allergies
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Every recipe generated and meal plan scheduled will automatically adhere to these constraints.
              </p>
            </div>

            {/* Dietary Tags */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                Dietary Lifestyles ({formData.dietaryPreferences?.length || 0} selected)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_DIETARIES.map((item) => {
                  const isSelected = formData.dietaryPreferences?.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleDietary(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C3822] text-white border-[#1C3822] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#44403C] border-[#DDD5C7] hover:border-[#8C827A]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Allergies & Intolerances */}
            <div className="space-y-3 pt-2 border-t border-[#F0EBE1]">
              <label className="block text-xs font-bold uppercase tracking-wider text-rose-800">
                Allergies &amp; Strict Exclusions ({formData.allergies?.length || 0} active)
              </label>
              <p className="text-xs text-[#78716C]">
                MealAI will never recommend recipes containing these allergens, and will proactively warn you about potential cross-contact.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {AVAILABLE_ALLERGIES.map((item) => {
                  const isSelected = formData.allergies?.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleToggleAllergy(item)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                          : 'bg-rose-50/50 text-rose-900 border-rose-200/80 hover:border-rose-400'
                      }`}
                    >
                      {isSelected ? `✕ ${item}` : item}
                    </button>
                  );
                })}
              </div>

              {/* Custom Allergy Input */}
              <div className="flex items-center gap-2 pt-2 max-w-md">
                <input
                  type="text"
                  value={customAllergyInput}
                  onChange={(e) => setCustomAllergyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomAllergy())}
                  placeholder="Add custom allergy (e.g. Cilantro, Mushroom)"
                  className="flex-1 px-3.5 py-2 bg-[#FAF7F2] border border-[#DDD5C7] rounded-xl text-xs text-[#1C1917] focus:outline-hidden focus:border-[#224827]"
                />
                <button
                  type="button"
                  onClick={handleAddCustomAllergy}
                  className="px-4 py-2 bg-[#1C3822] text-white text-xs font-semibold rounded-xl hover:bg-[#15341B] transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: Cuisines & Appliances */}
        {activeSubTab === 'tastes' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-8">
            <div className="border-b border-[#F0EBE1] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Flavor Profiles &amp; Kitchen Equipment
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Tell us which culinary traditions inspire you and what appliances are available in your kitchen.
              </p>
            </div>

            {/* Favorite Cuisines */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                Favorite Cuisines ({formData.favoriteCuisines?.length || 0} selected)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_CUISINES.map((cuisine) => {
                  const isSelected = formData.favoriteCuisines?.includes(cuisine);
                  return (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => handleToggleCuisine(cuisine)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#44403C] border-[#DDD5C7] hover:border-[#8C827A]'
                      }`}
                    >
                      {cuisine}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Appliances */}
            <div className="space-y-3 pt-2 border-t border-[#F0EBE1]">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#57534E]">
                Kitchen Equipment &amp; Appliances ({formData.preferredAppliances?.length || 0} active)
              </label>
              <p className="text-xs text-[#78716C]">
                Recipes will leverage these tools for faster cooking times and specialized textures.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {AVAILABLE_APPLIANCES.map((appliance) => {
                  const isSelected = formData.preferredAppliances?.includes(appliance);
                  return (
                    <button
                      key={appliance}
                      type="button"
                      onClick={() => handleToggleAppliance(appliance)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#1C3822] text-white border-[#1C3822] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#44403C] border-[#DDD5C7] hover:border-[#8C827A]'
                      }`}
                    >
                      {isSelected ? `✓ ${appliance}` : appliance}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 4: Nutrition & Budget Goals */}
        {activeSubTab === 'goals' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
            <div className="border-b border-[#F0EBE1] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Nutritional &amp; Budgetary Objectives
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Optimize your weekly meal plan to meet macro goals and stay within your household food budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Calorie Target */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Calorie Target
                  </span>
                  <Flame className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">
                    {formData.calorieGoal || 2000}
                  </span>
                  <span className="text-xs text-[#78716C]">kcal / day</span>
                </div>
                <input
                  type="range"
                  min={1200}
                  max={4000}
                  step={50}
                  value={formData.calorieGoal || 2000}
                  onChange={(e) => setFormData({ ...formData, calorieGoal: Number(e.target.value) })}
                  className="w-full accent-[#224827] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C827A]">
                  <span>1,200 kcal</span>
                  <span>4,000 kcal</span>
                </div>
              </div>

              {/* Daily Protein Target */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Protein Target
                  </span>
                  <Activity className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">
                    {formData.proteinGoal || 100}
                  </span>
                  <span className="text-xs text-[#78716C]">grams / day</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={250}
                  step={5}
                  value={formData.proteinGoal || 100}
                  onChange={(e) => setFormData({ ...formData, proteinGoal: Number(e.target.value) })}
                  className="w-full accent-[#C85A32] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C827A]">
                  <span>40g</span>
                  <span>250g</span>
                </div>
              </div>

              {/* Daily Meal Budget */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#57534E]">
                    Daily Food Budget
                  </span>
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-3xl font-bold text-[#1C1917]">
                    ${formData.dailyBudget || 25}
                  </span>
                  <span className="text-xs text-[#78716C]">/ day</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  step={5}
                  value={formData.dailyBudget || 25}
                  onChange={(e) => setFormData({ ...formData, dailyBudget: Number(e.target.value) })}
                  className="w-full accent-emerald-700 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C827A]">
                  <span>$10 / day</span>
                  <span>$100 / day</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 5: Account & Security */}
        {activeSubTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E1D5] shadow-xs space-y-6">
            <div className="border-b border-[#F0EBE1] pb-4">
              <h2 className="font-serif text-lg font-bold text-[#1C1917]">
                Account &amp; Security Settings
              </h2>
              <p className="text-xs text-[#78716C] mt-0.5">
                Review your active session, credentials, and local storage status.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                  Authentication Provider
                </span>
                <p className="font-semibold text-sm text-[#1C1917] capitalize flex items-center gap-2">
                  {isGoogleUser && (
                    <span className="inline-flex items-center gap-1.5 text-blue-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-blue-500" />
                      Google Single Sign-On
                    </span>
                  )}
                  {isPhoneUser && (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Phone Number SMS OTP
                    </span>
                  )}
                  {isEmailUser && (
                    <span className="inline-flex items-center gap-1.5 text-amber-800 font-bold">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Email &amp; Secure Password
                    </span>
                  )}
                  {!user && 'Guest Session (Local Mode)'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8E1D5] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#78716C]">
                  Data Storage Engine
                </span>
                <p className="font-mono text-xs text-[#1C1917] truncate">
                  Browser LocalStorage &amp; Local Cache
                </p>
              </div>
            </div>

            {/* Password Reset Action */}
            {user && isEmailUser && user.email && (
              <div className="p-4 rounded-2xl bg-white border border-[#E8E1D5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#8C827A]" />
                    <span>Password Security</span>
                  </p>
                  <p className="text-[11px] text-[#78716C]">
                    Send a secure password reset link to <strong className="text-[#1C1917]">{user.email}</strong>.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#1C1917] bg-[#FAF7F2] hover:bg-[#EAE3D7] border border-[#DDD5C7] transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Send Reset Link
                </button>
              </div>
            )}

            {passwordResetSent && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password reset email dispatched to {user?.email}. Please check your inbox.</span>
              </div>
            )}

            {resetError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{resetError}</span>
              </div>
            )}
          </div>
        )}

        {/* 5. Sticky Bottom Save Bar */}
        <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E1D5] shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {saveSuccess ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Preferences saved to your cloud profile!</span>
              </span>
            ) : (
              <span className="text-xs text-[#78716C] hidden sm:inline">
                Changes will automatically tune recipe generation and dietary filters.
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (profile) setFormData(profile);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#224827] hover:bg-[#18361C] transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Profile & Preferences'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
