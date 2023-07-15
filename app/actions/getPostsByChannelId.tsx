import prisma from "@/libs/prismadb";
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config";

export const getPostsByChannelId = async (channelId: string) => {
  try {
    if (!channelId) {
      return [];
    }

    const posts = await prisma.post.findMany({
      where: {
        userId: channelId,
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
