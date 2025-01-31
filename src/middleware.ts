import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 1. Specify public routes
const publicRoutes = ['/login', '/signup', ''];

export default async function middleware(req: NextRequest) {
  // 2. Get the current route path
  const path = req.nextUrl.pathname;

  // 3. Define conditions for protected and public routes
  const isProtectedRoute = path.startsWith('/dashboard');
  const isPublicRoute = publicRoutes.includes(path);

  // 4. Decrypt the session from the cookie
  const session = (await cookies()).get('sessionId');

  // 5. Redirect to /auth/sign-in if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated and visiting a public route
  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  // 7. Allow the request to proceed
  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
