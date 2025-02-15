export const runtime = "nodejs"; // Force Node.js runtime for bcrypt compatibility

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"; // Using bcryptjs for password hashing
import { debugLog } from "@/utils/logger";
import pool from "@/lib/database";


export async function POST(req) {
  try {
    // ✅ Read request body
    const body = await req.json();
    debugLog("Received payload:", body);

    if (!body) {
      return NextResponse.json(
        { error: "Request body is empty" },
        { status: 400 }
      );
    }

    // ✅ Destructure fields
    const { firstName, lastName, email, password, mobile, landline, dateOfBirth } = body;

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const existingUser = await pool.query(
      `SELECT email FROM appuser WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // ✅ Hash password securely
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      return NextResponse.json(
        { error: "Failed to process password" },
        { status: 500 }
      );
    }

    // ✅ Insert new user into the database
    const newUser = await pool.query(
      `INSERT INTO appuser (first_name, last_name, email, mobile, landline, date_of_birth, password_hash, user_type, role)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING email`,
      [
        firstName,
        lastName,
        email,
        mobile || null,
        landline || null,
        dateOfBirth ? new Date(dateOfBirth) : null,
        hashedPassword,
        "customer", // Default user type
        "standard", // Default role
      ]
    );

    return NextResponse.json(
      { message: "User registered successfully", user: { email: newUser.rows[0].email } },
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
