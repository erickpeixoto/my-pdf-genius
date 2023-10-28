import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhooks/clerk",
    "/api/uploadthing",
    "/pricing",
    "/api/auth/login",
    "api/auth/register",
    "/api/webhooks/stripe",
    "/proxy/api/event"
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
