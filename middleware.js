import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  const pathname = req.nextUrl.pathname;

  console.log("✅ Middleware HIT:", pathname);
  console.log("🔐 Token Found?", token ? "YES" : "NO");

  // Protect all /account routes
  if (pathname.startsWith('/account') && !token) {
    console.log("🚫 No token - redirecting to /signin");
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*'], // ✅ All /account and sub-paths
};
