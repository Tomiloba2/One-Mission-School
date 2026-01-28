import {type NextRequest,NextResponse} from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    return await updateSession(request);
}
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
export default async function proxy(request: NextRequest) { 
    const {pathname} = request.nextUrl;
    const publicPaths=[
        "/",
        "/signin",
        "/signup",
        "/forgot-password",
        "/reset-password"
    ]
    const isPublicPath=publicPaths.includes(pathname);
    if(isPublicPath){
        return NextResponse.next();
    }
    return await updateSession(request);
}