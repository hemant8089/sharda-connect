//src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { isAdminRoute } from "./hooks/permission";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isAuthenticated =
    request.cookies.get("isAuthenticated")?.value === "true";
  const userRole =
    request.cookies.get("userData")?.value?.toLowerCase() || null;

  console.log("isAuthenticated:", isAuthenticated);
  console.log("User Role:", userRole);

  if (!isAuthenticated) {
    console.log("Redirecting to login");
    // url.pathname = "/login";
    // return NextResponse.redirect(url);
  }

  // 🚨 Students can only go to "/dashboard"
  if (url.pathname.startsWith("/dashboard") && userRole !== "user") {
    console.log("Unauthorized access. Redirecting...");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // 🚨 Admins & Superadmins should not access "/dashboard"
  if (
    url.pathname.startsWith("/dashboard") &&
    (userRole === "admin" || userRole === "super_admin")
  ) {
    console.log("Admins cannot access student dashboard. Redirecting...");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // 🚨 Superadmins should only access "/superadmin-dashboard"
  if (
    url.pathname.startsWith("/superadmin-dashboard") &&
    userRole !== "super_admin"
  ) {
    console.log("Unauthorized superadmin access, redirecting...");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  // 🚨 Admins should only access "/admin-dashboard"
  if (
    url.pathname.startsWith("/admin-dashboard") &&
    userRole !== "admin" &&
    userRole !== "super_admin"
  ) {
    console.log("Unauthorized admin access, redirecting...");
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/signup",
    "/login",
    "/",
    "/admin-dashboard",
    "/superadmin-dashboard",
  ],
};

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl.clone();

//   //   const userData = request.cookies.get("userData")?.value;
//   const isAuthenticated =
//     request.cookies.get("isAuthenticated")?.value === "true";
//   const userRole = request.cookies.get("userData")?.value.toLowerCase() || null;

//   console.log("isAuthenticated", isAuthenticated);
//   console.log("User Role:", userRole);

//   // Redirect already authenticated users from login/signup to dashboard
//   if (["/login", "/signup", "/"].includes(url.pathname) && isAuthenticated) {
//     console.log("Redirecting authenticated user to dashboard");
//     url.pathname =
//       userRole === "super_admin"
//         ? "/superadmin-dashboard"
//         : userRole === "admin"
//         ? "/admin-dashboard"
//         : "/dashboard";
//     return NextResponse.redirect(url);
//   }

//   // Restrict access to student dashboard
//   if (url.pathname.startsWith("/dashboard") && userRole !== "user") {
//     console.log("Unauthorized access to dashboard, redirecting to login");
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // Restrict access to admin dashboard
//   if (
//     url.pathname.startsWith("/admin-dashboard") &&
//     userRole !== "admin" &&
//     userRole !== "super_admin"
//   ) {
//     console.log("Unauthorized admin access, redirecting to unauthorized page");
//     url.pathname = "/unauthorized";
//     return NextResponse.redirect(url);
//   }

//   // Restrict access to superadmin dashboard
//   if (
//     url.pathname.startsWith("/superadmin-dashboard") &&
//     userRole !== "super_admin"
//   ) {
//     console.log(
//       "Unauthorized superadmin access, redirecting to unauthorized page"
//     );
//     url.pathname = "/unauthorized";
//     return NextResponse.redirect(url);
//   }

//   // if (isAdminRoute(url.pathname) && userData !== role.TRIAADMIN) {
//   //   url.pathname = "/unauthorized";
//   //   return NextResponse.redirect(url);
//   // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard",
//     "/signup",
//     "/login",
//     "/",
//     "/admin-dashboard",
//     "/superadmin-dashboard",
//   ],
// };
