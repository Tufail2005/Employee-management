import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // if(pathname.startwith("/login") && ){

    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === "admin",
    },
  }
);

export const config = { matcher: ["/admin"] };
