"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { debugLog } from "@/utils/logger";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      debugLog("❌ User not authenticated, redirecting to login.");
      router.push("/auth");
    } else if (session) {
      fetchUserData();
    }
  }, [status, session]);

  async function fetchUserData() {
    try {
      debugLog("🔍 Fetching user data...");
      const res = await fetch(`/api/profile`);
      const data = await res.json();

      if (res.ok) {
        debugLog("✅ User data loaded:", data.user);
        setUser(data.user);
      } else {
        debugLog("❌ Error loading user:", data.error);
      }
      
      setLoading(false);
    } catch (error) {
      debugLog("❌ Fetch user data error:", error);
      setLoading(false);
    }
  }

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>Error loading profile</p>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
        <p><strong>Email:</strong> {user.email}</p>
		<p><strong>Mobile:</strong> {user.mobile || "Not provided"}</p>
        <p><strong>Landline:</strong> {user.landline || "Not provided"}</p>
        <p><strong>Date of Birth:</strong> {user.date_of_birth || "Not provided"}</p>

        <button
          onClick={() => router.push("/profile/edit")}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
