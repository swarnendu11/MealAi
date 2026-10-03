import React from 'react';

export interface MealAILogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark' | 'wordmark';
  theme?: 'dark' | 'light';
  showTagline?: boolean;
  className?: string;
}

/**
 * MealAI Brand Logo & Emblem
 * Combines an artisanal cooking vessel, a fresh botanical sprout (ingredients/pantry),
 * a culinary spice flame (cooking warmth), and an AI intelligence spark.
 */
export const MealAILogo: React.FC<MealAILogoProps> = ({
  size = 'md',
  variant = 'full',
  theme = 'dark',
  showTagline = false,
  className = '',
}) => {
  // Dimension configurations
  const dimensions = {
    sm: {
      mark: 'w-7 h-7',
      text: 'text-lg sm:text-xl',
      badge: 'text-[9px]',
      tagline: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      mark: 'w-9 h-9',
      text: 'text-2xl sm:text-[26px]',
      badge: 'text-[10px]',
      tagline: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      mark: 'w-11 h-11',
      text: 'text-3xl sm:text-4xl',
      badge: 'text-xs',
      tagline: 'text-xs',
      gap: 'gap-3',
    },
    xl: {
      mark: 'w-14 h-14',
      text: 'text-4xl sm:text-5xl',
      badge: 'text-sm',
      tagline: 'text-sm',
      gap: 'gap-3.5',
    },
  };

  const currentDim = dimensions[size];
  const isLight = theme === 'light';

  // The distinctive vector emblem
  const Emblem = (
    <div
      className={`relative shrink-0 ${currentDim.mark} rounded-xl bg-gradient-to-br from-[#1C3822] to-[#122416] p-1.5 shadow-xs flex items-center justify-center border border-[#2B4E32]/60 select-none group-hover:scale-105 transition-transform duration-300`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Artisan Ceramic Bowl Base */}
        <path
          d="M 9 27 C 10 36, 17 40, 24 40 C 31 40, 38 36, 39 27 C 39 25.8, 38.2 25, 37 25 L 11 25 C 9.8 25, 9 25.8, 9 27 Z"
          fill="#FAF7F2"
        />

        {/* Subtle Bowl Rim Accent */}
        <line
          x1="11"
          y1="25"
          x2="37"
          y2="25"
          stroke="#E0D6C6"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Left: Fresh Botanical Herb Sprout (Ingredients / Pantry) */}
        <path
          d="M 24 24 C 24 17, 16 13, 13.5 7 C 12 13, 17 21.5, 24 24 Z"
          fill="#4ADE80"
        />

        {/* Right: Culinary Flame & Spice Curve (Cooking Heat & Craft) */}
        <path
          d="M 24 24 C 24 16, 32 14, 33.5 8 C 34.5 14, 29.5 21, 24 24 Z"
          fill="#F97316"
        />

        {/* Center: AI Spark of Culinary Intelligence */}
        <path
          d="M 24 6.5 L 25.2 10.2 L 29 11.4 L 25.2 12.6 L 24 16.5 L 22.8 12.6 L 19 11.4 L 22.8 10.2 Z"
          fill="#FBBF24"
        />
      </svg>
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{Emblem}</div>;
  }

  // Wordmark typography
  const Wordmark = (
    <div className="flex flex-col justify-center text-left leading-none">
      <div className="flex items-baseline">
        <span
          className={`font-serif font-bold tracking-tight ${currentDim.text} ${
            isLight ? 'text-white' : 'text-[#1C1917]'
          }`}
        >
          Meal<span className="text-[#C85A32]">AI</span>
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#224827] ml-1 mb-0.5 inline-block shrink-0" />
      </div>

      {showTagline && (
        <span
          className={`font-sans tracking-widest uppercase font-semibold mt-1 ${currentDim.tagline} ${
            isLight ? 'text-[#D8D0C5]' : 'text-[#8C827A]'
          }`}
        >
          Culinary Studio
        </span>
      )}
    </div>
  );

  if (variant === 'wordmark') {
    return <div className={`inline-flex items-center ${className}`}>{Wordmark}</div>;
  }

  // Full Lockup: Emblem + Wordmark
  return (
    <div className={`inline-flex items-center ${currentDim.gap} ${className}`}>
      {Emblem}
      {Wordmark}
    </div>
  );
};
