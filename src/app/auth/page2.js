"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function MinimalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [func1Response, setFunc1Response] = useState(""); // ✅ State for Function 1
  const [func2Response, setFunc2Response] = useState(""); // ✅ State for Function 2
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
    }
  };

  // ✅ Function to call backend Function 1
  const callFunction1 = async () => {
    const response = await fetch("/api/function1");
    const data = await response.json();
    setFunc1Response(data.message); // ✅ Display response in UI
  };

  // ✅ Function to call backend Function 2
  const callFunction2 = async () => {
    const response = await fetch("/api/function2");
    const data = await response.json();
    setFunc2Response(data.message); // ✅ Display response in UI
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Noovos</h1>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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

      {/* ✅ Function 1 Button & Response */}
      <div className="mt-6">
        <button
          onClick={callFunction1}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Function 1
        </button>
        {func1Response && <p className="mt-2 text-green-600">{func1Response}</p>}
      </div>

      {/* ✅ Function 2 Button & Response */}
      <div className="mt-4">
        <button
          onClick={callFunction2}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
        >
          Function 2
        </button>
        {func2Response && <p className="mt-2 text-purple-600">{func2Response}</p>}
      </div>
    </div>
  );
}
