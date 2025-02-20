"use client";

export default function DashboardSearch({ searchQuery, setSearchQuery, handleSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search for services..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="absolute left-3 top-3 text-gray-400">🔍</div>
      <button
        onClick={handleSearch}
        className="absolute right-3 top-2.5 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
      >
        Search
      </button>
    </div>
  );
}
