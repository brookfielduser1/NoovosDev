import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { debugLog } from "@/utils/logger";
import pool from "@/lib/database";


export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      debugLog("❌ Unauthorized request: No session found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    debugLog("🔍 Fetching user data for:", session.user.email || "[No Email]");

    // ✅ Query PostgreSQL for user profile data
    const result = await pool.query(
      `SELECT first_name, last_name, email, user_type, role, mobile, landline, date_of_birth
       FROM appuser WHERE email = $1`,
      [session.user.email]
    );

    const user = result.rows[0];

    if (!user) {
      debugLog("❌ User not found in database:", session.user.email || "[No Email]");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Format date_of_birth before sending response
    const formattedUser = {
      ...user,
      date_of_birth: user.date_of_birth ? new Date(user.date_of_birth).toISOString().split("T")[0] : "Not provided",
    };

    debugLog("✅ Successfully fetched user data:", formattedUser || "[No User Data]");

    return NextResponse.json({ user: formattedUser });

  } catch (error) {
    debugLog("❌ Error fetching user profile:", error?.message || "Unknown error");
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
