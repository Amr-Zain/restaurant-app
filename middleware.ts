import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { localeMiddleware } from "./middleware/locale";
import { authMiddleware } from "./middleware/auth";
import { guestTokenMiddleware } from "./middleware/guest-token";
import { redirectMiddleware } from "./middleware/redirect";

export async function middleware(request: NextRequest) {
    let response = NextResponse.next();

    response = await redirectMiddleware(request, response);
    if (response.status !== 200) return response;

    response = await localeMiddleware(request, response);
    if (response.status !== 200) return response;

    response = await guestTokenMiddleware(request, response);
    
    response = await authMiddleware(request, response);
    if (response.status !== 200) return response;

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public/|assets/images|logo.png|logo.webp|favicon.webp|header.gif|footer_logo.png).*)",
    ],
};
