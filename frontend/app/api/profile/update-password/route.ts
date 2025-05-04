import { NextResponse } from "next/server";
import pool from "@/prisma/pool";
import bcrypt from "bcrypt";
export async function POST(req: Request): Promise<NextResponse> {
  const reqBody = await req.json();
  const { email, currentPassword, newPassword } = reqBody;
  const query = `SELECT email, password FROM users WHERE email = $1`;

  try {
    const result = await pool.query(query, [email]);
    if (result.rowCount && result.rowCount > 0) {
      // Check the hash of row password and the request current password
      const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password);
      if (isMatch) {
        // Update the user profile with the new info
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateQuery = `UPDATE users SET password = $1 WHERE email = $2`;
        await pool.query(updateQuery, [hashedPassword, email]);
        return NextResponse.json({ message: "Password Updated" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
      }
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
