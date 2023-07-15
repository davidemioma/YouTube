import prisma from "@/libs/prismadb";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    });

    return posts;
  } catch (err) {
    return [];
  }
};
