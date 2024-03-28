import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static') ||
    PUBLIC_FILE.test(request.nextUrl.pathname)
  )
    return NextResponse.next();

  const signInUrl = new URL('/login', request.url);
  const homeUrl = new URL('/', request.url);

  const token = request.cookies.get('auth_token');

  if (!token) {
    if (
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup'
    )
      return NextResponse.next();
    return NextResponse.redirect(signInUrl);
  }

  if (
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup'
  )
    return NextResponse.redirect(homeUrl);
}
