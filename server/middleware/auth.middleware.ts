import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@clerk/backend';

// Augment Express Request interface with authenticated user details
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email?: string;
        name?: string;
      };
      authUid?: string;
    }
  }
}

/**
 * Strict authentication middleware:
 * Verifies Clerk JWT bearer token from Authorization header.
 * Rejects unauthenticated or invalid requests with 401 Unauthorized.
 * NEVER trusts client-provided x-user-id or arbitrary unverified tokens.
 */
export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Missing or invalid authorization header',
    });
  }

  const token = authHeader.split('Bearer ')[1]?.trim();
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Bearer token is empty',
    });
  }

  const secretKey = process.env.CLERK_SECRET_KEY;
  if (!secretKey) {
    console.error('[Auth Middleware] CLERK_SECRET_KEY is not configured in environment');
    return res.status(500).json({
      success: false,
      error: 'Server authentication configuration error: CLERK_SECRET_KEY is missing',
    });
  }

  try {
    const payload = await verifyToken(token, { secretKey });
    if (!payload || !payload.sub) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized: Invalid token payload',
      });
    }

    req.authUid = payload.sub;
    req.user = {
      uid: payload.sub,
    };
    return next();
  } catch (err: any) {
    console.error('[Auth Middleware] Token verification failed:', err.message);
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Token verification failed',
    });
  }
}

/**
 * Optional authentication middleware:
 * If a valid Clerk Bearer token is present, populates req.authUid and req.user.
 * Otherwise proceeds without authenticated identity (guest access).
 */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const secretKey = process.env.CLERK_SECRET_KEY;

  if (authHeader && authHeader.startsWith('Bearer ') && secretKey) {
    const token = authHeader.split('Bearer ')[1]?.trim();
    if (token) {
      try {
        const payload = await verifyToken(token, { secretKey });
        if (payload && payload.sub) {
          req.authUid = payload.sub;
          req.user = { uid: payload.sub };
          return next();
        }
      } catch {
        // Fall through to unauthenticated
      }
    }
  }

  req.authUid = undefined;
  req.user = undefined;
  return next();
}
