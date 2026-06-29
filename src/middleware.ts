import { NextResponse, type NextRequest } from "next/server";

const ADMIN_ROUTES = ["/dashboard"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  if (!isAdminRoute) return NextResponse.next();

  const token = request.cookies.get("rehobot-session")?.value;
  const role = request.cookies.get("rehobot-role")?.value;

  if (!token || (role !== "admin" && role !== "staff")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};