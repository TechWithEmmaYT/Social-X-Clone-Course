import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    username?: string;
  }
}

import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    name?: string | null;
    email?: string | null;
    username?: string;
  }
}
