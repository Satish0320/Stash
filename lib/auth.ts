import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod"; 
import { prisma } from "./prisma";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new Error("User not found.");
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Invalid password.");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null; 
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", 
  },
  callbacks: {
    // 1. Add userId to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id; // 'sub' is the standard claim for user ID
      }
      return token;
    },
    // 2. Add userId to the Session object (so you can use it in the frontend)
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", 
  },
  secret: process.env.AUTH_SECRET, 
});