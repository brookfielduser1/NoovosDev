import pool from "@/lib/database";

export async function searchServices(query) {
  try {
    const result = await pool.query(`SELECT * FROM search_service($1);`, [query]);
    return result.rows; // ✅ Returns the search results
  } catch (error) {
    console.error("❌ Search Service Error:", error);
    throw new Error("Database query failed");
  }
}
