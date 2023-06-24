import prisma from "@/libs/prismadb";

export const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    return post;
  } catch (err) {
    return null;
  }
};
