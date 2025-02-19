"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardSearch from "./DashboardSearch";
import SearchResults from "./SearchResults";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const placeholderThumbnail = "/uploads/thumbnail/placeholder.jpg";

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
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      console.log("🔍 API Response:", data);
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
        <DashboardSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      </div>

      <div className="w-full max-w-4xl mx-auto mt-6 pb-16">
        {/* 🔹 Importing Search Results Component */}
        <SearchResults searchResults={searchResults} loading={loading} placeholderThumbnail={placeholderThumbnail} />
      </div>
    </div>
  );
}
