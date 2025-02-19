"use client";

export default function SearchResults({ searchResults, loading, placeholderThumbnail }) {
  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return <p className="text-gray-600 text-center">No results found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {searchResults.map((result, index) => {
        
        //let imageUrl = "/uploads/thumbnail/placeholder.jpg";
        let imageUrl = "/uploads/thumbnail/girl_chair.jpg";


        // result.service_image_thumbnail && result.service_image_thumbnail !== "/placeholder.jpg"
        //     ? result.service_image_thumbnail
        //     : result.business_profile_image && result.business_profile_image !== "/placeholder.jpg"
        //     ? result.business_profile_image
            // : "/uploads/thumbnail/placeholder.jpg"; // ✅ Ensures correct fallback


//console.log("🔍 Image URL:", imageUrl); // ✅ Debugging

        const truncatedDescription =
          result.service_description.length > 200
            ? result.service_description.substring(0, 200) + "..."
            : result.service_description;

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer flex p-4 border border-gray-300"
          >
            <img
            src={imageUrl}
            alt={result.service_name}
            className="w-24 h-24 object-cover rounded-lg border border-gray-400"
            loading="lazy" // ✅ Optimizes loading on mobile
            onError={(e) => (e.target.src = "/uploads/thumbnail/placeholder.jpg")} // ✅ Fallback if image fails
            />

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
  );
}
