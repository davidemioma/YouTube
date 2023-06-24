import prisma from "@/libs/prismadb";

export const getRelatedPosts = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { category: post?.category },
          {
            subCategory: {
              hasSome: post?.subCategory,
            },
          },
        ],
        NOT: {
          id: postId,
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
