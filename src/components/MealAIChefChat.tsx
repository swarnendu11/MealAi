import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Square,
  Copy,
  Check,
  RotateCcw,
  Bot,
  User,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  ChevronDown,
  Trash2,
} from 'lucide-react';
import { Recipe } from '../types/index.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { useMeal } from '../context/MealContext.tsx';
import { getAuthHeaders } from '../lib/api.ts';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
}

interface MealAIChefChatProps {
  recipe: Recipe;
  currentStepIndex?: number | null;
  onModifyRecipe?: (modified: Recipe) => void;
  className?: string;
  compact?: boolean;
}

export const MealAIChefChat: React.FC<MealAIChefChatProps> = ({
  recipe,
  currentStepIndex = null,
  onModifyRecipe,
  className = '',
  compact = false,
}) => {
  const { user } = useAuth();
  const { pantry } = useMeal();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      content: `Hello Chef! I am **MealAI Chef**, your dedicated cooking mentor. I am monitoring every detail of **${recipe.title}** (servings, ingredients, techniques, and food safety). Ask me about substitutions, timing, temperature cues, or how to fix any cooking hiccup!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  // Handle message send with streaming
  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming) return;

    setInput('');

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const aiMessageId = `ai_${Date.now()}`;
    const aiPlaceholder: ChatMessage = {
      id: aiMessageId,
      role: 'model',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, aiPlaceholder]);
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const authHeaders = await getAuthHeaders();
      const pantryNames = pantry.map((p) => p.name);

      const response = await fetch('/api/ai/cooking-assistant-stream', {
        method: 'POST',
        headers: {
          ...authHeaders,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe,
          question: query,
          history: messages
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, content: m.content })),
          currentStepIndex,
          pantryItems: pantryNames,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (!response.body) {
        throw new Error('No readable stream body returned');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let accumulated = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.substring(6));
              if (data.text) {
                accumulated += data.text;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId
                      ? { ...msg, content: accumulated, isStreaming: true }
                      : msg
                  )
                );
              }
              if (data.done) {
                break;
              }
            } catch {
              // Ignore malformed JSON chunks
            }
          }
        }
      }

      // Finalize message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? { ...msg, content: accumulated || 'No response received. Please try again.', isStreaming: false }
            : msg
        )
      );
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, isStreaming: false } : msg
          )
        );
      } else {
        console.error('[MealAIChefChat] Stream error:', err);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId
              ? {
                  ...msg,
                  content:
                    'Sorry Chef, I encountered a temporary connection glitch. Lower your heat if needed, and feel free to ask again!',
                  isStreaming: false,
                }
              : msg
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsStreaming(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (isStreaming) handleStopGeneration();
    setMessages([
      {
        id: `welcome_${Date.now()}`,
        role: 'model',
        content: `New session started for **${recipe.title}**. What would you like guidance on?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const suggestionChips = [
    'What can I substitute?',
    'Make it vegetarian',
    'Make it spicier',
    'Make it healthier',
    'How do I know when it\'s done?',
    'Why is my sauce too thick?',
    'My dish is too salty, help!',
    'Can I make this in an air fryer?',
  ];

  return (
    <div
      className={`flex flex-col bg-white border border-[#EAE3D7] rounded-3xl overflow-hidden shadow-xs ${className}`}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#EAE3D7] bg-[#FAF7F2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#1C1917] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif text-base font-bold text-[#1C1917] tracking-tight leading-none">
                MealAI Chef
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold tracking-wide">
                Live Companion
              </span>
            </div>
            <p className="text-[11px] text-[#78716C] mt-0.5">
              {typeof currentStepIndex === 'number'
                ? `Guiding Step ${currentStepIndex + 1} of ${recipe.instructions.length}`
                : 'Your interactive cooking mentor & troubleshooter'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleResetChat}
            className="p-2 rounded-xl text-[#78716C] hover:text-[#1C1917] hover:bg-[#EFE8DC] transition-colors"
            title="Start new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`p-4 sm:p-5 overflow-y-auto space-y-4 ${compact ? 'max-h-72' : 'max-h-96 min-h-64'}`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-xl bg-[#1C1917] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-amber-300" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#1C1917] text-white rounded-tr-xs shadow-xs'
                  : 'bg-[#FAF7F2] text-[#1C1917] border border-[#EAE3D7] rounded-tl-xs'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.content}</div>

              {msg.isStreaming && (
                <span className="inline-block w-1.5 h-3.5 ml-1 bg-amber-600 animate-pulse align-middle" />
              )}

              {msg.role === 'model' && msg.content && !msg.isStreaming && (
                <div className="mt-2 pt-1 border-t border-[#EAE3D7]/60 flex items-center justify-between text-[10px] text-[#8C827A]">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.content)}
                    className="hover:text-[#1C1917] flex items-center gap-1 transition-colors"
                    title="Copy advice"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                U
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompt Chips */}
      <div className="px-4 py-2 border-t border-[#EAE3D7] bg-[#FAF7F2]/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {suggestionChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSend(chip)}
            disabled={isStreaming}
            className="px-3 py-1 rounded-full bg-white border border-[#EAE3D7] text-[11px] font-medium text-[#57534E] hover:text-[#1C1917] hover:border-[#1C1917] hover:bg-white active:scale-95 transition-all whitespace-nowrap shrink-0 disabled:opacity-50 cursor-pointer shadow-2xs"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 sm:p-4 bg-white border-t border-[#EAE3D7] flex items-center gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask MealAI Chef about ${recipe.title}...`}
          disabled={isStreaming}
          className="flex-1 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E8E1D5] text-xs sm:text-sm text-[#1C1917] placeholder:text-[#A89F91] focus:outline-hidden focus:border-[#1C1917] transition-all disabled:opacity-60"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={handleStopGeneration}
            className="px-4 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Stop</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-[#1C1917] text-white hover:bg-[#2C2724] active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-semibold">Ask</span>
          </button>
        )}
      </form>
    </div>
  );
};
