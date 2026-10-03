import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  Thermometer,
  Utensils,
  Plus,
  Trash2,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';
import { Recipe, RecipeInstruction, RecipeIngredient } from '../types/index.ts';
import { MealAIChefChat } from './MealAIChefChat.tsx';

interface ActiveTimer {
  id: string;
  name: string;
  totalSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
  stepIndex: number;
}

interface CookingModeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null;

  const instructions: RecipeInstruction[] = recipe.instructions || [];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAiDrawer, setShowAiDrawer] = useState(false);

  // Multi-timer management
  const [timers, setTimers] = useState<ActiveTimer[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);

  const currentStep = instructions[currentStepIndex];
  const totalSteps = instructions.length;

  // Initialize or update primary timer for the current step if it has timerMinutes
  useEffect(() => {
    if (currentStep?.timerMinutes) {
      const stepTimerId = `timer_step_${currentStep.step}`;
      setTimers((prev) => {
        const exists = prev.some((t) => t.id === stepTimerId);
        if (exists) return prev;
        return [
          ...prev,
          {
            id: stepTimerId,
            name: currentStep.title || `Step ${currentStep.step} Timer`,
            totalSeconds: currentStep.timerMinutes! * 60,
            remainingSeconds: currentStep.timerMinutes! * 60,
            isRunning: false,
            stepIndex: currentStepIndex,
          },
        ];
      });
    }
  }, [currentStepIndex, currentStep]);

  // Master timer interval tick
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => {
          if (!t.isRunning || t.remainingSeconds <= 0) return t;
          const nextSec = t.remainingSeconds - 1;
          if (nextSec === 0) {
            playChime();
          }
          return {
            ...t,
            remainingSeconds: nextSec,
            isRunning: nextSec > 0,
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Play auditory completion chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.15); // A5
      osc.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.3); // D6
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio context fallback silent
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        if (showAiDrawer) {
          setShowAiDrawer(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps, showAiDrawer]);

  const handleNext = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setCompleted(false);
    }
  };

  const toggleTimer = (timerId: string) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === timerId ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (timerId: string) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === timerId ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t
      )
    );
  };

  const removeTimer = (timerId: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== timerId));
  };

  const addCustomTimer = (minutes: number = 5) => {
    const id = `custom_${Date.now()}`;
    setTimers((prev) => [
      ...prev,
      {
        id,
        name: `Custom ${minutes}m Timer`,
        totalSeconds: minutes * 60,
        remainingSeconds: minutes * 60,
        isRunning: true,
        stepIndex: currentStepIndex,
      },
    ]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Extract ingredients related to this step by token matching
  const stepIngredients = useMemo(() => {
    if (!currentStep) return [];
    const text = `${currentStep.instruction} ${currentStep.title || ''}`.toLowerCase();
    return (recipe.ingredients || []).filter((ing) => {
      const tokens = ing.name.toLowerCase().split(/\s+/);
      return tokens.some((token) => token.length > 3 && text.includes(token));
    });
  }, [currentStep, recipe.ingredients]);

  const activeTimersCount = timers.filter((t) => t.isRunning).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Cooking Mode: ${recipe.title}`}
      className="fixed inset-0 z-50 flex flex-col bg-[#141210] text-[#F5F2EB] select-none overflow-hidden animate-in fade-in duration-300"
    >
      {/* Top Header & Sticky Navigation */}
      <header className="px-4 sm:px-8 py-3.5 border-b border-[#2C2724] bg-[#1C1917]/95 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            {currentStepIndex + 1}/{totalSteps}
          </div>
          <div>
            <h2 className="font-serif text-sm sm:text-base font-bold text-white line-clamp-1">
              {recipe.title}
            </h2>
            <p className="text-[11px] text-[#A89F91]">
              Step-by-Step Culinary Guidance
            </p>
          </div>
        </div>

        {/* Global Cooking Controls */}
        <div className="flex items-center gap-2">
          {/* Active Timers Pill */}
          {timers.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C2724] text-xs font-mono">
              <Clock className={`w-3.5 h-3.5 ${activeTimersCount > 0 ? 'text-amber-400 animate-pulse' : 'text-[#8C827A]'}`} />
              <span>{timers.filter((t) => t.remainingSeconds > 0).length} Timers</span>
            </div>
          )}

          <button
            onClick={() => setShowAiDrawer(!showAiDrawer)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              showAiDrawer
                ? 'bg-amber-500 text-[#1C1917]'
                : 'bg-[#2C2724] hover:bg-[#3D3733] text-amber-300 border border-amber-500/30'
            }`}
            title="Ask MealAI Chef about this step"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask MealAI Chef</span>
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-[#2C2724] hover:bg-[#3D3733] text-[#A89F91] hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#2C2724] hover:bg-[#3D3733] text-[#A89F91] hover:text-white transition-colors cursor-pointer ml-1"
            title="Exit Cooking Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#2C2724]">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left/Center Cooking Step Experience */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 flex flex-col justify-between max-w-4xl mx-auto w-full">
          {!completed ? (
            <div className="space-y-8 my-auto animate-in fade-in duration-200">
              {/* Step Badge & Step Counter */}
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-400 font-semibold">
                  STEP {currentStep.step} OF {totalSteps}
                </span>

                {currentStep.timerMinutes && (
                  <span className="text-xs font-mono text-[#A89F91] bg-[#2C2724] px-2.5 py-1 rounded-full">
                    Recommended Duration: {currentStep.timerMinutes} mins
                  </span>
                )}
              </div>

              {/* Step Title (if present) */}
              {currentStep.title && (
                <h1 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                  {currentStep.title}
                </h1>
              )}

              {/* Large, High-Contrast Instruction Typography */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#1C1917] border border-[#2C2724] shadow-xl space-y-4">
                <p className="text-lg sm:text-2xl text-[#E6E1D8] font-normal leading-relaxed">
                  {currentStep.instruction}
                </p>

                {currentStep.tip && (
                  <div className="pt-4 border-t border-[#2C2724] flex items-start gap-2.5 text-xs sm:text-sm text-amber-300/90 leading-relaxed">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Chef's Technique:</strong> {currentStep.tip}
                    </span>
                  </div>
                )}
              </div>

              {/* Relevant Step Ingredients */}
              {stepIngredients.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A89F91]">
                    Required for this step:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stepIngredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full bg-[#24201D] border border-[#3D3733] text-xs text-[#E6E1D8] flex items-center gap-1.5"
                      >
                        <Utensils className="w-3 h-3 text-amber-400" />
                        <strong className="text-white">{ing.amount} {ing.unit}</strong> {ing.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Step Timers */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#A89F91] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Timers for this step</span>
                  </span>

                  <button
                    onClick={() => addCustomTimer(5)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add 5:00 Timer</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timers.map((t) => (
                    <div
                      key={t.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        t.remainingSeconds === 0
                          ? 'bg-rose-950/40 border-rose-500 animate-pulse'
                          : t.isRunning
                          ? 'bg-[#24201D] border-amber-500/60 shadow-lg'
                          : 'bg-[#1C1917] border-[#2C2724]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#A89F91] font-medium line-clamp-1">
                          {t.name}
                        </span>
                        <button
                          onClick={() => removeTimer(t.id)}
                          className="text-[#78716C] hover:text-rose-400 p-1 cursor-pointer"
                          title="Remove timer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-3xl font-bold tracking-tight text-white">
                          {formatTime(t.remainingSeconds)}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => toggleTimer(t.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              t.isRunning
                                ? 'bg-amber-500 text-[#1C1917]'
                                : 'bg-[#3D3733] hover:bg-[#4D4640] text-white'
                            }`}
                          >
                            {t.isRunning ? (
                              <>
                                <Pause className="w-3 h-3 fill-current" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Play className="w-3 h-3 fill-current" />
                                <span>Start</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => resetTimer(t.id)}
                            className="p-1.5 rounded-full bg-[#2C2724] hover:bg-[#3D3733] text-[#A89F91] transition-colors cursor-pointer"
                            title="Reset Timer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Cooking Completed Celebration Screen */
            <div className="my-auto text-center space-y-6 max-w-md mx-auto py-12 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h1 className="font-serif text-3xl font-bold text-white">
                  Bon Appétit, Chef!
                </h1>
                <p className="text-sm text-[#A89F91] leading-relaxed">
                  You have successfully prepared <strong>{recipe.title}</strong>. Take a moment to plate with pride and enjoy your creation.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-[#141210] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  Done &amp; Close Cooking Mode
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStepIndex(0);
                    setCompleted(false);
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#2C2724] hover:bg-[#3D3733] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  Review Steps
                </button>
              </div>
            </div>
          )}

          {/* Sticky Bottom Controls Bar */}
          <footer className="pt-8 border-t border-[#2C2724] flex items-center justify-between gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStepIndex === 0 || completed}
              className="px-5 py-3 rounded-full bg-[#24201D] hover:bg-[#332D29] disabled:opacity-30 disabled:pointer-events-none text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer border border-[#3D3733]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {/* Quick Step Indicators */}
            <div className="hidden sm:flex items-center gap-1.5">
              {instructions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    setCompleted(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentStepIndex
                      ? 'bg-amber-400 scale-125'
                      : idx < currentStepIndex
                      ? 'bg-emerald-500'
                      : 'bg-[#3D3733]'
                  }`}
                  title={`Go to Step ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-[#1C1917] text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finish Dish' : 'Next Step'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </footer>
        </div>

        {/* Right Drawer: Embedded In-Step MealAI Chef Companion */}
        {showAiDrawer && (
          <aside className="w-full sm:w-96 border-l border-[#2C2724] bg-[#1C1917] flex flex-col z-30 shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-[#2C2724] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-serif text-sm font-bold text-white">
                  Step {currentStep.step} Assistant
                </span>
              </div>
              <button
                onClick={() => setShowAiDrawer(false)}
                className="p-1.5 rounded-lg text-[#A89F91] hover:text-white hover:bg-[#2C2724] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden p-3">
              <MealAIChefChat
                recipe={recipe}
                currentStepIndex={currentStepIndex}
                className="h-full border-none shadow-none bg-transparent"
                compact={true}
              />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};
