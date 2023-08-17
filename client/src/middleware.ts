import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Check if non auth pages
 * @param request
 * @returns Boolean
 */
const isNonAuthPage = (url: string) => {
  return ["/login", "/register"].some((x) => url.startsWith(x));
};

export async function middleware(request: NextRequest) {
  console.log(request.url, process.env.NEXT_PUBLIC_URL);
  if (request.url === process.env.NEXT_PUBLIC_URL) {
    return;
  }

  if (!process.env.NEXT_PUBLIC_COOKIE_TOKEN) {
    throw new Error("NEXT_PUBLIC_COOKIE_TOKEN is required");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is required");
  }

  const cookie = request.cookies.get(process.env.NEXT_PUBLIC_COOKIE_TOKEN);
  const url = request.nextUrl.clone();

  if (cookie?.value) {
    // Make auth Request to check if the token is valid
    const responseJSON = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookie.value}`,
        },
      }
    );

    if (!responseJSON.ok) {
      //TODO: Hotfix need to verify
      /** Prevents redirect to login in case of too many api hit **/
      if (responseJSON.status !== 401) return;

      url.pathname = "/login";

      // Clear token and redirect to login
      const response = NextResponse.redirect(url);
      response.cookies.set("token", "", {
        expires: new Date(),
      });

      return response;
    }

    if (isNonAuthPage(url.pathname)) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  } else if (isNonAuthPage(url.pathname)) {
    return NextResponse.next();
  } else {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
// export const config = {
//   matcher: ['/((?!api|static|login|forget|verify|reset|.*\\..*|_next).*)'],
// };

export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
