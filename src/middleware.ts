

//define protected routes
import {NextRequest, NextResponse} from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import {getSessionCookie} from "better-auth/cookies"


const protectedRoutes=['/profile','/post/create','/post/edit']

export async function middleware(request:NextRequest){
    const pathName=request.nextUrl.pathname;

    const session = getSessionCookie(request);
    if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
    const isProtectedRoute=protectedRoutes.some(route=>pathName.startsWith(route));
    if(isProtectedRoute&&!session){

        //if user is not logged in redirect to auth page
        return NextResponse.redirect(new URL('/auth',request.url))
    }
    if(pathName==='/auth'&&session){
        return NextResponse.redirect(new URL('/',request.url))
    }
    const res = NextResponse.next()
  res.headers.set('Access-Control-Allow-Origin', '*')
  return res
}

export const config={

    matcher:['/profile/:path','/post/create','/post/edit/:path*','/auth']
}
