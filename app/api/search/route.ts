import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const query = searchParams.get("q");
    const filter = searchParams.get("f");

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated", status: "error" },
        { status: 401 }
      );
    }

    const currentUserId = +session?.user?.id;

    if (!query) {
      return NextResponse.json(
        {
          message: "Query parameter 'q' is required",
          status: "error",
        },
        { status: 400 }
      );
    }

    if (filter === "user") {
      const users = await prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                { name: { contains: query, mode: "insensitive" } },
                { username: { contains: query, mode: "insensitive" } },
                { bio: { contains: query, mode: "insensitive" } },
              ],
            },
            //{ id: { not: currentUserId } },
          ],
        },
        select: {
          id: true,
          name: true,
          username: true,
          bio: true,
          email: true,
          dateOfBirth: true,
          emailVerified: true,
          profileImage: true,
          createdAt: true,
          updatedAt: true,
          followingIds: true,
          subscription: {
            select: {
              plan: true,
            },
          },
        },
      });
      return NextResponse.json({
        status: "success",
        users,
      });
    } else {
      const posts = await prisma.post.findMany({
        where: {
          AND: [
            {
              OR: [{ body: { contains: query, mode: "insensitive" } }],
            },
          ],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              bio: true,
              email: true,
              dateOfBirth: true,
              emailVerified: true,
              profileImage: true,
              createdAt: true,
              updatedAt: true,
              followingIds: true,
              subscription: {
                select: {
                  plan: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return NextResponse.json({
        status: "success",
        posts,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to retrieve data",
        status: "error",
      },
      { status: 500 }
    );
  }
}
