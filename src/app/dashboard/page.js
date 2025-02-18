"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Redirecting to login...</p>;

  // Call the Search API
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setSearchResults(data); // ✅ Store API results in state
    } catch (error) {
      console.error("❌ Error fetching search results:", error);
    }

    setLoading(false);
  };

  // Handle "Enter" Key Press for Search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Default Placeholder Image (when no service or business image exists)
  const placeholderImage = "/placeholder.jpg"; // ✅ Can be updated later

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Search Section */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Find the Best Services Near You
        </h1>

        {/* 🔹 Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // 🔹 Press "Enter" to search
            className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="absolute left-3 top-3 text-gray-400">
            🔍 {/* Search Icon (optional) */}
          </div>
          <button
            onClick={handleSearch}
            className="absolute right-3 top-2.5 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* 🔹 Search Results Section */}
      <div className="w-full max-w-4xl mx-auto mt-6 pb-16">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {searchResults.map((result, index) => {
              // ✅ Determine which image to use based on hierarchy:
              const imageUrl =
                result.service_image_thumbnail ||
                result.business_profile_image ||
                placeholderImage;

              // ✅ Shorten description to 200 characters max
              const truncatedDescription =
                result.service_description.length > 200
                  ? result.service_description.substring(0, 200) + "..."
                  : result.service_description;

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer flex p-4 border border-gray-300"
                >
                  {/* 🔹 Updated: Smaller Image Section with Subtle Border */}
                  <img
                    src={imageUrl}
                    alt={result.service_name}
                    className="w-24 h-24 object-cover rounded-lg border border-gray-400"
                  />

                  {/* 🔹 Card Content */}
                  <div className="ml-4 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{result.service_name}</h3>
                    <p className="text-sm text-gray-500">{result.business_name}</p>
                    <p className="text-gray-600 mt-2">{truncatedDescription}</p>
                    <div className="flex justify-between items-center mt-3">
                      <p className="text-blue-600 font-semibold">£{result.cost}</p>
                      <p className="text-sm text-gray-500">
                        {result.city}, {result.postcode}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No results found</p>
        )}
      </div>
    </div>
  );
}
