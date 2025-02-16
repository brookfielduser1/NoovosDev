import { searchServices } from "@/services/searchService";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query") || "";

    const results = await searchServices(searchQuery); // ✅ Calls service function

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("❌ Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
