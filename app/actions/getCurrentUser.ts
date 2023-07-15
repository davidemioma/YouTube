import prisma from "@/libs/prismadb";
import { getSession } from "./getSession";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        seenPosts: {
          include: {
            user: true,
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
        likedPosts: {
          include: {
            user: true,
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
        dislikedPosts: true,
        watchLaterPosts: {
          include: {
            user: true,
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    });

    if (!currentUser) return null;

    return currentUser;
  } catch (err) {
    return null;
  }
};
