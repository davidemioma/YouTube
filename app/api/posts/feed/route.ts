import { z } from "zod";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    const posts = await prismadb.post.findMany({
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
