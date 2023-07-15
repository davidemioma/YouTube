import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getSeenPosts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const posts = await prisma.post.findMany({
      where: {
        seenIds: {
          has: currentUser.id,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return posts;
  } catch (err) {
    return [];
  }
};
