import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function PATCH(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { notificationId } = body;

    if (!notificationId) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const notification = await prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return new NextResponse("Post does not exists", { status: 400 });
    }

    await prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: {
        hasSeen: true,
      },
    });

    return NextResponse.json("Unliked successfull");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
