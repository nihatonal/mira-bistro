import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["tr", "en", "ru"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};