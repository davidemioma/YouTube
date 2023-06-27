import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { pusherServer } from "@/libs/pusher";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { title, description, category, subCategory, photoUrl, videoUrl } =
      body;

    if (!title || !description || !videoUrl) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        description,
        category,
        subCategory,
        photoUrl,
        videoUrl,
        userId: currentUser.id,
      },
    });

    currentUser.subscribersIds.forEach(async (userId) => {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) return;

      const notification = await prisma.notification.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });

      if (user.email) {
        await pusherServer.trigger(
          user.email,
          "notification:new",
          notification
        );
      }
    });

    return NextResponse.json("New user created!");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
