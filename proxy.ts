import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // Allows auth routes through always
    if (pathname.startsWith("/api/auth")) return NextResponse.next();

    // Protects API routes - reject with 401 if no session
    if (pathname.startsWith("/api/")) {
        if (!isLoggedIn) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in." },
                { status: 401 },
            );
        }
        return NextResponse.next();
    }

    // Protects /generate page
    if (pathname.startsWith("/generate")) {
        if (!isLoggedIn) {
            const loginUrl = new URL("/login", req.nextUrl.origin);
            loginUrl.searchParams.set("callbackUrl", pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/generate/:path*", "/api/:path*"],
};
