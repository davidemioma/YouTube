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

    const { hasAdded, postId } = body;

    if (!postId) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return new NextResponse("Post does not exists", { status: 400 });
    }

    if (!hasAdded) {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          watchLaterPosts: {
            connect: { id: post.id },
          },
        },
      });

      return NextResponse.json("Post has been added to watch later");
    } else {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          watchLaterPosts: {
            disconnect: { id: post.id },
          },
        },
      });

      return NextResponse.json("Post has been removed from watch later");
    }
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
