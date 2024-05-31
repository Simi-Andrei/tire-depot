export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    // "/tires/:path*",
    // "/estimates/:path*",
    // "/entries/:path*",
    // "/users/:path*",
    // "/settings/:path*",
  ],
};
