import { NextRequest, NextResponse } from "next/server";

export async function redirectMiddleware(
    request: NextRequest,
    response: NextResponse
): Promise<NextResponse> {
    if (request.nextUrl.pathname.startsWith("/en")) {
        const newPathname = request.nextUrl.pathname.replace("/en", "");
        const url = new URL(request.nextUrl.origin + newPathname);
        return NextResponse.redirect(url);
    }

    return response;
}