

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth';


export const middleware = auth((req) => {
  console.log("from middleware");
  if (!req.auth && req.nextUrl.pathname !== "/auth/login") {
    const newUrl = new URL("/auth/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});


 
// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   console.log('from middleware', request);
//   return NextResponse.next();
//   // return NextResponse.redirect(new URL('/home', request.url))
// }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|firebase-messaging-sw.js|login-background.png|icons/Logo.svg).*)',
  ],
};
