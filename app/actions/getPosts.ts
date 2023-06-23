import prisma from "@/libs/prismadb";

export const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
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
