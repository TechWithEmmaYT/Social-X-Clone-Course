"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function likePost(postId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "Unauthorized",
    };
  }
  try {
    const currentUserId = +session?.user?.id;

    if (!postId) {
      return {
        message: "Post Id is required",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
    });

    if (!user) {
      return {
        message: "User not found",
      };
    }

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
      return {
        message: "Post not found",
      };
    }

    let updatedLikeIds = [...(post?.likeIds || [])];

    if (updatedLikeIds.includes(currentUserId)) {
      updatedLikeIds = updatedLikeIds.filter(
        (likeId) => likeId !== currentUserId
      );
    } else {
      updatedLikeIds.push(currentUserId);
      try {
        await prisma.$transaction([
          prisma.notification.create({
            data: {
              body: `${user?.name} liked your post`,
              userId: post.userId,
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

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likeIds: updatedLikeIds,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
    const isLiked = updatedPost.likeIds.includes(currentUserId);
    return {
      isLiked,
      likedIds: updatedPost.likeIds,
      updatedPost,
    };
  } catch (error) {
    return {
      message: "Failed to like post",
    };
  }
}
