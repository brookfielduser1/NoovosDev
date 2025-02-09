export const runtime = "nodejs"; // Force Node.js runtime for bcrypt compatibility

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs"; // Using bcryptjs
import { debugLog } from "@/utils/logger";

export async function POST(req) {
  try {
    // Ensure request body is properly received
    const body = await req.json();
    debugLog("Received payload:", body);

    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    // Destructure the new fields along with the required ones
    const { firstName, lastName, email, password, mobile, landline, dateOfBirth } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.appuser.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash the password securely
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      return NextResponse.json(
        { error: "Failed to process password" },
        { status: 500 }
      );
    }

    // Create new user record with the new fields included
    const newUser = await prisma.appuser.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile: mobile || null,
        landline: landline || null,
        date_of_birth: dateOfBirth ? new Date(dateOfBirth) : null,
        password_hash: hashedPassword,
        user_type: "customer", // Default user type; adjust as needed
        role: "standard", // Default role; adjust as needed
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user: { email: newUser.email } },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Registration error:", err?.message || err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
