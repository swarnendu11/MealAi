import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, request) => {
  const pathname = request.nextUrl.pathname;

  // Define public routes accessible without authentication
  const isPublic =
    pathname === '/' ||
    pathname.startsWith('/sign-in') ||
    pathname.startsWith('/sign-up') ||
    pathname.startsWith('/sso-callback') ||
    pathname.startsWith('/api/health') ||
    pathname.startsWith('/api/catalog');

  if (!isPublic) {
    const { userId } = await auth();

    if (!userId) {
      // For API routes, return standard 401 JSON response
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { success: false, error: 'Unauthorized: Authentication required' },
          { status: 401 }
        );
      }
      // For document routes, redirect to sign-in
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
