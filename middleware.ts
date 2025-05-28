import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const isArabicLocale = request.nextUrl.pathname.startsWith("/ar");

    if (request.nextUrl.pathname.startsWith("/en")) {
        const newPathname = request.nextUrl.pathname.replace("/en", "");
        const url = new URL(request.nextUrl.origin + newPathname);

        return NextResponse.redirect(url);
    }

    response.cookies.set("NEXT_LOCALE", isArabicLocale ? "ar" : "en");

    // Handle guest token



    // Handle internationalization routing
    const handleI18nRouting = createMiddleware(routing);
    const i18nResponse = handleI18nRouting(request);

    // Merge headers and cookies from i18nResponse to response
    i18nResponse.headers.forEach((value, key) => {
        response.headers.set(key, value);
    });

    const setCookieHeaders = i18nResponse.headers.get("set-cookie");
    if (setCookieHeaders) {
        setCookieHeaders.split(",").forEach((cookie) => {
            response.headers.append("set-cookie", cookie);
        });
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public/|assets/images|logo.png|logo.webp|favicon.webp|header.gif|footer_logo.png).*)",
    ],

};
