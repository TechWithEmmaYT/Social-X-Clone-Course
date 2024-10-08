"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function followUser(userId: number) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "Unauthorized",
    };
  }

  try {
    const currentUserId = +session?.user?.id;
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

    let updatedFollowingIds = [...(user.followingIds || [])];

    if (updatedFollowingIds.includes(userId)) {
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    } else {
      updatedFollowingIds.push(userId);
      try {
        await prisma.$transaction([
          prisma.notification.create({
            data: {
              body: `${user?.name} followed you`,
              userId: userId,
            },
          }),
          prisma.user.update({
            where: { id: userId },
            data: { hasNotification: true },
          }),
        ]);
      } catch (error) {
        console.error("Error creating notification or updating user:", error);
      }
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    const isFollowing = updatedUser.followingIds.includes(userId);
    return {
      isFollowing,
      updatedUser,
    };
  } catch (error) {
    return {
      message: "Failed to follow user",
    };
  }
}
