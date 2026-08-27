import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        const publicPath = pathname.toLowerCase();

        if (
          pathname.startsWith("/api/auth") ||
          publicPath === "/login" ||
          publicPath === "/register" ||
          publicPath === "/forgot-password"
        ) {
          return true;
        }

        if (pathname === "/" || pathname === "/video" || pathname.startsWith("/api/videos")) {
          return true;
        }

        return Boolean(token);
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
