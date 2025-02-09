import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { debugLog } from "@/utils/logger";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      debugLog("❌ Unauthorized request: No session found.");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    debugLog("🔍 Fetching user data for:", session.user.email || "[No Email]");

    const user = await prisma.appuser.findUnique({
      where: { email: session.user.email },
      select: {
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        role: true,
        mobile: true,
        landline: true,
        date_of_birth: true,
      },
    });

    if (!user) {
      debugLog("❌ User not found in database:", session.user.email || "[No Email]");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

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
