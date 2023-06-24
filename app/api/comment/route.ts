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

    const { postId, comment } = body;

    if (!postId || !comment) {
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

    await prisma.comment.create({
      data: {
        userId: currentUser.id,
        postId: post.id,
        comment,
      },
    });

    return NextResponse.json("Comment added");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
