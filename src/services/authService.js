import { findUserByEmail } from "@/database/authQueries";
import bcrypt from "bcryptjs";

export async function authenticateUser(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }

  return { id: user.id, first_name: user.first_name, email: user.email };
}
