import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Get the authData (or token) from cookies
  const token = req.cookies.get("authData");

  // Define routes that require authentication
  const protectedRoutes = ["/dashboard"];

  // If the user tries to access a protected route but isn't authenticated, redirect them to login
  if (
    !token &&
    protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.redirect(new URL("/auth/login/sys-admin", req.url));
  }

  return NextResponse.next();
}

// Define which paths use the middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};
