import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  try {
    const postId = params.postId;
    if (!postId) {
      return NextResponse.json(
        { message: "Post Id required", status: "error" },
        { status: 400 }
      );
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return NextResponse.json({
      status: "success",
      post,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Failed to retrieve data",
        status: "error",
      },
      { status: 400 }
    );
  }
}
