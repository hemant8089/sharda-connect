
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { isAdminRoute } from "./hooks/permission";


export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

//   const userData = request.cookies.get("userData")?.value;
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
console.log("isAuthenticated",isAuthenticated)


  if ((url.pathname === "/login" || url.pathname === "/signup" || url.pathname === "/") && isAuthenticated) {
    console.log("auth route is hit");
    url.pathname = "/dashboard";
    return NextResponse.redirect(url); 
  }

  if (url.pathname.startsWith("/dashboard") &&  ( !isAuthenticated || isAuthenticated==undefined)) {
    console.log("auth route is hit");
    url.pathname = "/auth";
    return NextResponse.redirect(url); 
  }



//   if (isAdminRoute(url.pathname) && userData !== role.TRIAADMIN) {
//     url.pathname = "/unauthorized";
//     return NextResponse.redirect(url);
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/signup","/login","/"],
};
