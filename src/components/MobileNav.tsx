import React from 'react';
import { Home, Plus, Calendar, Heart, Package, Compass, User } from 'lucide-react';
import { useMeal } from '../context/MealContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openOnboarding: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  const { favorites, pantry } = useMeal();
  const { user, profile } = useAuth();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E281C]/95 backdrop-blur-md border-t border-[#1E4D37] px-2.5 py-1.5 pb-safe shadow-xl">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-[#CFDFD7] hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Discover / Catalog */}
        <button
          onClick={() => setActiveTab('catalog')}
          className={`relative flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'catalog' ? 'text-amber-400 font-bold' : 'text-[#CFDFD7] hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Discover</span>
        </button>

        {/* Center Primary Action: Create Recipe */}
        <button
          onClick={() => setActiveTab('generate')}
          className="flex flex-col items-center justify-center -mt-4 focus:outline-hidden cursor-pointer"
          title="Create Recipe"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D95F3F] via-[#E5832E] to-[#F59E0B] text-white flex items-center justify-center shadow-lg shadow-orange-950/40 active:scale-95 transition-transform border-2 border-[#0E281C]">
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-[#F59E0B] mt-0.5">Studio</span>
        </button>

        {/* Planner */}
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'planner' ? 'text-sky-400 font-bold' : 'text-[#CFDFD7] hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Planner</span>
        </button>

        {/* Pantry */}
        <button
          onClick={() => setActiveTab('pantry')}
          className={`relative flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
            activeTab === 'pantry' ? 'text-emerald-400 font-bold' : 'text-[#CFDFD7] hover:text-white'
          }`}
        >
          <Package className="w-5 h-5" />
          {pantry.length > 0 && (
            <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-[#E5A72E] ring-2 ring-[#0E281C]" />
          )}
          <span className="text-[10px] mt-0.5">Pantry</span>
        </button>

        {/* Profile / Cookbook */}
        {user ? (
          <button
            onClick={() => setActiveTab('profile')}
            className={`relative flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'text-emerald-300 font-bold' : 'text-[#CFDFD7] hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Profile</span>
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('favorites')}
            className={`relative flex flex-col items-center justify-center p-1 rounded-xl transition-colors cursor-pointer ${
              activeTab === 'favorites' ? 'text-rose-400 font-bold' : 'text-[#CFDFD7] hover:text-white'
            }`}
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute top-0.5 right-1 w-2 h-2 rounded-full bg-rose-400 ring-2 ring-[#0E281C]" />
            )}
            <span className="text-[10px] mt-0.5">Cookbook</span>
          </button>
        )}
      </div>
    </nav>
  );
};
