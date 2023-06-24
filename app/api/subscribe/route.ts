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

    const { hasSubscribed, userId } = body;

    if (!userId) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new NextResponse("Post does not exists", { status: 400 });
    }

    if (!hasSubscribed) {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          subscribedToIds: [user.id, ...currentUser.subscribedToIds],
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          subscribersIds: [currentUser.id, ...user.subscribedToIds],
        },
      });

      return NextResponse.json("Subscription successfull");
    } else {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          subscribedToIds: currentUser.subscribedToIds.filter(
            (id) => id !== userId
          ),
        },
      });

      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          subscribersIds: user.subscribersIds.filter(
            (id) => id !== currentUser.id
          ),
        },
      });

      return NextResponse.json("UnSubscription successfull");
    }
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
