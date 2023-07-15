import prisma from "@/libs/prismadb";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

export const getPostsBySearchQuery = async (search_query: string) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        title: {
          contains: search_query,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS,
    });

    return posts;
  } catch (err) {
    return [];
  }
};
