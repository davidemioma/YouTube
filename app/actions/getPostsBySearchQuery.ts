import prisma from "@/libs/prismadb";

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
    });

    return posts;
  } catch (err) {
    return [];
  }
};
