// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  if (
    request.cookies.get("token") &&
    request.nextUrl?.pathname.startsWith("/login")
  )
    return NextResponse.redirect(new URL("/dashboard", request.url));
  if (
    !request.cookies.get("token") &&
    !request.nextUrl?.pathname.startsWith("/login")
  )
    return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard",
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
    '/toko/:path*'
  ],
};
