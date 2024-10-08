"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function updateBirthDay(dateOfBirth: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return {
        message: "Not Signed in",
      };
    }
    const currentUserId = +session?.user?.id;
    if (!dateOfBirth) {
      return {
        message: "Date of Birth required",
      };
    }
    const parsedDateOfBirth = new Date(dateOfBirth);
    await prisma.user.update({
      where: {
        id: currentUserId,
      },
      data: {
        dateOfBirth: parsedDateOfBirth,
      },
    });
    return {
      message: "Updated Date of Birth",
    };
  } catch (error) {
    return { message: "Error updating date of birth", error };
  }
}
