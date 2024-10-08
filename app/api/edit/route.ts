import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Not authenticated", status: "error" },
        { status: 401 }
      );
    }

    const { name, username, bio, profileImage, coverImage } =
      await request.json();
    if (!name || !username) {
      return NextResponse.json(
        { message: "Missing Field: name,username", status: "error" },
        { status: 400 }
      );
    }

    const userId = +session.user.id;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });
    return NextResponse.json(
      {
        message: "Update user successfully",
        status: "success",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        status: "error",
      },
      { status: 500 }
    );
  }
}
