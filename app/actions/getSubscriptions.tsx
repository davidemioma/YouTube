import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getSubscriptions = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const channels = await prisma.user.findMany({
      where: {
        id: {
          in: currentUser.subscribedToIds,
        },
      },
    });

    return channels;
  } catch (err) {
    return [];
  }
};
