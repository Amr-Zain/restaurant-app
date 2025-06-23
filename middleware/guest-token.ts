import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { v4 } from 'uuid';

export async function guestTokenMiddleware(
    request: NextRequest,
    response: NextResponse
): Promise<NextResponse> {
    const serverCookies = await cookies();
    let guest_token = serverCookies.get('guest_token')?.value;
    const token = serverCookies.get('token')?.value;

    if (!guest_token && !token) {
        guest_token = v4();
        response.cookies.set('guest_token', guest_token);
    }

    return response;
}