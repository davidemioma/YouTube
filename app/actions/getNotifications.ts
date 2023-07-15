import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getNotifications = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return [];

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        post: {
          include: {
            user: true,
          },
        },
      },
    });

    return notifications;
  } catch (err) {
    return [];
  }
};
