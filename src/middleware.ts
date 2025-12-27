import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  // Konfigurasi CORS 
  // Di production, '*' diganti domain (ex: 'https://testgenz.vercel.app')
  // Tapi untuk development dan fleksibilitas sekarang, '*' masih aman.
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With",
  );
  response.headers.set("Access-Control-Max-Age", "86400"); // Cache preflight selama 24 jam

  // Security Headers (For Production)

  // Anti-Clickjacking
  response.headers.set("X-Frame-Options", "DENY");

  // MIME-sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");

  // Controlling referrer information
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // HTTPS (Strict Transport Security)
  // Max-age (1 tahun)
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains",
  );

  // Handle Preflight Request (OPTIONS)
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
