"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Add an early return if session is null to avoid errors.
  if (!session) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          Welcome, {session.user.email}!
        </h2>
        <button
          onClick={() => signOut({ callbackUrl: "/auth" })}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
