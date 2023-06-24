import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const { postId } = body;

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

    const postExists = currentUser.seenPosts.find(
      (seenPost) => seenPost.id === post.id
    );

    if (postExists) {
      return NextResponse.json("Viewed successfull");
    } else {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          seenPosts: {
            connect: {
              id: post.id,
            },
          },
        },
      });

      return NextResponse.json("Viewed successfull");
    }
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
