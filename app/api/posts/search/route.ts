import { z } from "zod";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const { limit, page, q } = z
      .object({
        limit: z.string(),
        page: z.string(),
        q: z.string(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        q: url.searchParams.get("q"),
      });

    const posts = await prismadb.post.findMany({
      where: {
        title: {
          contains: q,
        },
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
