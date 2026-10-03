import { NextResponse } from 'next/server';
import { auth, verifyToken } from '@clerk/nextjs/server';

/**
 * Verifies the Clerk authentication for the incoming request.
 * Checks both Next.js Clerk cookie session and Authorization Bearer header.
 * Returns the verified Clerk user ID or null if unauthenticated.
 * NEVER trusts client-provided x-user-id or arbitrary unverified tokens.
 */
export async function getVerifiedUserId(req?: Request): Promise<string | null> {
  // 1. Check Next.js App Router Clerk session via auth()
  try {
    const { userId } = await auth();
    if (userId) return userId;
  } catch {
    // auth() may fail if Clerk env is unconfigured or non-App-router request
  }

  // 2. Check Authorization Bearer header verified cryptographically with Clerk secret key
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1]?.trim();
      const secretKey = process.env.CLERK_SECRET_KEY;
      if (token && secretKey) {
        try {
          const payload = await verifyToken(token, { secretKey });
          if (payload && payload.sub) {
            return payload.sub;
          }
        } catch {
          // Token invalid or expired - reject
        }
      }
    }
  }

  return null;
}

/**
 * Requires verified Clerk authentication.
 * Throws an Unauthorized error if the user cannot be verified.
 */
export async function requireAuthUid(req?: Request): Promise<string> {
  const userId = await getVerifiedUserId(req);
  if (!userId) {
    throw new Error('Unauthorized: Authentication required');
  }
  return userId;
}

/**
 * Helper to get the authenticated user ID.
 * Strictly enforces verified Clerk authentication.
 */
export async function getAuthUid(req?: Request): Promise<string> {
  return requireAuthUid(req);
}

export function jsonResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: any, defaultMessage = 'Internal Server Error', status = 500) {
  console.error('[API Error]:', error);
  const message = error?.message || defaultMessage;
  const isAuthError = message.toLowerCase().includes('unauthorized') || status === 401;
  const finalStatus = isAuthError ? 401 : status;
  return NextResponse.json({ success: false, error: message }, { status: finalStatus });
}
