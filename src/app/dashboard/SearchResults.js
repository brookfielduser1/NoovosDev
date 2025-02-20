import Image from "next/image";
import { determineServiceImage } from "./determineServiceImage"; // ✅ Import here

export default function SearchResults({ searchResults, loading }) {
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
        // ✅ Apply determineServiceImage inside SearchResults
        const imageUrl = determineServiceImage(result).service_image_thumbnail;

        return (
          <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer flex p-4 border border-gray-300">
            <Image
              src={imageUrl}
              alt={result.service_name}
              width={96} // ✅ Matches w-24 (24 * 4px = 96px)
              height={96} // ✅ Matches h-24 (24 * 4px = 96px)
              className="object-cover rounded-lg border border-gray-400"
            />
            <div className="ml-4 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{result.service_name}</h3>
              <p className="text-sm text-gray-500">{result.business_name}</p>
              <p className="text-gray-600 mt-2">{result.service_description.substring(0, 20)}...</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-blue-600 font-semibold">£{result.cost}</p>
                <p className="text-sm text-gray-500">{result.city}, {result.postcode}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
