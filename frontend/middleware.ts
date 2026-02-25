import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  const isAuthPath = pathname === "/login" || pathname === "/register";

  const isDashboardPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/users") ||
    pathname.startsWith("/artists");

  if (!token && isDashboardPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/users/:path*",
    "/artists/:path*",
  ],
};
