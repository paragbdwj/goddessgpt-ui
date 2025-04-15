import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  
  const pathname = req.nextUrl.pathname;
  
  // Define which routes need authentication
  const protectedRoutes = ["/chat", "/community"];
  
  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && protectedRoutes.some(route => pathname.startsWith(route))) {
    // In development mode, mock authentication by allowing access
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    
    // Redirect to the home page
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
  
  // If the user is authenticated and trying to access the home page
  if (isAuthenticated && pathname === '/') {
    // Redirect to the chat page
    const url = new URL('/chat', req.url);
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/chat/:path*', '/community/:path*'],
}; 