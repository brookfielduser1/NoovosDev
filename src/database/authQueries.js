import pool from "@/lib/database"; // ✅ Use PostgreSQL instead of Prisma

export async function findUserByEmail(email) {
  try {
    const result = await pool.query(
      `SELECT id, first_name, email, password_hash FROM appuser WHERE email = $1`, 
      [email]
    );
    return result.rows[0]; // ✅ Returns the first user found
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}
