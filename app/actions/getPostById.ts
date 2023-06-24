import prisma from "@/libs/prismadb";

export const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        comments: true,
      },
    });

    return post;
  } catch (err) {
    return null;
  }
};
