import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const PROTECTED_ROUTES = ['profile', 'checkout', 'order', 'reservation'];
const AUTH_ROUTES = ['auth'];

export async function authMiddleware(
    request: NextRequest,
    response: NextResponse
): Promise<NextResponse> {
    const serverCookies = await cookies();
    const token = serverCookies.get('token')?.value;
    const isArabicLocale = request.nextUrl.pathname.startsWith("/ar");
    const currentPath = request.nextUrl.pathname;

    const isProtectedRoute = PROTECTED_ROUTES.some(route => 
        currentPath.includes(route)
    );

    if (isProtectedRoute && !token) {
        const loginUrl = new URL(
            `${isArabicLocale ? '/ar' : ""}/auth/login`, 
            request.url
        );
        return NextResponse.redirect(loginUrl);
    }

    const isAuthRoute = AUTH_ROUTES.some(route => 
        currentPath.includes(route)
    );
    if (isAuthRoute && token) {
        const homeUrl = new URL(
            `${isArabicLocale ? '/ar' : ""}/`, 
            request.url
        );
        return NextResponse.redirect(homeUrl);
    }

    return response;
}
