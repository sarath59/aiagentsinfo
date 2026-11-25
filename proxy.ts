import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/directory" &&
    request.nextUrl.searchParams.get("audience") === "kids"
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("audience");
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/directory"],
};
