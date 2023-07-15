import { z } from "zod";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const { limit, page, id } = z
      .object({
        limit: z.string(),
        page: z.string(),
        id: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        id: url.searchParams.get("id"),
      });

    const posts = await prismadb.post.findMany({
      where: {
        userId: id,
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(posts);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
