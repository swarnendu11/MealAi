/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ClerkProvider, AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { MealProvider, useMeal } from './context/MealContext.tsx';
import { Navbar } from './components/Navbar.tsx';
import { MobileNav } from './components/MobileNav.tsx';
import { LandingPage } from './components/LandingPage.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { RecipeGenerator } from './components/RecipeGenerator.tsx';
import { MealPlannerView } from './components/MealPlannerView.tsx';
import { PantryView } from './components/PantryView.tsx';
import { GroceryListView } from './components/GroceryListView.tsx';
import { FavoritesView } from './components/FavoritesView.tsx';
import { RecipeCatalogView } from './components/RecipeCatalogView.tsx';
import { UserProfileView } from './components/UserProfileView.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { CookingModeModal } from './components/CookingModeModal.tsx';
import { RecipeDetailModal } from './components/RecipeDetailModal.tsx';
import { SubstitutionModal } from './components/SubstitutionModal.tsx';
import { SearchOverlay } from './components/SearchOverlay.tsx';
import { MealAILogo } from './components/MealAILogo.tsx';
import { Recipe } from './types/index.ts';

function MainApp() {
  const { user, guestUser, showAuthModal, setShowAuthModal, authModalMode } = useAuth();
  const { activeCookingRecipe, closeCooking, startCooking } = useMeal();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (localStorage.getItem('mealai_guest_mode') === 'true') {
      return 'dashboard';
    }
    return 'landing';
  });

  // Automatically redirect to MealAI dashboard upon successful authentication
  useEffect(() => {
    if (user && activeTab === 'landing') {
      setActiveTab('dashboard');
    }
  }, [user, activeTab]);

  // Modal states
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [substitutionData, setSubstitutionData] = useState<{
    ingredient: string;
    recipeTitle?: string;
  } | null>(null);
  const [generatorPrefillIngredients, setGeneratorPrefillIngredients] = useState<string[] | undefined>(undefined);

  // Navigate helper
  const handleNavigate = (tab: string, params?: any) => {
    if (params?.prefill) {
      setGeneratorPrefillIngredients(params.prefill);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGenerateFromLanding = (initialIngredients?: string[]) => {
    if (initialIngredients && initialIngredients.length > 0) {
      setGeneratorPrefillIngredients(initialIngredients);
    }
    setActiveTab('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSubstitution = (ingredient: string, recipeTitle: string) => {
    setSubstitutionData({ ingredient, recipeTitle });
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between relative overflow-x-hidden bg-culinary-pattern">

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openOnboarding={() => setShowOnboarding(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 w-full">
        {activeTab === 'landing' && (
          <LandingPage
            onStartGenerate={handleStartGenerateFromLanding}
            onStartPlan={() => handleNavigate('planner')}
            onExplore={() => handleNavigate('catalog')}
            onOpenPantry={() => handleNavigate('pantry')}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            onNavigate={handleNavigate}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            openOnboarding={() => setShowOnboarding(true)}
          />
        )}

        {activeTab === 'catalog' && (
          <RecipeCatalogView
            onOpenRecipe={(r) => setSelectedRecipe(r)}
            onStartCooking={(r) => startCooking(r)}
            onOpenPlanner={() => handleNavigate('planner')}
          />
        )}

        {activeTab === 'generate' && (
          <RecipeGenerator
            initialIngredients={generatorPrefillIngredients}
            onOpenCooking={(r) => startCooking(r)}
            onOpenSubstitution={handleOpenSubstitution}
          />
        )}

        {activeTab === 'planner' && (
          <MealPlannerView
            onOpenCooking={(r) => startCooking(r)}
            onNavigateToGroceries={() => handleNavigate('groceries')}
            onSelectRecipe={(r) => setSelectedRecipe(r)}
          />
        )}

        {activeTab === 'pantry' && (
          <PantryView
            onGenerateFromPantry={(selected) => {
              setGeneratorPrefillIngredients(selected);
              setActiveTab('generate');
            }}
            onOpenRecipe={(r) => setSelectedRecipe(r)}
          />
        )}

        {activeTab === 'groceries' && <GroceryListView />}

        {activeTab === 'profile' && <UserProfileView onNavigate={handleNavigate} />}

        {activeTab === 'favorites' && (
          <FavoritesView
            onSelectRecipe={(r) => setSelectedRecipe(r)}
            onOpenCooking={(r) => startCooking(r)}
            onNavigateToDiscover={() => handleNavigate('catalog')}
          />
        )}
      </main>

      {/* Grounding Luxury Culinary Footer */}
      <footer className="mt-24 border-t border-[#183E2C] bg-[#0B1E16] py-14 text-xs text-[#A5BDB0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 space-y-3">
              <MealAILogo size="md" showTagline={true} theme="light" />
              <p className="text-xs text-[#8BA497] max-w-sm leading-relaxed">
                Turning your kitchen into an extraordinary personal culinary studio with smart recipes, meal planning, and live cooking assistance.
              </p>
              <p className="text-[11px] text-[#617B6E] pt-2">
                © {new Date().getFullYear()} MealAI Inc. All rights reserved.
              </p>
            </div>

            {/* Product */}
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Product
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNavigate('catalog')} className="hover:text-white transition-colors cursor-pointer">
                    Discover Recipes
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('planner')} className="hover:text-white transition-colors cursor-pointer">
                    Meal Planner
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('pantry')} className="hover:text-white transition-colors cursor-pointer">
                    Pantry Intelligence
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNavigate('favorites')} className="hover:text-white transition-colors cursor-pointer">
                    My Cookbook
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Company
              </span>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNavigate('landing')} className="hover:text-white transition-colors cursor-pointer">
                    About Studio
                  </button>
                </li>
                <li>
                  <a href="mailto:support@mealai.app" className="hover:text-white transition-colors">
                    Contact Chef Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                Legal
              </span>
              <ul className="space-y-2">
                <li>
                  <span className="text-[#8BA497] cursor-default">Privacy Policy</span>
                </li>
                <li>
                  <span className="text-[#8BA497] cursor-default">Terms of Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Mobile Navigation */}
      <MobileNav
        activeTab={activeTab}
        setActiveTab={handleNavigate}
        openOnboarding={() => setShowOnboarding(true)}
      />

      {/* Global Modals & Overlays */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectRecipe={(r) => setSelectedRecipe(r)}
      />

      <AuthModal
        isOpen={showAuthModal}
        initialMode={authModalMode}
        onClose={() => setShowAuthModal(false)}
        onRegistrationSuccess={() => {
          setShowAuthModal(false);
          setShowOnboarding(true);
        }}
      />

      <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />

      <RecipeDetailModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onOpenCooking={(r) => {
          setSelectedRecipe(null);
          startCooking(r);
        }}
        onOpenSubstitution={handleOpenSubstitution}
        onSelectRelatedRecipe={(r) => setSelectedRecipe(r)}
      />

      <CookingModeModal
        recipe={activeCookingRecipe}
        onClose={closeCooking}
      />

      {substitutionData && (
        <SubstitutionModal
          ingredient={substitutionData.ingredient}
          recipeTitle={substitutionData.recipeTitle}
          onClose={() => setSubstitutionData(null)}
        />
      )}
    </div>
  );
}

const CLERK_PUBLISHABLE_KEY =
  (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined) ||
  ((import.meta.env as any).NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined) ||
  (typeof process !== 'undefined' ? ((process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) as string | undefined) : '');

export default function App() {
  // Handle Clerk OAuth SSO redirect callback
  if (typeof window !== 'undefined' && window.location.pathname === '/sso-callback') {
    return (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY || ''}>
        <div className="min-h-screen flex items-center justify-center bg-culinary-pattern">
          <AuthenticateWithRedirectCallback signInForceRedirectUrl="/" signUpForceRedirectUrl="/" />
        </div>
      </ClerkProvider>
    );
  }

  if (!CLERK_PUBLISHABLE_KEY) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EE] p-6 text-center">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-xl border border-[#DCE7DA]">
          <h2 className="text-xl font-bold text-[#123524] mb-2">Clerk Configuration Required</h2>
          <p className="text-sm text-[#606862] mb-4">
            Please configure <code className="bg-gray-100 px-2 py-0.5 rounded text-[#D95F3F] font-mono">VITE_CLERK_PUBLISHABLE_KEY</code> in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <AuthProvider>
        <MealProvider>
          <MainApp />
        </MealProvider>
      </AuthProvider>
    </ClerkProvider>
  );
}

