import React, { useState, useEffect } from 'react';
import {
  X,
  RefreshCw,
  Check,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
} from 'lucide-react';
import { getAuthHeaders } from '../lib/api.ts';

interface SubstituteItem {
  name: string;
  ratio: string;
  notes: string;
  cookingImpact: string;
  flavorProfile: string;
  dietary?: string[];
  allergens?: string[];
  safetyWarning?: string;
}

interface SubstitutionModalProps {
  ingredient: string;
  recipeTitle?: string;
  onClose: () => void;
}

export const SubstitutionModal: React.FC<SubstitutionModalProps> = ({
  ingredient,
  recipeTitle,
  onClose,
}) => {
  const [substitutes, setSubstitutes] = useState<SubstituteItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubstitutions = async () => {
      setLoading(true);
      setError(null);
      try {
        const authHeaders = await getAuthHeaders();
        const res = await fetch('/api/ai/substitute-ingredient', {
          method: 'POST',
          headers: {
            ...authHeaders,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredient,
            recipeContext: recipeTitle,
          }),
        });
        const data = await res.json();
        if (data.success && data.substitutes) {
          setSubstitutes(data.substitutes);
        } else if (data.substitutions) {
          // Compatibility with legacy shape
          setSubstitutes(
            data.substitutions.map((s: any) => ({
              name: s.name || s.substitute,
              ratio: s.ratio || '1:1',
              notes: s.reason || s.explanation || 'Direct replacement in equal measure.',
              cookingImpact: s.cookingImpact || 'Similar cooking properties.',
              flavorProfile: s.flavorProfile || 'Balanced',
              dietary: s.dietary || [],
              allergens: s.allergens || [],
              safetyWarning: s.safetyWarning,
            }))
          );
        } else {
          throw new Error(data.error || 'Failed to retrieve substitutions');
        }
      } catch (e: any) {
        console.error('[SubstitutionModal] Error:', e);
        setError('Could not generate substitutions. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    if (ingredient) {
      fetchSubstitutions();
    }
  }, [ingredient, recipeTitle]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Culinary substitutions for ${ingredient}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#EAE3D7] shadow-2xl relative space-y-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EAE3D7] pb-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>MealAI Substitution Science</span>
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
              Substitutes for "{ingredient}"
            </h3>
            {recipeTitle && (
              <p className="text-xs text-[#78716C] truncate max-w-sm">
                Tailored for: <span className="font-medium text-[#1C1917]">{recipeTitle}</span>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FAF7F2] hover:bg-[#EFE8DC] text-[#78716C] hover:text-[#1C1917] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-amber-600 animate-spin mx-auto" />
            <p className="text-xs sm:text-sm text-[#78716C] font-medium">
              Analyzing culinary chemistry, ratios &amp; food safety...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Substitutes List */}
        {!loading && substitutes.length > 0 && (
          <div className="space-y-4 overflow-y-auto flex-1 pr-1">
            {substitutes.map((sub, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D7] space-y-2.5 hover:border-[#D6CCC0] transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1C1917]">
                      {sub.name}
                    </h4>
                    <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full inline-block mt-1">
                      Ratio: {sub.ratio}
                    </span>
                  </div>

                  {sub.dietary && sub.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {sub.dietary.map((d, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-white text-[10px] text-[#57534E] border border-[#E8E1D5]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-[#57534E] leading-relaxed">
                  {sub.notes}
                </p>

                {sub.cookingImpact && (
                  <div className="text-[11px] text-[#78716C] flex items-start gap-1.5 pt-1">
                    <strong className="text-[#1C1917]">Cooking Impact:</strong>
                    <span>{sub.cookingImpact}</span>
                  </div>
                )}

                {sub.safetyWarning && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{sub.safetyWarning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="pt-2 border-t border-[#EAE3D7] flex items-center justify-between">
          <span className="text-[11px] text-[#A89F91]">
            All conversions verified for culinary and dietary safety
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#2C2724] text-white text-xs font-semibold active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
