import { NextResponse } from "next/server"
import { authRoutes, publicRoutes } from "./routes"
import { auth } from "./auth"

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isProfileCompleted = req.auth?.user.profileCompleted
  const isAdmin = req.auth?.user.role === "ADMIN"
  const isAdminRoute = nextUrl.pathname.startsWith("/admin")

  const isPublic = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isPublic || isAdmin) {
    return NextResponse.next()
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl))
    }
    return NextResponse.next()
  }

  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  if (
    isLoggedIn &&
    !isProfileCompleted &&
    nextUrl.pathname !== "/complete-profile"
  ) {
    return NextResponse.redirect(new URL("/complete-profile", nextUrl))
  }

  return NextResponse.next()
})


// to prevent this auth from running on every request

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
}
