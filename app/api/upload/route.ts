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

    const { title, description, category, subCategory, photoUrl, videoUrl } =
      body;

    if (!title || !description || !videoUrl) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    await prisma.post.create({
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

    return NextResponse.json("New user created!");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
