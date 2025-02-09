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
  } else {
    console.log("Session Data:", session); // ✅ Debug session data
  }
}, [status, router, session]);




  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">
          Welcome, {session.user.first_name}!
        </h2>

        {/* User Profile Button */}
        <button
          onClick={() => router.push("/profile")}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
        >
          Go to Profile
        </button>

        {/* Sign Out Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/auth" })}
          className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600 mt-2"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
