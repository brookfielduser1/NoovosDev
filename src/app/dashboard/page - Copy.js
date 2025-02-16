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

  // Mock Data for Search Results
  const mockResults = Array(15).fill({
    id: 1,
    name: "Luxury Spa Massage",
    business: "Relax Spa & Wellness",
    description: "Relaxing full-body massage with essential oils.",
    price: "£50",
    location: "London",
    image: "https://via.placeholder.com/150",
  });

  // Handle Search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearchResults(mockResults);
      setLoading(false);
    }, 1000);
  };

  // Handle "Enter" Key Press for Search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
            onKeyDown={handleKeyDown}
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

      {/* 🔹 Search Results Section (Now Ensuring Full Page Scroll) */}
      <div className="w-full max-w-4xl mx-auto mt-6 pb-16">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="flex">
                  <img
                    src={result.image}
                    alt={result.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{result.name}</h3>
                    <p className="text-sm text-gray-500">{result.business}</p>
                    <p className="text-gray-600">{result.description}</p>
                    <p className="text-blue-600 font-semibold">{result.price}</p>
                    <p className="text-sm text-gray-500">{result.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
}
