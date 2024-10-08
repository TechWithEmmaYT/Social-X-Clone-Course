import { prisma } from "@/lib/prismadb";
import { signupSchema } from "@/lib/validation/auth-validate";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const { name, email, username, password, dateOfBirth } =
      await signupSchema.parseAsync(body);

    const parsedDateOfBirth = new Date(dateOfBirth);
    const isUserEmailExist = await prisma.user.findUnique({
      where: { email },
    });
    if (isUserEmailExist) {
      throw new Error("Email already exists");
    }

    const isUserNameExist = await prisma.user.findUnique({
      where: { username },
    });

    if (isUserNameExist) {
      throw new Error("Username already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        name,
        email,
        username,
        dateOfBirth: parsedDateOfBirth,
        hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: "Registration successful",
        status: "success",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Registration failed",
        status: "error",
      },
      { status: 500 }
    );
  }
}
