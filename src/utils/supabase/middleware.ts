import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl;
  const isDoctor = user?.user_metadata?.role === "Doctor";
  const isPatient = user?.user_metadata?.role === "Patient";
  const isAdmin = user?.user_metadata?.role === "Admin";

  // No user

  if (user === null) {
    if (
      [
        "/",
        "/home",
        "/doctors",
        "/about",
        "/contact",
        "/getprofile",
        "/adduserdetails",
        "/updateuserdetails",
        "/getallappointments",
      ].includes(url.pathname) ||
      url.pathname.startsWith("/doctor/") ||
      url.pathname.startsWith("/admin") ||
      url.pathname.startsWith("/doctoradmin")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Patient

  if (isPatient) {
    if (
      isPatient &&
      (url.pathname === "/login" || url.pathname === "/signup" || url.pathname === "/")
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    if (
      !isPatient &&
      ([
        "/",
        "/home",
        "/doctors",
        "/about",
        "/contact",
        "/getprofile",
        "/adduserdetails",
        "/updateuserdetails",
        "/getallappointments",
      ].includes(url.pathname) ||
        url.pathname.startsWith("/doctor/") ||
        url.pathname.startsWith("/admin") ||
        url.pathname.startsWith("/doctoradmin"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      isPatient &&
      (url.pathname.startsWith("/doctoradmin") ||
        url.pathname.startsWith("/admin"))
    ) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  // doctor

  if (isDoctor) {
    if (isDoctor && (url.pathname === "/login" || url.pathname === "/signup")) {
      return NextResponse.redirect(new URL("/doctoradmin", request.url));
    }

    if (
      !isDoctor &&
      ([
        "/",
        "/home",
        "/doctors",
        "/about",
        "/contact",
        "/getprofile",
        "/adduserdetails",
        "/updateuserdetails",
        "/getallappointments",
      ].includes(url.pathname) ||
        url.pathname.startsWith("/doctor/") ||
        url.pathname.startsWith("/admin") ||
        url.pathname.startsWith("/doctoradmin"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      isDoctor &&
      (url.pathname.startsWith("/admin") ||
        [
          "/",
          "/home",
          "/doctors",
          "/about",
          "/contact",
          "/getprofile",
          "/adduserdetails",
          "/updateuserdetails",
          "/getallappointments",
        ].includes(url.pathname) ||
        url.pathname.startsWith("/doctor/"))
    ) {
      return NextResponse.redirect(new URL("/doctoradmin", request.url));
    }
  }

  if (isAdmin) {
    if (isAdmin && (url.pathname === "/login" || url.pathname === "/signup")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (
      !isAdmin &&
      ([
        "/",
        "/home",
        "/doctors",
        "/about",
        "/contact",
        "/getprofile",
        "/adduserdetails",
        "/updateuserdetails",
        "/getallappointments",
      ].includes(url.pathname) ||
        url.pathname.startsWith("/doctor/") ||
        url.pathname.startsWith("/admin") ||
        url.pathname.startsWith("/doctoradmin"))
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (
      isAdmin &&
      (url.pathname.startsWith("/doctoradmin") ||
        [
          "/",
          "/home",
          "/doctors",
          "/about",
          "/contact",
          "/getprofile",
          "/adduserdetails",
          "/updateuserdetails",
          "/getallappointments",
        ].includes(url.pathname) ||
        url.pathname.startsWith("/doctor/"))
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // Admin

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
