import pool from "@/lib/database";
import bcrypt from "bcryptjs";

export async function login(email, password) {
  try {
    // ✅ Query database for user
    const result = await pool.query(
      `SELECT id, first_name, email, password_hash FROM appuser WHERE email = $1`,
      [email]
    );
    const user = result.rows[0];

    if (!user) {
      throw new Error("Login failed");
    }

    // ✅ Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      throw new Error("Login failed");
    }

    // ✅ Return user data
    return { id: user.id, first_name: user.first_name, email: user.email };
  } catch (error) {
    throw new Error(error.message || "Login failed");
  }
}
