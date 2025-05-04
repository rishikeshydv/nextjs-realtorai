import { NextResponse } from "next/server";
import pool from "@/prisma/pool";

export async function POST(req: Request): Promise<NextResponse> {
  const reqBody = await req.json();
  const { email,firstName,lastName,phone,role } = reqBody;

  const query = `SELECT email, firstname, lastname, phone, role FROM users WHERE email = $1`;

  try {
    const result = await pool.query(query, [email]);

    if (result.rowCount && result.rowCount > 0) {
      //update the user profile with the new info
        const updateQuery = `UPDATE users SET firstname = $1, lastname = $2, phone = $3, role = $4 WHERE email = $5`;
        await pool.query(updateQuery, [firstName,lastName,phone,role,email]);

      return NextResponse.json({ message: "User Updated" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
