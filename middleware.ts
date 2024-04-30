import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from "jose";


// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = cookies().get('token')?.value ;
    if (!token || token==="") return NextResponse.redirect(new URL('/', request.url));
    const isAuth = await jose.jwtVerify(token, secret);
    if (!isAuth) return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/home','/home/contact/:path*'],
}