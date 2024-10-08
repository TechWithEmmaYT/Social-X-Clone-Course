"use server";

import { signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prismadb";

export async function doSocialLogin(formaData: any) {
  const action = formaData.get("action");
  await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(data: {
  email: string;
  password: string;
}) {
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function ensureUniqueUsername(username: string, maxAttempts = 5) {
  try {
    let attempts = 0;
    const baseUsername = username;
    let user = await prisma.user.findUnique({
      where: { username: username },
    });

    while (user && attempts < maxAttempts) {
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      username = `${baseUsername}${randomNumber}`;
      user = await prisma.user.findUnique({
        where: { username: username },
      });
    }

    if (attempts >= maxAttempts) {
      throw new Error(
        `Unable to generate a unique username after ${maxAttempts} attempts.`
      );
    }
    return username;
  } catch (error) {
    throw error;
  }
}
