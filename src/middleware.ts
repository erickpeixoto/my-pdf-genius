import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'pt-br'];
export const defaultLocale = 'en';

function getLocale(request: Request): string {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Bypass middleware for static assets (you can add more extensions if needed)
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif'];
  if (imageExtensions.some(ext => pathname.endsWith(ext))) {
    return NextResponse.next();  // Continue without rewriting
  }

  let locale = getLocale(request) ?? defaultLocale;
  const newUrl = new URL(`/${locale}${pathname}`, request.nextUrl);
  return NextResponse.rewrite(newUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api, favicon, etc.)
    '/((?!_next|api|favicon.ico).*)',
  ],
};
