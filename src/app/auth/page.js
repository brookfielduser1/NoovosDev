"use client"; // Ensure hooks work in Next.js App Router

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Next.js App Router
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function MinimalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ Get error from URL

  // ✅ Display error message from NextAuth
  const errorMessage = searchParams.get("error");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error); // ✅ Set error message from backend
    } else {
      router.push("/dashboard"); // ✅ Redirect to dashboard on success
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Noovos</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p> // ✅ Display error message
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p> // ✅ Error from query string
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white text-lg font-semibold py-2 rounded hover:bg-blue-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/register" className="text-gray-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
