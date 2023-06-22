import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, password, description, image } = body;

    if (!name || !email || !password) {
      return new NextResponse("Invalid credentials", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        description,
        image,
      },
    });

    return NextResponse.json("New user created!");
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
