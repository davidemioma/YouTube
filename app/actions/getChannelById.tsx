import prisma from "@/libs/prismadb";

export const getChannelById = async (id: string) => {
  try {
    const channel = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          include: {
            user: true,
          },
        },
      },
    });

    return channel;
  } catch (err) {
    return null;
  }
};
