export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/watch-later",
    "/subscriptions",
    "/liked-videos",
    "/library",
    "/history",
  ],
};
