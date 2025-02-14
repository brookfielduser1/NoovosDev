import pool from "@/lib/database"; // ✅ PostgreSQL connection
import bcrypt from "bcryptjs"; 

// ✅ Authentication logic with inline DB query
export async function authenticateUser(email, password) {
  try {
    // 🔹 Direct database query inside authentication function
    const result = await pool.query(
      `SELECT id, first_name, email, password_hash FROM appuser WHERE email = $1`, 
      [email]
    );
    
    const user = result.rows[0]; // ✅ Extract user object

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    return { id: user.id, first_name: user.first_name, email: user.email };
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
}
