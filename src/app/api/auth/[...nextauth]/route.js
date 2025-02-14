import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authenticateUser } from "@/services/authService"; // ✅ Now calls authService.js
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("🔍 Checking login for:", credentials.email);

        try {
          const user = await authenticateUser(credentials.email, credentials.password);
          console.log("✅ Login successful for:", user.email);
          return user;
        } catch (error) {
          console.log("❌ Authentication failed:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.first_name = token.first_name; // ✅ Keep session handling
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.first_name = user.first_name; // ✅ Keep token handling
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
