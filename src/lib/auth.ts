/**
 * Authentication Types and Utilities
 * Uses Clerk as the single source of truth for authentication.
 */

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  isAnonymous: boolean;
  emailVerified?: boolean;
  metadata?: {
    creationTime?: string;
    lastSignInTime?: string;
  };
  providerData?: Array<{
    providerId: string;
    uid?: string;
    displayName?: string | null;
    email?: string | null;
    phoneNumber?: string | null;
    photoURL?: string | null;
  }>;
  getIdToken?: () => Promise<string>;
}

export type User = AuthUser;

export interface ConfirmationResult {
  verificationId: string;
  confirm: (verificationCode: string) => Promise<any>;
}

export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Detects if a Clerk error is due to an unsupported SMS country code (e.g. India +91 not on allowlist)
 */
export function isUnsupportedCountryError(error: any): boolean {
  if (!error) return false;
  if (error.errors && Array.isArray(error.errors)) {
    if (error.errors.some((e: any) => e.code === 'unsupported_country_code')) return true;
  }
  const str = (error.message || error.toString() || '').toLowerCase();
  return (
    str.includes('unsupported_country_code') ||
    str.includes('country (india)') ||
    (str.includes('country') && str.includes('not supported')) ||
    str.includes('phone numbers from this country')
  );
}

/**
 * Clean human-facing error message translator for Clerk and network errors.
 * Never leaks API keys, stack traces, or sensitive internals.
 */
export function getFriendlyAuthErrorMessage(error: any): string {
  if (!error) return 'An error occurred. Please try again.';

  if (isUnsupportedCountryError(error)) {
    return 'Phone numbers from this country (India) are currently not enabled for SMS in your Clerk instance. Please register or sign in using Email & Password or Google, or enable India under SMS Country Allowlist in your Clerk Dashboard.';
  }

  // Handle Clerk error response objects
  if (error.errors && Array.isArray(error.errors) && error.errors.length > 0) {
    const firstErr = error.errors[0];
    if (firstErr.code === 'unsupported_country_code') {
      return 'Phone numbers from this country (India) are currently not enabled for SMS in your Clerk instance. Please register or sign in using Email & Password or Google, or enable India under SMS Country Allowlist in your Clerk Dashboard.';
    }
    if (firstErr.code === 'form_param_format_invalid' && firstErr.meta?.paramName?.includes('phone')) {
      return 'Please enter a valid phone number with international country code (e.g. +91 98765 43210 or +1 555 123 4567).';
    }
    if (firstErr.longMessage) return firstErr.longMessage;
    if (firstErr.message) return firstErr.message;
  }

  const message = error.message || error.toString();

  if (message.includes('form_identifier_not_found') || message.includes("Couldn't find your account")) {
    return 'No account was found with these credentials. Please create an account or verify your details.';
  }
  if (message.includes('form_password_incorrect') || message.includes('Password is incorrect')) {
    return 'Incorrect password. Please verify and try again, or reset your password.';
  }
  if (message.includes('form_identifier_exists') || message.includes('already exists')) {
    return 'An account already exists with this email address. Please sign in instead.';
  }
  if (message.includes('password_pwned') || message.includes('compromised')) {
    return 'This password is too common or compromised. Please choose a stronger password.';
  }
  if (message.includes('strategy_not_supported') || message.includes('not configured') || message.includes('not enabled')) {
    return 'This authentication method is not configured or enabled in the Clerk Dashboard.';
  }
  if (message.includes('session_exists')) {
    return 'You are already signed in. Refreshing session...';
  }
  if (message.includes('NetworkError') || message.includes('fetch')) {
    return 'Network connection issue. Please check your internet connectivity.';
  }

  return message;
}
