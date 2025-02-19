import { searchServices } from "@/app/dashboard/searchServices";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost:3000/uploads/";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query") || "";

    let results = await searchServices(searchQuery); // ✅ Calls service function

    // ✅ Debugging: Log raw database results
    // console.log("🔍 Raw Database Results:", results);

    // ✅ Format image paths dynamically
    results = results.map((service) => {
      const serviceImage = service.service_image
        ? `${BASE_URL}thumbnail/${service.service_image}`
        : "/placeholder.jpg";
      const businessImage = service.business_profile_image
        ? `${BASE_URL}fullsize/${service.business_profile_image}`
        : "/placeholder.jpg";

      // ✅ Debugging: Log generated image paths
      // console.log(`🖼️ Service: ${service.service_name} → ${serviceImage}`);
      // console.log(`🏢 Business: ${service.business_name} → ${businessImage}`);

      return {
        ...service,
        service_image_thumbnail: serviceImage,
        service_image_fullsize: businessImage, // ✅ Ensures full-size image is available too
      };
    });

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("❌ Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
