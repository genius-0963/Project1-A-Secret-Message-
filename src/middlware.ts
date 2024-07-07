import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { default as nextAuthMiddleware } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (token && (
        url.pathname.startsWith("/sign-in") ||
        url.pathname.startsWith("/sign-up") ||
        url.pathname.startsWith("/verify") ||
        url.pathname.startsWith("/")
    )) {
        return NextResponse.next();
    }
    
    url.pathname = "/login";
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/',
        '/dashboard/:path*',
        '/verify/:path*'
    ]
};
