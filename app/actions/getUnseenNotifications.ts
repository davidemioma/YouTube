import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

export const getUnseenNotifications = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) return 0;

    const notifications = await prisma.notification.findMany({
      where: {
        userId: currentUser.id,
        hasSeen: false,
      },
    });

    return notifications.length;
  } catch (err) {
    return 0;
  }
};
