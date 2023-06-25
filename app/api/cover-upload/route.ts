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

    const { coverImage } = body;

    if (!coverImage) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        coverImage,
      },
    });

    return NextResponse.json("Cover image updated!");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
