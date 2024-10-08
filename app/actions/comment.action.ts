"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function addComment(data: {
  postId: number;
  body: string;
  commentImage?: string;
}) {
  const { postId, body, commentImage } = data;
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("user not logged in");
  }

  try {
    const currentUserId = +session?.user?.id;

    if (!postId) {
      throw new Error("Post Id is required");
    }

    if (!body) {
      throw new Error("Body Id is required");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUserId,
        postId: postId,
        commentImage: commentImage,
      },
    });

    if (comment) {
      try {
        await prisma.$transaction([
          prisma.notification.create({
            data: {
              body: `${user?.name} replied to your post`,
              userId: post?.userId,
            },
          }),
          prisma.user.update({
            where: { id: post?.userId },
            data: { hasNotification: true },
          }),
        ]);
      } catch (error) {
        console.error("Error creating notification or updating user:", error);
      }
    }

    return {
      message: "Comment created successfully",
    };
  } catch (err) {
    throw err;
  }
}
