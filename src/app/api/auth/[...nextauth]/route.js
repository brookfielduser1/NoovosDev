import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs"; // ✅ Import bcrypt for password hashing
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

        // ✅ Find user by email using correct Prisma model (appuser)
        const user = await prisma.appuser.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            first_name: true,
            email: true,
            password_hash: true,
          },
        });

        if (!user) {
          console.log("❌ No user found for email:", credentials.email);
          throw new Error("User not found");
        }

        // ✅ Compare entered password with stored hashed password
        const passwordMatch = await bcrypt.compare(credentials.password, user.password_hash);
        
        if (!passwordMatch) {
          console.log("❌ Invalid password for user:", user.email);
          throw new Error("Invalid password");
        }

        console.log("✅ Login successful for:", user.email);
        return { id: user.id, first_name: user.first_name, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.first_name = token.first_name; // ✅ Add first_name to session
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.first_name = user.first_name; // ✅ Store first_name in token
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
