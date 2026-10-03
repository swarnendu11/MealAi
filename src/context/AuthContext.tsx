import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useUser, useAuth as useClerkAuth, useClerk } from '@clerk/clerk-react';
import { AuthUser, ConfirmationResult } from '../lib/auth.ts';
import { getUserProfile, saveUserProfile } from '../lib/db.ts';
import { UserProfile } from '../types/index.ts';

export type AuthModalMode = 'signin' | 'signup' | 'reset' | 'phone';

interface AuthContextType {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  guestUser: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  sendPhoneCode: (phoneNumber: string, containerId?: string) => Promise<ConfirmationResult>;
  verifyPhoneCode: (confirmationResult: ConfirmationResult, verificationCode: string) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  continueAsGuest: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authModalMode: AuthModalMode;
  openAuthModal: (mode?: AuthModalMode) => void;
  isConnected: boolean;
  firebaseConnected?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user: clerkUser, isLoaded: isUserLoaded, isSignedIn } = useUser();
  const { getToken, signOut: clerkSignOut } = useClerkAuth();
  const clerk = useClerk();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [guestMode, setGuestMode] = useState<boolean>(false);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<AuthModalMode>('signin');

  // Check if Clerk environment has been configured
  const isClerkConfigured = useMemo(() => {
    const pubKey =
      (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined) ||
      ((import.meta.env as any).NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string | undefined) ||
      (typeof process !== 'undefined' ? ((process.env.VITE_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) as string | undefined) : '');
    return Boolean(pubKey && !pubKey.includes('placeholder') && !pubKey.includes('example.clerk'));
  }, []);

  // Initialize guest mode flag on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isGuest = localStorage.getItem('mealai_guest_mode') === 'true';
      if (isGuest && !isSignedIn) {
        setGuestMode(true);
      }
    }
  }, [isSignedIn]);

  // Transform Clerk User into AuthUser representation
  const user: AuthUser | null = useMemo(() => {
    if (!isSignedIn || !clerkUser) return null;

    const email = clerkUser.primaryEmailAddress?.emailAddress || null;
    const displayName =
      clerkUser.fullName ||
      clerkUser.username ||
      (email ? email.split('@')[0] : 'Chef');

    return {
      uid: clerkUser.id,
      email,
      displayName,
      photoURL: clerkUser.imageUrl || null,
      phoneNumber: clerkUser.primaryPhoneNumber?.phoneNumber || null,
      isAnonymous: false,
      emailVerified: clerkUser.primaryEmailAddress?.verification?.status === 'verified',
      metadata: {
        creationTime: clerkUser.createdAt ? new Date(clerkUser.createdAt).toISOString() : undefined,
        lastSignInTime: clerkUser.lastSignInAt ? new Date(clerkUser.lastSignInAt).toISOString() : undefined,
      },
      providerData: clerkUser.externalAccounts.map((acc) => ({
        providerId: acc.provider,
        uid: acc.providerUserId,
        email: acc.emailAddress,
        displayName: acc.username || `${acc.firstName || ''} ${acc.lastName || ''}`.trim() || null,
        photoURL: acc.imageUrl || null,
      })),
      getIdToken: async () => {
        const token = await getToken();
        return token || clerkUser.id;
      },
    };
  }, [isSignedIn, clerkUser, getToken]);

  const guestUser = !isSignedIn && guestMode;

  const openAuthModal = (modalMode: AuthModalMode = 'signin') => {
    setAuthModalMode(modalMode);
    setShowAuthModal(true);
  };

  /**
   * Sync Profile from Storage / Clerk data
   */
  const syncProfile = useCallback(async (activeUser: AuthUser | null, isGuest: boolean) => {
    if (activeUser) {
      try {
        const existing = await getUserProfile(activeUser.uid);
        if (existing) {
          const merged: UserProfile = {
            ...existing,
            id: activeUser.uid,
            uid: activeUser.uid,
            email: activeUser.email || existing.email || '',
            name: existing.name || activeUser.displayName || 'Chef',
            displayName: existing.displayName || activeUser.displayName || existing.name || 'Chef',
            avatar: existing.avatar || activeUser.photoURL || '',
            photoURL: existing.photoURL || activeUser.photoURL || existing.avatar || '',
            updatedAt: new Date().toISOString(),
          };
          await saveUserProfile(merged);
          setProfile(merged);
        } else {
          const newProfile: UserProfile = {
            id: activeUser.uid,
            uid: activeUser.uid,
            name: activeUser.displayName || (activeUser.email ? activeUser.email.split('@')[0] : 'Chef'),
            displayName: activeUser.displayName || (activeUser.email ? activeUser.email.split('@')[0] : 'Chef'),
            email: activeUser.email || '',
            phoneNumber: activeUser.phoneNumber || undefined,
            avatar: activeUser.photoURL || '',
            photoURL: activeUser.photoURL || '',
            provider: 'clerk',
            dietaryPreferences: [],
            allergies: [],
            favoriteCuisines: ['Italian', 'Mexican', 'Asian'],
            skillLevel: 'easy',
            householdSize: 2,
            preferredAppliances: ['Stovetop', 'Oven'],
            calorieGoal: 2000,
            proteinGoal: 90,
            dailyBudget: 25,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          await saveUserProfile(newProfile);
          setProfile(newProfile);
        }
      } catch (err) {
        console.error('[AuthContext] Error loading user profile:', err);
      }
    } else if (isGuest) {
      if (typeof window !== 'undefined') {
        const savedGuestProfile = localStorage.getItem('mealai_guest_profile');
        if (savedGuestProfile) {
          try {
            setProfile(JSON.parse(savedGuestProfile));
            return;
          } catch {
            // fallback
          }
        }
      }

      const defaultGuest: UserProfile = {
        id: 'guest_user',
        uid: 'guest_user',
        name: 'Guest Chef',
        displayName: 'Guest Chef',
        email: 'guest@mealai.app',
        avatar: '',
        photoURL: '',
        provider: 'guest',
        dietaryPreferences: [],
        allergies: [],
        favoriteCuisines: ['Italian', 'Mediterranean', 'Mexican'],
        skillLevel: 'easy',
        householdSize: 2,
        preferredAppliances: ['Stovetop', 'Oven', 'Air Fryer'],
        calorieGoal: 2000,
        proteinGoal: 90,
        dailyBudget: 25,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProfile(defaultGuest);
    } else {
      setProfile(null);
    }
  }, []);

  // Sync profile when authentication state or user changes
  useEffect(() => {
    if (user) {
      setGuestMode(false);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('mealai_guest_mode');
        localStorage.removeItem('mealai_guest_profile');
      }
      syncProfile(user, false);
    } else if (guestUser) {
      syncProfile(null, true);
    } else {
      setProfile(null);
    }
  }, [user, guestUser, syncProfile]);

  /**
   * Guest Access: Clearly separated from authenticated Clerk users
   */
  const continueAsGuest = () => {
    setGuestMode(true);
    setShowAuthModal(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mealai_guest_mode', 'true');
    }
    syncProfile(null, true);
  };

  /**
   * Google Social Sign-In using Clerk OAuth
   */
  const signInWithGoogle = async () => {
    if (!isClerkConfigured) {
      throw new Error('Clerk is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local');
    }

    if (clerk.client?.signIn?.authenticateWithRedirect) {
      await clerk.client.signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
      return;
    }

    if (clerk.redirectToSignIn) {
      await clerk.redirectToSignIn({
        signInFallbackRedirectUrl: '/',
        signUpFallbackRedirectUrl: '/',
      });
      return;
    }

    throw new Error('Clerk authentication service is initializing. Please try again.');
  };

  /**
   * Email / Password Sign In using Clerk
   */
  const signInWithEmail = async (email: string, pass: string) => {
    if (!isClerkConfigured) {
      throw new Error('Clerk is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local');
    }
    if (!clerk.client?.signIn) {
      throw new Error('Authentication service is initializing. Please try again.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const result = await clerk.client.signIn.create({
      identifier: cleanEmail,
      password: pass,
    });

    if (result.status === 'complete' && result.createdSessionId) {
      await clerk.setActive({ session: result.createdSessionId });
      setShowAuthModal(false);
    } else {
      throw new Error(`Sign-in requires additional verification: ${result.status}`);
    }
  };

  /**
   * Email / Password Sign Up using Clerk
   */
  const signUpWithEmail = async (email: string, pass: string, name: string) => {
    if (!isClerkConfigured) {
      throw new Error('Clerk is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local');
    }
    if (!clerk.client?.signUp) {
      throw new Error('Registration service is initializing. Please try again.');
    }

    const cleanEmail = email.trim().toLowerCase();
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || 'Chef';
    const lastName = nameParts.slice(1).join(' ') || undefined;

    const result = await clerk.client.signUp.create({
      emailAddress: cleanEmail,
      password: pass,
      firstName,
      lastName,
    });

    if (result.status === 'complete' && result.createdSessionId) {
      await clerk.setActive({ session: result.createdSessionId });
      setShowAuthModal(false);
    } else if (result.status === 'missing_requirements') {
      try {
        await clerk.client.signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        throw new Error('Verification code sent to your email. Please check your inbox to complete registration.');
      } catch (err: any) {
        throw new Error(err.message || 'Additional verification required by Clerk configuration.');
      }
    } else {
      throw new Error(`Registration step required: ${result.status}`);
    }
  };

  /**
   * Password Reset using Clerk
   */
  const sendPasswordReset = async (email: string) => {
    if (!isClerkConfigured) {
      throw new Error('Clerk is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local');
    }
    if (!clerk.client?.signIn) {
      throw new Error('Password reset service is initializing. Please try again.');
    }

    await clerk.client.signIn.create({
      strategy: 'reset_password_email_code',
      identifier: email.trim().toLowerCase(),
    });
  };

  /**
   * Phone Authentication using Clerk
   * Supports real Clerk SMS OTP verification for both sign-in and sign-up.
   */
  const sendPhoneCode = async (phoneNumber: string, _containerId?: string): Promise<ConfirmationResult> => {
    if (!isClerkConfigured) {
      throw new Error('Clerk is not configured. Please set VITE_CLERK_PUBLISHABLE_KEY in .env.local');
    }
    if (!clerk.client) {
      throw new Error('Phone authentication service is initializing. Please try again.');
    }

    const cleanPhone = phoneNumber.trim();

    // First attempt sign-in with phone identifier
    try {
      if (clerk.client.signIn) {
        const attempt = await clerk.client.signIn.create({
          identifier: cleanPhone,
        });

        const phoneFactor = attempt.supportedFirstFactors?.find(
          (factor: any) => factor.strategy === 'phone_code'
        ) as any;

        if (phoneFactor && phoneFactor.phoneNumberId) {
          await clerk.client.signIn.prepareFirstFactor({
            strategy: 'phone_code',
            phoneNumberId: phoneFactor.phoneNumberId,
          });

          return {
            verificationId: phoneFactor.phoneNumberId,
            confirm: async (verificationCode: string) => {
              const result = await clerk.client.signIn.attemptFirstFactor({
                strategy: 'phone_code',
                code: verificationCode.trim(),
              });
              if (result.status === 'complete' && result.createdSessionId) {
                await clerk.setActive({ session: result.createdSessionId });
                setShowAuthModal(false);
                return { user };
              } else {
                throw new Error(`Sign-in verification status: ${result.status}`);
              }
            },
          };
        }
      }
    } catch (signInErr: any) {
      // If error is unsupported country code, propagate immediately without fallback
      if (signInErr?.errors?.some((e: any) => e.code === 'unsupported_country_code')) {
        throw signInErr;
      }

      // If user does not exist yet and sign-up is available, attempt sign-up flow
      const isNotFound = signInErr?.errors?.some((e: any) => e.code === 'form_identifier_not_found');
      if (isNotFound && clerk.client.signUp) {
        const signUpAttempt = await clerk.client.signUp.create({
          phoneNumber: cleanPhone,
        });

        await clerk.client.signUp.preparePhoneNumberVerification({
          strategy: 'phone_code',
        });

        return {
          verificationId: 'signup_phone',
          confirm: async (verificationCode: string) => {
            const result = await clerk.client.signUp.attemptPhoneNumberVerification({
              code: verificationCode.trim(),
            });
            if (result.status === 'complete' && result.createdSessionId) {
              await clerk.setActive({ session: result.createdSessionId });
              setShowAuthModal(false);
              return { user };
            } else {
              throw new Error(`Registration verification status: ${result.status}`);
            }
          },
        };
      }

      // Re-throw other sign-in errors
      throw signInErr;
    }

    throw new Error(
      'Phone SMS authentication is not enabled in your Clerk Dashboard. To use phone login, enable SMS in Clerk Dashboard -> User & Authentication -> Email, Phone, Username.'
    );
  };

  const verifyPhoneCode = async (confirmationResult: ConfirmationResult, verificationCode: string) => {
    if (!confirmationResult || typeof confirmationResult.confirm !== 'function') {
      throw new Error('Invalid verification attempt. Please request a new verification code.');
    }
    await confirmationResult.confirm(verificationCode);
  };

  /**
   * Sign Out using Clerk
   */
  const signOut = async () => {
    try {
      await clerkSignOut();
    } catch (err) {
      console.error('[AuthContext] Sign out error:', err);
    }
    setGuestMode(false);
    setProfile(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mealai_guest_mode');
      localStorage.removeItem('mealai_guest_profile');
    }
  };

  /**
   * Update Profile
   */
  const updateProfile = async (updated: Partial<UserProfile>) => {
    if (!profile) return;
    const newProfile: UserProfile = {
      ...profile,
      ...updated,
      updatedAt: new Date().toISOString(),
    };
    setProfile(newProfile);

    if (user) {
      await saveUserProfile(newProfile);
    } else if (guestUser && typeof window !== 'undefined') {
      localStorage.setItem('mealai_guest_profile', JSON.stringify(newProfile));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading: !isUserLoaded,
        guestUser,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        sendPhoneCode,
        verifyPhoneCode,
        signOut,
        sendPasswordReset,
        updateProfile,
        continueAsGuest,
        showAuthModal,
        setShowAuthModal,
        authModalMode,
        openAuthModal,
        isConnected: isClerkConfigured,
        firebaseConnected: isClerkConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
