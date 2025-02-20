"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSearchBar from "./DashboardSearchBar";
import SearchResults from "./SearchResults";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Redirecting to login...</p>;

const handleSearch = async () => {
  if (!searchQuery.trim()) return;
  setLoading(true);

  try {
    const res = await fetch(`/api/search_db?query=${encodeURIComponent(searchQuery)}`);
    const text = await res.text(); // ✅ Get raw response

    // console.log("🔍 Raw API Response:", text); // ✅ Debug the raw response

    const data = JSON.parse(text); // ✅ Convert to JSON
    setSearchResults(data);
  } catch (error) {
    console.error("❌ Error fetching search results:", error);
  }

  setLoading(false);
};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Find the Best Services Near You
        </h1>

        {/* 🔹 Importing Search Bar Component */}
        <DashboardSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-6 pb-16">
        {/* 🔹 Pass raw data, let SearchResults process images */}
        <SearchResults searchResults={searchResults} loading={loading} />
      </div>
    </div>
  );
}
