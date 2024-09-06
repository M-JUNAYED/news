import { NextRequest, NextResponse } from "next/server";
import { VerifyToken } from "./utility/JWTtokenHellper";

export async function middleware(req: NextRequest) {
  try {
    const token = req.cookies.get('token');
    if (!token) throw new Error("Token not found");

    const payload = await VerifyToken(token.value);
    if (!payload || !payload.email || !payload.id) {
      throw new Error("Invalid token payload");
    }

    const requestHeader = new Headers(req.headers);
    requestHeader.set('email', payload.email);
    requestHeader.set('id', payload.id.toString());  // Convert ID to string

    return NextResponse.next({
      request: {
        headers: requestHeader,  // Pass the new headers to the request
      },
    });
  } catch (e: any) {
    if (req.nextUrl.pathname.startsWith("/api/")) {
      return NextResponse.json({ status: 'fail', data: 'Unauthorized' }, { status: 401 });
    } else {
      return NextResponse.redirect(new URL('/user/login', req.url));
    }
  }
}

export const config = {
  matcher: [
    '/user',
    '/profile',
    '/comment',
    '/api/comment/manage',
    '/api/user/profile/detiel',
    '/api/user/profile/update',
  ]
};
