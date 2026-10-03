import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  KeyRound,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import {
  getFriendlyAuthErrorMessage,
  isUnsupportedCountryError,
  ConfirmationResult,
} from '../lib/auth.ts';
import { MealAILogo } from './MealAILogo.tsx';

export type AuthMode = 'signin' | 'signup' | 'reset' | 'phone';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationSuccess?: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onRegistrationSuccess,
  initialMode = 'signin',
}) => {
  const {
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    sendPasswordReset,
    sendPhoneCode,
    verifyPhoneCode,
    continueAsGuest,
  } = useAuth();

  // Mode state: 'signin' | 'signup' | 'reset' | 'phone'
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone Authentication inputs
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [codeSent, setCodeSent] = useState(false);
  const [isSubmittingPhone, setIsSubmittingPhone] = useState(false);
  const [isCountryUnsupported, setIsCountryUnsupported] = useState(false);

  // Single loading tracker to strictly prevent duplicate clicks
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Clean human-facing error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  // Focus trap refs
  const modalRef = useRef<HTMLDivElement>(null);
  const prevFocused = useRef<HTMLElement | null>(null);

  // Sync mode when modal opens or initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setResetSuccess(false);
      setIsSubmittingGoogle(false);
      setIsSubmittingEmail(false);
      setIsSubmittingPhone(false);
      setIsCountryUnsupported(false);
      setCodeSent(false);
      setVerificationCode('');
      setPhoneNumber('');
    }
  }, [isOpen, initialMode]);

  // Focus trap and Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    prevFocused.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (prevFocused.current) {
        prevFocused.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isBusy = isSubmittingGoogle || isSubmittingEmail || isSubmittingPhone;

  // Single Google Authentication Request Handler
  const handleGoogleSubmit = async () => {
    if (isBusy) return; // Prevent duplicate clicks while running
    setErrorMessage(null);
    setIsSubmittingGoogle(true);

    try {
      await signInWithGoogle();
      if (mode === 'signup' && onRegistrationSuccess) {
        onRegistrationSuccess();
      } else {
        onClose();
      }
    } catch (err: any) {
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
    } finally {
      setIsSubmittingGoogle(false);
    }
  };

  // Email / Password Form Submit Handler
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBusy) return;
    setErrorMessage(null);
    setResetSuccess(false);
    setIsSubmittingEmail(true);

    try {
      if (mode === 'signin') {
        await signInWithEmail(email, password);
        onClose();
      } else if (mode === 'signup') {
        if (!name.trim()) {
          throw new Error('Please enter your name.');
        }
        await signUpWithEmail(email, password, name.trim());
        if (onRegistrationSuccess) {
          onRegistrationSuccess();
        } else {
          onClose();
        }
      } else if (mode === 'reset') {
        await sendPasswordReset(email);
        setResetSuccess(true);
      }
    } catch (err: any) {
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Phone SMS Code Request Handler
  const handleSendPhoneCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBusy) return;
    setErrorMessage(null);
    setIsCountryUnsupported(false);
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your phone number with country code (e.g. +91 98765 43210 or +1 555 123 4567)');
      return;
    }
    setIsSubmittingPhone(true);
    try {
      const result = await sendPhoneCode(phoneNumber.trim(), 'recaptcha-container');
      setConfirmationResult(result);
      setCodeSent(true);
    } catch (err: any) {
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
      if (isUnsupportedCountryError(err)) {
        setIsCountryUnsupported(true);
      }
    } finally {
      setIsSubmittingPhone(false);
    }
  };

  // Phone SMS Code Verification Handler
  const handleVerifyPhoneCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBusy || !confirmationResult) return;
    setErrorMessage(null);
    if (!verificationCode.trim()) {
      setErrorMessage('Please enter the 6-digit code received via SMS.');
      return;
    }
    setIsSubmittingPhone(true);
    try {
      await verifyPhoneCode(confirmationResult, verificationCode.trim());
      onClose();
    } catch (err: any) {
      const friendly = getFriendlyAuthErrorMessage(err);
      setErrorMessage(friendly);
    } finally {
      setIsSubmittingPhone(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8E1D5] overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isBusy}
          className="absolute top-5 right-5 p-2 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE3D7]/60 transition-colors cursor-pointer disabled:opacity-50 z-10"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="px-6 pt-7 pb-2 text-center">
          <div className="flex justify-center mb-2">
            <MealAILogo size="md" />
          </div>

          <h2
            id="auth-modal-title"
            className="font-serif text-2xl font-bold text-[#1C1917] tracking-tight"
          >
            {mode === 'signup'
              ? 'Create account'
              : mode === 'reset'
              ? 'Reset your password'
              : mode === 'phone'
              ? 'Phone sign in'
              : 'Welcome back'}
          </h2>

          <p className="text-xs text-[#78716C] mt-1 max-w-xs mx-auto leading-relaxed">
            {mode === 'signup'
              ? 'Personalized AI recipes, smart pantry matching, and meal planning.'
              : mode === 'reset'
              ? 'Enter your account email to receive reset instructions.'
              : mode === 'phone'
              ? 'Sign in securely using an SMS verification code sent to your phone.'
              : 'Sign in to access your pantry, meal plans, and saved recipes.'}
          </p>

          {/* Mode Switcher Tabs: [ Sign in ] [ Register ] [ Phone (Optional) ] */}
          {mode !== 'reset' && (
            <div className="grid grid-cols-3 p-1 mt-4 bg-[#EAE3D7]/60 rounded-xl max-w-sm mx-auto gap-1">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                  setIsCountryUnsupported(false);
                }}
                disabled={isBusy}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-[#1C1917] shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                  setIsCountryUnsupported(false);
                }}
                disabled={isBusy}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#224827] text-white shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('phone');
                  setErrorMessage(null);
                  setIsCountryUnsupported(false);
                  setCodeSent(false);
                }}
                disabled={isBusy}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  mode === 'phone'
                    ? 'bg-[#224827] text-white shadow-2xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                <Phone className="w-3 h-3" />
                Phone
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 py-4 space-y-4">
          {/* User-facing error alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex flex-col gap-2.5 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="flex-1 leading-snug font-medium">{errorMessage}</p>
              </div>
              {isCountryUnsupported && (
                <div className="pt-2 border-t border-rose-200/60 flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handleGoogleSubmit}
                    disabled={isBusy}
                    className="flex-1 py-2 px-3 rounded-xl bg-white border border-rose-300 text-rose-900 font-bold text-xs hover:bg-rose-100/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Use Google Instead</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setErrorMessage(null);
                      setIsCountryUnsupported(false);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-white border border-rose-300 text-rose-900 font-bold text-xs hover:bg-rose-100/50 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Use Email Instead</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Password reset success confirmation */}
          {resetSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="flex-1 leading-snug">
                Password reset link sent! Please check your email inbox to proceed.
              </p>
            </div>
          )}

          {/* EXACTLY ONE GOOGLE BUTTON: [ Continue with Google ] */}
          {mode !== 'reset' && mode !== 'phone' && (
            <div>
              <button
                type="button"
                id="google-signin-btn"
                aria-label="Continue with Google"
                onClick={handleGoogleSubmit}
                disabled={isBusy}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl border border-[#D8D0C5] bg-white hover:bg-[#F5F0E6] active:bg-[#ECE4D4] text-xs sm:text-sm font-bold text-[#1C1917] transition-all shadow-xs hover:shadow-md active:scale-98 disabled:opacity-60 disabled:pointer-events-none cursor-pointer"
              >
                {isSubmittingGoogle ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#224827]" />
                    <span>Connecting with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.14z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.15C3.25 21.43 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.32 14.27c-.24-.73-.38-1.5-.38-2.27s.14-1.54.38-2.27V6.58H1.21C.44 8.12 0 9.99 0 12s.44 3.88 1.21 5.42l4.11-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.57 1.21 6.58l4.11 3.15c.94-2.83 3.58-4.98 6.68-4.98z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Divider: ---------------- or ---------------- */}
          {mode !== 'reset' && mode !== 'phone' && (
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-[#EAE3D7] w-full" />
              <span className="bg-[#FAF7F2] px-3 text-[11px] text-[#8C827A] font-medium lowercase">
                or
              </span>
            </div>
          )}

          {/* Phone Form */}
          {mode === 'phone' ? (
            <form onSubmit={codeSent ? handleVerifyPhoneCode : handleSendPhoneCode} className="space-y-3.5">
              <div className="p-3 bg-[#F2EDE4]/70 border border-[#EAE3D7] rounded-xl text-[11px] text-[#78716C] leading-relaxed flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-[#224827] shrink-0 mt-0.5" />
                <span>
                  Enter your mobile number with country code. A verification code will be sent via SMS.
                </span>
              </div>

              {!codeSent ? (
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                    Mobile Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/25 focus:border-[#224827]"
                    />
                  </div>
                  <p className="text-[10px] text-[#8C827A] mt-1 leading-normal">
                    Include country code (e.g. +91 for India, +1 for US/CA, +44 for UK). SMS delivery requires the country to be enabled in your Clerk Dashboard SMS allowlist. Email & Google sign-in are always available without SMS restrictions.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                    6-Digit SMS Verification Code
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] tracking-widest text-center focus:outline-hidden focus:ring-2 focus:ring-[#224827]/25 focus:border-[#224827]"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-[#8C827A]">SMS sent to {phoneNumber}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false);
                        setVerificationCode('');
                      }}
                      className="text-[#224827] font-semibold hover:underline cursor-pointer"
                    >
                      Change number
                    </button>
                  </div>
                </div>
              )}

              {/* Invisible reCAPTCHA container */}
              <div id="recaptcha-container"></div>

              {/* Submit Phone Button */}
              <button
                type="submit"
                disabled={isBusy}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#224827] hover:bg-[#18361C] transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmittingPhone ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <span>{codeSent ? 'Verify code & Sign in' : 'Send verification code'}</span>
                )}
              </button>

              <div className="pt-2 border-t border-[#EAE3D7] space-y-2">
                <button
                  type="button"
                  onClick={handleGoogleSubmit}
                  disabled={isBusy}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-[#D8D0C5] bg-white hover:bg-[#F5F0E6] text-xs font-semibold text-[#1C1917] transition-all cursor-pointer shadow-2xs"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.645-5.2 3.645-9.14z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.93H1.21v3.15C3.25 21.43 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.32 14.27c-.24-.73-.38-1.5-.38-2.27s.14-1.54.38-2.27V6.58H1.21C.44 8.12 0 9.99 0 12s.44 3.88 1.21 5.42l4.11-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.57 1.21 6.58l4.11 3.15c.94-2.83 3.58-4.98 6.68-4.98z"
                    />
                  </svg>
                  <span>Or sign in with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage(null);
                  }}
                  className="w-full text-center text-xs font-semibold text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                >
                  &larr; Or use email & password
                </button>
              </div>
            </form>
          ) : (
            /* Email / Password Form */
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
            {/* Name input (for Create account mode) */}
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                  Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/25 focus:border-[#224827]"
                  />
                </div>
              </div>
            )}

            {/* Email input */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/25 focus:border-[#224827]"
                />
              </div>
            </div>

            {/* Password input */}
            {mode !== 'reset' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#57534E]">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('reset');
                        setErrorMessage(null);
                      }}
                      className="text-[11px] font-semibold text-[#224827] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#DDD5C7] rounded-xl text-xs font-medium text-[#1C1917] focus:outline-hidden focus:ring-2 focus:ring-[#224827]/25 focus:border-[#224827]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#1C1917] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button: [ Sign in to kitchen ] or [ Create account ] */}
            <button
              type="submit"
              disabled={isBusy}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#224827] hover:bg-[#18361C] transition-all shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmittingEmail ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>
                  {mode === 'signup'
                    ? 'Create account'
                    : mode === 'reset'
                    ? 'Send reset link'
                    : 'Sign in to kitchen'}
                </span>
              )}
            </button>

            {/* Back to sign in (when in reset mode) */}
            {mode === 'reset' && (
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                }}
                className="w-full text-center text-xs font-semibold text-[#57534E] hover:text-[#1C1917] pt-1 cursor-pointer"
              >
                &larr; Back to sign in
              </button>
            )}
          </form>
          )}
        </div>

        {/* Footer: Continue as guest */}
        <div className="px-6 py-4 bg-[#F2EDE4]/70 border-t border-[#E8E1D5] flex items-center justify-between text-xs text-[#78716C]">
          <button
            type="button"
            onClick={continueAsGuest}
            disabled={isBusy}
            className="hover:text-[#1C1917] hover:underline cursor-pointer font-medium"
          >
            Continue as guest
          </button>

          {mode === 'signin' ? (
            <p>
              New here?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage(null);
                }}
                disabled={isBusy}
                className="font-bold text-[#224827] hover:underline cursor-pointer ml-1"
              >
                Create account
              </button>
            </p>
          ) : (
            <p>
              Have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage(null);
                }}
                disabled={isBusy}
                className="font-bold text-[#224827] hover:underline cursor-pointer ml-1"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
