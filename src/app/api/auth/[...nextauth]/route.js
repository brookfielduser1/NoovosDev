import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from "@/services/authService"; // ✅ Import authentication logic

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          return await authenticateUser(credentials.email, credentials.password); // ✅ Call authService
        } catch (error) {
          throw new Error(error.message || "Login failed");
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
        session.user.first_name = token.first_name;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.first_name = user.first_name;
      }
      return token;
    },
  },
};

// ✅ NextAuth API Handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
