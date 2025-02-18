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
  const placeholderImage = "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image";

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔹 Search Section */}
      <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Find the Best Services Near You
        </h1>

        {/* 🔹 Search Bar with Button */}
        <div className="flex">
          <input
            type="text"
            placeholder="Search for services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} // 🔹 Trigger search on Enter
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((result, index) => {
              // Determine the image to use
              const imageUrl = result.service_image || result.business_profile || placeholderImage;

              // Shorten description to 20 characters max
              const truncatedDescription =
                result.service_description.length > 200
                  ? result.service_description.substring(0, 200) + "..."
                  : result.service_description;

              return (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer flex"
                >
                  {/* Image */}
                  <img
                    src={imageUrl}
                    alt={result.service_name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />

                  {/* Text Content */}
                  <div>
                    <h3 className="text-lg font-semibold">{result.service_name}</h3> {/* ✅ Service Name */}
                    <p className="text-sm text-gray-500">{result.business_name}</p> {/* ✅ Business Name */}
                    <p className="text-gray-600 mt-2">{truncatedDescription}</p> {/* ✅ Truncated Description */}
                    <p className="text-blue-600 font-semibold mt-2">£{result.cost}</p> {/* ✅ Cost */}
                    <p className="text-sm text-gray-500">
                      {result.city}, {result.postcode}
                    </p> {/* ✅ Location */}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
}
