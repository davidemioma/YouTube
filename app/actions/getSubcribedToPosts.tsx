import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getSubscribedToPosts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: currentUser.subscribedToIds,
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
