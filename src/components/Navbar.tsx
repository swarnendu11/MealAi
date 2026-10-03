import React, { useState, useEffect } from 'react';
import {
  Search,
  UserPlus,
  Menu,
  X,
  Plus,
} from 'lucide-react';
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { MealAILogo } from './MealAILogo.tsx';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openOnboarding: () => void;
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openOnboarding: _openOnboarding,
  onOpenSearch,
}) => {
  const { user, profile, guestUser, signOut, openAuthModal } = useAuth();
  const { pantry } = useMeal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'catalog', label: 'Discover' },
    { id: 'planner', label: 'Meal Planner' },
    { id: 'pantry', label: 'Pantry', count: pantry.length > 0 ? pantry.length : undefined },
    { id: 'groceries', label: 'Grocery' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0E281C]/95 backdrop-blur-md border-b border-[#1E4D37] shadow-lg shadow-black/20 py-3'
          : 'bg-[#0E281C] border-b border-[#183E2C] shadow-md py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-8 lg:gap-10">
            <button
              onClick={() => setActiveTab('landing')}
              className="group flex items-center text-left focus:outline-hidden cursor-pointer"
              aria-label="MealAI Home"
            >
              <MealAILogo size="md" theme="light" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative text-xs lg:text-sm font-semibold transition-all py-1.5 px-3.5 rounded-full flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'text-white bg-[#194C35] border border-[#2D7553] shadow-xs'
                        : 'text-[#D2E3D8] hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-[#E5A72E] text-[#0E281C]">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Actions: Search, Create Recipe, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 text-xs text-[#E2EDE7] hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/20 hover:border-amber-400 transition-all shadow-2xs cursor-pointer"
              title="Search recipes (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline font-medium">Search</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => setActiveTab('generate')}
              className="hidden sm:inline-flex items-center gap-2 px-4.5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#D95F3F] via-[#E5832E] to-[#F59E0B] hover:brightness-110 active:scale-98 transition-all shadow-md shadow-orange-950/30 cursor-pointer"
            >
              <span>Cook something</span>
            </button>

            {/* Authentication Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Show when="signed-out">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <SignInButton mode="modal">
                    <button className="text-xs font-semibold text-[#D2E3D8] hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="text-xs font-bold text-[#0A2216] bg-[#22C55E] hover:bg-[#16A34A] px-3.5 py-1.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center gap-1.5">
                      <UserPlus className="w-3.5 h-3.5 text-[#0A2216]" />
                      <span>Sign up</span>
                    </button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'profile'
                        ? 'text-white bg-[#194C35] font-bold border border-[#2D7553]'
                        : 'text-[#D2E3D8] hover:text-white hover:bg-white/10'
                    }`}
                    title="Kitchen Preferences"
                  >
                    Preferences
                  </button>
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-8 h-8 rounded-full border border-emerald-400',
                      },
                    }}
                  />
                </div>
              </Show>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#E2EDE7] hover:text-white hover:bg-white/10 rounded-xl focus:outline-hidden cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-[#1E4D37] mt-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#194C35] text-white border border-[#2D7553]'
                    : 'text-[#D2E3D8] hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#E5A72E] text-[#0E281C]">
                    {item.count}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setActiveTab('generate');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#D95F3F] to-[#E5832E] text-white mt-2 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Create Recipe</span>
            </button>

            {/* Mobile Auth actions */}
            <div className="pt-3 mt-2 border-t border-[#1E4D37] px-1">
              <Show when="signed-out">
                <div className="grid grid-cols-2 gap-2">
                  <SignInButton mode="modal">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 text-center transition-colors cursor-pointer border border-white/15"
                    >
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold text-[#0A2216] bg-[#22C55E] hover:bg-[#16A34A] text-center transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-[#0A2216]" />
                      <span>Sign up</span>
                    </button>
                  </SignUpButton>
                </div>
              </Show>
              <Show when="signed-in">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#1E4D37] bg-white/5">
                  <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="text-xs font-bold text-white">My Account</span>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-white px-2.5 py-1.5 rounded-lg bg-[#194C35] hover:bg-[#235F43] border border-[#2D7553] cursor-pointer"
                  >
                    Preferences
                  </button>
                </div>
              </Show>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
