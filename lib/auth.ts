import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signInSchema } from "./validation/auth-validate";
import { prisma } from "./prismadb";
import { generateBaseUsername } from "./helper";
import { ensureUniqueUsername } from "@/app/actions/auth.action";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile: async (profile) => {
        console.log(profile, "profile");
        const baseUsername = generateBaseUsername(profile.name, profile.email);
        const unqiueUsername = await ensureUniqueUsername(baseUsername);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          profileImage: profile.picture,
          username: unqiueUsername,
        };
      },
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(password, user.hashedPassword);

          if (!isMatch) {
            throw new Error("Email/Password is wrong");
          }
          return user;
        } catch (error) {
          throw new Error("Something went wrong");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = String(token.id);
        session.user.email = token.email ?? "";
        session.user.name = token.name;
        session.user.username = token.username;
      }
      return session;
    },
  },
});
