export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/schedule/:path*", "/support/:path*", "/forum/:path*"],
};