import { NextResponse } from "next/server";
import pool from "@/lib/database"; // ✅ Database connection

export async function GET(req) {
  try {
    console.log("🟢 API request received...");

    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query") || "";
    console.log("🔍 Search Query:", searchQuery);

    // ✅ Query database directly inside route.js
    const result = await pool.query(`SELECT * FROM search_service($1);`, [searchQuery]);
    const rows = result.rows;
    // Shows the database results
    // console.log("🟢 Database Results:", rows);

    // ✅ Return only raw data (without image processing)
    const results = rows.map((service) => ({
      service_name: service.service_name,
      business_name: service.business_name,
      service_description: service.service_description,
      cost: service.cost,
      city: service.city,
      postcode: service.postcode,
      service_image: service.service_image, // ✅ Raw service image filename
      business_profile_image: service.business_profile, // ✅ Raw business profile filename
    }));

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("❌ Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
