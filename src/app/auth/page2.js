"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard"); // Redirect to dashboard after login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9d9d9] p-4">
      {/* Header */}
      <div className="w-full max-w-2xl bg-[#90cdee] py-4 px-6 rounded-lg mb-6">
        <div className="flex justify-between text-black text-xl font-normal font-['Inter']">
          <span>LOGO</span>
          <nav className="flex space-x-6">
            <Link href="#">Menu</Link>
            <Link href="#">Login</Link>
            <Link href="#">Business</Link>
            <Link href="#">Sign Up</Link>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <h1 className="text-black text-4xl font-bold font-['Inter'] mb-6">Hero Sales Message</h1>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-[#91ca99] text-black text-lg font-bold font-['Inter'] px-4 py-2 rounded-[27px] border-2 border-black hover:bg-green-400 transition"
            >
              Sign In
            </button>
            <Link href="/register" className="text-black text-lg font-normal hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-2xl bg-[#90cdee] mt-6 py-2 text-center text-black text-xl font-normal font-['Inter'] rounded-lg">
        Footer
      </div>
    </div>
  );
}
