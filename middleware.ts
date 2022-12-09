// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { setCookie, getCookie, deleteCookie, hasCookie } from "cookies-next";

export function middleware(request) {
  if (
    request.cookies.get("token") &&
    request.nextUrl?.pathname.startsWith("/login")
  )
    return NextResponse.redirect(new URL("/home", request.url));
  if ( 
    !request.cookies.get("token") &&
    !request.nextUrl?.pathname.startsWith("/login")
  )
    return NextResponse.redirect(new URL("/login", request.url));

  if (
    request.cookies.get("input-pengguna") == 'true' && !request.nextUrl?.pathname.startsWith("/profil-pengguna")
  )
    return NextResponse.redirect(new URL("/profil-pengguna?inputChange=true", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/home",
    "/profil-pengguna",
    "/ajak-teman-pakai-keyta",
    "/analitik-toko",
    "/daftar-produk",
    "/faq",
    "/kebijakan-privasi",
    "/keyta-saldo",
    "/kontak-jadwalin",
    "/pengguna",
    "/pesan-kurir",
    "/syarat-ketentuan",
    "/video-tutorial",
    "/toko/:path*",
  ],
};
