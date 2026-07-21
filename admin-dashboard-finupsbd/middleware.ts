import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export function middleware(req: NextRequest) {


  try {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

// Protect only dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"], // all dashboard subroutes
};
